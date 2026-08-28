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
  ctx.CHA_USER = { id: 'm-test', name: 'M Tester' };
  vm.createContext(ctx);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'js/sales-tracker.js'), 'utf8'),
    ctx,
    { filename: 'js/sales-tracker.js' }
  );
  ctx._stResetCommissionRates();
  ctx._stRender = function () {};
  return ctx;
}

var ctx = makeSandbox();
var week16 = ctx._stStartOfWeek(new Date(2026, 7, 16, 12, 0, 0)).getTime();
var week9 = ctx._stStartOfWeek(new Date(2026, 7, 9, 12, 0, 0)).getTime();
var week2 = ctx._stStartOfWeek(new Date(2026, 7, 2, 12, 0, 0)).getTime();
var we16 = week16 + 7 * 24 * 60 * 60 * 1000;
var we9 = week9 + 7 * 24 * 60 * 60 * 1000;
var we2 = week2 + 7 * 24 * 60 * 60 * 1000;

var arash = {
  id: 'arash',
  type: 'deal',
  customer: 'Arash Sarvghad',
  plan: 'MEDVALUE 6000+',
  amount: 399,
  planCommission: 180,
  totalAddonCommission: 28.52,
  expectedDealTotal: 228.52,
  enrollmentBonus: 20,
  enrollmentFee: 125,
  status: 'chargeback',
  ts: week16 + 2 * 24 * 60 * 60 * 1000,
  reversal: {
    type: 'chargeback',
    amountLost: 228.52,
    originalCommission: 228.52,
    originalPaycheckWeek: week16,
    deductionPaycheckWeek: week16
  }
};
var nicole = {
  id: 'nicole',
  type: 'deal',
  customer: 'Nicole Castino',
  plan: 'MEDVALUE 2000+',
  amount: 399,
  planCommission: 210,
  totalAddonCommission: 32.81,
  expectedDealTotal: 262.81,
  enrollmentBonus: 20,
  enrollmentFee: 125,
  status: 'chargeback',
  ts: week16 + 3 * 24 * 60 * 60 * 1000
};
assert(
  money(ctx._stSaleReversalCommission(arash)) === 208.52,
  'Arash reversal commission is 208.52, got ' +
    ctx._stSaleReversalCommission(arash)
);
assert(
  money(ctx._stSaleReversalCommission(nicole)) === 242.81,
  'Nicole reversal commission is 242.81, got ' +
    ctx._stSaleReversalCommission(nicole)
);
var arashEv = ctx._stCbcEventFromSale(arash);
assert(
  money(arashEv.amountLost) === 208.52,
  'Arash Chargebacks tab reads 208.52, got ' + arashEv.amountLost
);
var nicoleEv = ctx._stCbcEventFromSale(nicole);
assert(
  money(nicoleEv.amountLost) === 242.81,
  'Nicole Chargebacks tab reads 242.81, got ' + nicoleEv.amountLost
);

var oluchi = {
  id: 'oluchi',
  type: 'addon',
  customer: 'Oluchi Blanchard',
  plan: 'Compass VAB',
  amount: 34.99,
  addonCommission: 8.75,
  addonCommissionRate: 0.25,
  status: 'chargeback',
  ts: week16 + 24 * 60 * 60 * 1000
};
var andranik = {
  id: 'andranik',
  type: 'addon',
  customer: 'Andranik Sargsyan',
  plan: 'AssistPro Discount',
  amount: 22.99,
  addonCommission: 4.6,
  addonCommissionRate: 0.2,
  status: 'chargeback',
  ts: week16 + 24 * 60 * 60 * 1000
};
var verifiedRev = {
  id: 'verified-rev',
  type: 'addon',
  customer: 'Verified Reversal',
  plan: 'AssistPro Discount',
  amount: 22.99,
  addonCommission: 4.6,
  addonCommissionRate: 0.2,
  status: 'chargeback',
  ts: week2 + 24 * 60 * 60 * 1000
};
ctx._stSavePaychecks([
  {
    weekStart: week2,
    paycheck: { source: 'verified', netPay: 100, salary: null }
  }
]);
ctx._stSaveSales([oluchi, andranik, verifiedRev]);
var beforeJson = JSON.stringify(ctx._stLoadSales());
var preview = ctx._stBuildRecalcPreview(ctx._stLoadSales());
assert(
  JSON.stringify(ctx._stLoadSales()) === beforeJson,
  'preview alone does not change stored sales'
);
assert(preview.includeReversals === false, 'reversals start excluded');
function findRev(name) {
  var i;
  for (i = 0; i < preview.reversals.length; i++) {
    if (preview.reversals[i].product === name) return preview.reversals[i];
  }
  return null;
}
var oluchiPrev = findRev('Compass VAB');
assert(!!oluchiPrev, 'Oluchi Compass VAB is in the reversal group');
assert(money(oluchiPrev.stored) === 8.75, 'Oluchi stored 8.75');
assert(
  money(oluchiPrev.next) === 34.99,
  'Oluchi new 34.99, got ' + (oluchiPrev && oluchiPrev.next)
);
var andPrev = findRev('AssistPro Discount');
assert(!!andPrev, 'Andranik AssistPro is in the reversal group');
assert(money(andPrev.stored) === 4.6, 'Andranik stored 4.60');
assert(money(andPrev.next) === 13.79, 'Andranik new 13.79');
var previewHtml = ctx._stBuildRecalcPreviewHtml(preview);
assert(
  previewHtml.indexOf('Chargebacks and cancels logged at old rates') !== -1,
  'reversal group is labelled in the preview'
);
assert(
  previewHtml.indexOf('Excluded from this recalculation') !== -1,
  'reversals can be excluded'
);
assert(
  preview.skipped.some(function (s) {
    return s.customer === 'Verified Reversal';
  }),
  'verified-week reversal stays skipped'
);

ctx._stRecalcPreview = preview;
ctx._stApplyRecalcPreview();
var afterLeave = ctx._stLoadSales();
function byId(rows, id) {
  var i;
  for (i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return rows[i];
  }
  return null;
}
assert(
  money(byId(afterLeave, 'oluchi').addonCommission) === 8.75,
  'excluded reversals are not applied'
);

preview.includeReversals = true;
ctx._stRecalcPreview = preview;
ctx._stRecalcPreview.applied = false;
ctx._stApplyRecalcPreview();
var afterInc = ctx._stLoadSales();
assert(
  money(byId(afterInc, 'oluchi').addonCommission) === 34.99,
  'Oluchi Compass VAB is 34.99 after reversal group apply'
);
assert(
  money(byId(afterInc, 'oluchi').commissionBeforeRecalc) === 8.75,
  'Oluchi original value is preserved'
);
assert(
  money(byId(afterInc, 'andranik').addonCommission) === 13.79,
  'Andranik AssistPro is 13.79 after reversal group apply'
);
assert(
  money(byId(afterInc, 'verified-rev').addonCommission) === 4.6,
  'verified paycheck reversal was not touched'
);

var goodAddon = {
  id: 'good-addon',
  type: 'addon',
  customer: 'Already Correct',
  plan: 'AssistPro Discount',
  amount: 22.99,
  addonCommission: 13.79,
  status: 'pending',
  ts: week16 + 24 * 60 * 60 * 1000
};
ctx._stSaveSales([goodAddon, oluchi, andranik, verifiedRev]);
var reversalOnlyPreview = ctx._stBuildRecalcPreview(ctx._stLoadSales());
assert(
  reversalOnlyPreview.items.length === 0,
  'ordinary sales already match the rate table'
);
assert(
  reversalOnlyPreview.reversals.length >= 2,
  'pending reversals remain when ordinary sales are clean'
);
var reversalOnlyHtml = ctx._stBuildRecalcPreviewHtml(reversalOnlyPreview);
assert(
  reversalOnlyHtml.indexOf('Nothing would change') === -1,
  'empty state waits until both ordinary and reversal groups are empty'
);
assert(
  reversalOnlyHtml.indexOf('Chargebacks and cancels logged at old rates') !== -1,
  'reversal group still renders when ordinary sales are clean'
);
assert(
  reversalOnlyHtml.indexOf('recalc-apply') !== -1,
  'Apply stays available for reversal-only previews'
);

var staleDealReceipt = 'stale-deal-rcpt';
var staleDealPlan = Math.abs(
  ctx._stTableCommissionForSale(
    {
      type: 'deal',
      plan: 'MEDVALUE 6000+',
      amount: 399,
      status: 'chargeback'
    },
    ctx._stLoadCommissionRates()
  )
);
var staleDeal = {
  id: 'stale-deal',
  type: 'deal',
  customer: 'Arash Sarvghad',
  plan: 'MEDVALUE 6000+',
  amount: 399,
  planCommission: staleDealPlan,
  totalAddonCommission: 28.52,
  enrollmentBonus: 0,
  status: 'chargeback',
  ts: week16 + 2 * 24 * 60 * 60 * 1000,
  receiptId: staleDealReceipt,
  reversal: {
    type: 'chargeback',
    amountLost: 228.52,
    originalCommission: 228.52
  }
};
var freshAddon = {
  id: 'stale-addon',
  type: 'addon',
  customer: 'Arash Sarvghad',
  plan: 'Compass VAB',
  amount: 34.99,
  addonCommission: 34.99,
  status: 'chargeback',
  ts: week16 + 2 * 24 * 60 * 60 * 1000,
  receiptId: staleDealReceipt
};
ctx._stSaveSales([staleDeal, freshAddon]);
var staleDealPreview = ctx._stBuildRecalcPreview(ctx._stLoadSales());
function findRevByCustomer(name) {
  var ri;
  for (ri = 0; ri < staleDealPreview.reversals.length; ri++) {
    if (staleDealPreview.reversals[ri].customer === name) {
      return staleDealPreview.reversals[ri];
    }
  }
  return null;
}
var arashPrev = findRevByCustomer('Arash Sarvghad');
assert(!!arashPrev, 'stale deal chargeback stays in the reversal group');
assert(
  money(arashPrev.stored) === money(ctx._stSaleReversalCommission(staleDeal)),
  'reversal preview uses full reversal commission as stored'
);
assert(
  money(arashPrev.next) ===
    money(
      ctx._stProjectedReversalCommission(
        staleDeal,
        ctx._stLoadSales(),
        ctx._stLoadCommissionRates()
      )
    ),
  'reversal preview projects linked add-on totals'
);

function deal(id, status, week, fee) {
  return {
    id: id,
    type: 'deal',
    customer: id,
    plan: 'MEDVALUE 2000+',
    amount: 200,
    enrollmentFee: fee,
    status: status,
    ts: week + 24 * 60 * 60 * 1000
  };
}
var bonusSales = [
  deal('ok1', 'pending', week16, 125),
  deal('ok2', 'pending', week16, 125),
  deal('ok3', 'pending', week16, 125),
  deal('cb1', 'chargeback', week16, 125),
  deal('swc1', 'samecancel', week16, 125),
  deal('ok9a', 'pending', week9, 125),
  deal('ok9b', 'pending', week9, 125),
  deal('ok9c', 'pending', week9, 125),
  deal('swc9a', 'samecancel', week9, 125),
  deal('swc9b', 'chargeback', week9, 125),
  deal('ok2a', 'pending', week2, 125),
  deal('ok2b', 'pending', week2, 125),
  deal('ok2c', 'pending', week2, 125),
  deal('ok2d', 'pending', week2, 125),
  deal('ok2e', 'pending', week2, 125),
  deal('ok2f', 'pending', week2, 125),
  deal('ok2g', 'pending', week2, 125),
  deal('ok2h', 'pending', week2, 125)
];
assert(
  ctx._stWeekEnrollmentBonus(bonusSales, week16, we16) === 60,
  '8/16 enrollment bonus is $60, got ' +
    ctx._stWeekEnrollmentBonus(bonusSales, week16, we16)
);
assert(
  ctx._stWeekEnrollmentBonus(bonusSales, week9, we9) === 60,
  '8/9 enrollment bonus is $60, got ' +
    ctx._stWeekEnrollmentBonus(bonusSales, week9, we9)
);
assert(
  ctx._stWeekEnrollmentBonus(bonusSales, week2, we2) === 160,
  '8/2 enrollment bonus stays $160, got ' +
    ctx._stWeekEnrollmentBonus(bonusSales, week2, we2)
);
assert(
  !ctx._stSaleQualifiesEnrollmentBonus(arash, [arash]),
  'Arash chargeback does not receive the $20 enrollment bonus'
);

var livePb = ctx._stEmptyPaycheck('derived');
livePb.netPay = 2560.78;
ctx._stPaycheckFinishNumbers(livePb);
assert(livePb.salary === 300, 'default salary is $300');
assert(
  money(livePb.totalEarned) === 2860.78,
  'Total earned is net pay plus salary, got ' + livePb.totalEarned
);
assert(money(livePb.netPay) === 2560.78, 'Net pay does not include salary');

var frozen = ctx._stEmptyPaycheck('verified');
frozen.netPay = 100;
frozen.salary = null;
ctx._stPaycheckFinishNumbers(frozen);
assert(frozen.salary == null, 'verified paycheck salary is not filled in');
assert(
  frozen.totalEarned == null,
  'verified paycheck total earned stays blank'
);

var zeroSal = ctx._stEmptyPaycheck('derived');
zeroSal.netPay = 50;
zeroSal.salary = 0;
ctx._stPaycheckFinishNumbers(zeroSal);
assert(zeroSal.salary === 0, 'explicit $0 salary is kept');
assert(
  money(zeroSal.totalEarned) === 50,
  'zero salary week total equals net pay'
);

if (failures.length) {
  console.error('STAGE M TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE M TESTS PASSED');
console.log(
  'arash=' +
    arashEv.amountLost +
    ' nicole=' +
    nicoleEv.amountLost +
    ' oluchi=' +
    byId(afterInc, 'oluchi').addonCommission +
    ' andranik=' +
    byId(afterInc, 'andranik').addonCommission
);
console.log(
  'bonus 8/16=' +
    ctx._stWeekEnrollmentBonus(bonusSales, week16, we16) +
    ' 8/9=' +
    ctx._stWeekEnrollmentBonus(bonusSales, week9, we9) +
    ' 8/2=' +
    ctx._stWeekEnrollmentBonus(bonusSales, week2, we2) +
    ' salary=' +
    livePb.salary
);
