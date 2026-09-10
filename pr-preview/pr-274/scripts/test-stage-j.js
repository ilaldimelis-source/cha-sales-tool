#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var failures = [];

function fail(msg) {
  failures.push(String(msg));
}

function assert(cond, msg) {
  if (!cond) fail(msg);
}

function money(n) {
  return Math.round(Number(n) * 100) / 100;
}

function makeSandbox() {
  var store = {};
  var ctx = {
    console: console,
    Date: Date,
    Math: Math,
    JSON: JSON,
    Array: Array,
    Object: Object,
    String: String,
    Number: Number,
    Boolean: Boolean,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN,
    isFinite: isFinite,
    Infinity: Infinity,
    NaN: NaN,
    RegExp: RegExp,
    Error: Error,
    setTimeout: function () {},
    clearTimeout: function () {},
    confirm: function () {
      return true;
    },
    localStorage: {
      getItem: function (k) {
        return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
      },
      setItem: function (k, v) {
        store[k] = String(v);
      },
      removeItem: function (k) {
        delete store[k];
      }
    },
    document: {
      body: {
        dataset: {},
        addEventListener: function () {},
        appendChild: function () {}
      },
      getElementById: function () {
        return null;
      },
      createElement: function () {
        return {
          innerHTML: '',
          onclick: null,
          className: '',
          id: '',
          textContent: '',
          style: {},
          classList: {
            contains: function () {
              return false;
            }
          }
        };
      }
    }
  };
  ctx.window = ctx;
  ctx.CHA_USER = { id: 'j-test', name: 'J Tester' };
  vm.createContext(ctx);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'js/sales-tracker.js'), 'utf8'),
    ctx,
    { filename: 'js/sales-tracker.js' }
  );
  ctx._stResetCommissionRates();
  return ctx;
}

var ctx = makeSandbox();

function countStripped(rows) {
  var cancelled = {};
  var stripped = ctx._stReconStripCancelPairs(rows, cancelled);
  var core = 0;
  var anc = 0;
  var i;
  for (i = 0; i < stripped.length; i++) {
    if (Number(stripped[i].amount) <= 0) continue;
    if (stripped[i].typeLocal === 'addon') anc += 1;
    else core += 1;
  }
  return { core: core, anc: anc, cancelled: Object.keys(cancelled).length };
}

assert(
  ctx._stProductIsAncillary('Fusion Dental - Plan A SA'),
  'Fusion Dental - Plan A SA is ancillary from the rate table'
);
assert(
  ctx._stProductIsAncillary('RXSavers Tier 1'),
  'RXSavers Tier 1 is ancillary from the rate table'
);
assert(
  ctx._stProductIsAncillary('Fusion Dental - Plan B SA'),
  'Fusion Dental - Plan B SA is ancillary'
);
assert(
  !ctx._stProductIsAncillary('SmartChoice 3500'),
  'SmartChoice 3500 stays a core plan'
);
assert(
  !ctx._stProductIsAncillary('Harbor STM'),
  'Harbor STM stays a core plan'
);

var salimCoreLine = ctx._stParsePaySheet(
  '8/17/2026\tSalim Amrar\t444444448\tCore\tFusion Dental - Plan A SA\t$18.00'
);
assert(salimCoreLine.length === 1, 'Salim Core-typed row parsed');
assert(
  salimCoreLine[0].typeLocal === 'addon',
  'Salim Core + Fusion Dental classifies as ancillary, got ' +
    salimCoreLine[0].typeLocal
);

var rxLine = ctx._stParsePaySheet(
  '8/17/2026\tRx Only\t444444449\tCore\tRXSavers Tier 1\t$10.00'
);
assert(rxLine[0].typeLocal === 'addon', 'RXSavers Core-typed row is ancillary');

var smart = ctx._stParsePaySheet(
  '8/17/2026\tStephanie Davis\t444444446\tCore\tSmartChoice 1500\t$90.00'
);
assert(smart[0].typeLocal === 'deal', 'SmartChoice Core row stays core');

function coreLine(day, name, mid, plan, amt) {
  return day + '\t' + name + '\t' + mid + '\tCore\t' + plan + '\t$' + amt;
}

var week816 = [
  coreLine(
    '8/17/2026',
    'Justice Osei',
    '687554988',
    'SmartChoice 3500',
    '339.60'
  ),
  'Ancillary\tAssistPro Discount\t$13.79',
  coreLine('8/19/2026', 'Paul Beedle', '555555555', 'MedValue 2000+', '259.38'),
  'Ancillary\tCompass VAB Add-on\t$34.99',
  coreLine(
    '8/17/2026',
    'Thomas knapp',
    '444444441',
    'SmartChoice 1500',
    '239.60'
  ),
  'Ancillary\tPrime Health Pass Discount\t$25.99',
  'Ancillary\tAssistPro Discount\t$13.79',
  coreLine(
    '8/17/2026',
    'Landon Brooking',
    '444444442',
    'Access Health Lite STM',
    '33.08'
  ),
  'Ancillary\tAWA Safe Guard 100\t$52.49',
  'Ancillary\tAssistPro Discount\t$13.79',
  coreLine('8/17/2026', 'Shea Delmar', '444444443', 'MedValue 2000+', '248.52'),
  'Ancillary\tCompass VAB Add-on\t$34.99',
  coreLine(
    '8/17/2026',
    'Marni Scanlon',
    '444444444',
    'SmartChoice 3500',
    '501.68'
  ),
  'Ancillary\tAD&D $50k\t$79.00',
  coreLine('8/17/2026', 'Thomas Jacques', '444444445', 'Harbor STM', '157.15'),
  'Ancillary\tNCE Fusion\t$20.65',
  'Ancillary\tAssistPro Discount\t$13.79',
  coreLine(
    '8/18/2026',
    'Timothy Antrum Sr',
    '333333333',
    'Access Health Lite STM',
    '63.26'
  ),
  'Ancillary\tBetter Vision Add-on\t$7.00',
  'Ancillary\tAME $1000 - Add-on\t$21.00',
  coreLine('8/17/2026', 'Erik Larue', '222222222', 'Harbor STM', '160.46'),
  'Ancillary\tAWA Safeguard ADD/AME/CI\t$41.99',
  coreLine(
    '8/16/2026',
    'Stephanie Davis',
    '444444446',
    'SmartChoice 1500',
    '90.00'
  ),
  coreLine(
    '8/16/2026',
    'Daniel Whritenour',
    '444444447',
    'Harbor STM',
    '44.79'
  ),
  coreLine(
    '8/16/2026',
    'Salim Amrar',
    '444444448',
    'Fusion Dental - Plan A SA',
    '18.00'
  ),
  '8/18/2026\tArash Sarvghad\t687430611\tCore\tMEDVALUE 6000+\t-$208.52',
  'Totals\t11 core / 14 anc.\t\u2014\t$2,560.80',
  'Core Plans 11',
  'Ancillaries 14',
  'Tier bonus\t$250.00',
  'Enrollment fee bonus\t$60.00'
].join('\n');

var parsed816 = ctx._stParsePaySheet(week816);
var c816 = countStripped(parsed816);
assert(c816.core === 11, '8/16 core count 11, got ' + c816.core);
assert(c816.anc === 14, '8/16 ancillary count 14, got ' + c816.anc);

var pb816 = ctx._stPaycheckFromRawText(week816);
assert(pb816.dealsPaid === 11, '8/16 dealsPaid 11, got ' + pb816.dealsPaid);
assert(
  money(pb816.tierBonus) === 250,
  '8/16 tier bonus $250, got ' + pb816.tierBonus
);

var week809 = [
  coreLine(
    '8/10/2026',
    'Abdirahman Hassan',
    '111111111',
    'SmartChoice 1500',
    '100.00'
  ),
  '8/10/2026\tAbdirahman Hassan\t111111111\tCore\tSmartChoice 1500\t-$100.00',
  coreLine('8/11/2026', 'George Yang', '222222222', 'Harbor STM', '80.00'),
  '8/11/2026\tGeorge Yang\t222222222\tCore\tHarbor STM\t-$80.00',
  coreLine('8/10/2026', 'Core A', '333333331', 'SmartChoice 1500', '50.00'),
  coreLine('8/10/2026', 'Core B', '333333332', 'SmartChoice 1500', '50.00'),
  coreLine('8/11/2026', 'Core C', '333333333', 'Harbor STM', '50.00'),
  coreLine('8/11/2026', 'Core D', '333333334', 'Harbor STM', '50.00'),
  coreLine('8/12/2026', 'Core E', '333333335', 'MedValue 2000+', '50.00'),
  coreLine('8/12/2026', 'Core F', '333333336', 'MedValue 2000+', '50.00'),
  coreLine('8/13/2026', 'Core G', '333333337', 'SmartChoice 3500', '50.00'),
  coreLine('8/13/2026', 'Core H', '333333338', 'SmartChoice 3500', '50.00'),
  '8/10/2026\tAddon A\t333333331\tAncillary\tAssistPro Discount\t$13.79',
  '8/10/2026\tAddon B\t333333332\tAncillary\tAssistPro Discount\t$13.79',
  '8/11/2026\tAddon C\t333333333\tAncillary\tAssistPro Discount\t$13.79',
  '8/11/2026\tAddon D\t333333334\tAncillary\tAssistPro Discount\t$13.79',
  '8/12/2026\tAddon E\t333333335\tAncillary\tCompass VAB Add-on\t$34.99',
  '8/12/2026\tAddon F\t333333336\tAncillary\tCompass VAB Add-on\t$34.99',
  '8/13/2026\tAddon G\t333333337\tAncillary\tBetter Vision Add-on\t$7.00',
  '8/13/2026\tAddon H\t333333338\tAncillary\tBetter Vision Add-on\t$7.00',
  'Core Plans 8',
  'Ancillaries 8',
  'Tier bonus\t$0.00'
].join('\n');

var parsed809 = ctx._stParsePaySheet(week809);
var pos809 = parsed809.filter(function (r) {
  return r.typeLocal === 'deal' && Number(r.amount) > 0;
});
assert(
  pos809.length === 10,
  '8/9 has 10 positive core-typed rows before strip, got ' + pos809.length
);
var c809 = countStripped(parsed809);
assert(
  c809.core === 8,
  '8/9 core count 8 after cancel pairs, got ' + c809.core
);
assert(c809.anc === 8, '8/9 ancillary count 8, got ' + c809.anc);
assert(
  c809.cancelled === 2,
  '8/9 strips 2 cancel members, got ' + c809.cancelled
);

var swcMatch = ctx._stMatchPaySheetRows(parsed809, []);
var swcTable = ctx._stBuildReconcileTableRows(swcMatch, parsed809, []);
var swcCounts = ctx._stReconcileCountRows(swcTable);
assert(swcCounts.chargeback === 0, '8/9 cancel pairs are not chargebacks');
assert(
  swcCounts.samecancel === 0,
  'cancel pairs are stripped, not samecancel rows'
);

var pb809 = ctx._stPaycheckFromRawText(week809);
assert(pb809.dealsPaid === 8, '8/9 dealsPaid 8, got ' + pb809.dealsPaid);
assert(
  money(pb809.tierBonus) === 0,
  '8/9 tier bonus $0, got ' + pb809.tierBonus
);

var ts = new Date(2026, 7, 17, 12, 0, 0).getTime();
var weekStart = ctx._stStartOfWeek(new Date(2026, 7, 16, 12, 0, 0)).getTime();
var weekSales = [
  {
    id: 'd-steph',
    type: 'deal',
    memberId: '444444446',
    customer: 'Stephanie Davis',
    plan: 'SmartChoice 1500',
    amount: 90,
    planCommission: 90,
    totalAddonCommission: 0,
    expectedDealTotal: 90,
    ts: ts,
    status: 'pending',
    receiptId: 'rcpt-steph'
  },
  {
    id: 'a-salim',
    type: 'addon',
    memberId: '444444448',
    customer: 'Salim Amrar',
    plan: 'Fusion Dental - Plan A SA',
    amount: 18,
    addonCommission: 18,
    ts: ts,
    status: 'pending',
    receiptId: 'rcpt-salim'
  },
  {
    id: 'd-arash',
    type: 'deal',
    memberId: '687430611',
    customer: 'Arash Sarvghad',
    plan: 'MEDVALUE 6000+',
    amount: 599,
    planCommission: 208.52,
    totalAddonCommission: 0,
    expectedDealTotal: 208.52,
    ts: new Date(2026, 7, 18, 12, 0, 0).getTime(),
    status: 'pending',
    receiptId: 'rcpt-arash'
  }
];
ctx._stSaveSales(weekSales);
var beforeJson = JSON.stringify(ctx._stLoadSales());

var reconSheet = ctx._stParsePaySheet(
  [
    coreLine(
      '8/16/2026',
      'Stephanie Davis',
      '444444446',
      'SmartChoice 1500',
      '90.00'
    ),
    coreLine(
      '8/16/2026',
      'Salim Amrar',
      '444444448',
      'Fusion Dental - Plan A SA',
      '18.00'
    ),
    '8/18/2026\tArash Sarvghad\t687430611\tCore\tMEDVALUE 6000+\t-$208.52',
    'Totals\t1 core / 1 anc.\t\u2014\t$108.00'
  ].join('\n')
);
var match = ctx._stMatchPaySheetRows(reconSheet, weekSales);
var table = ctx._stBuildReconcileTableRows(match, reconSheet, weekSales);
var counts = ctx._stReconcileCountRows(table);
assert(
  JSON.stringify(ctx._stLoadSales()) === beforeJson,
  'reconcile did not rewrite stored sales'
);
assert(
  counts.amountmismatch === 0,
  '0 amount mismatches, got ' + counts.amountmismatch
);
assert(
  counts.mislabeled === 0,
  'Salim is not mislabeled, got ' + counts.mislabeled
);
var salimRow = table.filter(function (r) {
  return r.customer === 'Salim Amrar';
})[0];
assert(!!salimRow, 'Salim row exists');
assert(
  salimRow.status === 'matched',
  'Salim status is matched, got ' + (salimRow && salimRow.status)
);
assert(
  counts.chargeback === 1,
  'Arash chargeback still 1, got ' + counts.chargeback
);
var cbRow = table.filter(function (r) {
  return r.status === 'chargeback';
})[0];
assert(
  money(Math.abs(Number(cbRow.sheetAmount))) === 208.52,
  'chargeback amount $208.52'
);

ctx._stPaySheetRows = reconSheet;
ctx._stPaySheetSummary = reconSheet.summary;
ctx._stReconcileTableRows = table;
var state = ctx._stReconcileCollectViewState(weekSales, {
  start: weekStart,
  endExclusive: weekStart + 7 * 24 * 60 * 60 * 1000
});
assert(
  Math.abs(Number(state.diff) || 0) < 0.05,
  '8/16-style difference under 5 cents, got ' + state.diff
);

var statsSales = [
  {
    id: 'd-core',
    type: 'deal',
    plan: 'SmartChoice 1500',
    amount: 100,
    planCommission: 70,
    totalAddonCommission: 0,
    ts: ts,
    status: 'pending'
  },
  {
    id: 'd-fusion',
    type: 'deal',
    plan: 'Fusion Dental - Plan A SA',
    amount: 18,
    planCommission: 18,
    totalAddonCommission: 0,
    ts: ts,
    status: 'pending'
  },
  {
    id: 'd-swc',
    type: 'deal',
    plan: 'Harbor STM',
    amount: 80,
    planCommission: 80,
    totalAddonCommission: 0,
    ts: ts,
    status: 'samecancel'
  },
  {
    id: 'a-ok',
    type: 'addon',
    plan: 'AssistPro Discount',
    amount: 22.99,
    addonCommission: 13.79,
    ts: ts,
    status: 'pending',
    receiptId: 'orphan-a'
  }
];
var stats = ctx._stCalcStats(statsSales, weekStart);
assert(
  stats.weekDeals === 1,
  'tracker cores skip SA deal and samecancel, got ' + stats.weekDeals
);
assert(
  stats.weekAddons === 2,
  'tracker addons include SA deal + addon, got ' + stats.weekAddons
);
var pbLive = ctx._stPaycheckBreakdown(statsSales, stats);
assert(money(pbLive.tierBonus) === 0, '1/2 does not earn a tier bonus');

var cvao = ctx._stBuildCoreVsAddOnLines(
  statsSales,
  ctx._stLoadCommissionRates()
);
assert(
  cvao.core.length === 1,
  'CVAO core omits Fusion Dental SA and samecancel'
);
assert(cvao.addOns.length === 2, 'CVAO add-ons include Fusion Dental SA');

if (failures.length) {
  console.error('STAGE J TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE J TESTS PASSED');
console.log(
  '8/16 core=' +
    c816.core +
    ' anc=' +
    c816.anc +
    ' tier=' +
    money(pb816.tierBonus) +
    ' | 8/9 core=' +
    c809.core +
    ' anc=' +
    c809.anc +
    ' tier=' +
    money(pb809.tierBonus)
);
console.log(
  'salim=' +
    salimRow.status +
    ' chargeback=' +
    counts.chargeback +
    ' amountmismatch=' +
    counts.amountmismatch
);
