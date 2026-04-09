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

// ── POST-DATED SALES ────────────────────────────────────────
// Post-dates are sales scheduled to bill on a future calendar
// day. They are stored separately from active sales so they
// never affect today's or this week's totals. On the billing
// day a banner prompts the agent to confirm → the sale is
// moved into the main sales list with ts set to the bill date.
//
// Post-date object shape:
//   {
//     id:        'pd_<ts>_<rand>',
//     createdTs: Date.now() at insert,
//     billDate:  'YYYY-MM-DD' (local date picker value),
//     customer:  string,
//     plan:      string,
//     amount:    number,
//     type:      'deal' | 'addon',
//     raw:       string,
//     notes:     string,
//     receiptId: string
//   }
function _stLoadPostDates() {
  var raw = _stGet(_stKey('cha_postdates')) || '[]';
  try {
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
}

function _stSavePostDates(pds) {
  _stSet(_stKey('cha_postdates'), JSON.stringify(pds || []));
}

// Returns 'YYYY-MM-DD' for today in local time.
function _stTodayIso() {
  var d = new Date();
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  var dd = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + mm + '-' + dd;
}

// Converts 'YYYY-MM-DD' to a Date at local midnight.
function _stIsoToDate(iso) {
  if (!iso || typeof iso !== 'string') return null;
  var parts = iso.split('-');
  if (parts.length !== 3) return null;
  var y = parseInt(parts[0], 10);
  var m = parseInt(parts[1], 10);
  var d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

// Human-friendly date formatter (e.g. "Apr 15, 2026")
function _stFormatBillDate(iso) {
  var d = _stIsoToDate(iso);
  if (!d) return iso || '';
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
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
// Line-based parser. Scans every line for a monthly price
// pattern ("$X per Month") and uses the nearest preceding
// non-metadata line as the product name. Enrollment fee lines
// ("$50.00 Enrollment one-time") are explicitly skipped so they
// NEVER get counted as a plan price — they're tracked
// separately as enrollmentFee for reference.
//
// The FIRST product found is treated as the core plan (deal);
// everything after it is treated as an add-on. This matches how
// enrollment platforms always list the core policy first.
//
// Returns: {
//   products:      [{name, price, policy}],
//   receiptTotal:  number,
//   enrollmentFee: number (sum of any one-time enrollment fees),
//   customer:      string,
//   agent:         string
// }
function _stParseReceipt(text) {
  var out = {
    products: [],
    receiptTotal: 0,
    enrollmentFee: 0,
    customer: '',
    agent: ''
  };
  if (!text) return out;
  var raw = String(text).replace(/\r\n/g, '\n');
  var lines = raw.split('\n');

  // ── Summary total ─────────────────────────────────────────
  var totalMatch =
    raw.match(
      /summary[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)[^\n]*total/i
    ) || raw.match(/\btotal[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i);
  if (totalMatch) {
    var tn = parseFloat(totalMatch[1].replace(/,/g, ''));
    if (!isNaN(tn)) out.receiptTotal = tn;
  }

  // ── Agent name from confirmation header ───────────────────
  var agentMatch = raw.match(
    /\d{4}\s*at\s*\d{1,2}:\d{2}\s*(?:am|pm)?\s*-\s*\d+\s*-\s*([^\n\r]+)/i
  );
  if (agentMatch) out.agent = agentMatch[1].trim().substring(0, 80);

  // ── Customer name (if any explicit field) ─────────────────
  var custMatch = raw.match(
    /(?:customer|member|client|insured|name)\s*[:\-]\s*([^\n\r]+)/i
  );
  if (custMatch) out.customer = custMatch[1].trim().substring(0, 80);

  // ── Enrollment fee ────────────────────────────────────────
  // One-time enrollment charges are tracked separately and
  // NEVER used as a plan monthly amount.
  var enrollmentRe = /enrollment|one[-\s]?time|sign[-\s]?up\s+fee/i;
  var priceAnyRe = /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/;
  for (var ei = 0; ei < lines.length; ei++) {
    var eline = lines[ei];
    if (!enrollmentRe.test(eline)) continue;
    var em = eline.match(priceAnyRe);
    if (em) {
      var efee = parseFloat(em[1].replace(/,/g, ''));
      if (!isNaN(efee) && efee > 0) out.enrollmentFee += efee;
    }
  }

  // ── Per-month price lines ─────────────────────────────────
  // Matches "$291.00 per Month", "$39.99/mo", "$22.99 monthly".
  // Requires an explicit monthly marker — bare "$50.00" will
  // never match, and enrollment lines are skipped entirely.
  var priceRe =
    /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(?:per\s*month|\/\s*mo\b|monthly|a\s+month|\bmo\b)/i;
  var skipLineRe =
    /^(?:central health|confirmation|products?|summary|total|policy|active|effective|starts?|member\s+\d|payment|plan\s+type|type\b|address|phone|email|date|status|enrollment|one[-\s]?time)/i;
  var policyRe = /policy\s*(?:number|#|:)?\s*[:\-]?\s*([A-Z0-9\-]{4,})/i;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    // Never treat an enrollment/one-time line as a plan price.
    if (enrollmentRe.test(line)) continue;
    var m = line.match(priceRe);
    if (!m) continue;
    var price = parseFloat(m[1].replace(/,/g, ''));
    if (isNaN(price) || price <= 0) continue;

    // Product name = nearest preceding non-metadata line (look
    // back up to 8 lines). If nothing is found, try the text on
    // the same line that precedes the "$".
    var name = '';
    for (var back = i - 1; back >= 0 && back >= i - 8; back--) {
      var prev = lines[back].trim();
      if (!prev) {
        continue;
      }
      if (skipLineRe.test(prev)) continue;
      if (/^\$/.test(prev)) continue;
      if (/\d{4}\s*at\s*\d/.test(prev)) continue;
      if (enrollmentRe.test(prev)) continue;
      name = prev;
      break;
    }
    if (!name) {
      var inline = line.split('$')[0].trim();
      if (inline && !skipLineRe.test(inline)) name = inline;
    }
    if (!name) continue;

    // Policy number — scan nearby lines
    var policy = '';
    var polStart = Math.max(0, i - 3);
    var polEnd = Math.min(lines.length, i + 6);
    for (var pi = polStart; pi < polEnd; pi++) {
      var polMatch = lines[pi].match(policyRe);
      if (polMatch) {
        policy = polMatch[1];
        break;
      }
    }

    // De-dup: skip if this exact name+price combo already added
    var dup = false;
    for (var di = 0; di < out.products.length; di++) {
      if (
        out.products[di].name === name &&
        Math.abs(out.products[di].price - price) < 0.01
      ) {
        dup = true;
        break;
      }
    }
    if (dup) continue;

    out.products.push({
      name: name.substring(0, 120),
      price: price,
      policy: policy
    });
  }

  // ── Fallback: no per-month lines found — try POLICY_DOCS
  // name match + first $ amount that isn't an enrollment fee.
  if (out.products.length === 0) {
    var fallbackPrice = 0;
    for (var fi = 0; fi < lines.length; fi++) {
      var fline = lines[fi];
      if (enrollmentRe.test(fline)) continue;
      var fm = fline.match(priceAnyRe);
      if (fm) {
        var fp = parseFloat(fm[1].replace(/,/g, ''));
        if (!isNaN(fp) && fp > 0) {
          fallbackPrice = fp;
          break;
        }
      }
    }
    if (fallbackPrice > 0) {
      var guessedName = '';
      if (typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
        var lower = raw.toLowerCase();
        for (var k = 0; k < POLICY_DOCS.length; k++) {
          var pdName =
            POLICY_DOCS[k] && POLICY_DOCS[k].name
              ? String(POLICY_DOCS[k].name)
              : '';
          if (!pdName) continue;
          if (lower.indexOf(pdName.toLowerCase()) !== -1) {
            if (pdName.length > guessedName.length) guessedName = pdName;
          }
        }
      }
      out.products.push({
        name: guessedName || 'Unknown Plan',
        price: fallbackPrice,
        policy: ''
      });
    }
  }

  return out;
}

// ── ADD / UPDATE / DELETE ───────────────────────────────────
// Reads the "Post-Date?" checkbox + date picker and returns
// either null (not post-dated) or the ISO bill date string.
// If post-date is checked but no date is picked or the date is
// in the past, returns a sentinel 'INVALID' so the caller can
// abort with an error message.
function _stReadPostDate() {
  var cb = document.getElementById('st-postdate-toggle');
  if (!cb || !cb.checked) return null;
  var picker = document.getElementById('st-postdate-date');
  if (!picker || !picker.value) return 'INVALID';
  var picked = _stIsoToDate(picker.value);
  var today = _stStartOfDay(new Date());
  if (!picked || picked.getTime() < today.getTime()) return 'INVALID';
  return picker.value;
}

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

  var billDate = _stReadPostDate();
  if (billDate === 'INVALID') {
    _stFlash('Pick a future bill date for the post-date.', 'error');
    return;
  }

  var receiptId =
    'rcpt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  var now = Date.now();

  if (billDate) {
    var pds = _stLoadPostDates();
    for (var pi = 0; pi < parsed.products.length; pi++) {
      var pp = parsed.products[pi];
      pds.push({
        id:
          'pd_' + now + '_' + pi + '_' + Math.random().toString(36).slice(2, 6),
        createdTs: now + pi,
        billDate: billDate,
        customer: parsed.customer,
        plan: pp.name || 'Unknown Plan',
        amount: pp.price,
        type: pi === 0 ? 'deal' : 'addon',
        raw: text,
        notes: pp.policy ? 'Policy: ' + pp.policy : '',
        receiptId: receiptId
      });
    }
    _stSavePostDates(pds);
  } else {
    var sales = _stLoadSales();
    for (var i = 0; i < parsed.products.length; i++) {
      var p = parsed.products[i];
      sales.push({
        id:
          'st_' + now + '_' + i + '_' + Math.random().toString(36).slice(2, 6),
        ts: now + i,
        customer: parsed.customer,
        plan: p.name || 'Unknown Plan',
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
  }

  input.value = '';
  _stResetPostDateInputs();
  var addonCount = parsed.products.length - 1;
  var label = billDate
    ? 'Post-dated ' + _stFormatBillDate(billDate) + ': '
    : '';
  var msg =
    label +
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

  var billDate = _stReadPostDate();
  if (billDate === 'INVALID') {
    _stFlash('Pick a future bill date for the post-date.', 'error');
    return;
  }

  if (billDate) {
    var pds = _stLoadPostDates();
    pds.push({
      id: 'pd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      createdTs: Date.now(),
      billDate: billDate,
      customer: parsed.customer,
      plan: first.name || 'Unknown Plan',
      amount: first.price,
      type: saleType === 'addon' ? 'addon' : 'deal',
      raw: text,
      notes: first.policy ? 'Policy: ' + first.policy : '',
      receiptId: ''
    });
    _stSavePostDates(pds);
  } else {
    var sales = _stLoadSales();
    sales.push({
      id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      ts: Date.now(),
      customer: parsed.customer,
      plan: first.name || 'Unknown Plan',
      amount: first.price,
      type: saleType === 'addon' ? 'addon' : 'deal',
      status: 'valid',
      raw: text,
      notes: first.policy ? 'Policy: ' + first.policy : '',
      receiptId: '',
      receiptTotal: parsed.receiptTotal
    });
    _stSaveSales(sales);
  }

  input.value = '';
  _stResetPostDateInputs();
  _stRender();
  var prefix = billDate
    ? 'Post-dated ' + _stFormatBillDate(billDate) + ': '
    : '';
  _stFlash(
    prefix + 'Added 1 ' + (saleType === 'addon' ? 'add-on' : 'deal') + '.',
    'ok'
  );
}

function _stResetPostDateInputs() {
  var cb = document.getElementById('st-postdate-toggle');
  var pk = document.getElementById('st-postdate-date');
  if (cb) cb.checked = false;
  if (pk) pk.value = '';
  var wrap = document.getElementById('st-postdate-date-wrap');
  if (wrap) wrap.style.display = 'none';
}

// Toggle handler for the Post-Date checkbox — shows/hides the
// date picker. Wired via inline onchange from _stBuildInput.
function _stTogglePostDate() {
  var cb = document.getElementById('st-postdate-toggle');
  var wrap = document.getElementById('st-postdate-date-wrap');
  if (!cb || !wrap) return;
  wrap.style.display = cb.checked ? 'inline-flex' : 'none';
  if (cb.checked) {
    var pk = document.getElementById('st-postdate-date');
    if (pk && !pk.value) pk.min = _stTodayIso();
  }
}

// Confirm a post-date: move it out of the postdates list and
// into the main sales list with ts set to the billing day (at
// 9am local so it sorts sensibly among the day's entries).
function _stConfirmPostDate(id) {
  var pds = _stLoadPostDates();
  var idx = -1;
  for (var i = 0; i < pds.length; i++) {
    if (pds[i].id === id) {
      idx = i;
      break;
    }
  }
  if (idx === -1) return;
  var pd = pds[idx];
  var billDateObj = _stIsoToDate(pd.billDate);
  var ts = billDateObj ? billDateObj.getTime() + 9 * 3600 * 1000 : Date.now();
  var sales = _stLoadSales();
  sales.push({
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    ts: ts,
    customer: pd.customer || '',
    plan: pd.plan || 'Unknown Plan',
    amount: Number(pd.amount) || 0,
    type: pd.type === 'addon' ? 'addon' : 'deal',
    status: 'valid',
    raw: pd.raw || '',
    notes: pd.notes || '',
    receiptId: pd.receiptId || '',
    receiptTotal: 0
  });
  _stSaveSales(sales);
  pds.splice(idx, 1);
  _stSavePostDates(pds);
  _stRender();
  _stFlash('Post-date confirmed and moved to sales.', 'ok');
}

function _stRemovePostDate(id) {
  if (
    !confirm('Permanently remove this post-dated sale? This cannot be undone.')
  ) {
    return;
  }
  var pds = _stLoadPostDates().filter(function (p) {
    return p.id !== id;
  });
  _stSavePostDates(pds);
  _stRender();
  _stFlash('Post-date removed.', 'ok');
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
  if (!confirm('Permanently delete this sale? This cannot be undone.')) {
    return;
  }
  var sales = _stLoadSales().filter(function (s) {
    return s.id !== id;
  });
  _stSaveSales(sales);
  _stRender();
  _stFlash('Sale deleted.', 'ok');
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
  // Day buckets: index 0=Mon, 1=Tue, …, 4=Fri, 5=Sat, 6=Sun
  var dayBuckets = [];
  for (var b = 0; b < 7; b++) {
    dayBuckets.push({ amount: 0, count: 0 });
  }
  var stats = {
    todayCount: 0,
    weekCount: 0,
    weekSales: 0,
    enrollments: 0,
    weekDeals: 0,
    weekAddons: 0,
    dayBuckets: dayBuckets
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
      // Bucket by day-of-week (Mon = 0)
      var dt = new Date(s.ts);
      var jsDay = dt.getDay(); // 0=Sun, 1=Mon, …
      var idx = jsDay === 0 ? 6 : jsDay - 1;
      dayBuckets[idx].amount += Number(s.amount) || 0;
      dayBuckets[idx].count += 1;
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

// Compact daily breakdown Monday → Friday. Shows day name,
// total $ sold, and the number of plans that day. Weekend
// columns (Sat/Sun) are hidden by default since the business
// week is Mon–Fri.
function _stBuildDailyBreakdown(stats) {
  var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  var html = '<div class="st-daily">';
  html += '<div class="st-daily-title">Daily Breakdown</div>';
  html += '<div class="st-daily-grid">';
  for (var i = 0; i < 5; i++) {
    var b = stats.dayBuckets[i] || { amount: 0, count: 0 };
    var hasSales = b.count > 0;
    html +=
      '<div class="st-day-card' +
      (hasSales ? ' has-sales' : '') +
      '">' +
      '<div class="st-day-name">' +
      dayNames[i] +
      '</div>' +
      '<div class="st-day-amount">$' +
      Math.round(b.amount).toLocaleString() +
      '</div>' +
      '<div class="st-day-count">' +
      b.count +
      (b.count === 1 ? ' plan' : ' plans') +
      '</div>' +
      '</div>';
  }
  html += '</div></div>';
  return html;
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
  var today = _stTodayIso();
  var html = '<div class="st-input-section">';
  html +=
    '<label class="st-input-label" for="st-receipt-input">Paste enrollment receipt</label>';
  html +=
    '<textarea id="st-receipt-input" class="st-textarea" rows="4" ' +
    'placeholder="Paste the full enrollment receipt here. The tracker will auto-detect the core plan and any add-ons, and log them all in one click."></textarea>';
  html += '<div id="st-flash" class="st-flash" style="opacity:0;"></div>';
  // Post-date row
  html += '<div class="st-postdate-row">';
  html +=
    '<label class="st-postdate-label">' +
    '<input type="checkbox" id="st-postdate-toggle" onchange="_stTogglePostDate()">' +
    '<span>Post-Date?</span>' +
    '</label>';
  html +=
    '<span id="st-postdate-date-wrap" class="st-postdate-date-wrap" style="display:none;">' +
    '<label for="st-postdate-date" class="st-postdate-date-label">Bill date:</label>' +
    '<input type="date" id="st-postdate-date" class="st-postdate-date" min="' +
    _stEscape(today) +
    '">' +
    '</span>';
  html += '</div>';
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

// Banner shown at the very top of the page when one or more
// post-dated sales are scheduled to bill today. Click Confirm
// to activate the sale; Remove to delete it.
function _stBuildPostDateBanner(pds) {
  var today = _stTodayIso();
  var due = pds.filter(function (p) {
    return p && p.billDate === today;
  });
  if (!due.length) return '';
  var html =
    '<div class="st-pd-banner"><div class="st-pd-banner-head">' +
    '<strong>You have ' +
    due.length +
    ' post-dated sale' +
    (due.length === 1 ? '' : 's') +
    ' billing today</strong>' +
    ' <span>— review and confirm or remove.</span>' +
    '</div>';
  html += '<div class="st-pd-banner-list">';
  for (var i = 0; i < due.length; i++) {
    var d = due[i];
    html +=
      '<div class="st-pd-banner-item">' +
      '<div class="st-pd-banner-info">' +
      '<span class="st-pd-banner-plan">' +
      _stEscape(d.plan || 'Unknown Plan') +
      '</span>' +
      ' <span class="st-pd-banner-amount">$' +
      (Math.round((Number(d.amount) || 0) * 100) / 100).toFixed(2) +
      '</span>' +
      '</div>' +
      '<div class="st-pd-banner-actions">' +
      '<button class="st-pd-confirm" onclick="_stConfirmPostDate(\'' +
      d.id +
      '\')">Confirm</button>' +
      '<button class="st-pd-remove" onclick="_stRemovePostDate(\'' +
      d.id +
      '\')">Remove</button>' +
      '</div>' +
      '</div>';
  }
  html += '</div></div>';
  return html;
}

// Pending Post-Dates section — shows all post-dates that are
// scheduled for today or a future date. Each row has confirm
// and remove buttons plus a POST-DATE badge.
function _stBuildPostDatesSection(pds) {
  if (!pds.length) return '';
  var sorted = pds.slice().sort(function (a, b) {
    return (a.billDate || '').localeCompare(b.billDate || '');
  });
  var html = '<div class="st-pd-section">';
  html +=
    '<div class="st-pd-title">Pending Post-Dates (' + sorted.length + ')</div>';
  html += '<div class="st-pd-list">';
  for (var i = 0; i < sorted.length; i++) {
    var p = sorted[i];
    var typeClass = p.type === 'addon' ? 'st-type-addon' : 'st-type-deal';
    var typeLabel = p.type === 'addon' ? 'Add-on' : 'Deal';
    html += '<div class="st-pd-row">';
    html += '<div class="st-pd-row-main">';
    html +=
      '<span class="st-pd-badge">POST-DATE</span>' +
      '<span class="st-pd-date">' +
      _stEscape(_stFormatBillDate(p.billDate)) +
      '</span>';
    html +=
      '<span class="st-pd-plan">' +
      _stEscape(p.plan || 'Unknown Plan') +
      '</span>';
    html +=
      '<span class="st-pd-amount">$' +
      (Math.round((Number(p.amount) || 0) * 100) / 100).toFixed(2) +
      '</span>';
    html += '<span class="' + typeClass + '">' + typeLabel + '</span>';
    if (p.customer) {
      html +=
        '<span class="st-pd-customer">' + _stEscape(p.customer) + '</span>';
    }
    html += '</div>';
    html += '<div class="st-pd-row-actions">';
    html +=
      '<button class="st-pd-confirm" onclick="_stConfirmPostDate(\'' +
      p.id +
      '\')">Confirm</button>';
    html +=
      '<button class="st-pd-remove" onclick="_stRemovePostDate(\'' +
      p.id +
      '\')" title="Remove permanently">Remove</button>';
    html += '</div>';
    html += '</div>';
  }
  html += '</div></div>';
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
    html += '<td>' + _stEscape(s.plan || 'Unknown Plan') + '</td>';
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
      '<td><button class="st-delete" title="Delete permanently" aria-label="Delete permanently" onclick="_stDeleteSale(\'' +
      s.id +
      '\')">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="3 6 5 6 21 6"/>' +
      '<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>' +
      '<path d="M10 11v6"/><path d="M14 11v6"/>' +
      '<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>' +
      '</svg>' +
      '</button></td>';
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
  var postdates = _stLoadPostDates();
  var stats = _stCalcStats(sales);

  var html = '';
  // Welcome greeting at the very top so it's visible immediately
  html += _stBuildWelcome();
  // Alert banner for any post-dates billing today (above page header)
  html += _stBuildPostDateBanner(postdates);
  html +=
    '<div class="ph"><div class="pt">Sales <span>Tracker</span></div>' +
    '<div class="pd">Log enrollments, watch your weekly bonus progress, and see your numbers at a glance. Everything stays on your account.</div></div>';
  html += _stBuildStats(stats);
  html += _stBuildDailyBreakdown(stats);
  html += _stBuildBonus(stats);
  html += _stBuildInput();
  html += _stBuildTable(sales);
  html += _stBuildPostDatesSection(postdates);
  // Spacer so the floating bottom toolbar never covers the last row
  html += '<div class="st-bottom-spacer" aria-hidden="true"></div>';

  page.innerHTML = html;
}
