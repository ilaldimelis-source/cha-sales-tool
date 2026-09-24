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
  ctx.CHA_USER = { id: 'h-test', name: 'H Tester' };
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

var weekSheet = [
  '8/17/2026\tRobert Carodine\t111111111\tCore\tSmartChoice 1500\t$239.60',
  'Ancillary\tAWA Safeguard ADD/AME/CI\t$104.30',
  'Ancillary\tPinnacle Critical Care Plan 2\t$87.88',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/17/2026\tErik Larue\t222222222\tCore\tHarbor STM\t$160.46',
  'Ancillary\tAWA Safeguard ADD/AME/CI\t$41.99',
  '8/18/2026\tTimothy Antrum Sr\t333333333\tCore\tAccess Health Lite STM\t$63.26',
  'Ancillary\tBetter Vision Add-on\t$7.00',
  'Ancillary\tAME $1000 - Add-on\t$21.00',
  '8/17/2026\tJustice Osei\t687554988\tCore\tSmartChoice 3500\t$339.60',
  'Ancillary\tAssistPro Discount\t$13.79',
  '8/19/2026\tPaul Beedle\t555555555\tCore\tMedValue 2000+\t$259.38',
  'Ancillary\tCompass VAB Add-on\t$34.99',
  '8/16/2026\tCore Extra A\t666666661\tCore\tSmartChoice 1500\t$100.00',
  '8/16/2026\tCore Extra B\t666666662\tCore\tSmartChoice 1500\t$100.00',
  '8/16/2026\tCore Extra C\t666666663\tCore\tSmartChoice 1500\t$100.00',
  '8/16/2026\tCore Extra D\t666666664\tCore\tSmartChoice 1500\t$100.00',
  '8/16/2026\tCore Extra E\t666666665\tCore\tSmartChoice 1500\t$200.00',
  'Ancillary\tBetter Vision Add-on\t$100.00',
  'Ancillary\tBetter Vision Add-on\t$100.00',
  'Ancillary\tBetter Vision Add-on\t$100.00',
  'Ancillary\tBetter Vision Add-on\t$100.00',
  'Ancillary\tBetter Vision Add-on\t$100.00',
  'Ancillary\tBetter Vision Add-on\t$73.74',
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

var arash = parsed.filter(function (r) {
  return r.memberId === '687430611';
})[0];
assert(!!arash, 'Arash chargeback row parsed');
assert(money(arash.amount) === -208.52, 'Arash amount is negative');
assert(money(arash.amountLost) === 208.52, 'amountLost is positive 208.52');

ctx._stPaySheetRows = parsed;
ctx._stPaySheetSummary = parsed.summary;
ctx._stReconcileTableRows = [];
var state = ctx._stReconcileCollectViewState([], {
  start: 1,
  endExclusive: 2
});
assert(
  money(state.sheetNet) === 2560.78,
  'Pay sheet commission uses Totals $2560.78, got ' + state.sheetNet
);

var noSummary = ctx._stParsePaySheet(
  [
    '8/17/2026\tJustice Osei\t687554988\tCore\tSmartChoice 3500\t$339.60',
    'Ancillary\tAssistPro Discount\t$13.79',
    '8/18/2026\tArash Sarvghad\t687430611\tCore\tMEDVALUE 6000+\t-$208.52'
  ].join('\n')
);
ctx._stPaySheetRows = noSummary;
ctx._stPaySheetSummary = noSummary.summary;
state = ctx._stReconcileCollectViewState([], { start: 1, endExclusive: 2 });
assert(
  noSummary.length === 3,
  'summary-less sheet still parses continuation rows, got ' + noSummary.length
);
assert(
  money(state.sheetNet) === money(339.6 + 13.79 - 208.52),
  'summary-less sheet keeps row sum, not zero: ' + state.sheetNet
);

ctx._stPaySheetRows = [{ amount: 100 }, { amount: 50 }, { amount: -10 }];
ctx._stPaySheetSummary = { found: true, totalsCommission: 0 };
state = ctx._stReconcileCollectViewState([], { start: 1, endExclusive: 2 });
assert(
  money(state.sheetNet) === 140,
  'zero totalsCommission must not overwrite row sum, got ' + state.sheetNet
);

var arashTs = new Date(2026, 7, 18, 12, 0, 0).getTime();
var weekSales = [
  {
    id: 'sale-arash',
    type: 'deal',
    memberId: '687430611',
    customer: 'Arash Sarvghad',
    plan: 'MEDVALUE 6000+',
    amount: 599,
    ts: arashTs,
    status: 'pending',
    planCommission: 239.6,
    expectedDealTotal: 239.6
  }
];
var match = ctx._stMatchPaySheetRows(parsed, weekSales);
var table = ctx._stBuildReconcileTableRows(match, parsed, weekSales);
var counts = ctx._stReconcileCountRows(table);
assert(
  counts.chargeback === 1,
  'Chargebacks chip is 1, got ' + counts.chargeback
);
var cbRow = table.filter(function (r) {
  return r.status === 'chargeback';
})[0];
assert(!!cbRow, 'chargeback table row exists');
assert(
  money(Math.abs(Number(cbRow.sheetAmount))) === 208.52,
  'chargeback amount $208.52'
);
assert(!cbRow.confirmed, 'pending tracker sale stays unconfirmed');
assert(counts.needs >= 1, 'unconfirmed chargeback needs attention');

var confirmedSales = [
  {
    id: 'sale-arash-cb',
    type: 'deal',
    memberId: '687430611',
    customer: 'Arash Sarvghad',
    plan: 'MEDVALUE 6000+',
    amount: 599,
    ts: arashTs,
    status: 'chargeback',
    planCommission: 180,
    totalAddonCommission: 28.52,
    expectedDealTotal: 208.52,
    reversal: {
      type: 'chargeback',
      amountLost: 208.52,
      originalCommission: 208.52
    }
  }
];
ctx._stSaveSales(confirmedSales);
var confirmedSheet = ctx._stParsePaySheet(
  '8/18/2026\tArash Sarvghad\t687430611\tCore\tMEDVALUE 6000+\t-$208.52'
);
var confirmedMatch = ctx._stMatchPaySheetRows(confirmedSheet, confirmedSales);
var confirmedTable = ctx._stBuildReconcileTableRows(
  confirmedMatch,
  confirmedSheet,
  confirmedSales
);
var confirmedCounts = ctx._stReconcileCountRows(confirmedTable);
assert(
  confirmedCounts.needs === 0,
  'confirmed matching chargeback leaves needs at 0, got ' +
    confirmedCounts.needs
);
assert(
  confirmedCounts.matched === 1,
  'confirmed chargeback counts as matched, got ' + confirmedCounts.matched
);
assert(
  confirmedCounts.chargeback === 1,
  'Chargebacks chip still 1 after confirm, got ' + confirmedCounts.chargeback
);
var confirmedRow = confirmedTable.filter(function (r) {
  return r.status === 'chargeback';
})[0];
assert(!!confirmedRow && confirmedRow.confirmed, 'chargeback row is confirmed');
assert(
  !ctx._stReconcileRowHasActions(confirmedRow),
  'confirmed chargeback has no Resolve action'
);
assert(
  money(Math.abs(Number(confirmedRow.trackerAmount))) === 208.52,
  'confirmed chargeback tracker amount is full reversal'
);

var swcSheet = ctx._stParsePaySheet(
  [
    '8/17/2026\tSame Person\t123123123\tCore\tSmartChoice 1500\t$100.00',
    '8/17/2026\tSame Person\t123123123\tCore\tSmartChoice 1500\t-$100.00'
  ].join('\n')
);
var cancelled = {};
var stripped = ctx._stReconStripCancelPairs(swcSheet, cancelled);
var swcNeg = stripped.filter(function (r) {
  return Number(r.amount) < 0;
});
assert(
  swcNeg.length === 0,
  'same-week cancel pair is stripped, not a chargeback'
);
var swcMatch = ctx._stMatchPaySheetRows(swcSheet, []);
var swcTable = ctx._stBuildReconcileTableRows(swcMatch, swcSheet, []);
var swcCounts = ctx._stReconcileCountRows(swcTable);
assert(swcCounts.chargeback === 0, 'SWC sheet does not count as chargeback');

var ts = new Date(2026, 5, 10, 12, 0, 0).getTime();
var verifiedTs = new Date(2026, 4, 6, 12, 0, 0).getTime();
ctx._stSavePaychecks([
  {
    weekStart: ctx._stWeekStartFromTs(verifiedTs),
    paycheck: { source: 'verified' }
  }
]);
var sales = [
  {
    id: 'a-justice',
    type: 'addon',
    customer: 'Justice Osei',
    plan: 'AssistPro Discount',
    amount: 22.99,
    addonCommission: 4.6,
    addonCommissionRate: 0.2,
    status: 'pending',
    ts: ts
  },
  {
    id: 'a-landon',
    type: 'addon',
    customer: 'Landon Brooking',
    plan: 'AWA Safe Guard 100',
    amount: 74.99,
    addonCommission: 18.75,
    addonCommissionRate: 0.25,
    status: 'pending',
    ts: ts
  },
  {
    id: 'a-tim-vis',
    type: 'addon',
    customer: 'Timothy Antrum Sr',
    plan: 'Better Vision Add-on',
    amount: 19.99,
    addonCommission: 5,
    addonCommissionRate: 0.25,
    status: 'pending',
    ts: ts
  },
  {
    id: 'a-tim-ame',
    type: 'addon',
    customer: 'Timothy Antrum Sr',
    plan: 'AME $1000 - Add-on',
    amount: 35,
    addonCommission: 24.5,
    addonCommissionRate: 0.7,
    status: 'pending',
    ts: ts
  },
  {
    id: 'a-verified',
    type: 'addon',
    customer: 'Verified Week',
    plan: 'AssistPro Discount',
    amount: 22.99,
    addonCommission: 4.6,
    addonCommissionRate: 0.2,
    status: 'pending',
    ts: verifiedTs
  },
  {
    id: 'a-cb',
    type: 'addon',
    customer: 'Chargeback Person',
    plan: 'AssistPro Discount',
    amount: 22.99,
    addonCommission: 4.6,
    addonCommissionRate: 0.2,
    status: 'chargeback',
    ts: ts
  }
];
ctx._stSaveSales(sales);
var beforeJson = JSON.stringify(ctx._stLoadSales());
var preview = ctx._stBuildRecalcPreview(ctx._stLoadSales());
assert(
  JSON.stringify(ctx._stLoadSales()) === beforeJson,
  'preview alone does not change stored sales'
);

function findItem(name) {
  var i;
  for (i = 0; i < preview.items.length; i++) {
    if (preview.items[i].product === name && preview.items[i].kind === 'rate') {
      return preview.items[i];
    }
  }
  return null;
}
var justice = findItem('AssistPro Discount');
assert(
  justice && justice.customer === 'Justice Osei',
  'Justice AssistPro in preview'
);
assert(money(justice.stored) === 4.6, 'Justice stored 4.60');
assert(money(justice.next) === 13.79, 'Justice new 13.79');
var landon = findItem('AWA Safe Guard 100');
assert(landon && money(landon.stored) === 18.75, 'Landon stored 18.75');
assert(
  money(landon.next) === 52.49,
  'Landon new 52.49 got ' + (landon && landon.next)
);
var vis = findItem('Better Vision Add-on');
assert(vis && money(vis.stored) === 5, 'Timothy vision stored 5.00');
assert(money(vis.next) === 7, 'Timothy vision new 7.00');
var ame = findItem('AME $1000 - Add-on');
assert(ame && money(ame.stored) === 24.5, 'Timothy AME stored 24.50');
assert(money(ame.next) === 21, 'Timothy AME new 21.00');

var skippedReasons = preview.skipped
  .map(function (s) {
    return s.reason;
  })
  .join(' | ');
assert(
  skippedReasons.indexOf('verified') !== -1,
  'verified-week sale is skipped: ' + skippedReasons
);
assert(
  skippedReasons.indexOf('Chargeback') === -1,
  'chargebacks are not lumped into skipped: ' + skippedReasons
);
assert(
  preview.reversals && preview.reversals.length === 1,
  'chargeback is in the reversals group, got ' +
    ((preview.reversals && preview.reversals.length) || 0)
);
assert(
  preview.reversals[0].customer === 'Chargeback Person',
  'reversal group names the chargeback sale'
);
assert(
  preview.includeReversals === false,
  'reversals start excluded from apply'
);

ctx._stRecalcPreview = preview;
ctx._stApplyRecalcPreview();
var after = ctx._stLoadSales();
function byId(id) {
  var i;
  for (i = 0; i < after.length; i++) {
    if (after[i].id === id) return after[i];
  }
  return null;
}
assert(
  money(byId('a-justice').addonCommission) === 13.79,
  'apply updates Justice'
);
assert(
  money(byId('a-justice').commissionBeforeRecalc) === 4.6,
  'original Justice value is recoverable'
);
assert(
  money(byId('a-landon').addonCommission) === 52.49,
  'apply updates Landon'
);
assert(
  money(byId('a-tim-vis').addonCommission) === 7,
  'apply updates Better Vision'
);
assert(money(byId('a-tim-ame').addonCommission) === 21, 'apply updates AME');
assert(
  money(byId('a-verified').addonCommission) === 4.6,
  'verified-week sale was not recalculated'
);
assert(
  money(byId('a-cb').addonCommission) === 4.6,
  'chargeback sale was not recalculated'
);

var html = ctx._stBuildRecalcPreviewHtml(null);
assert(
  html.indexOf('recalc-preview') !== -1,
  'preview control is in the rates panel'
);
assert(
  html.indexOf('recalc-apply') === -1,
  'apply is not shown before preview'
);

if (failures.length) {
  console.error('STAGE H TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE H TESTS PASSED');
console.log(
  'totalsCommission=' +
    money(parsed.summary.totalsCommission) +
    ' sheetNet=' +
    money(2560.78) +
    ' chargebacks=1 amount=208.52'
);
console.log(
  'preview items=' +
    preview.items.length +
    ' skipped=' +
    preview.skipped.length +
    ' net=' +
    money(preview.net)
);
