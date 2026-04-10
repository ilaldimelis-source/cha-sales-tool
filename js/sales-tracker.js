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

// ── PLAN NAME RECOGNITION ───────────────────────────────────
// Comprehensive list of all core plans + add-ons CHA sells.
// Used by the receipt parser for case-insensitive substring
// matching, longest match wins. If no entry matches, the parser
// keeps the raw product name from the receipt instead of
// falling back to "Unknown Plan".
var CHA_CORE_PLAN_NAMES = [
  'MedFirst 1', 'MedFirst 2', 'MedFirst 3', 'MedFirst 4', 'MedFirst 5',
  'TrueHealth 1', 'TrueHealth 2', 'TrueHealth 3',
  'Good Health Distribution Partner 1', 'Good Health Distribution Partner 2',
  'Good Health Distribution Partner 3', 'Good Health Distribution Partner 4',
  'Good Health Distribution Partner 5',
  'SmartChoice 1500', 'SmartChoice 2500', 'SmartChoice 3000', 'SmartChoice 3500',
  'TDK 1', 'TDK 2', 'TDK 3', 'TDK 4', 'TDK 5',
  'Pinnacle STM',
  'Access Health Traditional STM', 'Access Health Lite STM',
  'Smart Health STM Traditional', 'Smart Health STM Limited',
  'Galena STM Elite', 'Galena STM Standard', 'Galena STM Economy',
  'Allstate Enhanced STM PPO', 'Allstate Copay Enhanced STM PPO',
  'Allstate Essentials STM PPO', 'Allstate Health Access',
  'Harmony Care Plus 100', 'Harmony Care Plus 200', 'Harmony Care Plus 300',
  'Harmony Care Plus 500', 'Harmony Care Plus 750', 'Harmony Care Plus 1000',
  'Harmony Care 100', 'Harmony Care 200', 'Harmony Care 300',
  'Harmony Care 500', 'Harmony Care 750', 'Harmony Care 1000',
  'Sigma Care Plus 100', 'Sigma Care Plus 200', 'Sigma Care Plus 300',
  'Sigma Care Plus 500', 'Sigma Care Plus 750', 'Sigma Care Plus 1000',
  'Health Choice Silver', 'Everest Summit',
  'Pinnacle Protect Plan 1', 'Pinnacle Protect Plan 2',
  'Pinnacle Protect Plan 3', 'Pinnacle Protect Plan 4',
  'BWA Americare Plan 2', 'BWA Americare Plan 3', 'BWA Americare Plan 4',
  'BWA Paramount',
  'MyChoice Plan Low', 'MyChoice Plan Mid', 'MyChoice Plan High'
];

var CHA_ADDON_PLAN_NAMES = [
  'AWA Safeguard ADD/AME/CI',
  'AWA Safe Guard Accident Hospital Plan $5000/$500',
  'AWA Safe Guard Accident Hospital Plan $5000/$1000',
  'AWA Safe Guard 100',
  'NCE WellGuard AD&D $100,000', 'NCE WellGuard AD&D $250,000',
  'NCE Fusion Dental Plan A', 'NCE Fusion Dental Plan B',
  'New York Life $50,000 Term Life',
  'Pinnacle Critical Care Plan 1', 'Pinnacle Critical Care Plan 2',
  'Pinnacle Critical Care Plan 3', 'Pinnacle Critical Care Plan 4',
  'Allstate Hospital Expense', 'Allstate Plan Enhancer',
  'Allstate Dental PPO', 'Allstate Cancer and Heart Stroke',
  'Prime Health Pass Discount', 'MDLive',
  'GapSupport Discount', 'AssistPro Discount',
  'Compass VAB Add-on', 'Compass Telemed Add-on',
  'GHDP Dental 1500 Add-on', 'GHDP Dental 3000 Add-on', 'GHDP Dental 5000 Add-on',
  'GHDP Dental-Vision 1500 Add-on', 'GHDP Dental-Vision 3000 Add-on',
  'GHDP Dental-Vision 5000 Add-on',
  'Ameritas Schedule Plan Add-on', 'Ameritas Coinsurance Plan Add-on',
  'Health Essential Care DVH Plus Add-on',
  'AME $500 Add-on', 'AME $1000 Add-on',
  'AD&D $50k Add-on', 'AD&D $100K Add-on', 'AD&D $125K Add-on',
  'AD&D $175K Add-on', 'AD&D $200K Add-on', 'AD&D $250K Add-on',
  'American Financial Critical Illness $2500 Add-on',
  'American Financial Critical Illness $5000 Add-on',
  'American Financial Critical Illness $7500 Add-on',
  'American Financial Critical Illness $10000 Add-on'
];

// Full list sorted by length descending so longest-match-wins
// naturally when iterating. Built once at module load.
var CHA_ALL_PLAN_NAMES = CHA_CORE_PLAN_NAMES.concat(CHA_ADDON_PLAN_NAMES)
  .slice()
  .sort(function (a, b) { return b.length - a.length; });

// Case-insensitive substring match, longest wins. If nothing
// matches, returns '' so the caller can keep the raw receipt
// name.
function _stMatchPlanName(rawText) {
  if (!rawText) return '';
  var hay = String(rawText).toLowerCase();
  for (var i = 0; i < CHA_ALL_PLAN_NAMES.length; i++) {
    var candidate = CHA_ALL_PLAN_NAMES[i];
    if (hay.indexOf(candidate.toLowerCase()) !== -1) {
      return candidate;
    }
  }
  return '';
}

// ── COMMISSION RATE CONFIG ──────────────────────────────────
// Plan commission is a stepped % based on the base plan's
// monthly premium. Add-on commission is a % based on the
// add-on category (detected from the plan name).
//
// Defaults live here. Agents can override both the plan tier
// % and the add-on category % per-deal via the inline edit
// button; overrides are stored on the sale object itself
// (commissionRate / addonCommissionRate). Global defaults can
// also be edited and are stored in localStorage under
// cha_commission_rates.
var CHA_DEFAULT_COMMISSION_RATES = {
  planTiers: [
    { min: 0,   max: 299.99, rate: 0.30 },
    { min: 300, max: 499.99, rate: 0.35 },
    { min: 500, max: Infinity, rate: 0.40 }
  ],
  addonTypes: {
    standard: 0.25,
    dvh: 0.35,        // dental / vision / health bundle
    accident: 0.70,   // accident / AD&D / AME
    rx: 0.20,         // prescription discount
    gap: 0.60         // GAP products
  },
  enrollmentBonus: 20 // dollars per $125 enrollment
};

function _stLoadCommissionRates() {
  try {
    var raw = _stGet(_stKey('cha_commission_rates'));
    if (!raw) return _stCloneRates(CHA_DEFAULT_COMMISSION_RATES);
    var parsed = JSON.parse(raw);
    // Shallow merge in case new keys were added
    var base = _stCloneRates(CHA_DEFAULT_COMMISSION_RATES);
    if (parsed && parsed.planTiers) base.planTiers = parsed.planTiers;
    if (parsed && parsed.addonTypes) {
      for (var k in parsed.addonTypes) {
        if (parsed.addonTypes.hasOwnProperty(k)) {
          base.addonTypes[k] = parsed.addonTypes[k];
        }
      }
    }
    if (parsed && typeof parsed.enrollmentBonus === 'number') {
      base.enrollmentBonus = parsed.enrollmentBonus;
    }
    return base;
  } catch (_e) {
    return _stCloneRates(CHA_DEFAULT_COMMISSION_RATES);
  }
}

function _stSaveCommissionRates(rates) {
  _stSet(_stKey('cha_commission_rates'), JSON.stringify(rates || {}));
}

function _stResetCommissionRates() {
  try { localStorage.removeItem(_stKey('cha_commission_rates')); } catch (_e) {}
}

function _stCloneRates(r) {
  return {
    planTiers: r.planTiers.slice().map(function (t) {
      return { min: t.min, max: t.max, rate: t.rate };
    }),
    addonTypes: {
      standard: r.addonTypes.standard,
      dvh: r.addonTypes.dvh,
      accident: r.addonTypes.accident,
      rx: r.addonTypes.rx,
      gap: r.addonTypes.gap
    },
    enrollmentBonus: r.enrollmentBonus
  };
}

// Classify an add-on plan name into one of the 5 commission
// categories. Falls back to 'standard' if nothing matches.
function _stClassifyAddon(name) {
  if (!name) return 'standard';
  var n = String(name).toLowerCase();
  // Rx / prescription discounts
  if (/\b(rx|prescription|prime health pass|assistpro|mdlive|telemed)\b/.test(n)) {
    return 'rx';
  }
  // GAP support products
  if (/\bgap(support)?\b/.test(n)) return 'gap';
  // Dental / Vision / Health bundles
  if (/\b(dental|vision|dvh|dental-vision|ameritas)\b/.test(n)) return 'dvh';
  // Accident / AD&D / AME
  if (/\b(accident|ad&?d|ad and d|ame|critical illness|critical care|hospital expense|cancer)\b/.test(n)) {
    return 'accident';
  }
  return 'standard';
}

// Given a plan monthly amount, return the matching tier rate.
function _stPlanTierRate(amount, rates) {
  var amt = Number(amount) || 0;
  var tiers = (rates && rates.planTiers) || CHA_DEFAULT_COMMISSION_RATES.planTiers;
  for (var i = 0; i < tiers.length; i++) {
    if (amt >= tiers[i].min && amt <= tiers[i].max) return tiers[i].rate;
  }
  return tiers[tiers.length - 1].rate;
}

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
    agent: '',
    memberId: '',
    saleDate: null
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

  // ── Confirmation-line date + member ID ───────────────────
  // Matches the header line format:
  //   "April 9, 2026 at 8:04 PM - 686931541 - Ravi Choudhry"
  // Captures the month name, day, year, and the 9-digit member
  // number that sits between the first and second dash.
  var confHeaderRe =
    /([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+at\s+\d{1,2}:\d{2}\s*(?:am|pm)?\s*-\s*(\d{9})\s*-/i;
  var confMatch = raw.match(confHeaderRe);
  if (confMatch) {
    var monthMap = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
      jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6,
      aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
    };
    var mKey = String(confMatch[1]).toLowerCase();
    var mIdx = monthMap[mKey];
    var dNum = parseInt(confMatch[2], 10);
    var yNum = parseInt(confMatch[3], 10);
    if (typeof mIdx === 'number' && !isNaN(dNum) && !isNaN(yNum)) {
      out.saleDate = new Date(yNum, mIdx, dNum, 9, 0, 0, 0);
    }
    // The 9-digit number from the confirmation line takes
    // precedence over any "Member ID:" field found below —
    // this is the receipt's canonical member number.
    out.memberId = confMatch[4];
  }

  // ── Customer name (if any explicit field) ─────────────────
  var custMatch = raw.match(
    /(?:customer|client|insured|name)\s*[:-]\s*([^\n\r]+)/i
  );
  if (custMatch) out.customer = custMatch[1].trim().substring(0, 80);

  // ── Member ID (captured separately from customer name) ───
  // Accepts "Member ID:", "Member #", "Member:", "MemberID",
  // "Member Number" — alphanumeric + dashes, 4+ chars.
  // Only use this fallback if the confirmation header above
  // didn't already supply a 9-digit member number.
  if (!out.memberId) {
    var memberIdMatch = raw.match(
      /member(?:\s*(?:id|#|number|no\.?))?\s*[:#\-]?\s*([A-Z0-9][A-Z0-9\-]{3,})/i
    );
    if (memberIdMatch) {
      var midCandidate = memberIdMatch[1].trim();
      // Avoid grabbing plain words
      if (/[0-9]/.test(midCandidate)) {
        out.memberId = midCandidate.substring(0, 40);
      }
    }
  }

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
    /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)[^$\n]{0,60}?(?:per\s*month|\/\s*mo\b|monthly|a\s+month|\bmo\b)/i;
  var skipLineRe =
    /^(?:central health|confirmation|products?|summary|total|policy|active|effective|starts?|member\s+\d|payment|plan\s+type|type\b|address|phone|email|date|status|enrollment|one[-\s]?time)/i;
  var policyRe = /policy\s*(?:number|#|:)?\s*[:-]?\s*([A-Z0-9-]{4,})/i;

  // ── BLOCK-BASED PARSE (primary) ───────────────────────────
  // Identify product "blocks" by scanning for lines that
  // contain a known CHA plan name (longest-match substring).
  // Each such line opens a block; the block owns every line
  // from its opener up to (but not including) the next
  // opener. Within each block, the FIRST $X-per-month line
  // is that block's monthly premium — and ONLY that block's.
  //
  // This fixes the old line-based approach where the parser
  // could walk backward from one price to a neighbouring
  // product's name and end up assigning the wrong dollar
  // amount to the wrong plan (e.g. the add-on's $35 being
  // attached to the core plan when both products shared a
  // single-line "Name — $Amount per Month" format).
  var blockStarts = [];
  for (var bs = 0; bs < lines.length; bs++) {
    var bsLine = lines[bs];
    if (!bsLine || !bsLine.trim()) continue;
    // Never open a block on an enrollment-fee line
    if (enrollmentRe.test(bsLine)) continue;
    var bsMatch = _stMatchPlanName(bsLine);
    if (bsMatch) {
      // Dedup consecutive duplicates (same plan name mentioned
      // twice in neighbouring lines, e.g. a header row plus
      // a details row).
      var lastBs = blockStarts[blockStarts.length - 1];
      if (lastBs && lastBs.matched === bsMatch && bs - lastBs.lineIdx <= 1) {
        continue;
      }
      blockStarts.push({ lineIdx: bs, matched: bsMatch, rawLine: bsLine });
    }
  }

  if (blockStarts.length > 0) {
    for (var bb = 0; bb < blockStarts.length; bb++) {
      var blkStart = blockStarts[bb].lineIdx;
      var blkEnd =
        bb + 1 < blockStarts.length ? blockStarts[bb + 1].lineIdx : lines.length;
      var blkPrice = 0;
      var blkPolicy = '';
      // Scan every line inside the block's range — INCLUDING
      // the opener line, because the opener may itself carry
      // the "$X per Month" figure inline.
      for (var bl = blkStart; bl < blkEnd; bl++) {
        var blLine = lines[bl];
        if (!blLine) continue;
        // Enrollment lines never contribute to a block price
        if (enrollmentRe.test(blLine)) continue;
        if (!blkPrice) {
          var bpm = blLine.match(priceRe);
          if (bpm) {
            var bpp = parseFloat(bpm[1].replace(/,/g, ''));
            if (!isNaN(bpp) && bpp > 0) blkPrice = bpp;
          }
        }
        if (!blkPolicy) {
          var bpol = blLine.match(policyRe);
          if (bpol) blkPolicy = bpol[1];
        }
      }
      if (blkPrice <= 0) continue; // block had no monthly amount — skip
      // Dedup: same canonical plan + same price already in list
      var bdup = false;
      for (var bdi = 0; bdi < out.products.length; bdi++) {
        if (
          out.products[bdi].name === blockStarts[bb].matched &&
          Math.abs(out.products[bdi].price - blkPrice) < 0.01
        ) {
          bdup = true;
          break;
        }
      }
      if (bdup) continue;
      out.products.push({
        name: blockStarts[bb].matched,
        price: blkPrice,
        policy: blkPolicy
      });
    }
  }

  // ── LINE-BASED PARSE (fallback) ───────────────────────────
  // Only runs when the block-based pass found nothing. Keeps
  // backward compatibility with receipts whose product names
  // are not in CHA_ALL_PLAN_NAMES (e.g. brand-new plans not
  // yet added to the registry). Same scan logic as before.
  {
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

      // Plan name recognition: run the raw receipt name through
      // the CHA plan list. If a known plan matches (longest wins),
      // use the canonical name. Otherwise keep the raw receipt
      // name — we NEVER fall back to "Unknown Plan" here.
      var matched = _stMatchPlanName(name);
      var finalName = matched || name.substring(0, 120);

      // De-dup: skip if this exact name+price combo already added
      var dup = false;
      for (var di = 0; di < out.products.length; di++) {
        if (
          out.products[di].name === finalName &&
          Math.abs(out.products[di].price - price) < 0.01
        ) {
          dup = true;
          break;
        }
      }
      if (dup) continue;

      out.products.push({
        name: finalName,
        price: price,
        policy: policy
      });
    }
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
      // Prefer the CHA plan list match. If nothing matches, try
      // POLICY_DOCS as a secondary source. If still nothing, use
      // the first meaningful line from the receipt as the raw
      // product name instead of "Unknown Plan".
      var guessedName = _stMatchPlanName(raw);
      if (!guessedName && typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
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
      if (!guessedName) {
        // Last resort: first non-metadata, non-empty line of the
        // receipt becomes the raw product name.
        for (var fl = 0; fl < lines.length; fl++) {
          var flRaw = lines[fl].trim();
          if (!flRaw) continue;
          if (skipLineRe.test(flRaw)) continue;
          if (/^\$/.test(flRaw)) continue;
          if (enrollmentRe.test(flRaw)) continue;
          guessedName = flRaw.substring(0, 120);
          break;
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

// ── COMMISSION COMPUTATION ──────────────────────────────────
// Given a single sale (deal or addon) and current rate config,
// returns the commission dollar amount for that individual
// line. Respects per-deal overrides stored on the sale as
// `commissionRate` (for deals) or `addonCommissionRate` (for
// add-ons). Status is applied:
//   - 'cancel'     → 0
//   - 'chargeback' → negated
function _stComputeLineCommission(sale, rates) {
  if (!sale) return 0;
  var amt = Number(sale.amount) || 0;
  var rate;
  if (sale.type === 'addon') {
    if (typeof sale.addonCommissionRate === 'number') {
      rate = sale.addonCommissionRate;
    } else {
      var cat = _stClassifyAddon(sale.plan);
      rate = rates.addonTypes[cat];
      if (typeof rate !== 'number') rate = rates.addonTypes.standard;
    }
  } else {
    rate = typeof sale.commissionRate === 'number'
      ? sale.commissionRate
      : _stPlanTierRate(amt, rates);
  }
  var commission = amt * rate;
  if (sale.status === 'cancel') return 0;
  if (sale.status === 'chargeback') return -Math.abs(commission);
  return commission;
}

// Recompute and stamp all commission fields on a DEAL sale
// object in place. Addons get their own line commission but
// we roll the total up onto the parent deal (same receiptId).
// Called at insert time and again whenever a sale's status or
// override rate changes, so the stored fields stay accurate.
function _stStampDealCommission(sales, dealIdx, rates) {
  var deal = sales[dealIdx];
  if (!deal) return;
  if (deal.type !== 'deal') return;
  var amt = Number(deal.amount) || 0;
  var rate = typeof deal.commissionRate === 'number'
    ? deal.commissionRate
    : _stPlanTierRate(amt, rates);
  deal.planCommissionRate = rate;
  var planCommission = amt * rate;
  if (deal.status === 'cancel') planCommission = 0;
  else if (deal.status === 'chargeback') planCommission = -Math.abs(planCommission);
  deal.planCommission = planCommission;

  // Sum add-on commissions that belong to this receipt.
  var totalAddon = 0;
  if (deal.receiptId) {
    for (var i = 0; i < sales.length; i++) {
      var s = sales[i];
      if (!s || s.type !== 'addon') continue;
      if (s.receiptId !== deal.receiptId) continue;
      totalAddon += _stComputeLineCommission(s, rates);
      // Also stamp the add-on so its own fields stay in sync
      s.addonCommissionRate = typeof s.addonCommissionRate === 'number'
        ? s.addonCommissionRate
        : (rates.addonTypes[_stClassifyAddon(s.plan)] || rates.addonTypes.standard);
      var acR = s.addonCommissionRate;
      var acAmt = (Number(s.amount) || 0) * acR;
      if (s.status === 'cancel') acAmt = 0;
      else if (s.status === 'chargeback') acAmt = -Math.abs(acAmt);
      s.addonCommission = acAmt;
    }
  }
  deal.totalAddonCommission = totalAddon;

  // Enrollment bonus: only paid when enrollmentFee is exactly $125
  var bonus = 0;
  if (Number(deal.enrollmentFee) === 125) bonus = rates.enrollmentBonus;
  if (deal.status === 'cancel') bonus = 0;
  else if (deal.status === 'chargeback') bonus = -Math.abs(bonus);
  deal.enrollmentBonus = bonus;

  // Expected total = plan + add-ons + bonus (with status logic already applied)
  var expected = planCommission + totalAddon + bonus;
  if (deal.status === 'cancel') expected = 0;
  deal.expectedDealTotal = expected;

  // Preserve any existing audit fields; initialize if missing
  if (typeof deal.payrollNetPaid !== 'number') deal.payrollNetPaid = 0;
  if (typeof deal.auditStatus !== 'number') deal.auditStatus = 0;
  if (!Array.isArray(deal.errorFlags)) deal.errorFlags = [];

  // Auto-flag common audit issues on the deal itself
  var flags = [];
  if (!deal.memberId) flags.push('missing_member_id');
  if (deal.status !== 'cancel' && deal.status !== 'chargeback') {
    if (Number(deal.enrollmentFee) === 125 && bonus === 0) {
      flags.push('missing_enrollment_bonus');
    }
  }
  deal.errorFlags = flags;
}

// Recompute commission for EVERY deal in the sales array in
// place. Used after a rate-config change so every row reflects
// the new defaults immediately.
function _stRestampAllCommissions(sales) {
  var rates = _stLoadCommissionRates();
  for (var i = 0; i < sales.length; i++) {
    if (sales[i] && sales[i].type === 'deal') {
      _stStampDealCommission(sales, i, rates);
    }
  }
}

// ── ADD / UPDATE / DELETE ───────────────────────────────────
// Reads the "Post-Date?" checkbox + date picker and returns
// either null (not post-dated) or the ISO bill date string.
// If post-date is checked but no date is picked or the date is
// in the past, returns a sentinel 'INVALID' so the caller can
// abort with an error message.
function _stReadPostDate() {
  if (_stGetSaleMode() !== 'post') return null;
  var picker = document.getElementById('st-postdate-billing');
  if (!picker || !picker.value) return 'INVALID';
  var picked = _stIsoToDate(picker.value);
  var today = _stStartOfDay(new Date());
  if (!picked || picked.getTime() < today.getTime()) return 'INVALID';
  return picker.value;
}

// Reads the "Date Sold" field and returns a timestamp at 9am
// local time on that calendar day. Falls back to Date.now() if
// the field is missing or empty.
function _stReadDateSoldTs() {
  var f = document.getElementById('st-date-sold');
  if (!f || !f.value) return Date.now();
  var d = _stIsoToDate(f.value);
  if (!d) return Date.now();
  d.setHours(9, 0, 0, 0);
  return d.getTime();
}

// Current value of the Same-Day vs Post-Date toggle.
function _stGetSaleMode() {
  var el = document.getElementById('st-sale-mode');
  return el && el.value === 'post' ? 'post' : 'same';
}

// Splits a blob of pasted text into individual receipt chunks.
// A new receipt starts when either:
//   (a) a line contains "Confirmation" and that same line OR the
//       next line has a "Month DD, YYYY" style date pattern, OR
//   (b) a line is exactly "Member" and the next line begins
//       with "ID:" — a common two-line header layout.
// The first chunk always starts at line 0; each subsequent
// boundary closes the previous chunk and opens a new one.
// Returns an array of trimmed receipt strings.
function _stSplitReceipts(text) {
  if (!text) return [];
  var raw = String(text).replace(/\r\n/g, '\n');
  var lines = raw.split('\n');
  var monthRe =
    /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\b\s+\d{1,2},?\s+\d{4}/i;
  var confRe = /\bconfirmation\b/i;
  var starts = [0];
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    var next = i + 1 < lines.length ? lines[i + 1] : '';
    var isConfStart =
      confRe.test(line) && (monthRe.test(line) || monthRe.test(next));
    var isMemberStart =
      /^\s*member\s*$/i.test(line) && /^\s*id\s*:/i.test(next);
    if (isConfStart || isMemberStart) {
      if (starts[starts.length - 1] !== i) starts.push(i);
    }
  }
  var chunks = [];
  for (var j = 0; j < starts.length; j++) {
    var s = starts[j];
    var e = j + 1 < starts.length ? starts[j + 1] : lines.length;
    var chunk = lines.slice(s, e).join('\n').trim();
    if (chunk) chunks.push(chunk);
  }
  if (!chunks.length) {
    var whole = raw.trim();
    if (whole) chunks.push(whole);
  }
  return chunks;
}

// Primary action: parse the pasted text (which may contain ONE
// or MANY receipts), split it into per-receipt chunks, and
// insert one deal + N add-ons per chunk. All chunks share the
// same selected Sale Mode (Same-Day / Post-Date) and, for
// post-date mode, the same bill date.
function _stAutoDetectAndAdd() {
  var input = document.getElementById('st-receipt-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) {
    _stFlash('Paste a receipt first.', 'error');
    return;
  }

  var billDate = _stReadPostDate();
  if (billDate === 'INVALID') {
    _stFlash('Pick a future bill date for the post-date.', 'error');
    return;
  }

  // Split the pasted blob into individual receipts and parse
  // each one independently. Chunks with zero products are
  // dropped silently (e.g. noise or a trailing footer).
  var chunks = _stSplitReceipts(text);
  var parsedChunks = [];
  for (var ci = 0; ci < chunks.length; ci++) {
    var chunk = chunks[ci];
    var pc = _stParseReceipt(chunk);
    if (!pc || !pc.products.length) continue;
    parsedChunks.push({ parsed: pc, raw: chunk });
  }
  if (!parsedChunks.length) {
    _stFlash(
      'Could not find any products in that receipt. Try "Add as Deal" instead.',
      'error'
    );
    return;
  }

  // Fallback ts (used only when a chunk has no parseable sale
  // date): the agent-selected Date Sold field at 9am local.
  var fallbackTs = _stReadDateSoldTs();

  var totalDeals = 0;
  var totalAddons = 0;
  var receiptsProcessed = parsedChunks.length;

  if (billDate) {
    // Post-date flow: every chunk lands in the Pending
    // Post-Dates list with the shared billDate.
    var pds = _stLoadPostDates();
    for (var rc = 0; rc < parsedChunks.length; rc++) {
      var parsedA = parsedChunks[rc].parsed;
      var rawA = parsedChunks[rc].raw;
      var rcptIdA =
        'rcpt_' +
        Date.now() +
        '_' +
        rc +
        '_' +
        Math.random().toString(36).slice(2, 6);
      var baseTsA = Date.now() + rc * 1000;
      for (var pi = 0; pi < parsedA.products.length; pi++) {
        var pp = parsedA.products[pi];
        pds.push({
          id:
            'pd_' +
            baseTsA +
            '_' +
            pi +
            '_' +
            Math.random().toString(36).slice(2, 6),
          createdTs: baseTsA + pi,
          billDate: billDate,
          customer: parsedA.customer,
          plan: pp.name || 'Unknown Plan',
          amount: pp.price,
          type: pi === 0 ? 'deal' : 'addon',
          raw: rawA,
          notes: pp.policy ? 'Policy: ' + pp.policy : '',
          receiptId: rcptIdA
        });
        if (pi === 0) totalDeals++;
        else totalAddons++;
      }
    }
    _stSavePostDates(pds);
  } else {
    // Same-Day flow: every chunk lands directly in sales with
    // its own per-receipt ts (parsed saleDate, or fallback).
    var sales = _stLoadSales();
    var newDealIdxs = [];
    for (var rc2 = 0; rc2 < parsedChunks.length; rc2++) {
      var parsedB = parsedChunks[rc2].parsed;
      var rawB = parsedChunks[rc2].raw;
      var rcptIdB =
        'rcpt_' +
        Date.now() +
        '_' +
        rc2 +
        '_' +
        Math.random().toString(36).slice(2, 6);
      // Prefer the receipt's own saleDate at 9am local. If the
      // parser couldn't find one, fall back to the Date Sold
      // field with a small per-receipt offset so sort order
      // stays stable within the batch.
      var rcTs;
      if (parsedB.saleDate && parsedB.saleDate instanceof Date) {
        var sd = parsedB.saleDate;
        var sdLocal = new Date(
          sd.getFullYear(),
          sd.getMonth(),
          sd.getDate(),
          9,
          0,
          0,
          0
        );
        rcTs = sdLocal.getTime();
      } else {
        rcTs = fallbackTs + rc2 * 60000;
      }
      for (var pj = 0; pj < parsedB.products.length; pj++) {
        var pp2 = parsedB.products[pj];
        var isDeal2 = pj === 0;
        sales.push({
          id:
            'st_' +
            rcTs +
            '_' +
            rc2 +
            '_' +
            pj +
            '_' +
            Math.random().toString(36).slice(2, 6),
          ts: rcTs + pj,
          customer: parsedB.customer,
          memberId: parsedB.memberId || '',
          plan: pp2.name || 'Unknown Plan',
          amount: pp2.price,
          type: isDeal2 ? 'deal' : 'addon',
          status: 'valid',
          raw: rawB,
          notes: pp2.policy ? 'Policy: ' + pp2.policy : '',
          receiptId: rcptIdB,
          receiptTotal: parsedB.receiptTotal,
          // Store the receipt-level enrollment fee on the DEAL
          // only so the $125 enrollment counter never
          // double-counts.
          enrollmentFee: isDeal2 ? parsedB.enrollmentFee || 0 : 0
        });
        if (isDeal2) {
          newDealIdxs.push(sales.length - 1);
          totalDeals++;
        } else {
          totalAddons++;
        }
      }
    }
    // Stamp commission fields on every new deal (each one
    // rolls up its own add-ons via receiptId).
    if (newDealIdxs.length) {
      var rates = _stLoadCommissionRates();
      for (var di = 0; di < newDealIdxs.length; di++) {
        _stStampDealCommission(sales, newDealIdxs[di], rates);
      }
    }
    _stSaveSales(sales);
  }

  input.value = '';
  _stResetPostDateInputs();
  var label = billDate
    ? 'Post-dated ' + _stFormatBillDate(billDate) + ': '
    : '';
  var msg =
    label +
    'Added ' +
    totalDeals +
    ' deal' +
    (totalDeals === 1 ? '' : 's');
  if (totalAddons > 0) {
    msg +=
      ' + ' + totalAddons + ' add-on' + (totalAddons === 1 ? '' : 's');
  }
  msg +=
    ' from ' +
    receiptsProcessed +
    ' receipt' +
    (receiptsProcessed === 1 ? '' : 's') +
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
    var isDealManual = saleType !== 'addon';
    var dateSoldTs = _stReadDateSoldTs();
    sales.push({
      id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      ts: dateSoldTs,
      customer: parsed.customer,
      memberId: parsed.memberId || '',
      plan: first.name || 'Unknown Plan',
      amount: first.price,
      type: isDealManual ? 'deal' : 'addon',
      status: 'valid',
      raw: text,
      notes: first.policy ? 'Policy: ' + first.policy : '',
      receiptId: '',
      receiptTotal: parsed.receiptTotal,
      enrollmentFee: isDealManual ? (parsed.enrollmentFee || 0) : 0
    });
    if (isDealManual) {
      _stStampDealCommission(sales, sales.length - 1, _stLoadCommissionRates());
    }
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
  _stSetSaleMode('same');
  var billing = document.getElementById('st-postdate-billing');
  if (billing) billing.value = '';
  var sold = document.getElementById('st-date-sold');
  if (sold) sold.value = _stTodayIso();
}

// Switches the sale timing mode between Same-Day and Post-Date.
// Updates the hidden mode input, button highlight classes, and
// shows/hides the Post-Date Billing field.
function _stSetSaleMode(mode) {
  var target = mode === 'post' ? 'post' : 'same';
  var hidden = document.getElementById('st-sale-mode');
  if (hidden) hidden.value = target;
  var sameBtn = document.getElementById('st-mode-same');
  var postBtn = document.getElementById('st-mode-post');
  if (sameBtn) {
    sameBtn.className =
      'st-mode-btn' + (target === 'same' ? ' st-mode-active' : '');
  }
  if (postBtn) {
    postBtn.className =
      'st-mode-btn' + (target === 'post' ? ' st-mode-active' : '');
  }
  var pdWrap = document.getElementById('st-postdate-billing-wrap');
  if (pdWrap) pdWrap.style.display = target === 'post' ? 'block' : 'none';
}

// oninput handler on the receipt textarea — re-parses on every
// keystroke (cheap on short receipts) and, if the parser finds
// a confirmation-line date, auto-fills the "Date Sold" field.
// The agent can still manually override it afterwards.
function _stReceiptInputChanged() {
  var input = document.getElementById('st-receipt-input');
  if (!input || !input.value) return;
  var parsed = _stParseReceipt(input.value);
  if (!parsed || !parsed.saleDate) return;
  var f = document.getElementById('st-date-sold');
  if (!f) return;
  var sd = parsed.saleDate;
  var yy = sd.getFullYear();
  var mm = String(sd.getMonth() + 1);
  if (mm.length < 2) mm = '0' + mm;
  var dd = String(sd.getDate());
  if (dd.length < 2) dd = '0' + dd;
  f.value = yy + '-' + mm + '-' + dd;
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
  var isDealPd = pd.type !== 'addon';
  sales.push({
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    ts: ts,
    customer: pd.customer || '',
    memberId: pd.memberId || '',
    plan: pd.plan || 'Unknown Plan',
    amount: Number(pd.amount) || 0,
    type: isDealPd ? 'deal' : 'addon',
    status: 'valid',
    raw: pd.raw || '',
    notes: pd.notes || '',
    receiptId: pd.receiptId || '',
    receiptTotal: 0,
    enrollmentFee: isDealPd ? (Number(pd.enrollmentFee) || 0) : 0
  });
  if (isDealPd) {
    _stStampDealCommission(sales, sales.length - 1, _stLoadCommissionRates());
  }
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
      // Recompute commission for the affected deal (or the
      // deal parent if this is an add-on) so expectedDealTotal
      // reflects the new status.
      var rates = _stLoadCommissionRates();
      var affected = sales[i];
      if (affected.type === 'deal') {
        _stStampDealCommission(sales, i, rates);
      } else if (affected.receiptId) {
        for (var di = 0; di < sales.length; di++) {
          if (sales[di].type === 'deal' && sales[di].receiptId === affected.receiptId) {
            _stStampDealCommission(sales, di, rates);
            break;
          }
        }
      }
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
  var weekStartDate = _stStartOfWeek(now);
  var weekStart = weekStartDate.getTime();
  var todayStart = _stStartOfDay(now).getTime();
  var rates = _stLoadCommissionRates();

  // Day buckets: index 0=Mon, 1=Tue, …, 4=Fri, 5=Sat, 6=Sun.
  // Each bucket includes its actual calendar Date so the daily
  // breakdown can render "MON 4/7" style real dates.
  var dayBuckets = [];
  for (var b = 0; b < 7; b++) {
    var bd = new Date(weekStartDate);
    bd.setDate(bd.getDate() + b);
    dayBuckets.push({ amount: 0, count: 0, date: bd });
  }
  var stats = {
    todayCount: 0,
    weekCount: 0,
    // Total Sales (weekSales) is ALWAYS the sum of raw monthly
    // premiums — base plan premium for deals plus add-on
    // premiums — and NEVER includes enrollment fees, plan
    // commission, add-on commission, enrollment bonus, or any
    // other calculated/derived value. It reads s.amount only,
    // which the parser sets to the per-month dollar figure and
    // which _stStampDealCommission never mutates.
    weekSales: 0,
    enrollments: 0, // count of deals with enrollmentFee === 125 exactly
    weekDeals: 0,
    weekAddons: 0,
    dayBuckets: dayBuckets,
    weekStart: weekStart,
    weekExpectedCommission: 0
  };

  // First pass: identify VALID DEALS this week so that when we
  // sum add-on premiums in the second pass, we can drop any
  // add-on whose parent deal is cancelled or charged back. A
  // deal itself is "valid for sales total" when its status is
  // 'valid'. Add-ons without a receiptId (rare — manual entry)
  // are judged on their own status.
  var validDealReceiptIds = {};
  for (var di = 0; di < sales.length; di++) {
    var ds = sales[di];
    if (!ds) continue;
    if (ds.type !== 'deal') continue;
    if (ds.ts < weekStart) continue;
    if (ds.status === 'valid' && ds.receiptId) {
      validDealReceiptIds[ds.receiptId] = true;
    }
  }

  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s) continue;

    // Weekly expected commission includes cancelled (0) and
    // chargeback (negative) rows per the audit spec. So roll
    // up every DEAL this week regardless of status.
    if (s.type === 'deal' && s.ts >= weekStart) {
      if (typeof s.expectedDealTotal !== 'number') {
        // Lazy-stamp: old rows inserted before this version
        // won't have the fields yet.
        _stStampDealCommission(sales, i, rates);
      }
      stats.weekExpectedCommission += Number(s.expectedDealTotal) || 0;
    }

    // Stats below only count VALID rows
    if (s.status !== 'valid') continue;
    if (s.ts >= todayStart) stats.todayCount++;
    if (s.ts < weekStart) continue;

    stats.weekCount++;

    // ── Total Sales calculation ───────────────────────────
    // Uses ONLY the raw monthly premium in s.amount. Never
    // touches s.planCommission, s.expectedDealTotal,
    // s.enrollmentFee, s.enrollmentBonus, etc. Any add-on
    // whose parent deal is cancelled/charged back is dropped
    // ("for valid deals only" per spec).
    var includeInSales = false;
    if (s.type === 'deal') {
      includeInSales = true; // we already filtered to valid
    } else if (s.type === 'addon') {
      if (s.receiptId) {
        includeInSales = validDealReceiptIds[s.receiptId] === true;
      } else {
        // Manual add-on without a receipt — judge on its own status
        includeInSales = true;
      }
    }
    if (includeInSales) {
      stats.weekSales += Number(s.amount) || 0;
    }

    // $125 Enrollments: count deals whose receipt had exactly
    // a $125 enrollment fee. Never count add-ons (the fee is
    // stored on the deal only).
    if (s.type === 'deal' && Number(s.enrollmentFee) === 125) {
      stats.enrollments++;
    }
    if (s.type === 'addon') stats.weekAddons++;
    else stats.weekDeals++;

    // Daily breakdown also uses raw amounts only, and respects
    // the same "valid parent deal" rule so a cancelled deal
    // doesn't leave its add-ons inflating a day's total.
    if (includeInSales) {
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
    '<div class="st-stat-card"><div class="st-stat-label">$125 Enrollments</div><div class="st-stat-value">' +
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
    'oninput="_stReceiptInputChanged()" ' +
    'placeholder="Paste the full enrollment receipt here. The tracker will auto-detect the core plan and any add-ons, and log them all in one click."></textarea>';
  html += '<div id="st-flash" class="st-flash" style="opacity:0;"></div>';
  // Sale timing: Same-Day vs Post-Date toggle buttons
  html += '<input type="hidden" id="st-sale-mode" value="same">';
  html += '<div class="st-mode-toggle">';
  html +=
    '<button type="button" id="st-mode-same" class="st-mode-btn st-mode-active" onclick="_stSetSaleMode(\'same\')">Same-Day Sale</button>';
  html +=
    '<button type="button" id="st-mode-post" class="st-mode-btn" onclick="_stSetSaleMode(\'post\')">Post-Date Sale</button>';
  html += '</div>';
  // Date fields row — "Date Sold" always visible, "Post-Date
  // Billing" only visible when Post-Date mode is selected.
  html += '<div class="st-date-row">';
  html += '<div class="st-date-field">';
  html +=
    '<label for="st-date-sold" class="st-date-label">Date Sold</label>';
  html +=
    '<input type="date" id="st-date-sold" class="st-date-input" value="' +
    _stEscape(today) +
    '">';
  html += '</div>';
  html +=
    '<div id="st-postdate-billing-wrap" class="st-date-field" style="display:none;">';
  html +=
    '<label for="st-postdate-billing" class="st-date-label">Post-Date Billing</label>';
  html +=
    '<input type="date" id="st-postdate-billing" class="st-date-input" min="' +
    _stEscape(today) +
    '">';
  html += '</div>';
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
    '<thead><tr><th>Date</th><th>Customer</th><th>Plan</th><th>Amount</th><th>Commission</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>';
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

    // Customer cell: name on top, memberId muted below
    var customerCell = '<div class="st-customer-name">' + _stEscape(s.customer || '\u2014') + '</div>';
    if (s.memberId) {
      customerCell += '<div class="st-member-id">ID: ' + _stEscape(s.memberId) + '</div>';
    }

    // Commission cell: for deals show expected total + edit button.
    // For addons show the line commission only.
    var commissionCell = '';
    if (s.type === 'deal') {
      var expected = Number(s.expectedDealTotal) || 0;
      var planComm = Number(s.planCommission) || 0;
      var addonComm = Number(s.totalAddonCommission) || 0;
      var bonus = Number(s.enrollmentBonus) || 0;
      var rate = Number(s.planCommissionRate) || 0;
      commissionCell =
        '<div class="st-comm-cell">' +
        '<div class="st-comm-total">$' + expected.toFixed(2) + '</div>' +
        '<div class="st-comm-breakdown">' +
        'plan $' + planComm.toFixed(2) + ' @ ' + Math.round(rate * 100) + '%' +
        (addonComm !== 0 ? ' + addons $' + addonComm.toFixed(2) : '') +
        (bonus !== 0 ? ' + bonus $' + bonus.toFixed(2) : '') +
        '</div>' +
        '<button type="button" class="st-comm-edit" title="Edit commission rates for this deal" onclick="_stOpenCommissionEditor(\'' + s.id + '\')">Edit</button>' +
        '</div>';
    } else {
      var aRate = typeof s.addonCommissionRate === 'number'
        ? s.addonCommissionRate
        : (_stLoadCommissionRates().addonTypes[_stClassifyAddon(s.plan)] || 0.25);
      var aComm = (Number(s.amount) || 0) * aRate;
      if (s.status === 'cancel') aComm = 0;
      else if (s.status === 'chargeback') aComm = -Math.abs(aComm);
      commissionCell =
        '<div class="st-comm-cell">' +
        '<div class="st-comm-total">$' + aComm.toFixed(2) + '</div>' +
        '<div class="st-comm-breakdown">' + Math.round(aRate * 100) + '% (' + _stClassifyAddon(s.plan) + ')</div>' +
        '</div>';
    }

    html += '<tr class="st-row st-row-' + s.status + '">';
    html += '<td>' + _stEscape(dateStr) + '</td>';
    html += '<td>' + customerCell + '</td>';
    html += '<td>' + _stEscape(s.plan || 'Unknown Plan') + '</td>';
    // Amount column: raw monthly premium (base plan or add-on
    // price) straight from s.amount — NEVER a commission figure.
    // Commission lives in the separate Commission column below.
    html +=
      '<td>$' +
      (Math.round((Number(s.amount) || 0) * 100) / 100).toFixed(2) +
      '</td>';
    html += '<td>' + commissionCell + '</td>';
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

// ── INLINE COMMISSION RATE EDITOR ───────────────────────────
// Opens a small prompt-based inline editor for the given sale.
// Uses window.prompt for a no-framework UX — keeps the editor
// dead simple and requires zero extra DOM state. The entered
// rate is persisted on the sale object and commission fields
// are re-stamped immediately.
function _stOpenCommissionEditor(saleId) {
  var sales = _stLoadSales();
  var idx = -1;
  for (var i = 0; i < sales.length; i++) {
    if (sales[i].id === saleId) { idx = i; break; }
  }
  if (idx === -1) return;
  var deal = sales[idx];
  if (deal.type !== 'deal') {
    _stFlash('Commission editor opens from deals only.', 'error');
    return;
  }
  var rates = _stLoadCommissionRates();
  var currentPlan = typeof deal.commissionRate === 'number'
    ? deal.commissionRate
    : _stPlanTierRate(deal.amount, rates);
  var inPlan = window.prompt(
    'Plan commission rate for this deal (as a decimal, e.g. 0.30 for 30%):',
    String(currentPlan)
  );
  if (inPlan === null) return;
  var newPlan = parseFloat(inPlan);
  if (isNaN(newPlan) || newPlan < 0 || newPlan > 1) {
    _stFlash('Enter a decimal between 0 and 1 (e.g. 0.35).', 'error');
    return;
  }
  deal.commissionRate = newPlan;
  _stStampDealCommission(sales, idx, rates);
  _stSaveSales(sales);
  _stRender();
  _stFlash('Commission rate updated for this deal.', 'ok');
}

// Reset the deal's commission rate back to the tier default.
function _stResetDealCommission(saleId) {
  var sales = _stLoadSales();
  for (var i = 0; i < sales.length; i++) {
    if (sales[i].id !== saleId) continue;
    delete sales[i].commissionRate;
    _stStampDealCommission(sales, i, _stLoadCommissionRates());
    _stSaveSales(sales);
    _stRender();
    _stFlash('Commission rate reset to default.', 'ok');
    return;
  }
}

// Reset GLOBAL commission rate defaults.
function _stResetGlobalCommissionRates() {
  if (!confirm('Reset all commission rate defaults? Existing per-deal overrides will be kept.')) return;
  _stResetCommissionRates();
  var sales = _stLoadSales();
  _stRestampAllCommissions(sales);
  _stSaveSales(sales);
  _stRender();
  _stFlash('Commission defaults reset.', 'ok');
}

function _stBuildWeeklySalesSummary(stats) {
  var dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  var today = new Date();
  var todayDayIdx = today.getDay();
  var todayBucketIdx = todayDayIdx === 0 ? 6 : todayDayIdx - 1;
  // Deal-only amounts + counts for each Mon-Sun bucket. Add-ons
  // are intentionally excluded so the day cards represent core
  // deal production, not total line-item revenue.
  var dealAmounts = [0, 0, 0, 0, 0, 0, 0];
  var dealCounts = [0, 0, 0, 0, 0, 0, 0];
  var weekStart = stats.weekStart;
  var sales = _stLoadSales();
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s || s.status !== 'valid' || s.ts < weekStart) continue;
    if (s.type !== 'deal') continue;
    var dt = new Date(s.ts);
    var jsDay = dt.getDay();
    var bucketIdx = jsDay === 0 ? 6 : jsDay - 1;
    if (bucketIdx < 7) {
      dealCounts[bucketIdx]++;
      dealAmounts[bucketIdx] += Number(s.amount) || 0;
    }
  }
  var html = '<div class="st-weekly-summary">';
  html += '<div class="st-weekly-summary-title">This Week\'s Sales</div>';
  html += '<div class="st-weekly-summary-grid">';
  for (var d = 0; d < 5; d++) {
    var bucket = stats.dayBuckets[d] || { date: null };
    var isToday = d === todayBucketIdx;
    var amt = dealAmounts[d] || 0;
    var deals = dealCounts[d] || 0;
    var hasSales = amt > 0 || deals > 0;
    var dateStr = '';
    if (bucket.date) {
      dateStr = (bucket.date.getMonth() + 1) + '/' + bucket.date.getDate();
    }
    html += '<div class="st-wks-card' + (isToday ? ' st-wks-today' : '') + (hasSales ? ' st-wks-active' : '') + '">';
    html += '<div class="st-wks-day">' + dayNames[d] + (dateStr ? '<span class="st-wks-date"> ' + dateStr + '</span>' : '') + '</div>';
    html += '<div class="st-wks-amount">$' + Math.round(amt).toLocaleString() + '</div>';
    html += '<div class="st-wks-deals">' + deals + (deals === 1 ? ' deal' : ' deals') + '</div>';
    html += '</div>';
  }
  html += '</div></div>';
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
  // 1. Welcome greeting at the very top so it's visible immediately
  html += _stBuildWelcome();
  // 2. Alert banner for any post-dates billing today (above page header)
  html += _stBuildPostDateBanner(postdates);
  // 3. Page header
  html +=
    '<div class="ph"><div class="pt">Sales <span>Tracker</span></div>' +
    '<div class="pd">Log enrollments, watch your weekly bonus progress, and see your numbers at a glance. Everything stays on your account.</div></div>';
  // 4. This Week's Sales cards (Mon-Fri grid, deals only)
  html += _stBuildWeeklySalesSummary(stats);
  // 5. Stats row
  html += _stBuildStats(stats);
  // 6. Weekly Bonus progress
  html += _stBuildBonus(stats);
  // 7. Receipt input section
  html += _stBuildInput();
  // 8. This Week's table
  html += _stBuildTable(sales);
  // 9. Pending Post-Dates
  html += _stBuildPostDatesSection(postdates);
  // 10. Bottom spacer so the floating bottom toolbar never covers the last row
  html += '<div class="st-bottom-spacer" aria-hidden="true"></div>';

  page.innerHTML = html;
}
