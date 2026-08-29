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
  ctx.CHA_USER = { id: 'i-test', name: 'I Tester' };
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
var reconLogs = [];
var origLog = console.log;
console.log = function () {
  var msg = Array.prototype.slice.call(arguments).join(' ');
  if (String(msg).indexOf('[reconcile] unresolved') !== -1) {
    reconLogs.push(msg);
  }
  origLog.apply(console, arguments);
};

var weekStart = ctx._stStartOfWeek(new Date(2026, 7, 16, 12, 0, 0)).getTime();
var view = {
  start: weekStart,
  endExclusive: weekStart + 7 * 24 * 60 * 60 * 1000
};

function dayTs(day) {
  return new Date(2026, 7, day, 12, 0, 0).getTime();
}

function packDeal(opts) {
  var addons = opts.addons || [];
  var addonSum = 0;
  var i;
  for (i = 0; i < addons.length; i++) {
    addonSum += Number(addons[i].commission) || 0;
  }
  addonSum = money(addonSum);
  var deal = {
    id: opts.id,
    type: 'deal',
    memberId: opts.memberId,
    customer: opts.customer,
    plan: opts.plan,
    amount: opts.amount != null ? opts.amount : opts.planCommission,
    ts: opts.ts || dayTs(17),
    status: opts.status || 'pending',
    receiptId: opts.receiptId,
    planCommission: opts.planCommission,
    totalAddonCommission: addonSum,
    expectedDealTotal: money(opts.planCommission + addonSum),
    enrollmentBonus: 0,
    enrollmentFee: 0
  };
  var rows = [deal];
  for (i = 0; i < addons.length; i++) {
    rows.push({
      id: opts.id + '-a' + i,
      type: 'addon',
      memberId: opts.memberId,
      customer: opts.customer,
      plan: addons[i].plan,
      amount:
        addons[i].amount != null ? addons[i].amount : addons[i].commission,
      addonCommission: addons[i].commission,
      ts: deal.ts,
      status: 'pending',
      receiptId: opts.receiptId
    });
  }
  return rows;
}

var weekSales = [];
function addPack(opts) {
  var rows = packDeal(opts);
  weekSales = weekSales.concat(rows);
  return rows[0];
}

var justice = addPack({
  id: 'd-justice',
  receiptId: 'rcpt-justice',
  memberId: '687554988',
  customer: 'Justice Osei',
  plan: 'SmartChoice 3500',
  planCommission: 339.6,
  addons: [{ plan: 'AssistPro Discount', commission: 13.79 }]
});
addPack({
  id: 'd-paul',
  receiptId: 'rcpt-paul',
  memberId: '555555555',
  customer: 'Paul Beedle',
  plan: 'MedValue 2000+',
  planCommission: 259.38,
  ts: dayTs(19),
  addons: [{ plan: 'Compass VAB Add-on', commission: 34.99 }]
});
addPack({
  id: 'd-knapp',
  receiptId: 'rcpt-knapp',
  memberId: '444444441',
  customer: 'Thomas knapp',
  plan: 'SmartChoice 1500',
  planCommission: 239.6,
  addons: [
    { plan: 'Prime Health Pass Discount', commission: 25.99 },
    { plan: 'AssistPro Discount', commission: 13.79 }
  ]
});
addPack({
  id: 'd-landon',
  receiptId: 'rcpt-landon',
  memberId: '444444442',
  customer: 'Landon Brooking',
  plan: 'Access Health Lite STM',
  planCommission: 33.08,
  addons: [
    { plan: 'AWA Safe Guard 100', commission: 52.49 },
    { plan: 'AssistPro Discount', commission: 13.79 }
  ]
});
addPack({
  id: 'd-shea',
  receiptId: 'rcpt-shea',
  memberId: '444444443',
  customer: 'Shea Delmar',
  plan: 'MedValue 2000+',
  planCommission: 248.52,
  addons: [{ plan: 'Compass VAB Add-on', commission: 34.99 }]
});
addPack({
  id: 'd-marni',
  receiptId: 'rcpt-marni',
  memberId: '444444444',
  customer: 'Marni Scanlon',
  plan: 'SmartChoice 3500',
  planCommission: 501.68,
  addons: [{ plan: 'AD&D $50k', commission: 79 }]
});
addPack({
  id: 'd-jacques',
  receiptId: 'rcpt-jacques',
  memberId: '444444445',
  customer: 'Thomas Jacques',
  plan: 'Harbor STM',
  planCommission: 157.15,
  addons: [
    { plan: 'NCE Fusion', commission: 20.65 },
    { plan: 'AssistPro Discount', commission: 13.79 }
  ]
});
addPack({
  id: 'd-tim',
  receiptId: 'rcpt-tim',
  memberId: '333333333',
  customer: 'Timothy Antrum Sr',
  plan: 'Access Health Lite STM',
  planCommission: 63.26,
  ts: dayTs(18),
  addons: [
    { plan: 'Better Vision Add-on', commission: 7 },
    { plan: 'AME $1000 - Add-on', commission: 21 }
  ]
});
addPack({
  id: 'd-erik',
  receiptId: 'rcpt-erik',
  memberId: '222222222',
  customer: 'Erik Larue',
  plan: 'Harbor STM',
  planCommission: 160.46,
  addons: [{ plan: 'AWA Safeguard ADD/AME/CI', commission: 41.99 }]
});
var stephanie = addPack({
  id: 'd-stephanie',
  receiptId: 'rcpt-stephanie',
  memberId: '444444446',
  customer: 'Stephanie Davis',
  plan: 'SmartChoice 1500',
  planCommission: 90
});
var daniel = addPack({
  id: 'd-daniel',
  receiptId: 'rcpt-daniel',
  memberId: '444444447',
  customer: 'Daniel Whritenour',
  plan: 'Harbor STM',
  planCommission: 44.79
});
addPack({
  id: 'd-salim',
  receiptId: 'rcpt-salim',
  memberId: '444444448',
  customer: 'Salim Amrar',
  plan: 'SmartChoice 1500',
  planCommission: 50
});
addPack({
  id: 'd-arash',
  receiptId: 'rcpt-arash',
  memberId: '687430611',
  customer: 'Arash Sarvghad',
  plan: 'MEDVALUE 6000+',
  planCommission: 208.52,
  ts: dayTs(18)
});

assert(
  money(ctx._stSaleUnsignedCommission(justice)) === 353.39,
  'bundled Justice total stays on expectedDealTotal'
);
assert(
  money(ctx._stReconLineCommission(justice)) === 339.6,
  'reconcile Justice line is core only'
);
assert(
  money(ctx._stSaleUnsignedCommission(stephanie)) === 90,
  'no-addon Stephanie bundled equals core'
);
assert(
  money(ctx._stReconLineCommission(stephanie)) === 90,
  'no-addon Stephanie line equals core'
);
assert(
  money(ctx._stReconLineCommission(daniel)) === 44.79,
  'no-addon Daniel line equals core'
);

var weekSheet = [
  '8/17/2026\tJustice Osei\t687554988\tCore\tSmartChoice 3500\t$339.60',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/19/2026\tPaul Beedle\t555555555\tCore\tMedValue 2000+\t$259.38',
  'Ancillary\tCompass VAB Add-on\t$34.99',
  '8/17/2026\tThomas knapp\t444444441\tCore\tSmartChoice 1500\t$239.60',
  'Ancillary\tPrime Health Pass Discount\t$25.99',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/17/2026\tLandon Brooking\t444444442\tCore\tAccess Health Lite STM\t$33.08',
  'Ancillary\tAWA Safe Guard 100\t$52.49',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/17/2026\tShea Delmar\t444444443\tCore\tMedValue 2000+\t$248.52',
  'Ancillary\tCompass VAB Add-on\t$34.99',
  '8/17/2026\tMarni Scanlon\t444444444\tCore\tSmartChoice 3500\t$501.68',
  'Ancillary\tAD&D $50k\t$79.00',
  '8/17/2026\tThomas Jacques\t444444445\tCore\tHarbor STM\t$157.15',
  'Ancillary\tNCE Fusion\t$20.65',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/18/2026\tTimothy Antrum Sr\t333333333\tCore\tAccess Health Lite STM\t$63.26',
  'Ancillary\tBetter Vision Add-on\t$7.00',
  'Ancillary\tAME $1000 - Add-on\t$21.00',
  '8/17/2026\tErik Larue\t222222222\tCore\tHarbor STM\t$160.46',
  'Ancillary\tAWA Safeguard ADD/AME/CI\t$41.99',
  '8/16/2026\tStephanie Davis\t444444446\tCore\tSmartChoice 1500\t$90.00',
  '8/16/2026\tDaniel Whritenour\t444444447\tCore\tHarbor STM\t$44.79',
  '8/16/2026\tSalim Amrar\t444444448\tCore\tGuardian Accident Only\t$50.00',
  '8/18/2026\tArash Sarvghad\t687430611\tCore\tMEDVALUE 6000+\t-$208.52',
  'Totals\t11 core / 14 anc.\t\u2014\t$2,560.78',
  'Tier bonus\t$250.00',
  'Enrollment fee bonus\t$60.00',
  'Net pay\t$2,662.26'
].join('\n');

var parsed = ctx._stParsePaySheet(weekSheet);
assert(
  money(parsed.summary.totalsCommission) === 2560.78,
  'Totals line parsed at $2560.78, got ' + parsed.summary.totalsCommission
);

var beforeMismatch = 0;
var coresOnSheet = parsed.filter(function (r) {
  return r.typeLocal === 'deal' && Number(r.amount) > 0;
});
var si;
for (si = 0; si < coresOnSheet.length; si++) {
  var pay = coresOnSheet[si];
  var sale = null;
  var wi;
  for (wi = 0; wi < weekSales.length; wi++) {
    if (
      weekSales[wi].type === 'deal' &&
      String(weekSales[wi].memberId) === String(pay.memberId)
    ) {
      sale = weekSales[wi];
      break;
    }
  }
  if (
    sale &&
    ctx._stReconPlansAlign(sale.plan, pay.productName) &&
    Math.abs(
      Math.abs(Number(pay.amount)) - ctx._stSaleUnsignedCommission(sale)
    ) > 0.049
  ) {
    beforeMismatch += 1;
  }
}
assert(
  beforeMismatch === 9,
  'bundled compare would flag 9 amount mismatches, got ' + beforeMismatch
);

ctx._stSavePaychecks([
  {
    weekStart: weekStart,
    paycheck: {
      source: 'verified',
      netCommission: 1111.11,
      netPay: 1111.11
    }
  }
]);
ctx._stSaveSales(weekSales);
var salesBefore = JSON.stringify(ctx._stLoadSales());
var verifiedBefore = JSON.stringify(ctx._stLoadPaychecks());

ctx._stPaySheetRows = parsed;
ctx._stPaySheetSummary = parsed.summary;
ctx._stReconcileMatchView = view;
var match = ctx._stMatchPaySheetRows(parsed, weekSales);
var table = ctx._stBuildReconcileTableRows(match, parsed, weekSales);
ctx._stReconcileTableRows = table;
var counts = ctx._stReconcileCountRows(table);
var state = ctx._stReconcileCollectViewState(weekSales, view);

assert(
  JSON.stringify(ctx._stLoadSales()) === salesBefore,
  'reconcile did not rewrite stored sales'
);
assert(
  JSON.stringify(ctx._stLoadPaychecks()) === verifiedBefore,
  'verified paycheck stayed frozen'
);

assert(
  counts.amountmismatch === 0,
  '0 amount mismatches, got ' + counts.amountmismatch
);
assert(counts.matched === 24, 'Matched 24, got ' + counts.matched);
assert(counts.chargeback === 1, 'Chargeback 1, got ' + counts.chargeback);
assert(
  counts.mislabeled === 1,
  'Salim mislabel remains, got ' + counts.mislabeled
);
assert(
  counts.samecancel === 0,
  'same-week cancels 0, got ' + counts.samecancel
);
assert(counts.missing === 0, 'missing 0, got ' + counts.missing);

var cbRow = table.filter(function (r) {
  return r.status === 'chargeback';
})[0];
assert(!!cbRow, 'chargeback table row exists');
assert(
  money(Math.abs(Number(cbRow.sheetAmount))) === 208.52,
  'chargeback amount $208.52'
);

var salimRow = table.filter(function (r) {
  return r.status === 'mislabeled' && r.customer === 'Salim Amrar';
})[0];
assert(!!salimRow, 'Salim Amrar stays mislabeled');

function findRow(customer, product) {
  var i;
  for (i = 0; i < table.length; i++) {
    if (
      table[i].customer === customer &&
      table[i].product === product &&
      table[i].status === 'matched'
    ) {
      return table[i];
    }
  }
  return null;
}

var justiceCore = findRow('Justice Osei', 'SmartChoice 3500');
assert(!!justiceCore, 'Justice core matched');
assert(
  money(justiceCore.trackerAmount) === 339.6,
  'Justice tracker is core $339.60, got ' +
    (justiceCore && justiceCore.trackerAmount)
);
var justiceAddon = findRow('Justice Osei', 'AssistPro Discount');
assert(!!justiceAddon, 'Justice AssistPro matched separately');
assert(
  money(justiceAddon.trackerAmount) === 13.79,
  'Justice AssistPro tracker $13.79'
);

var stephRow = findRow('Stephanie Davis', 'SmartChoice 1500');
assert(!!stephRow, 'Stephanie matched');
assert(money(stephRow.trackerAmount) === 90, 'Stephanie unchanged at $90.00');
var danRow = findRow('Daniel Whritenour', 'Harbor STM');
assert(!!danRow, 'Daniel matched');
assert(money(danRow.trackerAmount) === 44.79, 'Daniel unchanged at $44.79');

assert(
  money(state.trackerNet) === 2560.78,
  'Tracker commission $2560.78, got ' + state.trackerNet
);
assert(money(state.sheetNet) === 2560.78, 'Pay sheet commission $2560.78');
assert(money(state.diff) === 0, 'Difference $0.00, got ' + state.diff);
assert(
  money(state.unresolved) === 0,
  'unresolved $0.00, got ' + state.unresolved
);
assert(
  money(state.trackerNet) ===
    money(ctx._stSumReconcileTrackerCommission(table)),
  'Tracker commission equals tracker column sum'
);
assert(reconLogs.length === 0, 'unresolved/Difference guard stayed silent');

var stats = ctx._stCalcStats(weekSales, weekStart);
var pb = ctx._stPaycheckBreakdown(weekSales, stats);
var itemized = 0;
var doubled = 0;
var addonLines = 0;
for (si = 0; si < weekSales.length; si++) {
  var s = weekSales[si];
  if (s.type === 'deal') {
    itemized += Number(s.planCommission) || 0;
    itemized += Number(s.totalAddonCommission) || 0;
    doubled += Number(s.expectedDealTotal) || 0;
  } else if (s.type === 'addon') {
    addonLines += Number(s.addonCommission) || 0;
    doubled += Number(s.addonCommission) || 0;
  }
}
assert(
  money(pb.dealComm + pb.addonComm) === money(itemized),
  'This Week paycheck uses itemized plan + add-on commission'
);
assert(
  money(doubled - itemized) === money(addonLines),
  'bundled deal totals plus add-on rows would double-count add-ons'
);
assert(
  money(pb.dealComm + pb.addonComm) < money(doubled),
  'This Week paycheck does not add add-ons twice'
);
assert(
  money(pb.estimated) === money(itemized + pb.enrollmentBonus + pb.tierBonus),
  'paycheck estimated is itemized lines plus bonuses, not bundled cores'
);

console.log = origLog;

if (failures.length) {
  console.error('STAGE I TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE I TESTS PASSED');
console.log(
  'trackerNet=' +
    money(state.trackerNet) +
    ' diff=' +
    money(state.diff) +
    ' matched=' +
    counts.matched +
    ' amountmismatch=' +
    counts.amountmismatch +
    ' chargeback=' +
    counts.chargeback +
    ' mislabeled=' +
    counts.mislabeled
);
console.log(
  'paycheck itemized=' +
    money(pb.dealComm + pb.addonComm) +
    ' estimated=' +
    money(pb.estimated) +
    ' wouldDoubleBy=' +
    money(addonLines)
);
