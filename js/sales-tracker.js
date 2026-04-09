// js/sales-tracker.js — Sales Tracker (My Space, first subtab)
//
// Lets agents log enrollments, track weekly bonus progress, and
// monitor stats. All state is local to the agent's browser via
// localStorage. No backend, no network calls, no PII leaving the
// device. Matches the existing app style and patterns.
//
// localStorage keys:
//   cha_sales         JSON array of sale objects
//   cha_agent_name    string (optional, for the agent's own header)
//
// Sale object shape:
//   {
//     id:       'st_<ts>_<rand>',
//     ts:       Date.now() at insert,
//     customer: string (best-effort from receipt),
//     plan:     string (best-effort match against POLICY_DOCS names),
//     amount:   number (best-effort dollar value from receipt),
//     type:     'deal' | 'addon',
//     status:   'valid' | 'cancel' | 'chargeback',
//     raw:      string (the original pasted text — preserved verbatim),
//     notes:    string (reserved for future use)
//   }
//
// The function the rest of the app sees is _stRender(). It is invoked
// by renderSalesTracker() (a thin shim defined in js/myspace.js so the
// existing pattern of "render function lives near its tab" is honored).
//
// No async/await per CLAUDE.md. ES5 only — var, function declarations,
// .then().catch() if anything ever needs to fetch.

'use strict';

// ── BONUS TIER CONFIG ───────────────────────────────────────
// D = Deals (sales of a primary plan).
// A = Add-ons (additional product sold alongside the core plan).
// Both targets must be hit to unlock the bonus for that tier.
var ST_BONUS_TIERS = [
  { deals: 10, addons: 10, bonus: 250 },
  { deals: 15, addons: 15, bonus: 500 },
  { deals: 20, addons: 20, bonus: 750 },
  { deals: 25, addons: 25, bonus: 1000 }
];

// ── SAFE LOCALSTORAGE WRAPPERS ──────────────────────────────
// Falls back to direct localStorage if the safe* helpers from app.js
// are not yet defined (defensive — sales-tracker.js could load before
// app.js if the script order is ever reorganized).
function _stGet(key) {
  try {
    if (typeof safeGetItem === 'function') return safeGetItem(key);
    return localStorage.getItem(key);
  } catch (_e) {
    return null;
  }
}

function _stSet(key, value) {
  try {
    if (typeof safeSetItem === 'function') {
      safeSetItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (_e) {
    /* incognito / quota — silently ignore */
  }
}

function _stLoadSales() {
  var raw = _stGet('cha_sales') || '[]';
  try {
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
}

function _stSaveSales(sales) {
  _stSet('cha_sales', JSON.stringify(sales || []));
}

function _stLoadAgentName() {
  return _stGet('cha_agent_name') || '';
}

function _stSaveAgentName(name) {
  _stSet('cha_agent_name', String(name || ''));
}

// ── DATE HELPERS (week is Monday → Sunday) ──────────────────
function _stStartOfDay(d) {
  var x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function _stStartOfWeek(d) {
  var x = _stStartOfDay(d);
  var day = x.getDay(); // 0 = Sunday, 1 = Monday, …
  var diff = day === 0 ? -6 : 1 - day; // shift so Monday = start
  x.setDate(x.getDate() + diff);
  return x;
}

// ── HTML ESCAPING ───────────────────────────────────────────
function _stEscape(s) {
  if (typeof escHTML === 'function') return escHTML(String(s == null ? '' : s));
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return map[c];
  });
}

// ── RECEIPT PARSER (best-effort, tolerant) ──────────────────
// Receipts come in many shapes from many enrollment platforms.
// This parser does NOT enforce a format — it extracts what it
// can find and leaves the rest blank. The original pasted text
// is always preserved on the sale object as `raw` so nothing
// is ever lost.
function _stParseReceipt(text) {
  var out = { customer: '', plan: '', amount: 0 };
  if (!text) return out;
  var t = String(text);

  // Dollar amount: first $XXX or $XXX.XX (with optional comma thousand sep)
  var amtMatch = t.match(/\$\s*([0-9]{1,4}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?)/);
  if (amtMatch) {
    var n = parseFloat(amtMatch[1].replace(/,/g, ''));
    if (!isNaN(n)) out.amount = n;
  }

  // Customer name: line beginning with Customer:/Member:/Name:/Client:
  var custMatch = t.match(
    /(?:customer|member|name|client)\s*[:\-]\s*([^\n\r]+)/i
  );
  if (custMatch) {
    out.customer = custMatch[1].trim().substring(0, 80);
  }

  // Plan: scan POLICY_DOCS for any plan name that appears in the text
  // (case-insensitive substring). Picks the longest match so
  // "MedFirst 5" wins over "MedFirst".
  if (typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
    var lower = t.toLowerCase();
    var bestName = '';
    for (var i = 0; i < POLICY_DOCS.length; i++) {
      var name =
        POLICY_DOCS[i] && POLICY_DOCS[i].name
          ? String(POLICY_DOCS[i].name)
          : '';
      if (!name) continue;
      if (lower.indexOf(name.toLowerCase()) !== -1) {
        if (name.length > bestName.length) bestName = name;
      }
    }
    out.plan = bestName;
  }

  return out;
}

// ── ADD / UPDATE / DELETE ───────────────────────────────────
function _stAddSale(saleType) {
  var input = document.getElementById('st-receipt-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) {
    alert('Paste a receipt or enter sale details first.');
    return;
  }
  var parsed = _stParseReceipt(text);
  var sales = _stLoadSales();
  var sale = {
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    ts: Date.now(),
    customer: parsed.customer,
    plan: parsed.plan,
    amount: parsed.amount,
    type: saleType === 'addon' ? 'addon' : 'deal',
    status: 'valid',
    raw: text,
    notes: ''
  };
  sales.push(sale);
  _stSaveSales(sales);
  input.value = '';
  _stRender();
}

function _stUpdateStatus(id, newStatus) {
  if (
    newStatus !== 'valid' &&
    newStatus !== 'cancel' &&
    newStatus !== 'chargeback'
  ) {
    return;
  }
  var sales = _stLoadSales();
  for (var i = 0; i < sales.length; i++) {
    if (sales[i].id === id) {
      sales[i].status = newStatus;
      _stSaveSales(sales);
      _stRender();
      return;
    }
  }
}

function _stDeleteSale(id) {
  if (!confirm('Delete this sale?')) return;
  var sales = _stLoadSales().filter(function (s) {
    return s.id !== id;
  });
  _stSaveSales(sales);
  _stRender();
}

function _stHandleAgentName(value) {
  _stSaveAgentName(value);
}

// ── STATS CALCULATION ───────────────────────────────────────
// Only counts sales with status === 'valid'. Cancelled and
// chargeback sales are kept on the table for the agent's records
// but don't count toward bonus or stats totals.
function _stCalcStats(sales) {
  var now = new Date();
  var weekStart = _stStartOfWeek(now).getTime();
  var todayStart = _stStartOfDay(now).getTime();
  var stats = {
    todayCount: 0,
    weekCount: 0,
    weekSales: 0,
    enrollments: 0,
    weekDeals: 0,
    weekAddons: 0
  };
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s || s.status !== 'valid') continue;
    if (s.ts >= todayStart) stats.todayCount++;
    if (s.ts >= weekStart) {
      stats.weekCount++;
      stats.weekSales += Number(s.amount) || 0;
      stats.enrollments++;
      if (s.type === 'addon') stats.weekAddons++;
      else stats.weekDeals++;
    }
  }
  return stats;
}

// ── HTML BUILDERS ───────────────────────────────────────────
function _stBuildAgentRow() {
  var name = _stLoadAgentName();
  var html = '<div class="st-agent-row">';
  html += '<label for="st-agent-name">Agent name:</label>';
  html +=
    '<input type="text" id="st-agent-name" class="st-agent-input" placeholder="Your name" value="' +
    _stEscape(name) +
    '" oninput="_stHandleAgentName(this.value)">';
  html += '</div>';
  return html;
}

function _stBuildStats(stats) {
  var html = '<div class="st-stats">';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Today</div><div class="st-stat-value">' +
    stats.todayCount +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">This Week</div><div class="st-stat-value">' +
    stats.weekCount +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Week Sales</div><div class="st-stat-value">$' +
    Math.round(stats.weekSales).toLocaleString() +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Enrollments</div><div class="st-stat-value">' +
    stats.enrollments +
    '</div></div>';
  html += '</div>';
  return html;
}

function _stBuildBonus(stats) {
  var html = '<div class="st-bonus">';
  html += '<div class="st-bonus-title">Weekly Bonus Progress</div>';
  html +=
    '<div class="st-bonus-counts">Deals: <strong>' +
    stats.weekDeals +
    '</strong> &middot; Add-ons: <strong>' +
    stats.weekAddons +
    '</strong></div>';
  html += '<div class="st-bonus-tiers">';
  for (var i = 0; i < ST_BONUS_TIERS.length; i++) {
    var t = ST_BONUS_TIERS[i];
    var achieved = stats.weekDeals >= t.deals && stats.weekAddons >= t.addons;
    var dealsPct = Math.min(100, (stats.weekDeals / t.deals) * 100);
    var addonsPct = Math.min(100, (stats.weekAddons / t.addons) * 100);
    html += '<div class="st-tier' + (achieved ? ' achieved' : '') + '">';
    html += '<div class="st-tier-head">';
    html +=
      '<span class="st-tier-label">' +
      t.deals +
      ' deals + ' +
      t.addons +
      ' add-ons</span>';
    html +=
      '<span class="st-tier-bonus">$' +
      t.bonus +
      (achieved ? ' \u2713' : '') +
      '</span>';
    html += '</div>';
    html += '<div class="st-tier-bars">';
    html +=
      '<div class="st-tier-bar"><div class="st-tier-fill" style="width:' +
      dealsPct +
      '%"></div></div>';
    html +=
      '<div class="st-tier-bar"><div class="st-tier-fill" style="width:' +
      addonsPct +
      '%"></div></div>';
    html += '</div>';
    html += '</div>';
  }
  html += '</div></div>';
  return html;
}

function _stBuildInput() {
  var html = '<div class="st-input-section">';
  html +=
    '<label class="st-input-label" for="st-receipt-input">Add a sale</label>';
  html +=
    '<textarea id="st-receipt-input" class="st-textarea" rows="3" ' +
    'placeholder="Paste an enrollment receipt here, or just type the customer name and amount. The parser will pull out plan, customer, and amount where it can — anything it can\'t find stays blank."></textarea>';
  html += '<div class="st-input-actions">';
  html +=
    '<button class="st-add-deal" onclick="_stAddSale(\'deal\')">+ Add Deal</button>';
  html +=
    '<button class="st-add-addon" onclick="_stAddSale(\'addon\')">+ Add Add-on</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function _stBuildTable(sales) {
  var weekStart = _stStartOfWeek(new Date()).getTime();
  var weekSales = sales
    .filter(function (s) {
      return s && s.ts >= weekStart;
    })
    .sort(function (a, b) {
      return b.ts - a.ts;
    });

  var html = '<div class="st-table-section">';
  html +=
    '<div class="st-table-title">This Week (' + weekSales.length + ')</div>';
  if (weekSales.length === 0) {
    html +=
      '<div class="st-empty">No sales logged yet this week. Use the form above to add one.</div>';
    html += '</div>';
    return html;
  }
  html += '<div class="st-table-wrap"><table class="st-table">';
  html +=
    '<thead><tr><th>Date</th><th>Customer</th><th>Plan</th><th>Amount</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>';
  for (var i = 0; i < weekSales.length; i++) {
    var s = weekSales[i];
    var d = new Date(s.ts);
    var dateStr =
      d.getMonth() +
      1 +
      '/' +
      d.getDate() +
      ' ' +
      String(d.getHours()).padStart(2, '0') +
      ':' +
      String(d.getMinutes()).padStart(2, '0');
    var typeClass = s.type === 'addon' ? 'st-type-addon' : 'st-type-deal';
    var typeLabel = s.type === 'addon' ? 'Add-on' : 'Deal';
    html += '<tr class="st-row st-row-' + s.status + '">';
    html += '<td>' + _stEscape(dateStr) + '</td>';
    html += '<td>' + _stEscape(s.customer || '\u2014') + '</td>';
    html += '<td>' + _stEscape(s.plan || '\u2014') + '</td>';
    html += '<td>$' + Math.round(Number(s.amount) || 0) + '</td>';
    html += '<td><span class="' + typeClass + '">' + typeLabel + '</span></td>';
    html += '<td>';
    html +=
      '<select class="st-status-select" onchange="_stUpdateStatus(\'' +
      s.id +
      '\', this.value)">';
    html +=
      '<option value="valid"' +
      (s.status === 'valid' ? ' selected' : '') +
      '>Valid</option>';
    html +=
      '<option value="cancel"' +
      (s.status === 'cancel' ? ' selected' : '') +
      '>Cancel</option>';
    html +=
      '<option value="chargeback"' +
      (s.status === 'chargeback' ? ' selected' : '') +
      '>Chargeback</option>';
    html += '</select>';
    html += '</td>';
    html +=
      '<td><button class="st-delete" title="Delete" onclick="_stDeleteSale(\'' +
      s.id +
      '\')">\u00d7</button></td>';
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  html += '</div>';
  return html;
}

// ── MAIN RENDER ─────────────────────────────────────────────
// Targets the placeholder div #page-salestracker added to
// index.html under #page-myspace. Called by renderSalesTracker()
// which is the thin shim defined in js/myspace.js — the shim
// pattern lets PAGE_CONFIG reference renderSalesTracker by name
// while keeping all the actual logic in this file.
function _stRender() {
  var page = document.getElementById('page-salestracker');
  if (!page) return;
  var sales = _stLoadSales();
  var stats = _stCalcStats(sales);

  var html = '';
  html +=
    '<div class="ph"><div class="pt">Sales <span>Tracker</span></div>' +
    '<div class="pd">Log enrollments, watch your weekly bonus progress, and see your numbers at a glance. Everything stays in your browser.</div></div>';
  html += _stBuildAgentRow();
  html += _stBuildStats(stats);
  html += _stBuildBonus(stats);
  html += _stBuildInput();
  html += _stBuildTable(sales);

  page.innerHTML = html;
}
