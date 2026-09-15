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
      body: { dataset: {}, addEventListener: function () {} },
      getElementById: function () {
        return null;
      },
      createElement: function () {
        return { innerHTML: '', onclick: null, className: '', id: '' };
      }
    }
  };
  ctx.window = ctx;
  ctx.CHA_USER = { id: 'fg-test', name: 'FG Tester' };
  vm.createContext(ctx);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'js/sales-tracker.js'), 'utf8'),
    ctx,
    { filename: 'js/sales-tracker.js' }
  );
  ctx._stResetCommissionRates();
  return ctx;
}

function comm(ctx, plan, amount, type) {
  return money(
    ctx._stComputeLineCommission(
      {
        type: type || 'addon',
        plan: plan,
        amount: amount,
        status: 'pending'
      },
      ctx._stLoadCommissionRates()
    )
  );
}

function stampDeal(ctx, deal, addons) {
  var sales = [deal].concat(addons || []);
  ctx._stStampDealCommission(sales, 0, ctx._stLoadCommissionRates());
  return sales[0];
}

var ctx = makeSandbox();

// ── Step 1b rate fixes ──────────────────────────────────────
var rateFixes = [
  ['New York Life $50,000 Term Life', 139.99, 139.99, 100],
  ['Pinnacle Critical Care Plan 2', 169, 87.88, 52],
  ['AWA Safe Guard 100', 59.99, 41.99, 70],
  ['GapSupport Discount', 22.99, 16.09, 70],
  ['Prime Health Pass Discount', 19.99, 12.99, 65],
  ['AssistPro Discount', 22.99, 13.79, 60],
  ['AME $500 Add-on', 35, 21, 60],
  ['AME $1000 - Add-on', 35, 21, 60],
  ['Better Vision Add-on', 19.99, 7, 35],
  ['GHDP Dental-Vision 1500', 19.99, 7, 35],
  ['GHDP Dental-Vision 5000', 19.99, 7, 35],
  ['Better Guard - Add-on', 19.99, 7, 35],
  ['NCE Fusion Dental - Plan B', 19.99, 7, 35],
  ['BestChoice Rx', 19.99, 6, 30]
];

rateFixes.forEach(function (row) {
  var got = comm(ctx, row[0], row[1]);
  assert(
    got === money(row[2]),
    row[0] + ' expected $' + row[2] + ' got $' + got
  );
  var info = ctx._stResolveProductRate(row[0], {});
  assert(
    Math.round(Number(info.rate) * 100) === row[3] || info.kind === 'flat',
    row[0] + ' rate expected ' + row[3] + '% got ' + info.rate
  );
});

assert(comm(ctx, 'AWA Safeguard ADD/AME/CI', 149) === 104.3, 'AWA bundle $149');
assert(
  comm(ctx, 'AWA Safeguard ADD/AME/CI', 59.99) === 41.99,
  'AWA bundle $59.99'
);
assert(comm(ctx, 'Compass VAB Add-on', 34.99) === 34.99, 'Compass VAB 100%');
assert(comm(ctx, 'AD&D $50k', 10) === 10, 'AD&D 100%');
assert(
  comm(ctx, 'American Financial Critical Illness $2,500', 20) === 14,
  'CI $2500 70%'
);

assert(
  ctx._stRatePctForProductName('AssistPro Discount') === 60,
  'AssistPro no longer defaults to 70'
);
assert(
  ctx._stRatePctForProductName('New York Life $50,000 Term Life') === 100,
  'NY Life ratePct 100'
);
assert(
  ctx._stRatePctForProductName('Better TeleMed') === 25,
  'unlisted telemed uses bucket 25'
);
assert(
  ctx._stResolveProductRate('Better TeleMed', {}).confidence === 'unknown',
  'unlisted product is Unknown'
);
assert(ctx._stResolveProductRate('GAP', {}).rate === 0.6, 'Premier GAP is 60%');
assert(
  ctx._stResolveProductRate('GapSupport Discount', {}).rate === 0.7,
  'GapSupport stays 70% and is not Premier GAP'
);

assert(
  comm(ctx, 'Association fee', 10) === 0,
  'association fee non-commissionable'
);
assert(comm(ctx, 'Payment fees', 5) === 0, 'payment fee non-commissionable');

// ── Five sale fixtures ──────────────────────────────────────
var robert = stampDeal(
  ctx,
  {
    id: 'd-robert',
    type: 'deal',
    plan: 'SmartChoice 1500',
    amount: 599,
    enrollmentFee: 0,
    receiptId: 'rcpt-robert',
    ts: Date.now(),
    status: 'pending'
  },
  [
    {
      id: 'a-robert-awa',
      type: 'addon',
      plan: 'AWA Safeguard ADD/AME/CI',
      amount: 149,
      receiptId: 'rcpt-robert',
      ts: Date.now(),
      status: 'pending'
    },
    {
      id: 'a-robert-cc',
      type: 'addon',
      plan: 'Pinnacle Critical Care Plan 2',
      amount: 169,
      receiptId: 'rcpt-robert',
      ts: Date.now(),
      status: 'pending'
    },
    {
      id: 'a-robert-ap',
      type: 'addon',
      plan: 'AssistPro Discount',
      amount: 22.99,
      receiptId: 'rcpt-robert',
      ts: Date.now(),
      status: 'pending'
    }
  ]
);
assert(
  money(robert.planCommission) === 239.6,
  'Robert core ' + robert.planCommission
);
assert(
  money(robert.totalAddonCommission) === 205.97,
  'Robert addons ' + robert.totalAddonCommission
);
assert(robert.enrollmentBonus === 0, 'Robert enrollment bonus not on sale');
assert(
  !ctx._stSaleQualifiesEnrollmentBonus(robert, []),
  'Robert does not qualify for $20'
);

var erik = stampDeal(
  ctx,
  {
    id: 'd-erik',
    type: 'deal',
    plan: 'Harbor STM',
    amount: 458.46,
    enrollmentFee: 0,
    receiptId: 'rcpt-erik',
    ts: Date.now(),
    status: 'pending'
  },
  [
    {
      id: 'a-erik-awa',
      type: 'addon',
      plan: 'AWA Safeguard ADD/AME/CI',
      amount: 59.99,
      receiptId: 'rcpt-erik',
      ts: Date.now(),
      status: 'pending'
    },
    {
      id: 'a-erik-assoc',
      type: 'addon',
      plan: 'Association fee',
      amount: 10,
      receiptId: 'rcpt-erik',
      ts: Date.now(),
      status: 'pending'
    },
    {
      id: 'a-erik-pay',
      type: 'addon',
      plan: 'Payment fees',
      amount: 5,
      receiptId: 'rcpt-erik',
      ts: Date.now(),
      status: 'pending'
    }
  ]
);
assert(
  money(erik.planCommission) === 160.46,
  'Erik core ' + erik.planCommission
);
assert(money(erik.totalAddonCommission) === 41.99, 'Erik addons exclude fees');

var timothy = stampDeal(
  ctx,
  {
    id: 'd-tim',
    type: 'deal',
    plan: 'Access Health Lite STM',
    amount: 210.88,
    enrollmentFee: 125,
    receiptId: 'rcpt-tim',
    ts: Date.now(),
    status: 'pending'
  },
  [
    {
      id: 'a-tim-vis',
      type: 'addon',
      plan: 'Better Vision Add-on',
      amount: 19.99,
      receiptId: 'rcpt-tim',
      ts: Date.now(),
      status: 'pending'
    },
    {
      id: 'a-tim-ame',
      type: 'addon',
      plan: 'AME $1000 - Add-on',
      amount: 35,
      receiptId: 'rcpt-tim',
      ts: Date.now(),
      status: 'pending'
    }
  ]
);
assert(money(timothy.planCommission) === 63.26, 'Timothy core');
assert(money(timothy.totalAddonCommission) === 28, 'Timothy addons');

var justice = stampDeal(
  ctx,
  {
    id: 'd-justice',
    type: 'deal',
    plan: 'SmartChoice 3500',
    amount: 849,
    enrollmentFee: 125,
    receiptId: 'rcpt-justice',
    ts: Date.now(),
    status: 'pending'
  },
  [
    {
      id: 'a-justice-ap',
      type: 'addon',
      plan: 'AssistPro Discount',
      amount: 22.99,
      receiptId: 'rcpt-justice',
      ts: Date.now(),
      status: 'pending'
    }
  ]
);
assert(money(justice.planCommission) === 339.6, 'Justice core');
assert(money(justice.totalAddonCommission) === 13.79, 'Justice AssistPro');

var paul = stampDeal(
  ctx,
  {
    id: 'd-paul',
    type: 'deal',
    plan: 'MedValue 2000+',
    amount: 648.45,
    enrollmentFee: 125,
    receiptId: 'rcpt-paul',
    ts: Date.now(),
    status: 'pending'
  },
  [
    {
      id: 'a-paul-vab',
      type: 'addon',
      plan: 'Compass VAB Add-on',
      amount: 34.99,
      receiptId: 'rcpt-paul',
      ts: Date.now(),
      status: 'pending'
    }
  ]
);
assert(money(paul.planCommission) === 259.38, 'Paul core');
assert(money(paul.totalAddonCommission) === 34.99, 'Paul Compass VAB');
assert(paul.enrollmentBonus === 0, 'Paul has no $20 on the sale');
assert(
  money(paul.expectedDealTotal) === 294.37,
  'Paul sale total excludes $20'
);

var ava = {
  id: 'd-ava',
  type: 'deal',
  plan: 'SmartChoice 1500',
  amount: 300,
  enrollmentFee: 125,
  status: 'pending',
  receiptId: 'rcpt-ava',
  ts: Date.now()
};
assert(
  ctx._stSaleQualifiesEnrollmentBonus(ava, []),
  'Ava Small $125 enrollment qualifies with no URL'
);

// ── Pay sheet parsing ───────────────────────────────────────
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
  '8/20/2026\tChargeback Person\t777777777\tCore\tSmartChoice 1500\t-$208.52',
  'Totals 11 core / 14 anc $2,560.78',
  'Chargebacks 1 $208.52',
  'Tier bonus $250.00',
  'Enrollment fee bonus $60.00',
  'Net pay $2,662.26'
].join('\n');

var parsed = ctx._stParsePaySheet(weekSheet);
var cores = parsed.filter(function (r) {
  return r.typeLocal === 'deal';
});
var ancs = parsed.filter(function (r) {
  return r.typeLocal === 'addon';
});
assert(parsed.length === 25, 'week sheet parses 25 rows, got ' + parsed.length);
assert(cores.length === 11, '11 core rows, got ' + cores.length);
assert(ancs.length === 14, '14 ancillary rows, got ' + ancs.length);

var cb = parsed.filter(function (r) {
  return Number(r.amount) < 0;
});
assert(cb.length === 1, 'one chargeback row');
assert(money(cb[0].amountLost) === 208.52, 'chargeback amountLost 208.52');

var pos = 0;
parsed.forEach(function (r) {
  if (Number(r.amount) > 0) pos += Number(r.amount);
});
assert(money(pos) === 2560.78, 'positive rows sum 2560.78 got ' + money(pos));
assert(money(parsed.summary.netPay) === 2662.26, 'summary net pay');
assert(money(parsed.summary.tierBonus) === 250, 'summary tier bonus');
assert(
  money(parsed.summary.enrollmentFeeBonus) === 60,
  'summary enrollment bonus'
);

var assist = parsed.filter(function (r) {
  return r.productName === 'AssistPro Discount';
});
assert(assist.length === 2, 'continuation AssistPro rows inherited parent ids');
assert(assist[0].memberId === '111111111', 'AssistPro inherits Robert id');
assert(assist[1].memberId === '687554988', 'AssistPro inherits Justice id');

var orphan = ctx._stParsePaySheet('Ancillary\tAssistPro Discount\t$13.79');
assert(orphan.length === 0, 'continuation before parent is skipped');

var parentOnly = [
  '8/17/2026\tJustice Osei\t687554988\tCore\tSmartChoice 3500\t$339.60',
  '8/17/2026\tErik Larue\t222222222\tCore\tHarbor STM\t$160.46'
].join('\n');
var parentParsed = ctx._stParsePaySheet(parentOnly);
assert(parentParsed.length === 2, 'parent-only sheet keeps both cores');
assert(!parentParsed[0].amountLost, 'positive parent row has no amountLost');
assert(parentParsed[0].memberId === '687554988', 'parent member id unchanged');
assert(
  parentParsed[0].productName === 'SmartChoice 3500',
  'parent product unchanged'
);
assert(
  parentParsed[0].customer === 'Justice Osei',
  'parent customer unchanged'
);
assert(parentParsed[0].amount === 339.6, 'parent amount unchanged');

// ── Verified paycheck freeze ────────────────────────────────
var frozen = {
  source: 'verified',
  netPay: 1234.56,
  tierBonus: 250,
  enrollmentFeeBonus: 60
};
var frozenCopy = {
  source: 'verified',
  netPay: 1234.56,
  tierBonus: 250,
  enrollmentFeeBonus: 60
};
ctx._stPaycheckFinishNumbers(frozen);
ctx._stPaycheckApplySheetSummary(frozen, {
  found: true,
  tierBonus: 999,
  enrollmentFeeBonus: 0,
  spiffBonus: 1,
  netPay: 0
});
assert(frozen.netPay === frozenCopy.netPay, 'verified netPay unchanged');
assert(
  frozen.tierBonus === frozenCopy.tierBonus,
  'verified tierBonus unchanged'
);
assert(
  frozen.enrollmentFeeBonus === frozenCopy.enrollmentFeeBonus,
  'verified enrollmentFeeBonus unchanged'
);

var storedSale = {
  type: 'addon',
  plan: 'AssistPro Discount',
  amount: 22.99,
  addonCommission: 4.6
};
assert(
  ctx._stSaleHasCommissionDiscrepancy(storedSale),
  'stored 20% AssistPro flags discrepancy'
);
assert(
  money(storedSale.addonCommission) === 4.6,
  'stored sale commission was not rewritten'
);

// ── Learning safeguards ─────────────────────────────────────
ctx._stResetCommissionRates();
ctx._stLearnProductRateFromPayout('Better TeleMed', 20, 0, 'z1');
assert(
  !ctx._stLookupNamedProduct('Better TeleMed', ctx._stLoadCommissionRates()),
  'zero-dollar line never learns'
);
ctx._stLearnProductRateFromPayout('Better TeleMed', 20, -5, 'z2');
assert(
  !ctx._stLookupNamedProduct('Better TeleMed', ctx._stLoadCommissionRates()),
  'negative line never learns'
);

ctx._stLearnProductRateFromPayout('Better TeleMed', 20, 5, 's1');
var learned1 = ctx._stLookupNamedProduct(
  'Better TeleMed',
  ctx._stLoadCommissionRates()
);
assert(learned1 && learned1.sampleCount === 1, 'first sighting sampleCount 1');
assert(learned1.confidence === 'unknown', 'first sighting stays unconfirmed');

ctx._stLearnProductRateFromPayout('Better TeleMed', 20, 5, 's1');
learned1 = ctx._stLookupNamedProduct(
  'Better TeleMed',
  ctx._stLoadCommissionRates()
);
assert(learned1.confidence === 'unknown', 'same sale does not promote');

ctx._stLearnProductRateFromPayout('Better TeleMed', 20, 5, 's2');
var learned2 = ctx._stLookupNamedProduct(
  'Better TeleMed',
  ctx._stLoadCommissionRates()
);
assert(learned2.confidence === 'confirmed', 'second independent sale promotes');
assert(learned2.sampleCount === 2, 'promoted sampleCount 2');

ctx._stLearnProductRateFromPayout('Better TeleMed', 20, 8, 's3');
var learned3 = ctx._stLookupNamedProduct(
  'Better TeleMed',
  ctx._stLoadCommissionRates()
);
assert(
  !!learned3.conflict,
  'conflicting later sale flags rather than overwrite'
);
assert(learned3.rate === learned2.rate, 'conflict does not overwrite rate');

ctx._stUpsertManualProductRate('QuestSelect', 0.4, 'percent');
ctx._stLearnProductRateFromPayout('QuestSelect', 50, 10, 'q1');
ctx._stLearnProductRateFromPayout('QuestSelect', 50, 10, 'q2');
var manual = ctx._stLookupNamedProduct(
  'QuestSelect',
  ctx._stLoadCommissionRates()
);
assert(manual.manual === true, 'manual flag stays');
assert(manual.rate === 0.4, 'manual rate survives learning');

var beforeReload = JSON.parse(
  ctx.localStorage.getItem(ctx._stKey('cha_commission_rates'))
);
var ctx2 = makeSandbox();
ctx2.localStorage.setItem(
  ctx2._stKey('cha_commission_rates'),
  JSON.stringify(beforeReload)
);
var reloaded = ctx2._stLookupNamedProduct(
  'QuestSelect',
  ctx2._stLoadCommissionRates()
);
assert(
  reloaded && reloaded.rate === 0.4 && reloaded.manual,
  'manual rate survives reload'
);

ctx._stDeleteProductRate('AssistPro Discount');
var afterDel = ctx._stResolveProductRate('AssistPro Discount', {});
assert(afterDel.named === false, 'deleted rate returns to unknown path');
assert(afterDel.confidence === 'unknown', 'deleted product is Unknown');
assert(
  Math.round(afterDel.rate * 100) === 20,
  'AssistPro falls back to rx 20%'
);

var panel = ctx._stBuildProductRatesPanelHtml();
assert(panel.indexOf('is-confirmed') !== -1, 'Confirmed badge in rates UI');
assert(panel.indexOf('is-inferred') !== -1, 'Inferred badge in rates UI');
assert(
  ctx
    ._stConfidenceBadgeHtml({ confidence: 'unknown' })
    .indexOf('is-unknown') !== -1,
  'Unknown badge distinct'
);
assert(
  ctx._stShowPremierChargebackNote('HealthyShield'),
  'Premier core shows 59-day note'
);
assert(
  !ctx._stShowPremierChargebackNote('BestChoice Rx'),
  'shared BestChoice name is not treated as Premier-only'
);

if (failures.length) {
  console.error('STAGE F+G TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE F+G TESTS PASSED');
console.log(
  'parsedRows=' +
    parsed.length +
    ' cores=' +
    cores.length +
    ' anc=' +
    ancs.length
);
console.log(
  'positives=' + money(pos) + ' netPay=' + money(parsed.summary.netPay)
);
