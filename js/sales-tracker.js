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

var _stDealEditSaleId = '';
var _stEntryModalState = null;

// ── BONUS TIER CONFIG ───────────────────────────────────────
// D = Deals (core plan sales). A = Add-ons.
// Both targets must be hit to unlock the bonus for that tier.
var ST_BONUS_TIERS = [
  { deals: 10, addons: 10, bonus: 250 },
  { deals: 15, addons: 15, bonus: 500 },
  { deals: 20, addons: 20, bonus: 750 },
  { deals: 25, addons: 25, bonus: 1000 }
];

window.CHA_BONUS_TIERS_FOR_DASH = ST_BONUS_TIERS;

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
  'NCE WellGuard AD&D $100,000',
  'NCE WellGuard AD&D $250,000',
  'NCE Fusion Dental - Plan A',
  'NCE Fusion Dental - Plan B',
  'New York Life $50,000 Term Life',
  'Pinnacle Critical Care Plan 1',
  'Pinnacle Critical Care Plan 2',
  'Pinnacle Critical Care Plan 3',
  'Pinnacle Critical Care Plan 4',
  'Allstate Hospital Expense',
  'Allstate Plan Enhancer',
  'Allstate Dental PPO',
  'Allstate Cancer and Heart/Stroke',
  'Prime Health Pass Discount',
  'MDLive',
  'GapSupport Discount',
  'AssistPro Discount',
  'Compass VAB Add-on',
  'Compass Telemed - Add-on',
  'GHDP Dental 1500 Add-on',
  'GHDP Dental 3000 Add-on',
  'GHDP Dental 5000 Add-on',
  'GHDP Dental-Vision 1500 Add-on',
  'GHDP Dental-Vision 3000 Add-on',
  'GHDP Dental-Vision 5000 Add-on',
  'Ameritas Schedule Plan Add-on',
  'Ameritas Coinsurance Plan Add-on',
  'Health Essential Care DVH Plus Add-on',
  'AME $500 Add-on',
  'AME $1000 Add-on',
  'AD&D $50k - Add-on',
  'AD&D $100K - Add-on',
  'AD&D $125K - Add-on',
  'AD&D $175K - Add-on',
  'AD&D $200K - Add-on',
  'AD&D $250K - Add-on',
  'American Financial - Critical Illness $2,500 - Add-on',
  'American Financial - Critical Illness $5,000 - Add-on',
  'American Financial - Critical Illness $7,500 - Add-on',
  'American Financial - Critical Illness $10,000 - Add-on'
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
  // Loose haystack: collapse runs of non-alphanumeric (dashes,
  // multiple spaces, punctuation) into a single space so receipts
  // that print "BWA AmeriCare - Plan 4" still match the registry's
  // "BWA Americare Plan 4" form. Keeps $ and & since some plan
  // names rely on them ("AD&D $50k").
  var hayLoose = hay.replace(/[^a-z0-9$&]+/g, ' ').replace(/\s+/g, ' ').trim();
  for (var i = 0; i < CHA_ALL_PLAN_NAMES.length; i++) {
    var candidate = CHA_ALL_PLAN_NAMES[i];
    var cLower = candidate.toLowerCase();
    if (hay.indexOf(cLower) !== -1) return candidate;
    var cLoose = cLower.replace(/[^a-z0-9$&]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (cLoose && hayLoose.indexOf(cLoose) !== -1) return candidate;
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
    dvh: 0.25,        // dental / vision / life / catastrophic
    dvhDirect: 0.35,  // Direct Access DVH
    accident: 0.7,    // AD&D, AccessCare Pro, NowCare, Continue Care, Wellness4U
    rx: 0.2,          // SureScript, BestChoice
    gap: 0.5           // GAP
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
      dvhDirect: r.addonTypes.dvhDirect,
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
  // GAP support products
  if (/\bgap(support)?\b/.test(n)) return 'gap';
  // Direct Access DVH (35%)
  if (/\bdirect access\b/.test(n) && /\bdvh\b/.test(n)) return 'dvhDirect';
  // Dental / Vision / Life / Catastrophic / generic DVH (25%)
  if (
    /\b(dental|vision|life|catastrophic|dvh|dental-vision|ameritas)\b/.test(n)
  ) {
    return 'dvh';
  }
  // AD&D, AccessCare Pro, NowCare, Continue Care, Wellness4U
  if (
    /\b(accesscare pro|nowcare|continue care|wellness4u|accident|ad&?d|ad and d|ame|critical illness|critical care|hospital expense|cancer)\b/.test(
      n
    )
  ) {
    return 'accident';
  }
  // Rx / prescription discounts (SureScript, BestChoice; not RxSavers — flat $ in compute)
  if (/\b(rx|prescription|surescript|bestchoice|prime health pass|assistpro|mdlive|telemed)\b/.test(n)) {
    return 'rx';
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
var _stAllSalesRange = 'all';
var _stCustomRangeFrom = '';
var _stCustomRangeTo = '';
var _stAllSearchQuery = '';
var _stAllStatusFilter = 'all';
var _stAllRowsShown = 10;
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
    if (!Array.isArray(parsed)) return [];
    var changed = false;
    for (var i = 0; i < parsed.length; i++) {
      var s = parsed[i];
      if (!s) continue;
      var normalized = _stNormalizeStatus(s);
      if (normalized !== s.status) {
        s.status = normalized;
        changed = true;
      }
    }
    if (changed) _stSaveSales(parsed);
    return parsed;
  } catch (_e) {
    return [];
  }
}

function _stSaveSales(sales) {
  _stSet(_stKey('cha_sales'), JSON.stringify(sales || []));
}

function _stClearDateMs(sale) {
  var base = Number(sale && sale.ts);
  if (!base) return 0;
  return base + (30 * 24 * 60 * 60 * 1000);
}

function _stNormalizeStatus(sale) {
  var raw = String((sale && sale.status) || '').toLowerCase();
  if (raw === 'chargeback') return 'chargeback';
  if (raw === 'cleared') return 'cleared';
  if (raw === 'cancel') return 'chargeback';
  var clearMs = _stClearDateMs(sale);
  if (clearMs && Date.now() >= clearMs) return 'cleared';
  return 'pending';
}

function _stStatusText(sale) {
  var st = _stNormalizeStatus(sale);
  if (st === 'chargeback') return 'Chargeback';
  if (st === 'cleared') return 'Cleared';
  var clearMs = _stClearDateMs(sale);
  if (!clearMs) return 'Pending';
  var remaining = Math.ceil((clearMs - Date.now()) / (24 * 60 * 60 * 1000));
  if (remaining <= 0) return 'Clears today';
  return 'Clears in ' + remaining + ' day' + (remaining === 1 ? '' : 's');
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

// ── RECEIPT NORMALIZE + GROQ (PRIMARY) ───────────────────────
function _stNormalizeReceiptRaw(text) {
  if (!text) return '';
  return String(text)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

function _stGroqApiKeyForReceipt() {
  if (
    typeof _aiGroqFallbackKey !== 'undefined' &&
    _aiGroqFallbackKey &&
    _aiGroqFallbackKey.length >= 20
  ) {
    return _aiGroqFallbackKey;
  }
  try {
    var ls = localStorage.getItem('cha_groq_key') || '';
    if (ls && ls !== 'skip' && ls.length >= 20) return ls;
  } catch (_k) {}
  return '';
}

function _stApplySummaryTotalFromRaw(raw, out) {
  var totalMatch =
    raw.match(
      /summary[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)[^\n]*total/i
    ) || raw.match(/\btotal[^\n$]*\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i);
  if (totalMatch) {
    var tn = parseFloat(totalMatch[1].replace(/,/g, ''));
    if (!isNaN(tn)) out.receiptTotal = tn;
  }
}

function _stReorderDealProducts(out) {
  if (!out.products || out.products.length <= 1) return;
  var roAddOnRe = /\badd[-\s]?on\b/i;
  var roCore = [];
  var roAdd = [];
  for (var roI = 0; roI < out.products.length; roI++) {
    var roP = out.products[roI];
    if (roAddOnRe.test(roP.name)) {
      roAdd.push(roP);
    } else {
      roCore.push(roP);
    }
  }
  if (roCore.length > 1) {
    var roBestIdx = 0;
    for (var roJ = 1; roJ < roCore.length; roJ++) {
      if (roCore[roJ].price > roCore[roBestIdx].price) {
        roBestIdx = roJ;
      }
    }
    if (roBestIdx > 0) {
      var roBest = roCore.splice(roBestIdx, 1)[0];
      roCore.unshift(roBest);
    }
  }
  out.products = roCore.concat(roAdd);
}

// Synchronous Groq extraction — primary path when API key is present.
// Returns { products, customer, memberId, enrollmentFee, saleDate, agent }
// or null on failure / empty.
function _stGroqSyncReceiptPrimary(raw) {
  var key = _stGroqApiKeyForReceipt();
  if (!key || !raw || typeof XMLHttpRequest === 'undefined') return null;
  var sys =
    'You extract structured enrollment-receipt data for an insurance sales tracker. ' +
    'Return ONLY valid JSON (no markdown fences) with exactly this shape: ' +
    '{"customer":"","memberId":"","saleDate":"","planName":"","planPremium":0,"enrollmentFee":0,' +
    '"addons":[{"name":"","monthlyPrice":0}],"agent":""}. ' +
    'Rules: planPremium = core plan recurring MONTHLY premium only (not enrollment). ' +
    'enrollmentFee = one-time enrollment / signup / association fee if shown, else 0. ' +
    'addons = supplemental products each with its own monthly recurring price. ' +
    'saleDate as YYYY-MM-DD when visible on the receipt, else empty string. ' +
    'Use numbers only for prices. Never invent data; leave fields empty or 0 when absent.';
  try {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://api.groq.com/openai/v1/chat/completions',
      false
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + key);
    xhr.send(
      JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 900,
        temperature: 0.05,
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: raw }
        ]
      })
    );
    if (xhr.status !== 200) return null;
    var body = JSON.parse(xhr.responseText);
    var txt =
      body &&
      body.choices &&
      body.choices[0] &&
      body.choices[0].message &&
      body.choices[0].message.content
        ? String(body.choices[0].message.content).trim()
        : '';
    txt = txt.replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
    var gj = null;
    try {
      gj = JSON.parse(txt);
    } catch (_p1) {
      var m = txt.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          gj = JSON.parse(m[0]);
        } catch (_p2) {
          gj = null;
        }
      }
    }
    if (!gj) return null;
    var products = [];
    var planName = gj.planName ? String(gj.planName) : '';
    var planPremium = parseFloat(gj.planPremium);
    if (planName && !isNaN(planPremium) && planPremium > 0) {
      var canon = _stMatchPlanName(planName);
      products.push({
        name: canon || planName.substring(0, 120),
        price: planPremium,
        policy: ''
      });
    }
    var addonList = gj.addons;
    if (addonList && addonList.length) {
      for (var ai = 0; ai < addonList.length; ai++) {
        var ad = addonList[ai] || {};
        var an = ad.name ? String(ad.name) : '';
        var ap = parseFloat(ad.monthlyPrice);
        if (!an || isNaN(ap) || ap <= 0) continue;
        var canonA = _stMatchPlanName(an);
        products.push({
          name: canonA || an.substring(0, 120),
          price: ap,
          policy: ''
        });
      }
    }
    if (!products.length) return null;
    var enr = parseFloat(gj.enrollmentFee);
    if (isNaN(enr) || enr < 0) enr = 0;
    var saleDate = null;
    if (gj.saleDate) {
      var dm = String(gj.saleDate).match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (dm) {
        var y = parseInt(dm[1], 10);
        var mo = parseInt(dm[2], 10);
        var d = parseInt(dm[3], 10);
        if (!isNaN(y) && !isNaN(mo) && !isNaN(d)) {
          saleDate = new Date(y, mo - 1, d, 9, 0, 0, 0);
        }
      }
    }
    return {
      products: products,
      customer: gj.customer ? String(gj.customer).substring(0, 80) : '',
      memberId: gj.memberId ? String(gj.memberId).substring(0, 40) : '',
      enrollmentFee: enr,
      saleDate: saleDate,
      agent: gj.agent ? String(gj.agent).substring(0, 80) : ''
    };
  } catch (_e) {
    return null;
  }
}

// Parse "Month D, YYYY at H:MM AM/PM" after "Confirmation" (or whole
// receipt if none). Used for saleDate so weekly buckets match the
// enrollment confirmation, not a generic Date: line or Active date.
function _stParseConfirmationTimestampInRaw(raw) {
  var text = String(raw || '');
  var monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6,
    aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
  };
  var idx = text.search(/\bconfirmation\b/i);
  var slice = idx >= 0 ? text.slice(idx) : text;
  var re = /\b([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+at\s+\d{1,2}:\d{2}\s*(?:AM|PM)\b/i;
  var m = slice.match(re);
  if (!m) return null;
  var mIdx = monthMap[String(m[1]).toLowerCase()];
  if (typeof mIdx !== 'number') return null;
  var dNum = parseInt(m[2], 10);
  var yNum = parseInt(m[3], 10);
  if (isNaN(dNum) || isNaN(yNum)) return null;
  return new Date(yNum, mIdx, dNum, 9, 0, 0, 0);
}

// Split receipt text into lines; when Slack collapses to one line,
// re-insert breaks at CHA phrase boundaries (same rules as
// _stParseReceipt). Returns possibly-updated raw + lines.
function _stReceiptLinesSplit(rawIn) {
  var raw = String(rawIn || '');
  var lines = raw.split('\n');
  if (lines.length <= 1) {
    raw = raw
      .replace(/\s+(Confirmation\s)/g, '\nConfirmation ')
      .replace(/\s+(MemberName:)/g, '\nMemberName:')
      .replace(/\s+(Address:)/g, '\nAddress:')
      .replace(/\s+(Phone:)/g, '\nPhone:')
      .replace(/\s+(Email:)/g, '\nEmail:')
      .replace(/\s+(Products\s)/g, '\nProducts\n')
      .replace(/\s+(Policy:)/g, '\nPolicy:')
      .replace(/\s+(Active:)/g, '\nActive:')
      .replace(/\s+(Summary\$)/g, '\nSummary$')
      .replace(/\s+(Back to home)/g, '\nBack to home')
      .replace(/\s+(SALE on)/g, '\nSALE on')
      .replace(/\s+(Date:\s)/g, '\nDate: ')
      .replace(/\s+(Order\s#:)/g, '\nOrder #:')
      .replace(/\s+(Total\s\$)/g, '\nTotal $')
      .replace(/\s+(Member\s+ID:)/g, '\nMember ID:')
      .replace(/\s+(Individual\s+-\s+ID:)/g, '\nIndividual - ID:')
      .replace(/(\bone[-\s]?time)\s+(\$)/g, '$1\n$2')
      .replace(/(\$\s*[\d,.]+\s+Product\s+per\s+Month\s+for\s+\w+)\s+([A-Z])/g, '$1\n$2')
      .replace(/(\$\s*[\d,.]+\s+per\s+Month\s+for\s+\w+)\s+([A-Z])/g, '$1\n$2')
      .replace(/(\bProduct\s+\$\s*[\d,.]+)\s+([A-Z][A-Za-z])/g, '$1\n$2')
      .replace(/(\bEnrollment\s+\$\s*[\d,.]+)\s+(\bProduct\s+\$)/g, '$1\n$2');
    lines = raw.split('\n');
  }
  return { raw: raw, lines: lines };
}

// Premium on "Policy:… Active:… $125 Enrollment one-time $341 Product per Month…"
// lines (skipLineRe skips Policy-led lines in later passes). Mutates out.products.
function _stInjectCombinedPolicyPremiums(lines, out, enrollmentRe) {
  var _cpRe = /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*(?:product\s+)?per\s*month/i;
  var _dedRe = /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)\s*deductible/i;
  for (var _cpI = 0; _cpI < lines.length; _cpI++) {
    var _cpL = lines[_cpI];
    if (!/policy|active/i.test(_cpL)) continue;
    if (!_cpRe.test(_cpL)) continue;
    var _cpM = _cpL.match(_cpRe);
    if (!_cpM) continue;
    var _cpP = parseFloat(_cpM[1].replace(/,/g, ''));
    if (isNaN(_cpP) || _cpP <= 0) continue;
    var _dedM = _cpL.match(_dedRe);
    var _dedV = _dedM ? parseFloat(_dedM[1].replace(/,/g, '')) : -1;
    if (_cpP === _dedV) continue;
    var _cpName = '';
    for (var _cpB = _cpI - 1; _cpB >= 0 && _cpB >= _cpI - 10; _cpB--) {
      var _cpPr = lines[_cpB].trim();
      if (!_cpPr) continue;
      if (/^(?:confirmation|products?|summary|total|policy|active|address|phone|email|date|member|central|health|advisors)/i.test(_cpPr)) continue;
      if (/^\$/.test(_cpPr)) continue;
      if (enrollmentRe.test(_cpPr)) continue;
      _cpName = _cpPr;
      break;
    }
    if (!_cpName) _cpName = 'Unknown Plan';
    var _cpMatch = _stMatchPlanName(_cpName);
    var _cpFinal = _cpMatch || _cpName.substring(0, 120);
    var _cpPol = _cpL.match(/policy\s*:?\s*([A-Z0-9-]{4,})/i);
    var _cpEntry = { name: _cpFinal, price: _cpP, policy: _cpPol ? _cpPol[1] : '' };
    // Check if a product with the same name already exists
    var _cpExistIdx = -1;
    for (var _cpD = 0; _cpD < out.products.length; _cpD++) {
      if (out.products[_cpD].name === _cpEntry.name) {
        _cpExistIdx = _cpD;
        break;
      }
    }
    if (_cpExistIdx >= 0) {
      // Same name exists — REPLACE its price with the correct
      // "Product per Month" value (which is authoritative over
      // Groq's guess that may have used enrollment fee)
      out.products[_cpExistIdx].price = _cpEntry.price;
      if (_cpEntry.policy) {
        out.products[_cpExistIdx].policy = _cpEntry.policy;
      }
    } else {
      // New product — add it
      if (/add[-\s]?on/i.test(_cpName) || /add[-\s]?on/i.test(_cpFinal)) {
        out.products.push(_cpEntry);
      } else {
        out.products.unshift(_cpEntry);
      }
    }
  }
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
function _stParseReceipt(text, useGroq) {
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
  var raw = _stNormalizeReceiptRaw(text);

  // Groq is only used on explicit add actions — not on every
  // keystroke in the receipt textarea (would sync-block the UI).
  if (useGroq === true) {
    var groqPrim = _stGroqSyncReceiptPrimary(raw);
    if (groqPrim) {
      out.products = groqPrim.products;
      out.customer = groqPrim.customer;
      out.memberId = groqPrim.memberId;
      out.enrollmentFee = groqPrim.enrollmentFee;
      if (groqPrim.agent) out.agent = groqPrim.agent;
      if (groqPrim.saleDate) out.saleDate = groqPrim.saleDate;
      var confirmTsGroq = _stParseConfirmationTimestampInRaw(raw);
      if (confirmTsGroq) out.saleDate = confirmTsGroq;
      // Groq primary path used to return here BEFORE any local line
      // parsing — so Policy+Enrollment+Product-per-Month lines were
      // never scanned and planPremium could wrongly equal $125.
      var _spGroq = _stReceiptLinesSplit(raw);
      raw = _spGroq.raw;
      _stInjectCombinedPolicyPremiums(
        _spGroq.lines,
        out,
        /enrollment|one[-\s]?time|sign[-\s]?up\s+fee/i
      );
      _stApplySummaryTotalFromRaw(raw, out);
      _stReorderDealProducts(out);
      return out;
    }
  }

  var _sp = _stReceiptLinesSplit(raw);
  raw = _sp.raw;
  var lines = _sp.lines;

  // ── Summary total ─────────────────────────────────────────
  _stApplySummaryTotalFromRaw(raw, out);

  // ── Agent name from confirmation header ───────────────────
  var agentMatch = raw.match(
    /\d{4}\s*at\s*\d{1,2}:\d{2}\s*(?:am|pm)?\s*-\s*\d+\s*-\s*([^\n\r]+)/i
  );
  if (agentMatch) out.agent = agentMatch[1].trim().substring(0, 80);

  // ── "Member ID" format Date line ─────────────────────────
  // Matches the line format:
  //   "Date:  04/10/2026 at 2:49 PM  Type:  SALE"
  // This format appears in Good Health Distribution Partner
  // receipts. It runs BEFORE the confirmation-header check so
  // it takes priority for these receipts — the confHeaderRe
  // block below only fills saleDate when this one didn't.
  var dateLineRe = /date\s*:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i;
  var dateLineMatch = raw.match(dateLineRe);
  if (dateLineMatch) {
    var dlMonth = parseInt(dateLineMatch[1], 10);
    var dlDay = parseInt(dateLineMatch[2], 10);
    var dlYear = parseInt(dateLineMatch[3], 10);
    if (
      !isNaN(dlMonth) &&
      !isNaN(dlDay) &&
      !isNaN(dlYear) &&
      dlMonth >= 1 &&
      dlMonth <= 12 &&
      dlDay >= 1 &&
      dlDay <= 31
    ) {
      out.saleDate = new Date(dlYear, dlMonth - 1, dlDay, 9, 0, 0, 0);
    }
  }

  // ── Confirmation-line date + member ID ───────────────────
  // Matches the header line format:
  //   "April 9, 2026 at 8:04 PM - 686931541 - Ravi Choudhry"
  // Captures the month name, day, year, and the 9-digit member
  // number that sits between the first and second dash. The
  // saleDate assignment is guarded so the "Date: MM/DD/YYYY"
  // line above wins when both are present (Member ID format).
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
    if (
      !out.saleDate &&
      typeof mIdx === 'number' &&
      !isNaN(dNum) &&
      !isNaN(yNum)
    ) {
      out.saleDate = new Date(yNum, mIdx, dNum, 9, 0, 0, 0);
    }
    // The 9-digit number from the confirmation line takes
    // precedence over any "Member ID:" field found below —
    // this is the receipt's canonical member number.
    out.memberId = confMatch[4];
  }

  var confirmTsParsed = _stParseConfirmationTimestampInRaw(raw);
  if (confirmTsParsed) {
    out.saleDate = confirmTsParsed;
  }

  // ── Customer name (if any explicit field) ─────────────────
  var custMatch = raw.match(
    /(?:customer|client|insured|name)\s*[:-]\s*([^\n\r]+)/i
  );
  if (custMatch) out.customer = custMatch[1].trim().substring(0, 80);

  // ── Customer name from Member ID format ──────────────────
  // After finding the 9-digit member ID, scan the next 10
  // lines forward. Take the first line that:
  //  - Trims to between 2 and 50 characters
  //  - Only contains letters, spaces, hyphens, apostrophes
  //  - Is not a known metadata header
  // Only set as out.customer if still empty.
  if (!out.customer) {
    var cnNameRe = /^[A-Za-z][A-Za-z\s'\-]{1,49}$/;
    var cnSkipRe =
      /^\s*(member|id|sale|date|order|type|amount|notes|products|payment|method|settled|transaction|authorization|individual|enrollment|confirmation|central|health|advisors)/i;
    // First, try to extract a name that appears ON THE SAME LINE
    // as the 9-digit member id (Slack-collapsed Format 2 case:
    // "Member ID: 686935650 William Glenn ...").
    for (var midI2 = 0; midI2 < lines.length && !out.customer; midI2++) {
      var midLine2 = lines[midI2] || '';
      var midInlineM = midLine2.match(
        /\b\d{9}\b\s+([A-Z][A-Za-z'\-]+(?:\s+[A-Z][A-Za-z'\-]+){1,3})\b/
      );
      if (midInlineM) {
        var midInlineCand = midInlineM[1].trim();
        if (
          !cnSkipRe.test(midInlineCand) &&
          !(typeof _stMatchPlanName === 'function' && _stMatchPlanName(midInlineCand))
        ) {
          out.customer = midInlineCand.substring(0, 80);
        }
      }
    }
    // Fallback: walk forward from the 9-digit line to subsequent
    // lines (original behaviour for already-line-broken input).
    for (var midI = 0; midI < lines.length && !out.customer; midI++) {
      var midLine = lines[midI] || '';
      var midM = midLine.match(/\b(\d{9})\b/);
      if (!midM) continue;
      for (
        var midJ = midI + 1;
        midJ < lines.length && midJ <= midI + 10;
        midJ++
      ) {
        var midCand = (lines[midJ] || '').trim();
        if (!midCand) continue;
        if (midCand.length < 2 || midCand.length > 50) continue;
        if (cnSkipRe.test(midCand)) continue;
        if (!cnNameRe.test(midCand)) continue;
        if (
          typeof _stMatchPlanName === 'function' &&
          _stMatchPlanName(midCand)
        )
          continue;
        out.customer = midCand.substring(0, 80);
        break;
      }
      if (out.customer) break;
    }
  }

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

  // ── Extract premium from combined Policy+Enrollment+Price lines ──
  // CHA format: "Policy:XXX Active:DATE $125 Enrollment one-time $341 Product per Month for TYPE"
  // The enrollment fee was already captured above. Now grab the
  // "Product per Month" price from these same lines that skipLineRe
  // would otherwise exclude.
  _stInjectCombinedPolicyPremiums(lines, out, enrollmentRe);

  // ── Per-month price lines ─────────────────────────────────
  // Matches "$291.00 per Month", "$39.99/mo", "$22.99 monthly".
  // Requires an explicit monthly marker — bare "$50.00" will
  // never match, and enrollment lines are skipped entirely.
  var priceRe =
    /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)[^$\n]{0,60}?(?:per\s*month|\/\s*mo\b|monthly|a\s+month|\bmo\b)/i;
  var skipLineRe =
    /^(?:central health|confirmation|products?|summary|total|policy|active|effective|starts?|member\s+\d|payment|plan\s+type|type\b|address|phone|email|date|status|enrollment|one[-\s]?time)/i;
  var policyRe = /policy\s*(?:number|#|:)?\s*[:-]?\s*([A-Z0-9-]{4,})/i;

  // ── MEMBER ID FORMAT PARSE ────────────────────────────────
  // The "Member ID" / Good Health Distribution Partner format
  // lists its monthly premium on a dedicated "Product  $X.XX"
  // line and the recurring enrollment on a "Enrollment  $Y.YY"
  // line. There is NO "per Month" marker anywhere, so neither
  // the block-based nor the line-based pass below will match.
  // The Total line at the bottom is the ORDER total and must
  // never be used as a plan price.
  //
  // Signature: a line matching /^\s*product\s+\$\s*[0-9]/ — that
  // pattern is unique to this receipt layout.
  var productLineRe =
    /\bproduct\s+\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i;
  var totalLineRe = /^\s*total\b/i;
  var addOnRe = /\badd[-\s]?on\b/i;
  var memberIdFormat = false;
  for (var mfi = 0; mfi < lines.length; mfi++) {
    if (enrollmentRe.test(lines[mfi])) continue;
    if (totalLineRe.test(lines[mfi])) continue;
    if (productLineRe.test(lines[mfi])) {
      memberIdFormat = true;
      break;
    }
  }
  var mfCores = [];
  var mfAddons = [];
  if (memberIdFormat) {
    for (var plI = 0; plI < lines.length; plI++) {
      var plLine = lines[plI];
      if (enrollmentRe.test(plLine)) continue;
      if (totalLineRe.test(plLine)) continue;
      var plM = plLine.match(productLineRe);
      if (!plM) continue;
      var plPrice = parseFloat(plM[1].replace(/,/g, ''));
      if (isNaN(plPrice) || plPrice <= 0) continue;
      // Walk back up to 10 lines to find the nearest plan-name
      // candidate: non-empty, not metadata, not an enrollment
      // line, not a Total line, not a $-led line, not an
      // "Individual - ID: ..." detail line.
      var mfName = '';
      for (
        var mfBack = plI - 1;
        mfBack >= 0 && mfBack >= plI - 10;
        mfBack--
      ) {
        var mfPrev = lines[mfBack].trim();
        if (!mfPrev) continue;
        if (skipLineRe.test(mfPrev)) continue;
        if (/^\$/.test(mfPrev)) continue;
        if (/^individual\s*-/i.test(mfPrev)) continue;
        if (enrollmentRe.test(mfPrev)) continue;
        if (totalLineRe.test(mfPrev)) continue;
        mfName = mfPrev;
        break;
      }
      if (!mfName) mfName = 'Unknown Plan';
      var mfMatched = _stMatchPlanName(mfName);
      var mfFinal = mfMatched || mfName.substring(0, 120);
      var mfEntry = { name: mfFinal, price: plPrice, policy: '' };
      if (addOnRe.test(mfName) || addOnRe.test(mfFinal)) {
        mfAddons.push(mfEntry);
      } else {
        mfCores.push(mfEntry);
      }
    }
  }
  // Push cores first, then add-ons. De-dup against anything
  // already in out.products by name + price.
  if (mfCores.length || mfAddons.length) {
    var mfAll = mfCores.concat(mfAddons);
    for (var mx = 0; mx < mfAll.length; mx++) {
      var mfCand = mfAll[mx];
      var mfDup = false;
      for (var mfDi = 0; mfDi < out.products.length; mfDi++) {
        if (
          out.products[mfDi].name === mfCand.name &&
          Math.abs(out.products[mfDi].price - mfCand.price) < 0.01
        ) {
          mfDup = true;
          break;
        }
      }
      if (mfDup) continue;
      out.products.push(mfCand);
    }
  }

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

  // ── DEAL DETECTION & REORDER ──────────────────────────────
  _stReorderDealProducts(out);

  // ── GROQ FALLBACK ─────────────────────────────────────────
  // Last-resort parser for receipt formats we've never seen.
  // Only fires when every other pass above failed to extract
  // a single product. Uses a synchronous XMLHttpRequest so the
  // sync return contract of _stParseReceipt is preserved. The
  // whole block is wrapped in try/catch — any failure at all
  // leaves out.products empty and the caller renders its normal
  // "could not detect any products" error.
  if (
    out.products.length === 0 &&
    _stGroqApiKeyForReceipt() &&
    typeof XMLHttpRequest !== 'undefined'
  ) {
    try {
      var grqKey = _stGroqApiKeyForReceipt();
      var grqPrompt =
        'Extract from this receipt: customer full name, 9-digit member ID, sale date (YYYY-MM-DD), and all products with their monthly prices. Return ONLY valid JSON in this exact format: {"customer":"","memberId":"","saleDate":"","products":[{"name":"","price":0,"type":"deal or addon"}]}. First product is always the deal, rest are addons.';
      var grqXhr = new XMLHttpRequest();
      grqXhr.open(
        'POST',
        'https://api.groq.com/openai/v1/chat/completions',
        false
      );
      grqXhr.setRequestHeader('Content-Type', 'application/json');
      grqXhr.setRequestHeader(
        'Authorization',
        'Bearer ' + grqKey
      );
      grqXhr.send(
        JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 800,
          temperature: 0.1,
          messages: [
            { role: 'system', content: grqPrompt },
            { role: 'user', content: raw }
          ]
        })
      );
      if (grqXhr.status === 200) {
        var grqBody = JSON.parse(grqXhr.responseText);
        var grqTxt =
          grqBody &&
          grqBody.choices &&
          grqBody.choices[0] &&
          grqBody.choices[0].message &&
          grqBody.choices[0].message.content
            ? String(grqBody.choices[0].message.content).trim()
            : '';
        // Strip any markdown code fences Groq may wrap the JSON in.
        grqTxt = grqTxt.replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
        var grqJson = null;
        try {
          grqJson = JSON.parse(grqTxt);
        } catch (grqJsonErr) {
          // Try to pull the first {...} block out of the text.
          var grqMatch = grqTxt.match(/\{[\s\S]*\}/);
          if (grqMatch) {
            try {
              grqJson = JSON.parse(grqMatch[0]);
            } catch (grqJsonErr2) {
              grqJson = null;
            }
          }
        }
        if (
          grqJson &&
          grqJson.products &&
          grqJson.products.length > 0
        ) {
          if (!out.customer && grqJson.customer) {
            out.customer = String(grqJson.customer).substring(0, 80);
          }
          if (!out.memberId && grqJson.memberId) {
            out.memberId = String(grqJson.memberId).substring(0, 40);
          }
          if (!out.saleDate && grqJson.saleDate) {
            var grqDt = String(grqJson.saleDate);
            var grqDm = grqDt.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
            if (grqDm) {
              var grqY = parseInt(grqDm[1], 10);
              var grqMo = parseInt(grqDm[2], 10);
              var grqDd = parseInt(grqDm[3], 10);
              if (!isNaN(grqY) && !isNaN(grqMo) && !isNaN(grqDd)) {
                out.saleDate = new Date(grqY, grqMo - 1, grqDd, 9, 0, 0, 0);
              }
            }
          }
          for (var grqPi = 0; grqPi < grqJson.products.length; grqPi++) {
            var grqP = grqJson.products[grqPi] || {};
            var grqName = grqP.name ? String(grqP.name).substring(0, 120) : '';
            var grqPrice = parseFloat(grqP.price);
            if (!grqName || isNaN(grqPrice) || grqPrice <= 0) continue;
            var grqMatched = _stMatchPlanName(grqName);
            out.products.push({
              name: grqMatched || grqName,
              price: grqPrice,
              policy: ''
            });
          }
        }
      }
    } catch (grqErr) {
      // Leave out.products empty so caller shows the normal error.
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
    var planN = String(sale.plan || '').toLowerCase();
    if (/\brx\s*savers?\b/.test(planN)) {
      var flatRx = 10;
      if (_stNormalizeStatus(sale) === 'chargeback') return -Math.abs(flatRx);
      return flatRx;
    }
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
  if (_stNormalizeStatus(sale) === 'chargeback') return -Math.abs(commission);
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
  if (_stNormalizeStatus(deal) === 'chargeback') planCommission = -Math.abs(planCommission);
  deal.planCommission = planCommission;

  // Sum add-on commissions that belong to this receipt.
  var totalAddon = 0;
  if (deal.receiptId) {
    for (var i = 0; i < sales.length; i++) {
      var s = sales[i];
      if (!s || s.type !== 'addon') continue;
      if (s.receiptId !== deal.receiptId) continue;
      var lineCommAddon = _stComputeLineCommission(s, rates);
      totalAddon += lineCommAddon;
      // Also stamp the add-on so its own fields stay in sync
      var planN = String(s.plan || '').toLowerCase();
      if (/\brx\s*savers?\b/.test(planN)) {
        s.addonCommissionRate = null;
      } else {
        s.addonCommissionRate = typeof s.addonCommissionRate === 'number'
          ? s.addonCommissionRate
          : (rates.addonTypes[_stClassifyAddon(s.plan)] || rates.addonTypes.standard);
      }
      s.addonCommission = lineCommAddon;
    }
  }
  deal.totalAddonCommission = totalAddon;

  // Enrollment bonus: only paid when enrollmentFee is exactly $125
  var bonus = 0;
  if (Number(deal.enrollmentFee) === 125) bonus = rates.enrollmentBonus;
  if (_stNormalizeStatus(deal) === 'chargeback') bonus = -Math.abs(bonus);
  deal.enrollmentBonus = bonus;

  // Expected total = plan + add-ons + bonus (with status logic already applied)
  var expected = planCommission + totalAddon + bonus;
  if (_stNormalizeStatus(deal) === 'chargeback') expected = -Math.abs(expected);
  deal.expectedDealTotal = expected;

  // Preserve any existing audit fields; initialize if missing
  if (typeof deal.payrollNetPaid !== 'number') deal.payrollNetPaid = 0;
  if (typeof deal.auditStatus !== 'number') deal.auditStatus = 0;
  if (!Array.isArray(deal.errorFlags)) deal.errorFlags = [];

  // Auto-flag common audit issues on the deal itself
  var flags = [];
  if (!deal.memberId) flags.push('missing_member_id');
  if (_stNormalizeStatus(deal) !== 'chargeback') {
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


function _stDay3(ts) {
  var d = new Date(Number(ts) || Date.now());
  var names = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return names[d.getDay()] || 'DAY';
}

function _stMd(ts) {
  var d = new Date(Number(ts) || Date.now());
  return d.getMonth() + 1 + '/' + d.getDate();
}

function _stMdY(ts) {
  var d = new Date(Number(ts) || Date.now());
  return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
}

function _stIsCurrentWeekTs(ts) {
  var weekStart = _stStartOfWeek(new Date()).getTime();
  var weekEnd = weekStart + 7 * 24 * 60 * 60 * 1000;
  return Number(ts) >= weekStart && Number(ts) < weekEnd;
}

function _stBuildAddedFlash(customer, ts) {
  var name = (customer || 'Customer').trim() || 'Customer';
  if (_stIsCurrentWeekTs(ts)) {
    return {
      kind: 'ok',
      msg: 'Added ' + name + ' to ' + _stDay3(ts) + ' ' + _stMd(ts)
    };
  }
  return {
    kind: 'warn',
    msg:
      'Added ' +
      name +
      ' for ' +
      _stMdY(ts) +
      ' (not in this week). View in All Sales.'
  };
}

function _stFlashSequence(items, idx) {
  if (!items || !items.length) return;
  var i = typeof idx === 'number' ? idx : 0;
  if (i >= items.length) return;
  _stFlash(items[i].msg, items[i].kind);
  if (i + 1 < items.length) {
    setTimeout(function () {
      _stFlashSequence(items, i + 1);
    }, 2700);
  }
}

function _stFindDuplicateDeal(receiptId, customer, skipSaleId) {
  var rid = String(receiptId || '').trim().toLowerCase();
  var cust = String(customer || '').trim().toLowerCase();
  if (!rid || !cust) return null;
  var sales = _stLoadSales();
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s || s.type !== 'deal') continue;
    if (skipSaleId && s.id === skipSaleId) continue;
    var srid = String(s.receiptId || '').trim().toLowerCase();
    var scust = String(s.customer || '').trim().toLowerCase();
    if (srid === rid && scust === cust) return s;
  }
  return null;
}

function _stMaybeConfirmDuplicate(customer, receiptId) {
  var dup = _stFindDuplicateDeal(receiptId, customer);
  if (!dup) return true;
  var c = (customer || 'Customer').trim() || 'Customer';
  var r = String(receiptId || '').trim();
  return window.confirm(
    c + ' (Policy #' + r + ') was already added earlier. Add this anyway?'
  );
}

function _stBuildUniqueReceiptId(prefix) {
  return (
    (prefix || 'rcpt_') +
    Date.now() +
    '_' +
    Math.random().toString(36).slice(2, 7)
  );
}

function _stResolveReceiptPolicy(parsed, fallbackId) {
  var policy = '';
  if (parsed && parsed.products && parsed.products.length) {
    for (var i = 0; i < parsed.products.length; i++) {
      if (parsed.products[i] && parsed.products[i].policy) {
        policy = String(parsed.products[i].policy).trim();
        if (policy) break;
      }
    }
  }
  return policy || fallbackId;
}

// Current value of the Same-Day vs Post-Date toggle.
function _stGetSaleMode() {
  var el = document.getElementById('st-sale-mode');
  return el && el.value === 'post' ? 'post' : 'same';
}

// Splits a blob of pasted text into individual receipt chunks.
// Primary: each "Confirmation" line (with a Month DD, YYYY date on
// that line or within the next two lines) opens a new receipt, plus
// common Member / Member ID header layouts.
// Fallback when no such headers exist: standalone
// "Central Health Advisors [LLC]" lines (Slack paste without the
// word "Confirmation"). Company-only boundaries are NOT used when
// any Confirmation header was found — that dropped leading receipts
// and merged trailing ones in multi-paste.
// The first chunk starts at starts[0]; any lines before starts[0]
// are discarded. Returns an array of trimmed receipt strings.
function _stSplitReceipts(text) {
  if (!text) return [];
  var raw = String(text)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
  var lines = raw.split('\n');
  // Slack / browser sometimes collapses a receipt onto a single
  // line (no \n at all). When that happens, reconstruct line
  // breaks at known phrase boundaries that always appear in
  // CHA receipts so the downstream line-based passes still work.
  if (lines.length <= 1) {
    raw = raw
      .replace(/\s+(Confirmation\s)/g, '\nConfirmation ')
      .replace(/\s+(MemberName:)/g, '\nMemberName:')
      .replace(/\s+(Address:)/g, '\nAddress:')
      .replace(/\s+(Phone:)/g, '\nPhone:')
      .replace(/\s+(Email:)/g, '\nEmail:')
      .replace(/\s+(Products\s)/g, '\nProducts\n')
      .replace(/\s+(Policy:)/g, '\nPolicy:')
      .replace(/\s+(Active:)/g, '\nActive:')
      .replace(/\s+(Summary\$)/g, '\nSummary$')
      .replace(/\s+(Back to home)/g, '\nBack to home')
      .replace(/\s+(SALE on)/g, '\nSALE on')
      .replace(/\s+(Date:\s)/g, '\nDate: ')
      .replace(/\s+(Order\s#:)/g, '\nOrder #:')
      .replace(/\s+(Total\s\$)/g, '\nTotal $')
      .replace(/\s+(Member\s+ID:)/g, '\nMember ID:')
      .replace(/\s+(Individual\s+-\s+ID:)/g, '\nIndividual - ID:')
      // Standard (CHA confirmation) format splits
      .replace(/(\bone[-\s]?time)\s+(\$)/g, '$1\n$2')
      .replace(/(\$\s*[\d,.]+\s+Product\s+per\s+Month\s+for\s+\w+)\s+([A-Z])/g, '$1\n$2')
      .replace(/(\$\s*[\d,.]+\s+per\s+Month\s+for\s+\w+)\s+([A-Z])/g, '$1\n$2')
      // Member ID format splits
      .replace(/(\bProduct\s+\$\s*[\d,.]+)\s+([A-Z][A-Za-z])/g, '$1\n$2')
      .replace(/(\bEnrollment\s+\$\s*[\d,.]+)\s+(\bProduct\s+\$)/g, '$1\n$2');
    lines = raw.split('\n');
  }

  // Slack / UI noise lines that appear between receipts — strip
  // BEFORE boundary detection so they cannot hide real headers.
  var noiseLinkRe = /^link\s+central\s+health/i;
  var noiseBackRe = /^back\s+to\s+home/i;
  // Slack message timestamps like "4/1 11:27 AM"
  var noiseSlackTsRe = /^\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{2}\s*(am|pm)?$/i;
  // Slack day timestamps like "Friday 9:05 PM"
  var noiseSlackDayRe =
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s+\d{1,2}:\d{2}/i;
  // Slack preview lines like "Member ID: 686934779 Cody Wagner ..."
  // that appear BEFORE the actual receipt text.
  var noiseMemberPreviewRe = /^\s*member\s+id\s*:.*\.{3}/i;
  var filteredLines = [];
  for (var fxi = 0; fxi < lines.length; fxi++) {
    var fxRaw = lines[fxi];
    var fxTrim = fxRaw.trim();
    if (!fxTrim) {
      filteredLines.push(fxRaw);
      continue;
    }
    if (noiseLinkRe.test(fxTrim)) continue;
    if (noiseBackRe.test(fxTrim)) continue;
    if (noiseSlackTsRe.test(fxTrim)) continue;
    if (noiseSlackDayRe.test(fxTrim)) continue;
    if (noiseMemberPreviewRe.test(fxTrim)) continue;
    filteredLines.push(fxRaw);
  }
  lines = filteredLines;

  var monthRe =
    /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\b\s+\d{1,2},?\s+\d{4}/i;
  var confRe = /\bconfirmation\b/i;
  // Standalone company header — not "Link Central Health…" (noise
  // removed above). $ anchor: whole trimmed line is only the name.
  var companyRe = /^\s*central\s+health\s+advisors\s*(llc)?\s*$/i;
  // Stray person-name lines: 2-4 TitleCase words, no digits or
  // special characters. Used to trim trailing Slack sender names
  // that appear between receipts.
  var nameRe = /^[A-Z][A-Za-z'\-]+(?:\s+[A-Z][A-Za-z'\-]+){1,3}$/;

  var companyStarts = [];
  for (var csi = 0; csi < lines.length; csi++) {
    if (companyRe.test((lines[csi] || '').trim())) {
      companyStarts.push(csi);
    }
  }

  // Pass 1: find every line index that opens a new receipt.
  // Primary boundaries (always collected first):
  //   (a) "Confirmation" AND a Month DD, YYYY date on this line or
  //       within the next 2 lines — each confirmation header starts
  //       a new receipt (works for Central Health Advisors vs LLC,
  //       Slack wrappers, enrollment lines, etc.).
  //   (b) "Member" / Member ID layouts when used as headers.
  // Fallback when NO confirmation/member headers were found at all:
  //   use standalone "Central Health Advisors [LLC]" lines (same
  //   as before) so odd pastes without the word "Confirmation" still
  //   split. We never prefer company-only boundaries when at least
  //   one confirmation header exists — that mode dropped entire
  //   receipts (e.g. first sale before the first company line) and
  //   merged the last receipt when only two company lines appeared.
  var confStarts = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (confRe.test(line)) {
      var hasDate =
        monthRe.test(line) ||
        (i + 1 < lines.length && monthRe.test(lines[i + 1])) ||
        (i + 2 < lines.length && monthRe.test(lines[i + 2]));
      if (hasDate) {
        confStarts.push(i);
        continue;
      }
    }
    var isTwoLineMember =
      /^\s*member\s*$/i.test(line) &&
      i + 1 < lines.length &&
      /^\s*id\s*:/i.test(lines[i + 1]);
    var isOneLineMember =
      /^\s*member\s+id\s*:\s*\d{6,}/i.test(line) &&
      !noiseMemberPreviewRe.test(line);
    if (isTwoLineMember || isOneLineMember) {
      confStarts.push(i);
    }
  }

  var starts = [];
  if (confStarts.length) {
    starts = confStarts.slice();
  } else if (companyStarts.length >= 2) {
    starts = companyStarts.slice();
  } else if (companyStarts.length === 1) {
    starts = [companyStarts[0]];
  }

  // No boundaries at all → treat the whole blob as one chunk,
  // still stripped of noise so the parser sees clean input.
  if (!starts.length) {
    var wholeCleaned = [];
    for (var wi = 0; wi < lines.length; wi++) {
      var wlRaw = lines[wi];
      var wl = wlRaw.trim();
      if (!wl) {
        wholeCleaned.push(wlRaw);
        continue;
      }
      if (noiseLinkRe.test(wl)) continue;
      if (noiseBackRe.test(wl)) continue;
      if (noiseSlackTsRe.test(wl)) continue;
      if (noiseSlackDayRe.test(wl)) continue;
      if (noiseMemberPreviewRe.test(wl)) continue;
      wholeCleaned.push(wlRaw);
    }
    var whole = wholeCleaned.join('\n').trim();
    if (whole) {
      console.log('Chunk 0:', whole.substring(0, 80));
      return [whole];
    }
    return [];
  }

  // Pass 2: slice the blob on the discovered starts and clean
  // each chunk. Anything before the first start is discarded.
  var chunks = [];
  for (var j = 0; j < starts.length; j++) {
    var s = starts[j];
    var e = j + 1 < starts.length ? starts[j + 1] : lines.length;
    var chunkLines = lines.slice(s, e);

    // Strip noise lines (Slack decoration + timestamps).
    var cleaned = [];
    for (var cl = 0; cl < chunkLines.length; cl++) {
      var cRaw = chunkLines[cl];
      var cTrim = cRaw.trim();
      if (!cTrim) {
        cleaned.push(cRaw);
        continue;
      }
      if (noiseLinkRe.test(cTrim)) continue;
      if (noiseBackRe.test(cTrim)) continue;
      if (noiseSlackTsRe.test(cTrim)) continue;
      if (noiseSlackDayRe.test(cTrim)) continue;
      if (noiseMemberPreviewRe.test(cTrim)) continue;
      cleaned.push(cRaw);
    }

    // Trim trailing stray name lines — Slack drops sender names
    // between messages, so any 2-4 word TitleCase lines sitting
    // at the tail of the chunk are almost certainly noise from
    // the NEXT receipt's sender and not part of this receipt's
    // Products section.
    while (cleaned.length) {
      var lastRaw = cleaned[cleaned.length - 1];
      var lastTrim = lastRaw.trim();
      if (!lastTrim) {
        cleaned.pop();
        continue;
      }
      if (nameRe.test(lastTrim)) {
        cleaned.pop();
        continue;
      }
      break;
    }

    var chunkText = cleaned.join('\n').trim();
    if (chunkText) {
      chunks.push(chunkText);
      console.log(
        'Chunk ' + (chunks.length - 1) + ':',
        chunkText.substring(0, 80)
      );
    }
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

  var chunks = _stSplitReceipts(text);
  var parsedChunks = [];
  for (var ci = 0; ci < chunks.length; ci++) {
    var chunk = chunks[ci];
    var pc = _stParseReceipt(chunk, true);
    if (!pc || !pc.products.length) continue;
    parsedChunks.push({ parsed: pc, raw: chunk });
  }

  if (!parsedChunks.length) {
    _stOpenEntryModal({
      mode: 'create',
      previewText: text,
      initial: { dateSold: _stTodayIso(), enrollmentFee: 125 }
    });
    return;
  }

  var hasCustomerDetected = false;
  for (var h = 0; h < parsedChunks.length; h++) {
    if (
      parsedChunks[h] &&
      parsedChunks[h].parsed &&
      String(parsedChunks[h].parsed.customer || '').trim()
    ) {
      hasCustomerDetected = true;
      break;
    }
  }
  if (!hasCustomerDetected) {
    _stOpenEntryModal({
      mode: 'create',
      previewText: text,
      initial: { dateSold: _stTodayIso(), enrollmentFee: 125 }
    });
    return;
  }

  var fallbackTs = _stReadDateSoldTs();
  var totalDeals = 0;
  var totalAddons = 0;
  var flashItems = [];
  var flashedCustomers = {};

  if (billDate) {
    var pds = _stLoadPostDates();
    for (var rc = 0; rc < parsedChunks.length; rc++) {
      var parsedA = parsedChunks[rc].parsed;
      var rawA = parsedChunks[rc].raw;
      var customerA = String(parsedA.customer || '').trim() || 'Customer';
      var rcptIdA = _stResolveReceiptPolicy(parsedA, _stBuildUniqueReceiptId('rcpt_'));
      if (!_stMaybeConfirmDuplicate(customerA, rcptIdA)) {
        _stFlash('Cancelled - ' + customerA + ' was not re-added', 'neutral');
        return;
      }
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
          customer: customerA,
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
      var keyA = customerA.toLowerCase();
      if (!flashedCustomers[keyA]) {
        flashItems.push(_stBuildAddedFlash(customerA, baseTsA));
        flashedCustomers[keyA] = true;
      }
    }
    _stSavePostDates(pds);
  } else {
    var sales = _stLoadSales();
    var newDealIdxs = [];
    for (var rc2 = 0; rc2 < parsedChunks.length; rc2++) {
      var parsedB = parsedChunks[rc2].parsed;
      var rawB = parsedChunks[rc2].raw;
      var customerB = String(parsedB.customer || '').trim() || 'Customer';
      var rcptIdB = _stResolveReceiptPolicy(parsedB, _stBuildUniqueReceiptId('rcpt_'));
      if (!_stMaybeConfirmDuplicate(customerB, rcptIdB)) {
        _stFlash('Cancelled - ' + customerB + ' was not re-added', 'neutral');
        return;
      }
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
          customer: customerB,
          memberId: parsedB.memberId || '',
          plan: pp2.name || 'Unknown Plan',
          amount: pp2.price,
          type: isDeal2 ? 'deal' : 'addon',
          status: 'pending',
          raw: rawB,
          notes: pp2.policy ? 'Policy: ' + pp2.policy : '',
          receiptId: rcptIdB,
          receiptTotal: parsedB.receiptTotal,
          enrollmentFee: isDeal2 ? parsedB.enrollmentFee || 0 : 0
        });
        if (isDeal2) {
          newDealIdxs.push(sales.length - 1);
          totalDeals++;
        } else {
          totalAddons++;
        }
      }
      var keyB = customerB.toLowerCase();
      if (!flashedCustomers[keyB]) {
        flashItems.push(_stBuildAddedFlash(customerB, rcTs));
        flashedCustomers[keyB] = true;
      }
    }
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
  _stRender();
  if (flashItems.length) {
    _stFlashSequence(flashItems);
  } else {
    _stFlash(
      'Added ' +
        totalDeals +
        ' deal' +
        (totalDeals === 1 ? '' : 's') +
        (totalAddons ? ' + ' + totalAddons + ' add-ons' : '') +
        '.',
      'ok'
    );
  }
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
  var parsed = _stParseReceipt(text, true);
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
      status: 'pending',
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
  if (!input) return;
  if (!input.value) {
    _stUpdateReceiptPreview();
    return;
  }
  var parsed = _stParseReceipt(input.value, false);
  _stUpdateReceiptPreview();
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

// Bubble preview of parsed receipt (heuristic) while typing — Groq runs on Add.
function _stUpdateReceiptPreview() {
  var wrap = document.getElementById('st-receipt-preview');
  var input = document.getElementById('st-receipt-input');
  if (!wrap || !input) return;
  var txt = input.value.trim();
  if (!txt) {
    wrap.innerHTML = '';
    return;
  }
  var chunks = _stSplitReceipts(txt);
  if (!chunks.length) chunks = [txt];
  var parts = [];
  parts.push(
    '<div class="st-preview-hint">Preview uses fast parsing. <strong>Add</strong> runs Groq AI when your key is active.</div>'
  );
  parts.push('<div class="st-preview-bubbles">');
  var anyContent = false;
  for (var ci = 0; ci < chunks.length; ci++) {
    var p = _stParseReceipt(chunks[ci], false);
    if (!p) continue;
    for (var i = 0; i < p.products.length; i++) {
      var pr = p.products[i];
      var isDeal = i === 0;
      anyContent = true;
      parts.push(
        '<div class="st-preview-bubble">' +
          '<div class="st-pb-badge">' +
          (isDeal ? 'Plan premium' : 'Add-on') +
          '</div>' +
          '<div class="st-pb-name">' +
          _stEscape(pr.name || '—') +
          '</div>' +
          '<div class="st-pb-price">$' +
          (Math.round((Number(pr.price) || 0) * 100) / 100).toFixed(2) +
          '<span>/mo</span></div>' +
          '</div>'
      );
    }
    if (Number(p.enrollmentFee) > 0) {
      anyContent = true;
      parts.push(
        '<div class="st-preview-bubble st-preview-bubble-fee">' +
          '<div class="st-pb-badge">Enrollment fee</div>' +
          '<div class="st-pb-name">One-time</div>' +
          '<div class="st-pb-price">$' +
          (Math.round(Number(p.enrollmentFee) * 100) / 100).toFixed(2) +
          '</div>' +
          '</div>'
      );
    }
  }
  parts.push('</div>');
  if (!anyContent) {
    wrap.innerHTML =
      '<div class="st-preview-empty">No products detected yet — paste more of the receipt or use <strong>Add</strong> with Groq.</div>';
    return;
  }
  wrap.innerHTML = parts.join('');
}

function _stRenderUnrecognizedPreview() {
  var wrap = document.getElementById('st-receipt-preview');
  if (!wrap || !_stUnrecognizedDraft) return;
  var d = _stUnrecognizedDraft;
  var addonCount = d.addons && d.addons.length ? d.addons.length : 0;
  wrap.innerHTML =
    '<div id="st-unrecognized-preview" class="st-preview-card st-unrecognized-preview">' +
    '<div class="st-unrecognized-title">Plan not recognized - review before saving</div>' +
    '<div>Client: ' + _stEscape(d.customer || 'Unknown') + '</div>' +
    '<div>Plan: ' + _stEscape(d.plan || 'Unknown Plan') + '</div>' +
    '<div>Premium: ' + _stFmtMoney(Number(d.amount) || 0) + '</div>' +
    '<div>Add-ons detected: ' + (addonCount ? String(addonCount) : 'none') + '</div>' +
    '<div style="margin-top:10px;">' +
    '<button onclick="_stSaveUnrecognizedDeal()" style="background:#5175F1;color:white;border:none;padding:8px 16px;border-radius:10px;font-weight:600;cursor:pointer;">Save as deal (edit after)</button>' +
    '<button onclick="_stDismissPreview()" style="background:transparent;border:1px solid #999;padding:8px 16px;border-radius:10px;margin-left:8px;cursor:pointer;">Discard</button>' +
    '</div>' +
    '</div>';
}

function _stDismissPreview() {
  _stUnrecognizedDraft = null;
  var wrap = document.getElementById('st-receipt-preview');
  if (wrap) wrap.innerHTML = '';
  var input = document.getElementById('st-receipt-input');
  if (input) input.value = '';
}

function _stSaveUnrecognizedDeal() {
  if (!_stUnrecognizedDraft) return;
  var d = _stUnrecognizedDraft;
  var billDate = _stReadPostDate();
  if (billDate === 'INVALID') {
    _stFlash('Pick a future bill date for the post-date.', 'error');
    return;
  }
  var receiptId =
    'rcpt_unrec_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  var existingReceiptIds = {};
  var existingIds = {};
  var allExisting = _stLoadSales();
  for (var ex = 0; ex < allExisting.length; ex++) {
    if (!allExisting[ex]) continue;
    if (allExisting[ex].id) existingIds[allExisting[ex].id] = true;
    if (allExisting[ex].receiptId) existingReceiptIds[allExisting[ex].receiptId] = true;
  }
  while (existingReceiptIds[receiptId]) {
    receiptId = 'rcpt_unrec_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  }
  var dealId = '';
  if (billDate) {
    var pds = _stLoadPostDates();
    dealId = 'pd_' + Date.now() + '_0_' + Math.random().toString(36).slice(2, 6);
    pds.push({
      id: dealId,
      createdTs: Date.now(),
      billDate: billDate,
      customer: d.customer || 'Unknown',
      memberId: d.memberId || '',
      plan: d.plan || 'Unknown Plan',
      amount: Number(d.amount) || 0,
      type: 'deal',
      raw: d.raw || '',
      notes: '',
      receiptId: receiptId,
      enrollmentFee: Number(d.enrollmentFee) || 0
    });
    for (var pdi = 0; pdi < (d.addons || []).length; pdi++) {
      var ad = d.addons[pdi];
      pds.push({
        id: 'pd_' + Date.now() + '_' + (pdi + 1) + '_' + Math.random().toString(36).slice(2, 6),
        createdTs: Date.now() + pdi + 1,
        billDate: billDate,
        customer: d.customer || 'Unknown',
        memberId: d.memberId || '',
        plan: ad.name || 'Unknown Add-on',
        amount: Number(ad.amount) || 0,
        type: 'addon',
        raw: d.raw || '',
        notes: '',
        receiptId: receiptId
      });
    }
    _stSavePostDates(pds);
    _stDismissPreview();
    var inputPd = document.getElementById('st-receipt-input');
    if (inputPd) inputPd.value = '';
    _stResetPostDateInputs();
    _stRender();
    _stFlash('Saved as post-dated deal. Confirm on billing date to edit.', 'ok');
    return;
  }

  var sales = _stLoadSales();
  var tsBase = _stReadDateSoldTs();
  dealId =
    'st_' + tsBase + '_u_0_' + Math.random().toString(36).slice(2, 6);
  if (existingIds[dealId]) return;
  sales.push({
    id: dealId,
    ts: tsBase,
    customer: d.customer || 'Unknown',
    memberId: d.memberId || '',
    plan: d.plan || 'Unknown Plan',
    amount: Number(d.amount) || 0,
    type: 'deal',
    status: 'pending',
    raw: d.raw || '',
    notes: '',
    receiptId: receiptId,
    receiptTotal: 0,
    enrollmentFee: Number(d.enrollmentFee) || 0
  });
  for (var ai = 0; ai < (d.addons || []).length; ai++) {
    var addon = d.addons[ai];
    var addonId =
      'st_' + tsBase + '_u_' + (ai + 1) + '_' + Math.random().toString(36).slice(2, 6);
    if (existingIds[addonId]) continue;
    sales.push({
      id: addonId,
      ts: tsBase + ai + 1,
      customer: d.customer || 'Unknown',
      memberId: d.memberId || '',
      plan: addon.name || 'Unknown Add-on',
      amount: Number(addon.amount) || 0,
      type: 'addon',
      status: 'pending',
      raw: d.raw || '',
      notes: '',
      receiptId: receiptId,
      receiptTotal: 0,
      enrollmentFee: 0
    });
  }
  var rates = _stLoadCommissionRates();
  for (var si = 0; si < sales.length; si++) {
    if (sales[si].id === dealId) {
      _stStampDealCommission(sales, si, rates);
      break;
    }
  }
  _stSaveSales(sales);
  _stDismissPreview();
  var input = document.getElementById('st-receipt-input');
  if (input) input.value = '';
  _stResetPostDateInputs();
  _stRender();
  _stOpenCommissionEditor(dealId);
  _stFlash('Saved unrecognized receipt. Review fields and save.', 'ok');
}

function _stValidateSalesIntegrity(sales) {
  var deals = sales.filter(function (s) { return s && s.type === 'deal'; });
  var addons = sales.filter(function (s) { return s && s.type === 'addon'; });
  if (deals.length === 0 && addons.length > 0) {
    console.warn('[CHA SALES] Data integrity warning: add-ons exist without any deals');
  }
  var ids = {};
  for (var i = 0; i < sales.length; i++) {
    if (!sales[i]) continue;
    if (ids[sales[i].id]) {
      console.warn('[CHA SALES] Duplicate sale id found:', sales[i].id);
    }
    ids[sales[i].id] = true;
  }
  for (var j = 0; j < sales.length; j++) {
    if (!sales[j]) continue;
    if (!sales[j].type) {
      console.warn('[CHA SALES] Sale missing type:', sales[j].id);
      sales[j].type = 'deal';
    }
  }
  return sales;
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
    status: 'pending',
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
    newStatus !== 'pending' &&
    newStatus !== 'cleared' &&
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
  var lid = String(id);
  var sales = _stLoadSales();
  var target = null;
  for (var di = 0; di < sales.length; di++) {
    if (sales[di] && String(sales[di].id) === lid) {
      target = sales[di];
      break;
    }
  }
  if (!target) return;
  var rid = target.receiptId ? String(target.receiptId) : '';
  var filtered;
  if (rid) {
    filtered = sales.filter(function (s) {
      return !s || String(s.receiptId || '') !== rid;
    });
  } else {
    filtered = sales.filter(function (s) {
      return !s || String(s.id) !== lid;
    });
  }
  _stSaveSales(filtered);
  _stSelectedIds = {};
  _stRender();
  _stFlash('Sale deleted.', 'ok');
}

// Transient flash message at the top of the input section.
function _stFlash(msg, kind) {
  var el = document.getElementById('st-flash');
  if (!el) return;
  el.textContent = msg;
  var cls = 'ok';
  if (kind === 'error') cls = 'error';
  else if (kind === 'warn') cls = 'warn';
  else if (kind === 'neutral') cls = 'neutral';
  el.className = 'st-flash st-flash-' + cls;
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
    dayBuckets.push({
      amount: 0,
      count: 0,
      date: bd,
      commission: 0,
      dealCount: 0,
      addonCount: 0,
      addonCommission: 0
    });
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
    weekExpectedCommission: 0,
    weekCommissionValid: 0,
    weekAddonCommissionOnly: 0
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
    if (_stNormalizeStatus(ds) !== 'chargeback' && ds.receiptId) {
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
    if (_stNormalizeStatus(s) === 'chargeback') continue;
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
    if (
      s.type === 'deal' &&
      Number(s.enrollmentAmount || s.enrollmentFee || 0) === 125
    ) {
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
      var lineAmt2 = Number(s.amount) || 0;
      dayBuckets[idx].amount += lineAmt2;
      dayBuckets[idx].count += 1;
      var lineComm = _stComputeLineCommission(s, rates);
      if (s.type === 'deal') {
        lineComm += Number(s.enrollmentBonus) || 0;
        dayBuckets[idx].dealCount += 1;
      } else {
        dayBuckets[idx].addonCount += 1;
        dayBuckets[idx].addonCommission += lineComm;
        stats.weekAddonCommissionOnly += lineComm;
      }
      dayBuckets[idx].commission += lineComm;
      stats.weekCommissionValid += lineComm;
    }
  }
  stats.weekExpectedCommission += _stCurrentTierBonus(stats);
  return stats;
}

// ── HTML BUILDERS ───────────────────────────────────────────
function _stCurrentTierBonus(stats) {
  var bonus = 0;
  for (var i = 0; i < ST_BONUS_TIERS.length; i++) {
    if (stats.weekDeals >= ST_BONUS_TIERS[i].deals && stats.weekAddons >= ST_BONUS_TIERS[i].addons) {
      bonus = ST_BONUS_TIERS[i].bonus;
    }
  }
  return bonus;
}

function _stPaycheckBreakdown(sales, stats) {
  var dealComm = 0;
  var addonComm = 0;
  var enrollmentBonus = 0;
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s || s.type !== 'deal') continue;
    if (s.ts < stats.weekStart) continue;
    dealComm += Number(s.planCommission) || 0;
    addonComm += Number(s.totalAddonCommission) || 0;
    enrollmentBonus += Number(s.enrollmentBonus) || 0;
  }
  var tierBonus = _stCurrentTierBonus(stats);
  var estimated = dealComm + addonComm + enrollmentBonus + tierBonus;
  return {
    dealComm: dealComm,
    addonComm: addonComm,
    enrollmentBonus: enrollmentBonus,
    tierBonus: tierBonus,
    estimated: estimated
  };
}

function _stOpenCommissionEditorFromTracker() {
  var sales = _stLoadSales();
  var stats = _stCalcStats(sales);
  var ws = stats.weekStart;
  for (var i = 0; i < sales.length; i++) {
    if (!sales[i] || sales[i].type !== 'deal') continue;
    if (sales[i].status !== 'valid') continue;
    if (sales[i].ts < ws) continue;
    _stOpenCommissionEditor(sales[i].id);
    return;
  }
  _stFlash('No deals this week to edit commission rates from.', 'error');
}

function _stBuildInput() {
  var today = _stTodayIso();
  var html = '<div class="st-input-section">';
  html +=
    '<label class="st-input-label" for="st-receipt-input">Paste enrollment receipt</label>';
  html +=
    '<textarea id="st-receipt-input" class="st-textarea" rows="4" ' +
    'oninput="_stReceiptInputChanged()" ' +
    'placeholder="Paste the full enrollment receipt here. Groq AI extracts plan premium, enrollment fee, and add-ons when you tap Add."></textarea>';
  html += '<div id="st-receipt-preview" class="st-receipt-preview" aria-live="polite"></div>';
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
    '<button type="button" id="st-btn-auto-detect" class="st-add-deal" onclick="_stAutoDetectAndAdd()">Auto-detect &amp; Add</button>';
  html +=
    '<button type="button" id="st-btn-enter-manually" class="st-add-addon st-input-link" onclick="_stOpenEntryModal({mode:\'create\', initial:{dateSold:_stTodayIso(), enrollmentFee:125}})">Enter manually</button>';
  html +=
    '<button type="button" id="st-btn-add-deal" class="st-add-addon st-input-link" onclick="_stAddSale(\'deal\')">Add as Deal</button>';
  html +=
    '<button type="button" id="st-btn-add-addon" class="st-add-addon st-input-link" onclick="_stAddSale(\'addon\')">Add as Add-on</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function _stSetAddSalePanelOpen(open) {
  var panel = document.getElementById('st-add-sale-panel');
  var btn = document.getElementById('st-add-sale-toggle');
  if (!panel) return;
  panel.style.display = open ? 'block' : 'none';
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    var ta = document.getElementById('st-receipt-input');
    if (ta) {
      setTimeout(function () {
        try {
          ta.focus();
        } catch (_e) {}
      }, 10);
    }
  }
}

function _stToggleAddSalePanel() {
  var panel = document.getElementById('st-add-sale-panel');
  if (!panel) return;
  var hidden =
    panel.style.display === 'none' ||
    panel.style.display === '' ||
    !panel.style.display;
  _stSetAddSalePanelOpen(hidden);
}

function _stTogglePaycheckBreakdown() {
  var el = document.getElementById('st-paycheck-detail');
  var link = document.getElementById('st-paycheck-toggle-link');
  if (!el) {
    _stOpenCommissionEditorFromTracker();
    return;
  }
  var hidden =
    el.style.display === 'none' || el.style.display === '' || !el.style.display;
  el.style.display = hidden ? 'block' : 'none';
  if (link) link.textContent = hidden ? 'Hide breakdown' : 'View full breakdown';
}

function _stBuildAddSaleSection() {
  return (
    '<section class="st-sec st-sec-addsale" aria-label="Add a sale">' +
    '<button type="button" id="st-add-sale-toggle" class="st-add-sale-toggle" aria-expanded="false" onclick="_stToggleAddSalePanel()"><span class="st-add-sale-icon">+</span><span>Add new sale</span></button>' +
    '<div id="st-add-sale-panel" class="st-add-sale-panel" style="display:none">' +
    _stBuildInput() +
    '</div></section>'
  );
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

// Module-level table filter. Defaults to 'week' and is NOT
// persisted — a page reload resets it because this script
// re-executes from scratch.
var _stTableFilter = 'week';

// Bulk-delete selection state: { saleId: true }. Resets on
// page reload and whenever the user flips out of 'all' mode.
var _stSelectedIds = {};

// Toggle handler: called from the This Week / All Sales
// buttons at the top of the sales table.
function _stSetTableFilter(mode) {
  _stTableFilter = mode === 'all' ? 'all' : 'week';
  _stSelectedIds = {};
  _stRender();
}

function _stToggleSaleSelectionFromCb(el) {
  var id = el && el.getAttribute ? el.getAttribute('data-id') : '';
  _stToggleSaleSelection(id);
}

// Row checkbox handler (bulk delete).
function _stToggleSaleSelection(id) {
  var k = String(id == null ? '' : id);
  if (!k) return;
  if (_stSelectedIds[k]) {
    delete _stSelectedIds[k];
  } else {
    _stSelectedIds[k] = true;
  }
  _stBulkSelectionChanged();
}

function _stBulkSelectionChanged() {
  var ids = [];
  for (var k in _stSelectedIds) {
    if (_stSelectedIds.hasOwnProperty(k) && _stSelectedIds[k]) ids.push(k);
  }
  var bar = document.getElementById('st-bulk-bar');
  var count = document.getElementById('st-bulk-count');
  if (count) count.textContent = ids.length + ' selected';
  if (bar) bar.style.display = ids.length ? 'block' : 'none';
}

function _stBulkToggleAll(checked) {
  var cbs = document.querySelectorAll('.st-bulk-cb');
  _stSelectedIds = {};
  for (var i = 0; i < cbs.length; i++) {
    cbs[i].checked = !!checked;
    var sid = cbs[i].getAttribute('data-id');
    if (checked && sid) _stSelectedIds[String(sid)] = true;
  }
  _stBulkSelectionChanged();
}

function _stBulkDelete() {
  var ids = [];
  for (var k in _stSelectedIds) {
    if (_stSelectedIds.hasOwnProperty(k) && _stSelectedIds[k]) ids.push(String(k));
  }
  if (!ids.length) return;
  if (!confirm('Delete ' + ids.length + ' selected sales?')) {
    return;
  }
  var kill = {};
  for (var ki = 0; ki < ids.length; ki++) kill[ids[ki]] = true;
  var sales = _stLoadSales();
  var killRid = {};
  for (var ri = 0; ri < sales.length; ri++) {
    var sr = sales[ri];
    if (!sr) continue;
    if (kill[String(sr.id)] && sr.receiptId) {
      killRid[String(sr.receiptId)] = true;
    }
  }
  var before = sales.length;
  var filtered = sales.filter(function (s) {
    if (!s) return true;
    if (kill[String(s.id)]) return false;
    if (s.receiptId && killRid[String(s.receiptId)]) return false;
    return true;
  });
  var removed = before - filtered.length;
  if (removed < 1) {
    _stFlash('Could not delete the selected rows. Try re-selecting.', 'warn');
    return;
  }
  _stSaveSales(filtered);
  _stSelectedIds = {};
  _stRender();
  _stFlash(removed + ' sales deleted', 'ok');
}

function _stBulkClear() {
  _stSelectedIds = {};
  var cbs = document.querySelectorAll('.st-bulk-cb');
  for (var i = 0; i < cbs.length; i++) cbs[i].checked = false;
  var all = document.querySelector('.st-bulk-all');
  if (all) all.checked = false;
  _stBulkSelectionChanged();
}

// Delete every logged sale after two confirmations.
function _stBulkDeleteAll() {
  var sales = _stLoadSales();
  if (!sales.length) {
    _stFlash('No sales to delete.', 'error');
    return;
  }
  if (
    !confirm(
      'Permanently delete ALL ' +
        sales.length +
        ' sales? This cannot be undone.'
    )
  ) {
    return;
  }
  if (
    !confirm('Are you absolutely sure? This will wipe every logged sale.')
  ) {
    return;
  }
  _stSaveSales([]);
  _stSelectedIds = {};
  _stRender();
  _stFlash('All sales deleted.', 'ok');
}

// Buckets rows by receiptId (or one row per orphan id) so Deal +
// add-ons from the same receipt render as one combined card.
function _stGroupRowsForDisplay(rows) {
  var buckets = {};
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (!r) continue;
    var key = r.receiptId ? String(r.receiptId) : '_id_' + r.id;
    if (!buckets[key]) buckets[key] = { deal: null, addons: [] };
    var b = buckets[key];
    if (r.type === 'deal') b.deal = r;
    else if (r.type === 'addon') b.addons.push(r);
  }
  var keys = Object.keys(buckets).sort(function (a, c) {
    var ba = buckets[a];
    var bc = buckets[c];
    var ta = 0;
    if (ba.deal) ta = Math.max(ta, ba.deal.ts);
    for (var ia = 0; ia < ba.addons.length; ia++) {
      ta = Math.max(ta, ba.addons[ia].ts);
    }
    var tc = 0;
    if (bc.deal) tc = Math.max(tc, bc.deal.ts);
    for (var ic = 0; ic < bc.addons.length; ic++) {
      tc = Math.max(tc, bc.addons[ic].ts);
    }
    return tc - ta;
  });
  var out = [];
  for (var k = 0; k < keys.length; k++) {
    var g = buckets[keys[k]];
    g.addons.sort(function (a, b) {
      return b.ts - a.ts;
    });
    out.push(g);
  }
  return out;
}

function _stWeekCardDateLabel(ts) {
  var d = new Date(ts);
  var names = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return names[d.getDay()] + ' ' + (d.getMonth() + 1) + '/' + d.getDate();
}

function _stFormatSaleShortDate(ts) {
  var d = new Date(ts);
  return d.getMonth() + 1 + '/' + d.getDate();
}

function _stStatusAbbrevForTable(sale) {
  var st = _stNormalizeStatus(sale);
  if (st === 'cleared') return 'Clr';
  if (st === 'chargeback') return 'Cbk';
  return 'Pnd';
}

function _stGroupMatchesDateChip(grp) {
  var ts = _stGroupListTs(grp);
  var mode = _stAllSalesRange || 'all';
  if (mode === 'all') return true;
  var now = new Date();
  if (mode === 'month') {
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return ts >= monthStart;
  }
  if (mode === 'lastMonth') {
    var y = now.getFullYear();
    var m = now.getMonth();
    var lmStart = new Date(y, m - 1, 1).getTime();
    var lmEnd = new Date(y, m, 0, 23, 59, 59, 999).getTime();
    return ts >= lmStart && ts <= lmEnd;
  }
  if (mode === 'last7') {
    return ts >= Date.now() - 7 * 24 * 60 * 60 * 1000;
  }
  if (mode === 'custom') {
    var d0 = _stCustomRangeFrom
      ? new Date(_stCustomRangeFrom + 'T00:00:00').getTime()
      : 0;
    var d1 = _stCustomRangeTo
      ? new Date(_stCustomRangeTo + 'T23:59:59.999').getTime()
      : 8e15;
    return ts >= d0 && ts <= d1;
  }
  return true;
}

function _stGroupMatchesAllListFilters(grp) {
  if (!_stGroupMatchesDateChip(grp)) return false;
  var stF = _stAllStatusFilter || 'all';
  if (stF !== 'all') {
    var gst = _stGroupListStatus(grp);
    if (stF !== gst) return false;
  }
  var q = (_stAllSearchQuery || '').trim().toLowerCase();
  if (!q) return true;
  var lead = grp.deal || grp.addons[0];
  if (!lead) return false;
  var hay =
    String(lead.customer || '') +
    ' ' +
    String(lead.plan || '') +
    ' ' +
    String(lead.memberId || '');
  return hay.toLowerCase().indexOf(q) !== -1;
}

function _stAddonLineCommission(s) {
  if (typeof s.addonCommission === 'number') {
    var c = Number(s.addonCommission);
    if (_stNormalizeStatus(s) === 'chargeback') c = -Math.abs(c);
    return c;
  }
  var r =
    typeof s.addonCommissionRate === 'number'
      ? s.addonCommissionRate
      : _stLoadCommissionRates().addonTypes[_stClassifyAddon(s.plan)] || 0.25;
  var c = (Number(s.amount) || 0) * r;
  if (_stNormalizeStatus(s) === 'chargeback') c = -Math.abs(c);
  return c;
}

function _stGroupCommissionDisplay(grp) {
  if (grp.deal) return Number(grp.deal.expectedDealTotal) || 0;
  var t = 0;
  for (var i = 0; i < grp.addons.length; i++) {
    t += _stAddonLineCommission(grp.addons[i]);
  }
  return t;
}

function _stSetAllSalesChip(mode) {
  _stAllSalesRange = mode || 'all';
  _stAllRowsShown = 10;
  _stSelectedIds = {};
  _stRender();
}

function _stApplyCustomDateRange() {
  var f = document.getElementById('st-all-date-from');
  var t = document.getElementById('st-all-date-to');
  _stCustomRangeFrom = f && f.value ? f.value : '';
  _stCustomRangeTo = t && t.value ? t.value : '';
  _stAllRowsShown = 10;
  _stRender();
}

function _stSetAllStatusFilter(v) {
  _stAllStatusFilter = v || 'all';
  _stAllRowsShown = 10;
  _stRender();
}

function _stQueueAllSearchRender(q) {
  _stAllSearchQuery = String(q == null ? '' : q);
  clearTimeout(window._stSearchRerenderT);
  window._stSearchRerenderT = setTimeout(function () {
    _stAllRowsShown = 10;
    _stRender();
  }, 200);
}

function _stShowMoreAllSales() {
  _stAllRowsShown = Math.min((_stAllRowsShown || 10) + 18, 50);
  _stRender();
}

function _stDeleteSaleGroupByLeadId(leadId) {
  if (!confirm('Permanently delete this sale and any linked add-ons?')) return;
  var sales = _stLoadSales();
  var target = null;
  var lid = String(leadId);
  for (var i = 0; i < sales.length; i++) {
    if (sales[i] && String(sales[i].id) === lid) {
      target = sales[i];
      break;
    }
  }
  if (!target) return;
  var rid = target.receiptId ? String(target.receiptId) : '';
  var filtered;
  if (rid) {
    filtered = sales.filter(function (s) {
      return !s || String(s.receiptId || '') !== rid;
    });
  } else {
    filtered = sales.filter(function (s) {
      return !s || String(s.id) !== lid;
    });
  }
  _stSaveSales(filtered);
  _stSelectedIds = {};
  _stRender();
  _stFlash('Sale deleted.', 'ok');
}

function _stFormatSaleListDate(ts) {
  var d = new Date(ts);
  return (
    d.getMonth() +
    1 +
    '/' +
    d.getDate() +
    ' ' +
    String(d.getHours()).padStart(2, '0') +
    ':' +
    String(d.getMinutes()).padStart(2, '0')
  );
}

function _stGroupListTs(g) {
  var t = 0;
  if (g.deal) t = Math.max(t, g.deal.ts);
  for (var i = 0; i < g.addons.length; i++) {
    t = Math.max(t, g.addons[i].ts);
  }
  return t;
}

function _stGroupListStatus(g) {
  if (g.deal) return _stNormalizeStatus(g.deal);
  if (g.addons.length) return _stNormalizeStatus(g.addons[0]);
  return 'pending';
}

function _stCommissionCellHtml(s) {
  if (s.type === 'deal') {
    var expected = Number(s.expectedDealTotal) || 0;
    var planComm = Number(s.planCommission) || 0;
    var addonComm = Number(s.totalAddonCommission) || 0;
    var bonus = Number(s.enrollmentBonus) || 0;
    var rate = Number(s.planCommissionRate) || 0;
    return (
      '<div class="st-comm-cell">' +
      '<div class="st-comm-total">$' +
      expected.toFixed(2) +
      '</div>' +
      '<div class="st-comm-breakdown">' +
      'plan $' +
      planComm.toFixed(2) +
      ' @ ' +
      Math.round(rate * 100) +
      '%' +
      (addonComm !== 0 ? ' + addons $' + addonComm.toFixed(2) : '') +
      (bonus !== 0 ? ' + bonus $' + bonus.toFixed(2) : '') +
      '</div>' +
      '<button type="button" class="st-comm-edit" title="Edit commission rates for this deal" onclick="_stOpenCommissionEditor(\'' +
      s.id +
      '\')">Edit</button>' +
      '</div>'
    );
  }
  var aRate =
    typeof s.addonCommissionRate === 'number'
      ? s.addonCommissionRate
      : _stLoadCommissionRates().addonTypes[_stClassifyAddon(s.plan)] || 0.25;
  var aComm = (Number(s.amount) || 0) * aRate;
  if (_stNormalizeStatus(s) === 'chargeback') aComm = -Math.abs(aComm);
  return (
    '<div class="st-comm-cell">' +
    '<div class="st-comm-total">$' +
    aComm.toFixed(2) +
    '</div>' +
    '<div class="st-comm-breakdown">' +
    Math.round(aRate * 100) +
    '% (' +
    _stClassifyAddon(s.plan) +
    ')</div>' +
    '<button type="button" class="st-comm-edit" title="Edit sale group" onclick="_stOpenCommissionEditor(\'' +
    s.id +
    '\')">Edit</button>' +
    '</div>'
  );
}

function _stRenderSaleSegment(s, isAll, opts) {
  opts = opts || {};
  var showCustomer = opts.showCustomer !== false;
  var typeClass = s.type === 'addon' ? 'st-type-addon' : 'st-type-deal';
  var typeLabel = s.type === 'addon' ? 'Add-on' : 'Deal';
  var customerCell =
    '<div class="st-customer-name">' + _stEscape(s.customer || '\u2014') + '</div>';
  if (s.memberId) {
    customerCell += '<div class="st-member-id">ID: ' + _stEscape(s.memberId) + '</div>';
  }
  var enrollChip = '';
  if (s.type === 'deal' && Number(s.enrollmentFee) > 0) {
    enrollChip =
      '<div class="st-sale-bubble-fee">Enrollment fee: $' +
      (Math.round(Number(s.enrollmentFee) * 100) / 100).toFixed(2) +
      '</div>';
  }
  return (
    '<div class="st-combo-segment st-sale-bubble-has-cb">' +
    (isAll
      ? '<div class="st-sale-bubble-cb"><input type="checkbox"' +
        (_stSelectedIds[s.id] ? ' checked' : '') +
        ' onclick="_stToggleSaleSelection(\'' +
        s.id +
        '\')" aria-label="Select sale"></div>'
      : '') +
    '<div class="st-combo-segment-main">' +
    '<div class="st-combo-segment-head">' +
    '<div class="st-sale-bubble-badges"><span class="' +
    typeClass +
    '">' +
    typeLabel +
    '</span></div>' +
    '<button type="button" class="st-delete" title="Delete permanently" aria-label="Delete permanently" onclick="_stDeleteSale(\'' +
    s.id +
    '\')">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>' +
    '<path d="M10 11v6"/><path d="M14 11v6"/>' +
    '<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>' +
    '</svg></button></div>' +
    (showCustomer
      ? '<div class="st-sale-bubble-customer">' + customerCell + '</div>'
      : '') +
    '<div class="st-sale-bubble-plan">' +
    _stEscape(s.plan || 'Unknown Plan') +
    '</div>' +
    '<div class="st-sale-bubble-amt">$' +
    (Math.round((Number(s.amount) || 0) * 100) / 100).toFixed(2) +
    '<span>/mo</span></div>' +
    enrollChip +
    '<div class="st-sale-bubble-comm">' +
    _stCommissionCellHtml(s) +
    '</div>' +
    '<div class="st-sale-bubble-status">' +
    '<select class="st-status-select" onchange="_stUpdateStatus(\'' +
    s.id +
    '\', this.value)">' +
    '<option value="pending"' +
    (_stNormalizeStatus(s) === 'pending' ? ' selected' : '') +
    '>Pending</option>' +
    '<option value="cleared"' +
    (_stNormalizeStatus(s) === 'cleared' ? ' selected' : '') +
    '>Cleared</option>' +
    '<option value="chargeback"' +
    (_stNormalizeStatus(s) === 'chargeback' ? ' selected' : '') +
    '>Chargeback</option>' +
    '</select><div class="st-status-note">' +
    _stEscape(_stStatusText(s)) +
    '</div></div>' +
    '</div></div>'
  );
}

function _stRenderSaleGroupCard(g, isAll) {
  var st = _stGroupListStatus(g);
  var dateStr = _stFormatSaleListDate(_stGroupListTs(g));
  var isCombo = (g.deal && g.addons.length > 0) || (!g.deal && g.addons.length > 1);
  var isSolo = !isCombo;
  var parts = [];
  parts.push(
    '<article class="st-sale-bubble-card' +
      (isCombo ? ' st-sale-bubble-combo' : ' st-sale-bubble-solo') +
      (isSolo && isAll ? ' st-sale-bubble-has-cb' : '') +
      ' st-row st-row-' +
      st +
      '">'
  );
  parts.push(
    '<div class="st-sale-bubble-top st-combo-card-top">' +
      '<span class="st-sale-bubble-date">' +
      _stEscape(dateStr) +
      '</span></div>'
  );
  if (g.deal) {
    parts.push(_stRenderSaleSegment(g.deal, isAll, { showCustomer: true }));
  }
  if (g.addons.length) {
    if (g.deal || g.addons.length > 1) {
      parts.push('<div class="st-combo-divider">Add-ons</div>');
    }
    for (var a = 0; a < g.addons.length; a++) {
      parts.push(
        _stRenderSaleSegment(g.addons[a], isAll, {
          showCustomer: !g.deal && a === 0
        })
      );
    }
  }
  parts.push('</article>');
  return parts.join('');
}

function _stRenderWeekCompactCard(g) {
  var lead = g.deal || (g.addons.length ? g.addons[0] : null);
  if (!lead) return '';
  var st = _stGroupListStatus(g);
  var ts = _stGroupListTs(g);
  var dateLabel = _stWeekCardDateLabel(ts);
  var lid = String(lead.id);
  var pillLabel = g.deal ? 'DEAL' : 'ADD-ON';
  var pillClass = g.deal ? 'st-week-deal-pill' : 'st-week-deal-pill st-week-pill-addon';
  var actions =
    '<div class="st-week-card-actions">' +
    '<button type="button" class="st-week-card-icon" title="Edit" aria-label="Edit" onclick="event.stopPropagation();_stOpenCommissionEditor(\'' +
    lid +
    '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>' +
    '<button type="button" class="st-week-card-icon" title="Delete" aria-label="Delete" onclick="event.stopPropagation();_stDeleteSaleGroupByLeadId(\'' +
    lid +
    '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
    '</div>';
  var premAmt = g.deal ? Number(g.deal.amount) || 0 : Number(lead.amount) || 0;
  var idLine =
    (lead.memberId ? 'ID: ' + _stEscape(String(lead.memberId)) + ' · ' : '') +
    _stEscape(lead.plan || '—');
  var commBox = '';
  if (g.deal) {
    var d = g.deal;
    var rate = Math.round((Number(d.planCommissionRate) || 0) * 100);
    var planComm = Number(d.planCommission) || 0;
    var addonComm = Number(d.totalAddonCommission) || 0;
    var expected = Number(d.expectedDealTotal) || 0;
    commBox =
      '<div class="st-week-comm-box">' +
      '<div class="st-week-comm-row"><span>plan · ' +
      rate +
      '%</span><span>$' +
      planComm.toFixed(2) +
      '</span></div>';
    if (addonComm !== 0) {
      commBox +=
        '<div class="st-week-comm-row"><span>+ add-ons</span><span>$' +
        addonComm.toFixed(2) +
        '</span></div>';
    }
    commBox +=
      '<div class="st-week-comm-div"></div>' +
      '<div class="st-week-comm-row st-week-comm-total"><span>Commission</span><span>$' +
      expected.toFixed(2) +
      '</span></div></div>';
  } else {
    var exp2 = _stGroupCommissionDisplay(g);
    commBox =
      '<div class="st-week-comm-box"><div class="st-week-comm-row st-week-comm-total"><span>Commission</span><span>$' +
      exp2.toFixed(2) +
      '</span></div></div>';
  }
  var addonSec = '';
  if (g.deal && g.addons.length) {
    addonSec =
      '<div class="st-week-dash"></div><div class="st-week-addon-label">' +
      g.addons.length +
      ' ADD-ON' +
      (g.addons.length === 1 ? '' : 'S') +
      '</div>';
    for (var ai = 0; ai < g.addons.length; ai++) {
      var ax = g.addons[ai];
      addonSec +=
        '<div class="st-week-addon-strip"><span class="st-week-addon-pill">ADD</span>' +
        '<span class="st-week-addon-name">' +
        _stEscape(ax.plan || 'Add-on') +
        '</span>' +
        '<span class="st-week-addon-price">$' +
        (Number(ax.amount) || 0).toFixed(2) +
        '</span></div>';
    }
  }
  var h =
    '<article class="st-week-compact-card st-row st-row-' +
    st +
    '"><div class="st-week-card-toprow"><span class="' +
    pillClass +
    '">' +
    pillLabel +
    '</span><span class="st-week-card-date">' +
    _stEscape(dateLabel) +
    '</span>' +
    actions +
    '</div><div class="st-week-card-client">' +
    _stEscape(lead.customer || '—') +
    '</div><div class="st-week-card-meta">' +
    idLine +
    '</div><div class="st-week-card-prem">$' +
    premAmt.toFixed(2) +
    '<span>/mo</span></div>' +
    commBox +
    addonSec +
    '</article>';
  return h;
}

function _stBuildTable(sales) {
  var stats = _stCalcStats(sales);
  var weekStart = _stStartOfWeek(new Date()).getTime();
  var weekRows = sales
    .filter(function (s) {
      return s && s.ts >= weekStart;
    })
    .sort(function (a, b) {
      return b.ts - a.ts;
    });
  var weekGroups = _stGroupRowsForDisplay(weekRows);
  var allRowsSorted = sales.slice().sort(function (a, b) {
    return b.ts - a.ts;
  });
  var allGroups = _stGroupRowsForDisplay(allRowsSorted);
  var filteredAll = [];
  for (var fi = 0; fi < allGroups.length; fi++) {
    if (_stGroupMatchesAllListFilters(allGroups[fi])) filteredAll.push(allGroups[fi]);
  }
  var totalFiltered = filteredAll.length;
  var pageLen = Math.min(Math.max(_stAllRowsShown || 10, 10), 50);
  var paged = filteredAll.slice(0, pageLen);
  var selectedCount = 0;
  for (var sid in _stSelectedIds) {
    if (_stSelectedIds.hasOwnProperty(sid) && _stSelectedIds[sid]) selectedCount++;
  }
  var wkMeta =
    _stFmtMoney(stats.weekSales) + ' · ' + _stFmtMoney(stats.weekExpectedCommission) + ' comm';

  var html = '<div class="st-table-section st-sales-log st-sales-log-split">';
  html += '<div class="st-sales-split-grid">';
  html += '<div class="st-week-split-col">';
  html +=
    '<div class="st-split-col-head"><span class="st-split-title">This week (' +
    weekGroups.length +
    ')</span><span class="st-split-meta">' +
    _stEscape(wkMeta) +
    '</span></div>';
  html += '<div class="st-week-cards-scroller">';
  if (!weekGroups.length) {
    html += '<div class="st-empty st-empty-tight">No sales logged yet this week.</div>';
  } else {
    for (var wi = 0; wi < weekGroups.length; wi++) {
      html += _stRenderWeekCompactCard(weekGroups[wi]);
    }
  }
  html += '</div></div>';

  html += '<div class="st-all-split-col">';
  html +=
    '<div class="st-split-col-head st-split-col-head-row2"><span class="st-split-title">All sales (' +
    totalFiltered +
    ')</span><button type="button" class="st-export-link" onclick="_stExportAllSalesCsv()">↓ Export</button></div>';

  function chip(val, label) {
    var act = _stAllSalesRange === val ? ' st-chip-active' : '';
    return (
      '<button type="button" class="st-date-chip' +
      act +
      '" onclick="_stSetAllSalesChip(\'' +
      val +
      '\')">' +
      _stEscape(label) +
      '</button>'
    );
  }
  html += '<div class="st-date-chips">';
  html += chip('all', 'All time');
  html += chip('month', 'This month');
  html += chip('lastMonth', 'Last month');
  html += chip('last7', 'Last 7 days');
  html +=
    '<button type="button" class="st-date-chip' +
    (_stAllSalesRange === 'custom' ? ' st-chip-active' : '') +
    '" onclick="_stSetAllSalesChip(\'custom\')"><svg class="st-chip-cal" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Custom</button>';
  html += '</div>';

  var customVis = _stAllSalesRange === 'custom' ? 'block' : 'none';
  html +=
    '<div class="st-custom-range-row" style="display:' +
    customVis +
    '"><span class="st-custom-label">Custom range:</span>' +
    '<input type="date" id="st-all-date-from" class="st-date-chip-input" value="' +
    _stEscape(_stCustomRangeFrom) +
    '">' +
    '<span class="st-custom-arrow" aria-hidden="true">→</span>' +
    '<input type="date" id="st-all-date-to" class="st-date-chip-input" value="' +
    _stEscape(_stCustomRangeTo) +
    '">' +
    '<button type="button" class="st-custom-apply" onclick="_stApplyCustomDateRange()">Apply</button></div>';

  html += '<div class="st-all-filter-row">';
  html +=
    '<input type="text" class="st-all-search" placeholder="Search client, plan, ID…" value="' +
    _stEscape(_stAllSearchQuery) +
    '" oninput="_stQueueAllSearchRender(this.value)">';
  html += '<select class="st-all-status-dd" onchange="_stSetAllStatusFilter(this.value)">';
  var stOpts = [
    ['all', 'All status'],
    ['cleared', 'Cleared'],
    ['pending', 'Pending'],
    ['chargeback', 'Chargeback']
  ];
  for (var si = 0; si < stOpts.length; si++) {
    html +=
      '<option value="' +
      stOpts[si][0] +
      '"' +
      (_stAllStatusFilter === stOpts[si][0] ? ' selected' : '') +
      '>' +
      stOpts[si][1] +
      '</option>';
  }
  html += '</select></div>';

  html +=
    '<div id="st-bulk-bar" class="st-bulk-bar-compact" style="' +
    (selectedCount ? 'display:flex;' : 'display:none;') +
    '"><span id="st-bulk-count">' +
    selectedCount +
    ' selected</span><span class="st-bulk-actions"><button type="button" class="st-bulk-del" onclick="_stBulkDelete()">Delete</button><button type="button" class="st-bulk-can" onclick="_stBulkClear()">Cancel</button></span></div>';

  html += '<div class="st-compact-table-wrap">';
  html += '<div class="st-compact-head">';
  html +=
    '<span class="st-cch st-cch-cb"><input type="checkbox" class="st-bulk-all" aria-label="Select all" onchange="_stBulkToggleAll(this.checked)"></span>';
  html += '<span class="st-cch st-cch-dt">Date</span>';
  html += '<span class="st-cch st-cch-cp">Client · plan</span>';
  html += '<span class="st-cch st-cch-pr">Premium</span>';
  html += '<span class="st-cch st-cch-cm">Comm.</span>';
  html += '<span class="st-cch st-cch-st">Sts</span>';
  html += '<span class="st-cch st-cch-ac"></span>';
  html += '</div>';

  if (!sales.length) {
    html +=
      '<div class="st-empty st-empty-tight">No sales logged yet. Paste a receipt above to add one.</div>';
  } else if (!totalFiltered) {
    html += '<div class="st-empty st-empty-tight">No sales match these filters.</div>';
  } else {
    for (var ri = 0; ri < paged.length; ri++) {
      var grp = paged[ri];
      var lead2 = grp.deal || grp.addons[0];
      if (!lead2) continue;
      var lid2 = String(lead2.id);
      var prem = grp.deal ? Number(grp.deal.amount) || 0 : Number(lead2.amount) || 0;
      var abbr = _stStatusAbbrevForTable(lead2);
      var gst = _stGroupListStatus(grp);
      html += '<div class="st-compact-row st-row st-row-' + gst + '">';
      html +=
        '<span class="st-ccb"><input type="checkbox" class="st-bulk-cb" data-id="' +
        _stEscape(lid2) +
        '"' +
        (_stSelectedIds[lid2] ? ' checked' : '') +
        ' onchange="_stToggleSaleSelectionFromCb(this)"></span>';
      html +=
        '<span class="st-cdt muted">' +
        _stEscape(_stFormatSaleShortDate(_stGroupListTs(grp))) +
        '</span>';
      html +=
        '<span class="st-ccp"><span class="st-ccp-name">' +
        _stEscape(lead2.customer || '—') +
        '</span><span class="st-ccp-plan">' +
        _stEscape(lead2.plan || '—') +
        '</span></span>';
      html += '<span class="st-cpr">$' + prem.toFixed(2) + '</span>';
      html +=
        '<span class="st-ccm">$' + _stGroupCommissionDisplay(grp).toFixed(2) + '</span>';
      html +=
        '<span class="st-cst"><span class="st-pill-mini st-pill-' +
        gst +
        '">' +
        abbr +
        '</span></span>';
      html +=
        '<span class="st-cac"><details class="st-row-menu" onclick="event.stopPropagation()"><summary aria-label="Actions">⋯</summary><div class="st-row-menu-pop">' +
        '<button type="button" onclick="var d=this.closest(\'details\');if(d)d.removeAttribute(\'open\');_stOpenCommissionEditor(\'' +
        lid2 +
        '\')">Edit</button>' +
        '<button type="button" onclick="var d=this.closest(\'details\');if(d)d.removeAttribute(\'open\');_stDeleteSaleGroupByLeadId(\'' +
        lid2 +
        '\')">Delete</button></div></details></span>';
      html += '</div>';
    }
  }
  html += '</div>';

  if (sales.length && totalFiltered > pageLen && pageLen < 50) {
    var moreN = Math.min(18, totalFiltered - pageLen, 50 - pageLen);
    if (moreN > 0) {
      html +=
        '<button type="button" class="st-show-more" onclick="_stShowMoreAllSales()">Show ' +
        moreN +
        ' more ↓</button>';
    }
  }
  if (sales.length && totalFiltered > 50 && pageLen >= 50) {
    html +=
      '<p class="st-show-more-note">Showing first 50 matches. Narrow filters to see more.</p>';
  }

  html += '</div></div></div>';
  return html;
}

function _stSetAllSalesRange(mode) {
  _stSetAllSalesChip(mode);
}

function _stToggleAllSaleDetails(id) {
  var row = document.getElementById('st-all-detail-' + id);
  if (!row) return;
  row.style.display = row.style.display === 'none' ? 'block' : 'none';
}

function _stExportAllSalesCsv() {
  var sales = _stLoadSales().slice().sort(function (a, b) { return b.ts - a.ts; });
  var lines = ['Client,Member ID,Plan,Premium,Date,Status,Type'];
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    lines.push([
      '"' + String(s.customer || '').replace(/"/g, '""') + '"',
      '"' + String(s.memberId || '').replace(/"/g, '""') + '"',
      '"' + String(s.plan || '').replace(/"/g, '""') + '"',
      (Number(s.amount) || 0).toFixed(2),
      '"' + _stFormatSaleListDate(s.ts) + '"',
      '"' + _stNormalizeStatus(s) + '"',
      '"' + String(s.type || '') + '"'
    ].join(','));
  }
  var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'all-sales.csv';
  a.click();
  setTimeout(function () { URL.revokeObjectURL(url); }, 500);
}

function _stDownloadWeeklyPdf() {
  var sales = _stLoadSales();
  var stats = _stCalcStats(sales);
  var weekStart = stats.weekStart;
  var weekEnd = weekStart + 6 * 24 * 60 * 60 * 1000;
  var rates = _stLoadCommissionRates();
  var deals = [];
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s || s.type !== 'deal') continue;
    if (_stNormalizeStatus(s) === 'chargeback') continue;
    if (s.ts < weekStart || s.ts > weekEnd) continue;
    deals.push(s);
  }
  deals.sort(function (a, b) {
    return (a.ts || 0) - (b.ts || 0);
  });
  var agentName = '';
  try {
    if (window.CHA_USER && window.CHA_USER.name) {
      agentName = String(window.CHA_USER.name);
    } else {
      var u = _stGetCurrentUser();
      agentName = u && (u.name || u.firstName) ? String(u.name || u.firstName) : '';
    }
  } catch (_e) {}
  if (!agentName) agentName = 'Unknown Agent';

  var coreCount = deals.length;
  var addonCount = 0;
  var enrollQualified = [];
  var dealComm = 0;
  var addonComm = 0;
  var enrollmentBonus = 0;
  var rowsHtml = '';

  for (var di = 0; di < deals.length; di++) {
    var d = deals[di];
    var dDate = _stEscape(_stFormatSaleListDate(d.ts));
    var dComm =
      (Number(d.planCommission) || 0) +
      (Number(d.totalAddonCommission) || 0) +
      (Number(d.enrollmentBonus) || 0);
    dealComm += Number(d.planCommission) || 0;
    addonComm += Number(d.totalAddonCommission) || 0;
    enrollmentBonus += Number(d.enrollmentBonus) || 0;
    if (Number(d.enrollmentAmount || d.enrollmentFee || 0) === 125) {
      enrollQualified.push(d);
    }
    rowsHtml +=
      '<tr>' +
      '<td>' + dDate + '</td>' +
      '<td>' + _stEscape(agentName) + '</td>' +
      '<td>' + _stEscape(d.customer || 'Unknown') + '</td>' +
      '<td>' + _stEscape(d.plan || 'Unknown Plan') + '</td>' +
      '<td>$' + (Number(d.enrollmentFee) || 0).toFixed(2) + '</td>' +
      '<td>$' + dComm.toFixed(2) + '</td>' +
      '</tr>';

    var addons = [];
    if (Array.isArray(d.addons) && d.addons.length) {
      addons = d.addons.slice();
    } else if (d.receiptId) {
      for (var ai = 0; ai < sales.length; ai++) {
        var a = sales[ai];
        if (!a || a.type !== 'addon') continue;
        if (_stNormalizeStatus(a) === 'chargeback') continue;
        if (a.receiptId !== d.receiptId) continue;
        addons.push(a);
      }
    }
    addonCount += addons.length;
    for (var aj = 0; aj < addons.length; aj++) {
      var ad = addons[aj];
      var aAmt = Number(ad.amount) || 0;
      var aComm =
        typeof ad.addonCommission === 'number'
          ? Number(ad.addonCommission)
          : _stComputeLineCommission(ad, rates);
      rowsHtml +=
        '<tr style="background:#fafbff;">' +
        '<td>' + dDate + '</td>' +
        '<td>' + _stEscape(agentName) + '</td>' +
        '<td>' + _stEscape(d.customer || 'Unknown') + '</td>' +
        '<td style="padding-left:12px;">+ ' + _stEscape(ad.name || ad.plan || 'Add-on') + '</td>' +
        '<td>$0.00</td>' +
        '<td>$' + Number(aComm).toFixed(2) + '</td>' +
        '</tr>';
    }
  }

  var tierBonus = _stCurrentTierBonus(stats);
  var enrollmentFeeBonus = enrollQualified.length * 20;
  var totalEstimated =
    dealComm + addonComm + enrollmentFeeBonus + tierBonus;
  var html =
    '<html><head><title>Weekly breakdown</title></head><body style="font-family:Inter,Arial,sans-serif;padding:24px;color:#0f172a;">';
  html += '<h2 style="margin:0 0 4px;">Weekly Breakdown</h2>';
  html +=
    '<div style="font-size:13px;color:#64748b;margin-bottom:4px;">Week: ' +
    _stEscape(_stFormatSaleListDate(weekStart)) +
    ' - ' +
    _stEscape(_stFormatSaleListDate(weekEnd)) +
    '</div>';
  html +=
    '<div style="font-size:13px;color:#64748b;margin-bottom:14px;">Agent: ' +
    _stEscape(agentName) +
    '</div>';
  html +=
    '<table cellspacing="0" cellpadding="7" style="border-collapse:collapse;width:100%;font-size:12px;border:1px solid #dbe3ef;">' +
    '<tr style="background:var(--cha-bg-muted);">' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Date</th>' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Agent</th>' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Client</th>' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Plan/Product</th>' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Enrollment Fee</th>' +
    '<th style="text-align:left;border:1px solid #dbe3ef;">Commission</th>' +
    '</tr>' +
    (rowsHtml || '<tr><td colspan="6" style="border:1px solid #dbe3ef;color:#94a3b8;">No deals this week.</td></tr>') +
    '</table>';
  html +=
    '<div style="margin-top:12px;line-height:1.6;font-size:13px;">' +
    '<div>Core Policies Sold: <strong>' + coreCount + '</strong></div>' +
    '<div>Add-on Policies Sold: <strong>' + addonCount + '</strong></div>' +
    '<div>Full Enrollment Fee Bonus: <strong>$' + enrollmentFeeBonus.toFixed(2) + '</strong></div>' +
    '<div>Tier Bonus Amount: <strong>$' + tierBonus.toFixed(2) + '</strong></div>' +
    '</div>';
  html +=
    '<div style="margin-top:14px;font-size:14px;font-weight:700;">Total estimated commission: $' +
    totalEstimated.toFixed(2) +
    '</div>';
  html += '</body></html>';
  var w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print();
}



function _stOpenEntryModal(opts) {
  opts = opts || {};
  _stCloseEntryModal();
  var mode = opts.mode === 'edit' ? 'edit' : 'create';
  var initial = opts.initial || {};
  var preview = opts.previewText ? String(opts.previewText) : '';
  var soldIso = initial.dateSold || _stTodayIso();
  var premiumVal = Number(initial.premium || 0);
  if (!isFinite(premiumVal)) premiumVal = 0;
  var enrollVal = Number(initial.enrollmentFee);
  if (!isFinite(enrollVal)) enrollVal = 125;
  var defaultDealRate = _stPlanTierRate(premiumVal, _stLoadCommissionRates()) * 100;
  var dealRatePct =
    typeof initial.dealRatePct === 'number' && !isNaN(initial.dealRatePct)
      ? initial.dealRatePct
      : defaultDealRate;
  var addonRows = initial.addons && initial.addons.length ? initial.addons : [];

  _stEntryModalState = {
    mode: mode,
    dealId: initial.dealId || '',
    receiptIdForEdit: initial.receiptId || '',
    previewText: preview
  };

  var modal = document.createElement('div');
  modal.id = 'st-entry-modal';
  modal.className = 'st-entry-modal';
  var html = '';
  html += '<div class="st-entry-card" role="dialog" aria-modal="true">';
  html +=
    '<div class="st-entry-title">' +
    (mode === 'edit' ? 'Edit sale group' : 'Enter sale manually') +
    '</div>';
  if (preview) {
    html += '<div class="st-entry-preview-wrap">';
    html += '<div class="st-entry-preview-label">Paste preview</div>';
    html += '<pre class="st-entry-preview">' + _stEscape(preview) + '</pre>';
    html += '</div>';
  }
  html += '<div class="st-entry-grid">';
  html +=
    '<label>Customer name<input id="st-entry-customer" type="text" value="' +
    _stEscape(initial.customer || '') +
    '" required></label>';
  html +=
    '<label>Policy ID / Receipt ID<input id="st-entry-receiptid" type="text" value="' +
    _stEscape(initial.receiptId || '') +
    '"></label>';
  html +=
    '<label>Date sold<input id="st-entry-date" type="date" value="' +
    _stEscape(soldIso) +
    '"></label>';
  html += '</div>';
  html += '<div class="st-entry-sec-title">Deal</div>';
  html += '<div class="st-entry-grid st-entry-grid-deal">';
  html +=
    '<label>Plan name<input id="st-entry-plan" type="text" value="' +
    _stEscape(initial.plan || '') +
    '"></label>';
  html +=
    '<label>Monthly premium $<input id="st-entry-premium" type="number" step="0.01" value="' +
    _stEscape(premiumVal) +
    '"></label>';
  html +=
    '<label>Enrollment fee $<input id="st-entry-enroll" type="number" step="0.01" value="' +
    _stEscape(enrollVal) +
    '"></label>';
  html +=
    '<label>Deal commission %<input id="st-entry-deal-rate" type="number" step="1" value="' +
    _stEscape(Math.round(dealRatePct)) +
    '"></label>';
  html += '</div>';
  html += '<div class="st-entry-sec-title">Add-ons</div>';
  html += '<div id="st-entry-addons"></div>';
  html +=
    '<button type="button" class="st-entry-add-addon" onclick="_stEntryAddAddonRow()">+ Add another add-on</button>';
  html += '<div class="st-entry-actions">';
  html +=
    '<button type="button" class="st-entry-cancel" onclick="_stCloseEntryModal()">Cancel</button>';
  html +=
    '<button type="button" class="st-entry-save" onclick="_stSaveEntryModal()">Save</button>';
  html += '</div>';
  html += '</div>';
  modal.innerHTML = html;
  modal.onclick = function (ev) {
    if (ev.target === modal) _stCloseEntryModal();
  };
  document.body.appendChild(modal);

  for (var i = 0; i < addonRows.length; i++) {
    _stEntryAddAddonRow(addonRows[i]);
  }
  if (!addonRows.length) _stEntryAddAddonRow();

  window._stEntryEscHandler = function (ev) {
    if (ev.key === 'Escape') _stCloseEntryModal();
  };
  window.addEventListener('keydown', window._stEntryEscHandler);
}

function _stCloseEntryModal() {
  _stEntryModalState = null;
  var modal = document.getElementById('st-entry-modal');
  if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
  if (window._stEntryEscHandler) {
    window.removeEventListener('keydown', window._stEntryEscHandler);
    window._stEntryEscHandler = null;
  }
}

function _stEntryAddAddonRow(addon) {
  var wrap = document.getElementById('st-entry-addons');
  if (!wrap) return;
  var row = document.createElement('div');
  row.className = 'st-entry-addon-row';
  row.setAttribute('data-addon-id', addon && addon.id ? addon.id : '');
  var amount = addon && typeof addon.amount !== 'undefined' ? Number(addon.amount) : 0;
  if (!isFinite(amount)) amount = 0;
  var ratePct =
    addon && typeof addon.ratePct === 'number' && !isNaN(addon.ratePct)
      ? addon.ratePct
      : 70;
  row.innerHTML =
    '<input class="st-entry-addon-name" type="text" placeholder="Add-on name" value="' +
    _stEscape((addon && addon.name) || '') +
    '">' +
    '<input class="st-entry-addon-amt" type="number" step="0.01" placeholder="0.00" value="' +
    _stEscape(amount) +
    '">' +
    '<input class="st-entry-addon-rate" type="number" step="1" placeholder="70" value="' +
    _stEscape(Math.round(ratePct)) +
    '">' +
    '<button type="button" class="st-entry-addon-remove" onclick="this.parentNode.remove()">Remove</button>';
  wrap.appendChild(row);
}

function _stCreateSaleGroupFromModal(payload) {
  var receiptId = payload.receiptId || _stBuildUniqueReceiptId('rcpt_manual_');
  if (!_stMaybeConfirmDuplicate(payload.customer, receiptId)) {
    _stFlash('Cancelled - ' + payload.customer + ' was not re-added', 'neutral');
    return false;
  }
  var sales = _stLoadSales();
  var dealId =
    'st_' + payload.ts + '_manual_0_' + Math.random().toString(36).slice(2, 6);
  sales.push({
    id: dealId,
    ts: payload.ts,
    customer: payload.customer,
    memberId: '',
    plan: payload.plan || 'Unknown Plan',
    amount: payload.premium,
    type: 'deal',
    status: 'pending',
    raw: payload.rawText || '',
    notes: receiptId ? 'Policy: ' + receiptId : '',
    receiptId: receiptId,
    receiptTotal: 0,
    enrollmentFee: payload.enrollmentFee,
    commissionRate: payload.dealRatePct / 100
  });
  for (var i = 0; i < payload.addons.length; i++) {
    var ad = payload.addons[i];
    sales.push({
      id:
        'st_' +
        payload.ts +
        '_manual_' +
        (i + 1) +
        '_' +
        Math.random().toString(36).slice(2, 6),
      ts: payload.ts + i + 1,
      customer: payload.customer,
      memberId: '',
      plan: ad.name,
      amount: ad.amount,
      type: 'addon',
      status: 'pending',
      raw: payload.rawText || '',
      notes: receiptId ? 'Policy: ' + receiptId : '',
      receiptId: receiptId,
      receiptTotal: 0,
      enrollmentFee: 0,
      addonCommissionRate: ad.ratePct / 100
    });
  }
  for (var si = 0; si < sales.length; si++) {
    if (sales[si].id === dealId) {
      _stStampDealCommission(sales, si, _stLoadCommissionRates());
      break;
    }
  }
  _stSaveSales(sales);
  _stRender();
  var addedFlash = _stBuildAddedFlash(payload.customer, payload.ts);
  _stFlash(addedFlash.msg, addedFlash.kind);
  return true;
}

function _stUpdateSaleGroupFromModal(payload, state) {
  var sales = _stLoadSales();
  var dealIdx = -1;
  for (var i = 0; i < sales.length; i++) {
    if (sales[i] && sales[i].id === state.dealId) {
      dealIdx = i;
      break;
    }
  }
  if (dealIdx === -1) return false;

  var deal = sales[dealIdx];
  var oldReceipt = deal.receiptId || state.receiptIdForEdit || '';
  var receiptId = payload.receiptId || oldReceipt || _stBuildUniqueReceiptId('rcpt_manual_');
  deal.customer = payload.customer;
  deal.plan = payload.plan || 'Unknown Plan';
  deal.amount = payload.premium;
  deal.enrollmentFee = payload.enrollmentFee;
  deal.ts = payload.ts;
  deal.commissionRate = payload.dealRatePct / 100;
  deal.receiptId = receiptId;
  deal.notes = receiptId ? 'Policy: ' + receiptId : '';

  var existingAddons = {};
  for (var a = 0; a < sales.length; a++) {
    var s = sales[a];
    if (!s || s.type !== 'addon') continue;
    if (s.receiptId === oldReceipt) existingAddons[s.id] = s;
  }

  var keep = {};
  for (var r = 0; r < payload.addons.length; r++) {
    var ad = payload.addons[r];
    var adId = ad.id && existingAddons[ad.id] ? ad.id : '';
    var rowSale = adId ? existingAddons[adId] : null;
    if (!rowSale) {
      rowSale = {
        id:
          'st_' +
          payload.ts +
          '_edit_' +
          r +
          '_' +
          Math.random().toString(36).slice(2, 6),
        ts: payload.ts + r + 1,
        customer: payload.customer,
        memberId: deal.memberId || '',
        plan: ad.name,
        amount: ad.amount,
        type: 'addon',
        status: deal.status || 'pending',
        raw: deal.raw || '',
        notes: receiptId ? 'Policy: ' + receiptId : '',
        receiptId: receiptId,
        receiptTotal: 0,
        enrollmentFee: 0
      };
      sales.push(rowSale);
    }
    rowSale.customer = payload.customer;
    rowSale.plan = ad.name;
    rowSale.amount = ad.amount;
    rowSale.ts = payload.ts + r + 1;
    rowSale.receiptId = receiptId;
    rowSale.notes = receiptId ? 'Policy: ' + receiptId : '';
    rowSale.addonCommissionRate = ad.ratePct / 100;
    keep[rowSale.id] = true;
  }

  sales = sales.filter(function (s) {
    if (!s || s.type !== 'addon') return true;
    if (s.receiptId !== oldReceipt && s.receiptId !== receiptId) return true;
    return keep[s.id] === true;
  });

  for (var di = 0; di < sales.length; di++) {
    if (sales[di] && sales[di].id === deal.id) {
      _stStampDealCommission(sales, di, _stLoadCommissionRates());
      break;
    }
  }
  _stSaveSales(sales);
  _stRender();
  _stFlash('Updated ' + payload.customer, 'ok');
  return true;
}

function _stSaveEntryModal() {
  var state = _stEntryModalState;
  if (!state) return;
  var customer =
    ((document.getElementById('st-entry-customer') || {}).value || '').trim();
  if (!customer) {
    _stFlash('Customer name is required.', 'error');
    return;
  }

  var receiptId =
    ((document.getElementById('st-entry-receiptid') || {}).value || '').trim();
  var soldIso = ((document.getElementById('st-entry-date') || {}).value || '').trim();
  var soldDate = soldIso ? _stIsoToDate(soldIso) : null;
  var ts = soldDate ? soldDate.getTime() + 9 * 60 * 60 * 1000 : _stReadDateSoldTs();
  var plan = ((document.getElementById('st-entry-plan') || {}).value || '').trim();
  var premium = parseFloat((document.getElementById('st-entry-premium') || {}).value);
  var enrollmentFee = parseFloat((document.getElementById('st-entry-enroll') || {}).value);
  var dealRatePct = parseFloat((document.getElementById('st-entry-deal-rate') || {}).value);

  if (isNaN(premium) || premium < 0) {
    _stFlash('Enter a valid monthly premium.', 'error');
    return;
  }
  if (isNaN(enrollmentFee) || enrollmentFee < 0) enrollmentFee = 125;
  if (isNaN(dealRatePct) || dealRatePct < 0) {
    _stFlash('Enter a valid deal commission percent.', 'error');
    return;
  }

  var rows = document.querySelectorAll('#st-entry-addons .st-entry-addon-row');
  var addons = [];
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var name =
      ((row.querySelector('.st-entry-addon-name') || {}).value || '').trim();
    var amount = parseFloat((row.querySelector('.st-entry-addon-amt') || {}).value);
    var ratePct = parseFloat((row.querySelector('.st-entry-addon-rate') || {}).value);
    if (!name && (isNaN(amount) || amount <= 0)) continue;
    if (!name) name = 'Unknown Add-on';
    if (isNaN(amount) || amount < 0) amount = 0;
    if (isNaN(ratePct) || ratePct < 0) ratePct = 70;
    addons.push({
      id: row.getAttribute('data-addon-id') || '',
      name: name,
      amount: amount,
      ratePct: ratePct
    });
  }

  var payload = {
    customer: customer,
    receiptId: receiptId,
    ts: ts,
    plan: plan,
    premium: premium,
    enrollmentFee: enrollmentFee,
    dealRatePct: dealRatePct,
    addons: addons,
    rawText: state.previewText || ''
  };
  var ok =
    state.mode === 'edit'
      ? _stUpdateSaleGroupFromModal(payload, state)
      : _stCreateSaleGroupFromModal(payload);
  if (ok) {
    _stCloseEntryModal();
    var input = document.getElementById('st-receipt-input');
    if (input) input.value = '';
    _stResetPostDateInputs();
  }
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
    if (sales[i].id === saleId) {
      idx = i;
      break;
    }
  }
  if (idx === -1) return;
  var seed = sales[idx];
  var deal = seed;
  if (seed.type !== 'deal' && seed.receiptId) {
    for (var fi = 0; fi < sales.length; fi++) {
      if (sales[fi] && sales[fi].type === 'deal' && sales[fi].receiptId === seed.receiptId) {
        deal = sales[fi];
        break;
      }
    }
  }
  if (deal.type !== 'deal') {
    _stFlash('Edit is available on grouped receipts only.', 'error');
    return;
  }
  if (!deal.receiptId) deal.receiptId = 'rcpt_manual_' + deal.id;

  var rates = _stLoadCommissionRates();
  var planRate =
    typeof deal.commissionRate === 'number'
      ? deal.commissionRate
      : _stPlanTierRate(deal.amount, rates);
  var soldDate = new Date(Number(deal.ts) || Date.now());
  var y = soldDate.getFullYear();
  var m = String(soldDate.getMonth() + 1);
  if (m.length < 2) m = '0' + m;
  var dd = String(soldDate.getDate());
  if (dd.length < 2) dd = '0' + dd;
  var addons = [];
  for (var ai = 0; ai < sales.length; ai++) {
    if (!sales[ai] || sales[ai].type !== 'addon') continue;
    if (sales[ai].receiptId !== deal.receiptId) continue;
    var ar =
      typeof sales[ai].addonCommissionRate === 'number'
        ? sales[ai].addonCommissionRate * 100
        :
          (rates.addonTypes[_stClassifyAddon(sales[ai].plan)] ||
            rates.addonTypes.standard ||
            0.7) *
          100;
    addons.push({
      id: sales[ai].id,
      name: sales[ai].plan || '',
      amount: Number(sales[ai].amount) || 0,
      ratePct: ar
    });
  }

  _stOpenEntryModal({
    mode: 'edit',
    initial: {
      dealId: deal.id,
      customer: deal.customer || '',
      receiptId: deal.receiptId || '',
      dateSold: y + '-' + m + '-' + dd,
      plan: deal.plan || '',
      premium: Number(deal.amount) || 0,
      enrollmentFee: Number(deal.enrollmentFee) || 0,
      dealRatePct: planRate * 100,
      addons: addons
    }
  });
}

function _stCloseDealEditor() {
  _stCloseEntryModal();
}

function _stAddDealEditorAddonRow(addon) {
  _stEntryAddAddonRow(addon);
}

function _stSaveDealEditor() {
  _stSaveEntryModal();
}

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

function _stFmtMoney(n) {
  return (
    '$' +
    (Number(n) || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

function _stTierProgressData(stats) {
  var tiers = ST_BONUS_TIERS || [];
  var achieved = null;
  var next = null;
  for (var i = 0; i < tiers.length; i++) {
    var t = tiers[i];
    if (stats.weekDeals >= t.deals && stats.weekAddons >= t.addons) {
      achieved = t;
    } else if (!next) {
      next = t;
    }
  }
  if (!next && tiers.length) next = tiers[tiers.length - 1];
  var targetDeals = next ? next.deals : 0;
  var targetAddons = next ? next.addons : 0;
  var pct = targetDeals
    ? Math.min(
        100,
        Math.round(
          Math.min(stats.weekDeals / targetDeals, stats.weekAddons / targetAddons) * 100
        )
      )
    : 0;
  return { achieved: achieved, next: next, pct: pct };
}

function _stWeeklyPaycheckMomentum(sales, stats) {
  var weekMs = 7 * 24 * 60 * 60 * 1000;
  var prevStats = _stCalcStats(
    sales.filter(function (s) {
      return s && s.ts >= stats.weekStart - weekMs && s.ts < stats.weekStart;
    })
  );
  prevStats.weekStart = stats.weekStart - weekMs;
  var thisPb = _stPaycheckBreakdown(sales, stats);
  var lastPb = _stPaycheckBreakdown(sales, prevStats);
  if (!lastPb || !lastPb.estimated) return null;
  var delta = Math.round(((thisPb.estimated - lastPb.estimated) / lastPb.estimated) * 100);
  return { delta: delta, lastWeek: lastPb.estimated };
}

function _stBuildPaycheckHeroSection(sales, stats) {
  var pb = _stPaycheckBreakdown(sales, stats);
  var tier = _stTierProgressData(stats);
  var momentum = _stWeeklyPaycheckMomentum(sales, stats);
  var bonusTotal = Number(pb.enrollmentBonus || 0) + Number(pb.tierBonus || 0);
  var est = Number(pb.estimated) || 0;
  var tiersCfg = ST_BONUS_TIERS || [];
  var lastTier = tiersCfg.length ? tiersCfg[tiersCfg.length - 1] : null;
  var maxed =
    lastTier &&
    stats.weekDeals >= lastTier.deals &&
    stats.weekAddons >= lastTier.addons;
  var statusLine = '';
  if (est <= 0) {
    statusLine = 'Log your first sale to start earning';
  } else if (maxed) {
    statusLine = 'Max tier reached';
  } else if (tier.next) {
    statusLine =
      stats.weekDeals +
      ' / ' +
      tier.next.deals +
      ' to $' +
      tier.next.bonus +
      ' tier';
  } else {
    statusLine = 'Keep selling to grow your paycheck';
  }
  var html = '<section id="st-paycheck-hero" class="st-paycheck-hero st-paycheck-hero--compact">';
  html += '<div class="st-paycheck-hero-kicker">ESTIMATED PAYCHECK · THIS WEEK</div>';
  html += '<div class="st-paycheck-hero-mid">';
  html += '<div class="st-paycheck-hero-left">';
  html += '<div class="st-paycheck-hero-total">' + _stFmtMoney(est) + '</div>';
  if (est > 0 && momentum) {
    html +=
      '<div class="st-paycheck-hero-momentum">' +
      (momentum.delta >= 0 ? '↑ ' : '↓ ') +
      Math.abs(momentum.delta) +
      '% vs last week</div>';
  }
  html += '</div>';
  if (est > 0) {
    html +=
      '<div class="st-paycheck-hero-breakdown-inline">' +
      '<div><span class="st-ph-num">' +
      _stFmtMoney(pb.dealComm) +
      '</span><span class="st-ph-lbl">Deals</span></div>' +
      '<div><span class="st-ph-num">' +
      _stFmtMoney(pb.addonComm) +
      '</span><span class="st-ph-lbl">Add-ons</span></div>' +
      '<div><span class="st-ph-num">' +
      _stFmtMoney(bonusTotal) +
      '</span><span class="st-ph-lbl">Bonuses</span></div></div>';
  }
  html += '</div>';
  html +=
    '<div class="st-paycheck-hero-progress"><span style="width:' +
    (est > 0 ? tier.pct : 0) +
    '%"></span></div>';
  html +=
    '<div class="st-paycheck-hero-progress-status">' + _stEscape(statusLine) + '</div>';
  html += '</section>';
  return html;
}

function _stBuildWeekAtGlanceSection(stats) {
  var dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  var today = new Date();
  var todayDayIdx = today.getDay();
  var todayBucketIdx = todayDayIdx === 0 ? 6 : todayDayIdx - 1;
  var weekStart = new Date(stats.weekStart);
  var weekEnd = new Date(stats.weekStart + 4 * 24 * 60 * 60 * 1000);
  var hdr =
    weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    '-' +
    weekEnd.toLocaleDateString('en-US', { day: 'numeric' });

  var html = '<section class="st-sec st-week-glance st-week-glance-unified" aria-labelledby="st-glance-h">';
  html +=
    '<div class="st-week-glance-head"><span id="st-glance-h" class="st-sec-title">THIS WEEK · ' +
    hdr.toUpperCase() +
    '</span><span class="st-week-glance-mini">' +
    stats.weekDeals +
    ' deals logged</span></div>';
  html += '<div class="st-glance-days">';
  for (var d = 0; d < 5; d++) {
    var bucket = stats.dayBuckets[d] || { date: null, amount: 0 };
    var isToday = d === todayBucketIdx;
    var amt = Number(bucket.amount) || 0;
    var dateStr = '';
    if (bucket.date) {
      dateStr = (bucket.date.getMonth() + 1) + '/' + bucket.date.getDate();
    }
    html +=
      '<div class="st-glance-day' +
      (isToday ? ' st-glance-day-today' : '') +
      (amt > 0 ? ' st-glance-day-hit' : '') +
      '">';
    html +=
      '<div class="st-glance-day-label">' +
      (isToday ? 'TODAY' : dayNames[d]) +
      (dateStr ? ' <span class="st-glance-day-dt">' + dateStr + '</span>' : '') +
      '</div>';
    html += '<div class="st-glance-day-amt">' + _stFmtMoney(amt) + '</div>';
    html += '</div>';
  }
  html += '</div><div class="st-glance-divider"></div>';
  html += '<div class="st-glance-stats st-glance-stats-plain">';
  html +=
    '<div class="st-glance-stat"><span>Deals</span><strong>' +
    stats.weekDeals +
    '</strong></div>';
  html +=
    '<div class="st-glance-stat"><span>Add-ons</span><strong>' +
    stats.weekAddons +
    '</strong></div>';
  html +=
    '<div class="st-glance-stat"><span>Weekly premium</span><strong>' +
    _stFmtMoney(stats.weekSales) +
    '</strong></div>';
  html += '</div>';
  html += '</section>';
  return html;
}

function _stBuildFloatingPaycheckBar(sales, stats) {
  var pb = _stPaycheckBreakdown(sales, stats);
  var tier = _stTierProgressData(stats);
  return (
    '<div id="st-paycheck-float" class="st-paycheck-float" style="display:none">' +
    '<div class="st-paycheck-float-left"><div><div class="st-paycheck-float-k">PAYCHECK</div><div class="st-paycheck-float-v">' +
    _stFmtMoney(pb.estimated) +
    '</div></div><div class="st-paycheck-float-divider"></div><div><div class="st-paycheck-float-meta">' +
    stats.weekDeals +
    ' deals · ' +
    stats.weekAddons +
    ' add-ons</div><div class="st-paycheck-float-meta2">' +
    (tier.achieved ? '✓ $' + tier.achieved.bonus + ' tier' : 'Next: $' + (tier.next ? tier.next.bonus : 0)) +
    '</div></div></div>' +
    '<div class="st-paycheck-float-right"><button type="button" class="st-paycheck-float-pdf" onclick="_stDownloadWeeklyPdf()">↓ PDF</button><button type="button" class="st-paycheck-float-break" onclick="_stTogglePaycheckBreakdown()">Breakdown</button></div>' +
    '</div>'
  );
}

// ── ANALYTICS DASHBOARD (additive — read-only rollups) ───────
function chaAnalyticsReadBundle() {
  var sales = _stLoadSales();
  sales = _stValidateSalesIntegrity(sales);
  var stats = _stCalcStats(sales);
  return { sales: sales, stats: stats };
}

function _stSumPremiumInRange(sales, t0, t1) {
  var validDealReceiptIds = {};
  var di;
  for (di = 0; di < sales.length; di++) {
    var ds = sales[di];
    if (!ds || ds.type !== 'deal') continue;
    if (ds.ts < t0 || ds.ts >= t1) continue;
    if (_stNormalizeStatus(ds) !== 'chargeback' && ds.receiptId) {
      validDealReceiptIds[ds.receiptId] = true;
    }
  }
  var total = 0;
  var i;
  for (i = 0; i < sales.length; i++) {
    var s = sales[i];
    if (!s) continue;
    if (_stNormalizeStatus(s) === 'chargeback') continue;
    if (s.ts < t0 || s.ts >= t1) continue;
    var include = false;
    if (s.type === 'deal') include = true;
    else if (s.type === 'addon') {
      include = s.receiptId ? validDealReceiptIds[s.receiptId] === true : true;
    }
    if (include) total += Number(s.amount) || 0;
  }
  return total;
}

function _stMonthPremiumTotal(sales, y, m) {
  var t0 = new Date(y, m, 1, 0, 0, 0, 0).getTime();
  var t1 = new Date(y, m + 1, 1, 0, 0, 0, 0).getTime();
  return _stSumPremiumInRange(sales, t0, t1);
}

function _stGetMonthlyGoalDollars() {
  try {
    var raw = localStorage.getItem('cha_monthly_goal');
    var n = raw ? parseFloat(raw) : 10000;
    if (isNaN(n) || n < 1000) return 10000;
    return n;
  } catch (_e) {
    return 10000;
  }
}

function _stEditMonthlyGoal() {
  var cur = _stGetMonthlyGoalDollars();
  var v = window.prompt('Monthly sales goal ($)', String(cur));
  if (v == null) return;
  var n = parseFloat(String(v).replace(/[$,]/g, ''));
  if (isNaN(n) || n < 0) {
    _stFlash('Invalid goal.', 'error');
    return;
  }
  try {
    localStorage.setItem('cha_monthly_goal', String(n));
  } catch (_e2) {}
  _stRender();
  _stFlash('Monthly goal updated.', 'ok');
}

function _stGetSavedTab() {
  try {
    var v = localStorage.getItem('cha_st_tab');
    if (v === 'analytics' || v === 'thisweek') return v;
  } catch (_e) {}
  return 'thisweek';
}

function _stBuildInternalSubtabs(activeTab) {
  var tw = activeTab === 'thisweek' ? ' active' : '';
  var an = activeTab === 'analytics' ? ' active' : '';
  return (
    '<div class="page-subtabs st-internal-subtabs" id="stInternalSubtabs" role="tablist">' +
    '<div class="page-subtabs-inner">' +
    '<button type="button" class="stab' +
    tw +
    '" role="tab" aria-selected="' +
    (activeTab === 'thisweek' ? 'true' : 'false') +
    '" onclick="_stSwitchTab(\'thisweek\')">This Week</button>' +
    '<button type="button" class="stab' +
    an +
    '" role="tab" aria-selected="' +
    (activeTab === 'analytics' ? 'true' : 'false') +
    '" onclick="_stSwitchTab(\'analytics\')">Analytics</button>' +
    '</div></div>'
  );
}

function _stSwitchTab(tabId) {
  if (tabId !== 'analytics' && tabId !== 'thisweek') tabId = 'thisweek';
  try {
    localStorage.setItem('cha_st_tab', tabId);
  } catch (_e) {}
  var pThis = document.getElementById('stTabPanelThisWeek');
  var pAn = document.getElementById('stTabPanelAnalytics');
  if (pThis) pThis.style.display = tabId === 'thisweek' ? 'block' : 'none';
  if (pAn) pAn.style.display = tabId === 'analytics' ? 'block' : 'none';
  var fl = document.getElementById('st-paycheck-float');
  if (fl) fl.style.display = tabId === 'thisweek' ? fl.style.display : 'none';
  var wrap = document.getElementById('stInternalSubtabs');
  if (wrap) {
    var btns = wrap.querySelectorAll('.stab');
    var i;
    for (i = 0; i < btns.length; i++) {
      var b = btns[i];
      var label = (b.textContent || '').trim();
      var on =
        (tabId === 'thisweek' && label === 'This Week') ||
        (tabId === 'analytics' && label === 'Analytics');
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    }
  }
  if (tabId === 'thisweek') _stWirePaycheckObserver();
}

function _stBuildAnalyticsDashboard(sales, stats) {
  var now = new Date();
  var ws = stats.weekStart;
  var weekMs = 7 * 24 * 60 * 60 * 1000;
  var wkTotals = [];
  var wkLabels = [];
  var wi;
  for (wi = 3; wi >= 0; wi--) {
    var start = ws - wi * weekMs;
    wkTotals.push(_stSumPremiumInRange(sales, start, start + weekMs));
    wkLabels.push(wi === 0 ? 'This week' : 'Week ' + (4 - wi));
  }
  var sumWk = 0;
  for (wi = 0; wi < wkTotals.length; wi++) {
    sumWk += Number(wkTotals[wi]) || 0;
  }
  var allWeeksZero = sumWk === 0;
  var maxBar = Math.max.apply(null, wkTotals.concat([1]));
  var barW = 48;
  var barGap = 10;
  var chartH = 132;
  var chartBlock = '';
  if (allWeeksZero) {
    chartBlock =
      '<div class="st-analytics-chart-empty" role="status">No sales data yet. Start logging sales to see your weekly trend.</div>';
  } else {
    var svgBars = '';
    var bi;
    for (bi = 0; bi < wkTotals.length; bi++) {
      var h = Math.round((wkTotals[bi] / maxBar) * (chartH - 26));
      var x = 20 + bi * (barW + barGap);
      var y = chartH - 18 - h;
      svgBars +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        barW +
        '" height="' +
        h +
        '" rx="4" fill="#5B8DEF"><title>' +
        _stEscape(wkLabels[bi] + ': $' + Math.round(wkTotals[bi])) +
        '</title></rect>';
      svgBars +=
        '<text x="' +
        (x + barW / 2) +
        '" y="' +
        (chartH - 4) +
        '" text-anchor="middle" font-size="9" fill="#64748b">' +
        _stEscape(wkLabels[bi]) +
        '</text>';
    }
    chartBlock =
      '<svg class="st-analytics-chart" viewBox="0 0 300 ' +
      chartH +
      '" width="100%" height="' +
      Math.min(160, chartH) +
      '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Weekly premium totals">' +
      svgBars +
      '</svg>';
  }

  var goal = _stGetMonthlyGoalDollars();
  var monthPrem = _stMonthPremiumTotal(
    sales,
    now.getFullYear(),
    now.getMonth()
  );
  var pct = goal > 0 ? Math.min(100, Math.round((monthPrem / goal) * 100)) : 0;

  var msDay = 24 * 60 * 60 * 1000;
  var daysElapsed = Math.max(
    1,
    Math.min(7, Math.floor((Date.now() - ws) / msDay) + 1)
  );
  var paceWeek =
    daysElapsed > 0 ? (stats.weekCommissionValid / daysElapsed) * 7 : 0;
  var paceMonth = paceWeek * 4.3;

  var fourWeekStart = _stStartOfDay(new Date(now.getTime() - 27 * msDay)).getTime();
  var wdSum = [0, 0, 0, 0, 0, 0, 0];
  var wdCnt = [0, 0, 0, 0, 0, 0, 0];
  var t;
  for (t = fourWeekStart; t <= now.getTime(); t += msDay) {
    var dayTot = _stSumPremiumInRange(sales, t, t + msDay);
    var dd = new Date(t);
    var wd = dd.getDay();
    wdCnt[wd]++;
    wdSum[wd] += dayTot;
  }
  var bestWd = 1;
  var bestAvg = 0;
  var wdx;
  for (wdx = 0; wdx < 7; wdx++) {
    if (wdCnt[wdx] === 0) continue;
    var av = wdSum[wdx] / wdCnt[wdx];
    if (av > bestAvg) {
      bestAvg = av;
      bestWd = wdx;
    }
  }
  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  var html = '<section class="st-analytics st-analytics-compact" aria-label="Sales analytics">';
  html += '<div class="st-analytics-chart-card"><div class="st-analytics-card-title">Weekly premium</div>';
  html += chartBlock + '</div>';

  html += '<div class="st-analytics-cards-3">';
  html += '<div class="st-analytics-card st-analytics-mini"><div class="st-analytics-card-title">Monthly goal</div>';
  html += '<div class="st-analytics-goal-row">';
  html +=
    '<span class="st-analytics-goal-line">$' +
    Math.round(monthPrem).toLocaleString() +
    ' of $' +
    Math.round(goal).toLocaleString() +
    ' <span class="st-analytics-pct">(' +
    pct +
    '%)</span></span>';
  html +=
    '<button type="button" class="st-analytics-link" onclick="_stEditMonthlyGoal()">Edit goal</button></div>';
  html +=
    '<div class="st-analytics-progress st-analytics-progress-thin"><span style="width:' +
    pct +
    '%"></span></div></div>';

  html += '<div class="st-analytics-card st-analytics-mini"><div class="st-analytics-card-title">Commission forecast</div>';
  html +=
    '<p class="st-analytics-one-line">This week: <strong>' +
    _stFmtMoney(paceWeek) +
    '</strong> · This month: <strong>' +
    _stFmtMoney(paceMonth) +
    '</strong></p>';
  html += '<p class="st-analytics-note">Based on current pace</p></div>';

  html += '<div class="st-analytics-card st-analytics-mini"><div class="st-analytics-card-title">Best day</div>';
  html +=
    '<p class="st-analytics-one-line"><strong>' +
    dayNames[bestWd] +
    '</strong> · $' +
    Math.round(bestAvg).toLocaleString() +
    ' avg</p>';
  html += '<p class="st-analytics-note">Last 4 weeks</p></div>';

  html += '</div></section>';
  return html;
}

// ── MAIN RENDER ─────────────────────────────────────────────
function _stRender() {
  var page = document.getElementById('page-salestracker');
  if (!page) return;
  var sales = _stLoadSales();
  sales = _stValidateSalesIntegrity(sales);
  var _dbgSales = _stLoadSales();
  console.log(
    '[DIAG] All sales:',
    JSON.stringify(
      _dbgSales.map(function (s) {
        return {
          id: s.id,
          type: s.type,
          customer: s.customer,
          plan: s.plan || s.policy,
          receiptId: s.receiptId,
          amount: s.amount || s.policyAmount
        };
      }),
      null,
      2
    )
  );
  // ── DEBUG: trace how many sales _stRender sees at paint
  // time to diagnose the persistence bug.
  var _dbgRenderUser = _stGetCurrentUser();
  console.log(
    '_stRender loaded',
    sales.length,
    'sales for user',
    _dbgRenderUser ? _dbgRenderUser.id : '(no user)'
  );
  var postdates = _stLoadPostDates();
  var stats = _stCalcStats(sales);
  var stTab = _stGetSavedTab();

  var html = '';
  html += _stBuildPostDateBanner(postdates);
  html +=
    '<div class="ph ph-st-compact"><div class="pt">Sales <span>Tracker</span></div></div>';
  html += _stBuildInternalSubtabs(stTab);
  html +=
    '<div id="stTabPanelThisWeek" class="st-tab-panel" role="tabpanel" style="display:' +
    (stTab === 'thisweek' ? 'block' : 'none') +
    '">';
  html += _stBuildPaycheckHeroSection(sales, stats);
  html += _stBuildWeekAtGlanceSection(stats);
  html += _stBuildAddSaleSection();
  html += _stBuildTable(sales);
  html += _stBuildPostDatesSection(postdates);
  html += _stBuildFloatingPaycheckBar(sales, stats);
  html += '<div class="st-bottom-spacer st-bottom-spacer-sm" aria-hidden="true"></div>';
  html += '</div>';
  html +=
    '<div id="stTabPanelAnalytics" class="st-tab-panel" role="tabpanel" style="display:' +
    (stTab === 'analytics' ? 'block' : 'none') +
    '">';
  html += _stBuildAnalyticsDashboard(sales, stats);
  html += '</div>';

  page.innerHTML = html;
  if (!page.dataset.stAddSaleEsc) {
    page.dataset.stAddSaleEsc = '1';
    page.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('st-add-sale-panel');
      if (!panel || panel.style.display === 'none') return;
      _stSetAddSalePanelOpen(false);
    });
  }
  _stWirePaycheckObserver();
}

function _stWirePaycheckObserver() {
  var hero = document.getElementById('st-paycheck-hero');
  var bar = document.getElementById('st-paycheck-float');
  var tw = document.getElementById('stTabPanelThisWeek');
  if (!hero || !bar || !tw || tw.style.display === 'none') return;
  if (window._stHeroObs) {
    try {
      window._stHeroObs.disconnect();
    } catch (_e) {}
  }
  window._stHeroObs = new IntersectionObserver(
    function (entries) {
      var e = entries && entries[0];
      if (!e) return;
      if (e.isIntersecting) {
        bar.style.display = 'none';
      } else {
        bar.style.display = 'flex';
      }
    },
    { threshold: 0.12 }
  );
  window._stHeroObs.observe(hero);
}

