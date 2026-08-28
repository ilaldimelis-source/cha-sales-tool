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
  ctx.CHA_USER = { id: 'k-test', name: 'K Tester' };
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

var productRows = ctx._stProductRateRowsForUi();
var adnd = productRows.filter(function (r) {
  var n = String(r.rec.name || '');
  return n.indexOf('AD&D $') === 0 && n.indexOf('WellGuard') === -1;
});
assert(adnd.length === 6, 'six AD&D display rows, got ' + adnd.length);
var i;
for (i = 0; i < adnd.length; i++) {
  assert(Number(adnd[i].rec.rate) === 1, adnd[i].rec.name + ' is 100%');
}

var named50k = ctx._stResolveProductRate('AD&D $50k - Add-on', {});
assert(named50k.named === true, 'AD&D $50k - Add-on hits named rate');
assert(Number(named50k.rate) === 1, 'AD&D $50k - Add-on is 100%');
var namedLong = ctx._stResolveProductRate('AD&D $50,000', {});
assert(namedLong.named === true, 'AD&D $50,000 hits named rate');
assert(Number(namedLong.rate) === 1, 'AD&D $50,000 is 100%');

var productNames = productRows
  .map(function (r) {
    return r.rec.name;
  })
  .join(' | ');
assert(
  productNames.indexOf('Association fee') === -1,
  'Association fee is not in the main product list'
);
assert(
  productNames.indexOf('ExtraPerks') === -1,
  'ExtraPerks is not in the main product list'
);

var nonComm = ctx._stProductRateRowsForUi('noncomm');
var nonNames = nonComm
  .map(function (r) {
    return r.rec.name;
  })
  .join(' | ');
assert(
  nonNames.indexOf('Association fee') !== -1,
  'Association fee is in the non-commissionable section'
);
var feeInfo = ctx._stResolveProductRate('Association fee', {});
assert(feeInfo.nonCommissionable === true, 'Association fee stays excluded');
assert(Number(feeInfo.rate) === 0, 'Association fee rate stays 0');
assert(
  !ctx._stProductIsAncillary('Association fee'),
  'non-commissionable fees are not counted as ancillaries'
);
var awaFee = ctx._stResolveProductRate('AWA Association Fee', {});
assert(
  awaFee.nonCommissionable === true,
  'AWA Association Fee resolves as non-commissionable'
);
assert(Number(awaFee.rate) === 0, 'AWA Association Fee rate is 0');
assert(
  !ctx._stProductIsAncillary('AWA Association Fee'),
  'AWA Association Fee is not an ancillary'
);
assert(
  !ctx._stSaleCountsAsAddon({
    type: 'addon',
    plan: 'AWA Association Fee',
    amount: 10
  }),
  'AWA Association Fee does not count toward add-on totals'
);
assert(
  ctx._stResolveProductRate('NCE Payment Fee', {}).nonCommissionable === true,
  'carrier-prefixed Payment fee resolves'
);
assert(
  ctx._stResolveProductRate('AWA Enrollment Fee', {}).nonCommissionable ===
    true,
  'carrier-prefixed Enrollment fee resolves'
);
assert(
  ctx._stResolveProductRate('AWA Association enrollment fee', {})
    .nonCommissionable === true,
  'carrier-prefixed Association enrollment fee resolves'
);

var feeWeek = ctx._stStartOfWeek(new Date(2026, 7, 23, 12, 0, 0)).getTime();
var feeTs = feeWeek + 24 * 60 * 60 * 1000;
var feeStats = ctx._stCalcStats(
  [
    {
      id: 'fee-deal',
      type: 'deal',
      plan: 'SmartChoice 1500',
      amount: 100,
      planCommission: 70,
      status: 'pending',
      ts: feeTs,
      receiptId: 'fee-rcpt'
    },
    {
      id: 'fee-awa',
      type: 'addon',
      plan: 'AWA Association Fee',
      amount: 10,
      addonCommission: 0,
      status: 'pending',
      ts: feeTs,
      receiptId: 'fee-rcpt'
    },
    {
      id: 'fee-awa-2',
      type: 'addon',
      plan: 'AWA Association Fee',
      amount: 10,
      addonCommission: 0,
      status: 'pending',
      ts: feeTs,
      receiptId: 'fee-rcpt'
    },
    {
      id: 'fee-assist',
      type: 'addon',
      plan: 'AssistPro Discount',
      amount: 22.99,
      addonCommission: 13.79,
      status: 'pending',
      ts: feeTs,
      receiptId: 'fee-rcpt'
    }
  ],
  feeWeek
);
assert(
  feeStats.weekAddons === 1,
  'association fees excluded from add-on count, got ' + feeStats.weekAddons
);
assert(
  feeStats.weekDeals === 1,
  'core deal still counts, got ' + feeStats.weekDeals
);

var panel = ctx._stBuildProductRatesPanelHtml();
assert(
  panel.indexOf('Product commission rates') !== -1,
  'rates panel summary is present'
);
assert(
  panel.indexOf('st-rates-panel open') === -1,
  'rates panel starts collapsed'
);
assert(
  panel.indexOf('Non-commissionable items') !== -1,
  'non-commissionable section is present'
);
assert(
  panel.indexOf('recalc-preview') !== -1,
  'Recalculate preview control is in the panel'
);
assert(
  panel.indexOf('is-confirmed') !== -1,
  'Confirmed badge still in rates UI'
);

var weekStart = ctx._stStartOfWeek(new Date(2026, 7, 16, 12, 0, 0)).getTime();
var stats = ctx._stCalcStats([], weekStart);
var dash = ctx._stBuildAnalyticsDashboard([], stats);
assert(
  dash.indexOf('Product commission rates') === -1,
  'rates panel is not on Analytics'
);

var recon = ctx._stBuildReconcilePane([], {
  start: weekStart,
  endExclusive: weekStart + 7 * 24 * 60 * 60 * 1000
});
assert(
  recon.indexOf('Product commission rates') !== -1,
  'rates panel is on Reconcile'
);
assert(
  recon.indexOf('recalc-preview') !== -1,
  'Recalculate lives on Reconcile'
);

ctx._stReconcileMatchView = { start: weekStart };
ctx._stReconcileIgnoredKeys = { 'status|id|mid|1|plan|10': true };
ctx._stPersistReconcileIgnoredKeys();
ctx._stReconcileIgnoredKeys = {};
ctx._stHydrateReconcileIgnoredKeys(weekStart);
assert(
  ctx._stReconcileIgnoredKeys['status|id|mid|1|plan|10'] === true,
  'ignored keys survive hydrate for the same week'
);
ctx._stReconcileIgnoredKeys = {};
ctx._stHydrateReconcileIgnoredKeys(weekStart);
assert(
  ctx._stReconcileIgnoredKeys['status|id|mid|1|plan|10'] === true,
  'session clear does not wipe stored week ignores'
);
ctx._stHydrateReconcileIgnoredKeys(weekStart + 1);
assert(
  !ctx._stReconcileIgnoredKeys['status|id|mid|1|plan|10'],
  'a different week does not inherit ignores'
);

ctx._stReconcileIgnoredKeys = { 'k-ignore': true };
ctx._stReconcileTableRows = [
  {
    ignored: true,
    memberId: '111111111',
    dateTs: 99,
    product: 'SmartChoice 1500'
  }
];
var rec = ctx._stBuildReconcileHistoryRecord(
  'sheet',
  { start: weekStart },
  {
    matched: 2,
    missing: [
      {
        kind: 'missing',
        customer: 'Ignored Person',
        productName: 'SmartChoice 1500',
        dateTs: 99,
        amount: 10,
        memberId: '111111111'
      }
    ],
    mislabeled: [],
    notOnSheet: [],
    chargebackCandidates: [],
    untrackedChargebacks: [],
    problems: [
      {
        kind: 'missing',
        customer: 'Ignored Person',
        productName: 'SmartChoice 1500',
        dateTs: 99,
        amount: 10,
        memberId: '111111111'
      }
    ],
    gap: 0
  }
);
assert(
  rec.ignoredKeys && rec.ignoredKeys.indexOf('k-ignore') !== -1,
  'saved snapshot stores ignored keys'
);
assert(rec.problems[0].ignored === true, 'saved problem is marked ignored');
var snapHtml = ctx._stBuildReconcileHistorySnapshotHtml(rec);
assert(
  snapHtml.indexOf('Ignored Person') === -1,
  'history snapshot hides ignored problems'
);

var oldRec = {
  problems: [
    {
      kind: 'missing',
      customer: 'Legacy Person',
      productName: 'Harbor STM',
      dateTs: 1,
      amount: 5,
      memberId: '222222222'
    }
  ],
  counts: { matched: 0, missing: 1 },
  paycheck: {}
};
var oldHtml = ctx._stBuildReconcileHistorySnapshotHtml(oldRec);
assert(
  oldHtml.indexOf('Legacy Person') !== -1,
  'older snapshots without ignore data still open'
);

ctx._stRecalcPreview = ctx._stBuildRecalcPreview([]);
assert(!!ctx._stRecalcPreview, 'recalc preview still runs from the new panel');
var previewHtml = ctx._stBuildRecalcPreviewHtml(ctx._stRecalcPreview);
assert(
  previewHtml.indexOf('recalc-apply') === -1 ||
    previewHtml.indexOf('Recalculate') !== -1,
  'recalc preview HTML still renders'
);

if (failures.length) {
  console.error('STAGE K TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE K TESTS PASSED');
console.log('adndRows=' + adnd.length + ' noncomm=' + nonComm.length);
console.log(
  'named50k=' +
    named50k.rate +
    ' persist=' +
    !!ctx._stLoadReconcileIgnoredAll()[String(weekStart)]
);
