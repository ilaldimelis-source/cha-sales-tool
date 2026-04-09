// js/sales-tracker.js — Sales Tracker (My Space, first subtab)
//
// Lets agents log enrollments, track weekly bonus progress, and
// monitor stats. All state is local to the agent's browser via
// localStorage, scoped per-user by Clerk user id so data stays on
// the signed-in agent's account even if another agent signs into
// the same browser.
//
// localStorage keys (per user):
//   cha_sales__<userId>         JSON array of sale objects
//   cha_agent_name__<userId>    (legacy, kept for migration only)
//
// Legacy global keys (cha_sales, cha_agent_name) are migrated on
// first load for a signed-in user and then removed.
//
// Sale object shape:
//   {
//     id:            'st_<ts>_<rand>',
//     ts:            Date.now() at insert,
//     customer:      string (best-effort from receipt),
//     plan:          string (plan name — core product for deals,
//                    add-on name for addons),
//     amount:        number (dollar value per month for this line),
//     type:          'deal' | 'addon',
//     status:        'valid' | 'cancel' | 'chargeback',
//     raw:           string (original pasted receipt — preserved),
//     notes:         string (e.g. "Policy: NEO...."),
//     receiptId:     string (groups items from the same receipt),
//     receiptTotal:  number (Summary total from the receipt, if found)
//   }
//
// No async/await per CLAUDE.md. ES5 only — var, function declarations.

'use strict';

// ── BONUS TIER CONFIG ───────────────────────────────────────
// D = Deals (core plan sales). A = Add-ons.
// Both targets must be hit to unlock the bonus for that tier.
var ST_BONUS_TIERS = [
  { deals: 10, addons: 10, bonus: 250 },
  { deals: 15, addons: 15, bonus: 500 },
  { deals: 20, addons: 20, bonus: 750 },
  { deals: 25, addons: 25, bonus: 1000 }
];

// ── PER-USER STORAGE SCOPING ────────────────────────────────
// Reads window.CHA_USER (set by js/auth.js after Clerk.load).
// If no signed-in user is present (e.g. during dev), falls back
// to an 'anonymous' scope so nothing crashes.
function _stGetCurrentUser() {
  var u =
    typeof window !== 'undefined' && window.CHA_USER ? window.CHA_USER : null;
  if (!u || !u.id) {
    return {
      id: 'anonymous',
      name: 'Agent',
      firstName: '',
      greeting: 'Welcome'
    };
  }
  return {
    id: u.id,
    name: u.name || u.firstName || 'Agent',
    firstName: u.firstName || u.name || 'Agent',
    greeting: u.greeting || 'Welcome'
  };
}

function _stKey(base) {
  return base + '__' + _stGetCurrentUser().id;
}

// ── SAFE LOCALSTORAGE WRAPPERS ──────────────────────────────
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

// One-time migration: copy legacy global cha_sales to the current
// user's scoped key, then remove the legacy key. Safe to call
// every render — it only runs if the scoped key is empty and the
// legacy key exists.
var _stMigrated = false;
function _stMigrateLegacyKeys() {
  if (_stMigrated) return;
  _stMigrated = true;
  var user = _stGetCurrentUser();
  if (user.id === 'anonymous') return;
  try {
    var scopedSales = _stKey('cha_sales');
    if (!_stGet(scopedSales)) {
      var legacy = _stGet('cha_sales');
      if (legacy) {
        _stSet(scopedSales, legacy);
        try {
          localStorage.removeItem('cha_sales');
        } catch (_e1) {
          /* ignore */
        }
      }
    }
    try {
      localStorage.removeItem('cha_agent_name');
    } catch (_e2) {
      /* ignore */
    }
  } catch (_e) {
    /* ignore */
  }
}

function _stLoadSales() {
  _stMigrateLegacyKeys();
  var raw = _stGet(_stKey('cha_sales')) || '[]';
  try {
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
}

function _stSaveSales(sales) {
  _stSet(_stKey('cha_sales'), JSON.stringify(sales || []));
}

// ── DATE HELPERS (week is Monday → Sunday) ──────────────────
function _stStartOfDay(d) {
  var x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function _stStartOfWeek(d) {
  var x = _stStartOfDay(d);
  var day = x.getDay();
  var diff = day === 0 ? -6 : 1 - day;
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

// ── SMART RECEIPT PARSER ────────────────────────────────────
// Block-based parser that handles multi-product enrollment
// receipts. Splits the input on blank lines, then looks in each
// block for a price line like "$479.00 per Month". Each block
// that has a price becomes a product. The product name is the
// first non-metadata line in the block; the policy number (if
// present) is captured as notes.
//
// The FIRST product found is treated as the core plan (deal);
// everything after it is treated as an add-on. This matches how
// enrollment platforms always list the core policy first.
//
// Returns: {
//   products:     [{name, price, policy}],
//   receiptTotal: number,
//   customer:     string,
//   agent:        string
// }
function _stParseReceipt(text) {
  var out = { products: [], receiptTotal: 0, customer: '', agent: '' };
  if (!text) return out;
  var raw = String(text).replace(/\r\n/g, '\n');

  // ── Summary total ─────────────────────────────────────────
  // Look for "Summary $541.98 Total" or "Total: $541.98".
  var totalMatch =
    raw.match(
      /summary[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)[^\n]*total/i
    ) || raw.match(/total[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i);
  if (totalMatch) {
    var tn = parseFloat(totalMatch[1].replace(/,/g, ''));
    if (!isNaN(tn)) out.receiptTotal = tn;
  }

  // ── Agent name from confirmation header ───────────────────
  // Matches: "April 7, 2026 at 5:41 PM - 686914253 - Nicole Sexton"
  var agentMatch = raw.match(
    /\d{4}\s*at\s*\d{1,2}:\d{2}\s*(?:am|pm)?\s*-\s*\d+\s*-\s*([^\n\r]+)/i
  );
  if (agentMatch) out.agent = agentMatch[1].trim().substring(0, 80);

  // ── Customer name (if any explicit field) ─────────────────
  var custMatch = raw.match(
    /(?:customer|member|client|insured|name)\s*[:\-]\s*([^\n\r]+)/i
  );
  if (custMatch) out.customer = custMatch[1].trim().substring(0, 80);

  // ── Product blocks ────────────────────────────────────────
  // Split on 2+ newlines. Each chunk is a candidate block.
  var blocks = raw.split(/\n\s*\n+/);
  var priceRe =
    /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(?:per\s+month|\/\s*mo|monthly|a\s+month)/i;
  var policyRe = /policy\s*(?:number|#|:)?\s*[:\-]?\s*([A-Z0-9\-]{4,})/i;
  var skipLineRe =
    /^(?:central health|confirmation|products?|summary|total|policy|active|effective|starts?|member\s+\d|payment|plan\s+type|type\b)/i;

  for (var bi = 0; bi < blocks.length; bi++) {
    var block = blocks[bi];
    if (!block) continue;
    var pMatch = block.match(priceRe);
    if (!pMatch) continue;
    var price = parseFloat(pMatch[1].replace(/,/g, ''));
    if (isNaN(price) || price <= 0) continue;

    // Find the product name: first non-empty line that isn't a
    // header/metadata line.
    var lines = block.split(/\n/);
    var name = '';
    for (var li = 0; li < lines.length; li++) {
      var line = lines[li].trim();
      if (!line) continue;
      if (skipLineRe.test(line)) continue;
      if (/^\$/.test(line)) continue;
      if (/\d{4}\s*at\s*\d/.test(line)) continue; // confirmation header
      name = line;
      break;
    }
    if (!name) continue;

    // Policy number (optional)
    var policy = '';
    var polMatch = block.match(policyRe);
    if (polMatch) policy = polMatch[1];

    out.products.push({
      name: name.substring(0, 120),
      price: price,
      policy: policy
    });
  }

  // ── Fallback: no blocks detected but receipt has a single
  // price line — try to pull ONE product from the whole text so
  // free-typed entries still work.
  if (out.products.length === 0) {
    var anyPrice = raw.match(
      /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(?:per\s+month|\/\s*mo|monthly|a\s+month)?/i
    );
    if (anyPrice) {
      var ap = parseFloat(anyPrice[1].replace(/,/g, ''));
      if (!isNaN(ap) && ap > 0) {
        // Plan name: try POLICY_DOCS substring match against the
        // text, picking the longest match.
        var guessedName = '';
        if (typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
          var lower = raw.toLowerCase();
          for (var i = 0; i < POLICY_DOCS.length; i++) {
            var pdName =
              POLICY_DOCS[i] && POLICY_DOCS[i].name
                ? String(POLICY_DOCS[i].name)
                : '';
            if (!pdName) continue;
            if (lower.indexOf(pdName.toLowerCase()) !== -1) {
              if (pdName.length > guessedName.length) guessedName = pdName;
            }
          }
        }
        out.products.push({
          name: guessedName || 'Sale',
          price: ap,
          policy: ''
        });
      }
    }
  }

  return out;
}

// ── ADD / UPDATE / DELETE ───────────────────────────────────
// Primary action: parse the pasted receipt and insert one deal
// + N add-ons automatically based on what the parser found.
function _stAutoDetectAndAdd() {
  var input = document.getElementById('st-receipt-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) {
    _stFlash('Paste a receipt first.', 'error');
    return;
  }
  var parsed = _stParseReceipt(text);
  if (!parsed.products.length) {
    _stFlash(
      'Could not find any products in that receipt. Try "Add as Deal" instead.',
      'error'
    );
    return;
  }
  var sales = _stLoadSales();
  var receiptId =
    'rcpt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  var now = Date.now();
  for (var i = 0; i < parsed.products.length; i++) {
    var p = parsed.products[i];
    sales.push({
      id: 'st_' + now + '_' + i + '_' + Math.random().toString(36).slice(2, 6),
      ts: now + i,
      customer: parsed.customer,
      plan: p.name,
      amount: p.price,
      type: i === 0 ? 'deal' : 'addon',
      status: 'valid',
      raw: text,
      notes: p.policy ? 'Policy: ' + p.policy : '',
      receiptId: receiptId,
      receiptTotal: parsed.receiptTotal
    });
  }
  _stSaveSales(sales);
  input.value = '';
  var addonCount = parsed.products.length - 1;
  var msg =
    'Added 1 deal' +
    (addonCount > 0
      ? ' + ' + addonCount + ' add-on' + (addonCount === 1 ? '' : 's')
      : '') +
    '.';
  _stRender();
  _stFlash(msg, 'ok');
}

// Manual fallback: add a single sale as deal or addon, using the
// parser's best guess for plan / amount / customer.
function _stAddSale(saleType) {
  var input = document.getElementById('st-receipt-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) {
    _stFlash('Paste a receipt or enter sale details first.', 'error');
    return;
  }
  var parsed = _stParseReceipt(text);
  var first = parsed.products[0] || { name: '', price: 0, policy: '' };
  var sales = _stLoadSales();
  sales.push({
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    ts: Date.now(),
    customer: parsed.customer,
    plan: first.name,
    amount: first.price,
    type: saleType === 'addon' ? 'addon' : 'deal',
    status: 'valid',
    raw: text,
    notes: first.policy ? 'Policy: ' + first.policy : '',
    receiptId: '',
    receiptTotal: parsed.receiptTotal
  });
  _stSaveSales(sales);
  input.value = '';
  _stRender();
  _stFlash('Added 1 ' + (saleType === 'addon' ? 'add-on' : 'deal') + '.', 'ok');
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

// Transient flash message at the top of the input section.
function _stFlash(msg, kind) {
  var el = document.getElementById('st-flash');
  if (!el) return;
  el.textContent = msg;
  el.className = 'st-flash st-flash-' + (kind === 'error' ? 'error' : 'ok');
  el.style.opacity = '1';
  clearTimeout(window._stFlashT);
  window._stFlashT = setTimeout(function () {
    if (el) el.style.opacity = '0';
  }, 2600);
}

// ── STATS CALCULATION ───────────────────────────────────────
// Only counts sales with status === 'valid'. Cancelled and
// chargeback sales stay on the table for records but don't count
// toward bonus or stats totals.
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
function _stBuildWelcome() {
  var user = _stGetCurrentUser();
  var greeting = user.greeting || 'Welcome';
  var first = user.firstName || user.name || '';
  var line = first ? greeting + ', ' + first : greeting;
  return (
    '<div class="st-welcome">' +
    '<div class="st-welcome-hi">' +
    _stEscape(line) +
    '</div>' +
    '<div class="st-welcome-sub">Here are your numbers for this week.</div>' +
    '</div>'
  );
}

function _stBuildStats(stats) {
  var html = '<div class="st-stats">';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Total Sales</div><div class="st-stat-value">$' +
    Math.round(stats.weekSales).toLocaleString() +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Deals</div><div class="st-stat-value">' +
    stats.weekDeals +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Enrollments</div><div class="st-stat-value">' +
    stats.enrollments +
    '</div></div>';
  html +=
    '<div class="st-stat-card"><div class="st-stat-label">Add-ons</div><div class="st-stat-value">' +
    stats.weekAddons +
    '</div></div>';
  html += '</div>';
  return html;
}

// Compact bonus strip: next-tier focus with a single progress
// bar, then a small chip row for the remaining tiers. Much
// shorter than the old 4-tier 2-bar grid.
function _stBuildBonus(stats) {
  // Find the next tier (first one not yet achieved)
  var nextIdx = -1;
  for (var i = 0; i < ST_BONUS_TIERS.length; i++) {
    var t = ST_BONUS_TIERS[i];
    if (stats.weekDeals < t.deals || stats.weekAddons < t.addons) {
      nextIdx = i;
      break;
    }
  }
  var topAchieved = nextIdx === -1;
  var target = topAchieved
    ? ST_BONUS_TIERS[ST_BONUS_TIERS.length - 1]
    : ST_BONUS_TIERS[nextIdx];
  var dealsPct = Math.min(100, (stats.weekDeals / target.deals) * 100);
  var addonsPct = Math.min(100, (stats.weekAddons / target.addons) * 100);
  var combinedPct = Math.round((dealsPct + addonsPct) / 2);

  var html = '<div class="st-bonus">';
  html += '<div class="st-bonus-head">';
  html += '<div class="st-bonus-title">Weekly Bonus</div>';
  if (topAchieved) {
    html +=
      '<div class="st-bonus-next st-bonus-maxed">Top tier unlocked — $' +
      target.bonus +
      '</div>';
  } else {
    html +=
      '<div class="st-bonus-next">Next: $' +
      target.bonus +
      ' &middot; ' +
      target.deals +
      'D / ' +
      target.addons +
      'A</div>';
  }
  html += '</div>';
  html +=
    '<div class="st-bonus-bar"><div class="st-bonus-fill" style="width:' +
    combinedPct +
    '%"></div></div>';
  html +=
    '<div class="st-bonus-counts">' +
    stats.weekDeals +
    ' deals &middot; ' +
    stats.weekAddons +
    ' add-ons</div>';
  // Tier chip row
  html += '<div class="st-tier-chips">';
  for (var j = 0; j < ST_BONUS_TIERS.length; j++) {
    var tt = ST_BONUS_TIERS[j];
    var achieved = stats.weekDeals >= tt.deals && stats.weekAddons >= tt.addons;
    html +=
      '<div class="st-tier-chip' +
      (achieved ? ' achieved' : '') +
      '">' +
      '<span class="st-tier-chip-goal">' +
      tt.deals +
      'D/' +
      tt.addons +
      'A</span>' +
      '<span class="st-tier-chip-bonus">$' +
      tt.bonus +
      (achieved ? ' \u2713' : '') +
      '</span>' +
      '</div>';
  }
  html += '</div>';
  html += '</div>';
  return html;
}

function _stBuildInput() {
  var html = '<div class="st-input-section">';
  html +=
    '<label class="st-input-label" for="st-receipt-input">Paste enrollment receipt</label>';
  html +=
    '<textarea id="st-receipt-input" class="st-textarea" rows="4" ' +
    'placeholder="Paste the full enrollment receipt here. The tracker will auto-detect the core plan and any add-ons, and log them all in one click."></textarea>';
  html += '<div id="st-flash" class="st-flash" style="opacity:0;"></div>';
  html += '<div class="st-input-actions">';
  html +=
    '<button class="st-add-deal" onclick="_stAutoDetectAndAdd()">Auto-detect &amp; Add</button>';
  html +=
    '<button class="st-add-addon" onclick="_stAddSale(\'deal\')">Add as Deal</button>';
  html +=
    '<button class="st-add-addon" onclick="_stAddSale(\'addon\')">Add as Add-on</button>';
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
      '<div class="st-empty">No sales logged yet this week. Paste a receipt above to add one.</div>';
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
    html +=
      '<td>$' +
      (Math.round((Number(s.amount) || 0) * 100) / 100).toFixed(2) +
      '</td>';
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
function _stRender() {
  var page = document.getElementById('page-salestracker');
  if (!page) return;
  var sales = _stLoadSales();
  var stats = _stCalcStats(sales);

  var html = '';
  html +=
    '<div class="ph"><div class="pt">Sales <span>Tracker</span></div>' +
    '<div class="pd">Log enrollments, watch your weekly bonus progress, and see your numbers at a glance. Everything stays on your account.</div></div>';
  html += _stBuildWelcome();
  html += _stBuildStats(stats);
  html += _stBuildBonus(stats);
  html += _stBuildInput();
  html += _stBuildTable(sales);

  page.innerHTML = html;
}
