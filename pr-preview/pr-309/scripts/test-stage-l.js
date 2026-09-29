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
  ctx.CHA_USER = { id: 'l-test', name: 'L Tester' };
  ctx._stStore = store;
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

function fakeBtn(action) {
  return {
    getAttribute: function (name) {
      return name === 'data-st-rates-action' ? action : '';
    }
  };
}

function adndRows(ctx) {
  return ctx._stProductRateRowsForUi().filter(function (r) {
    var n = String(r.rec.name || '');
    return n.indexOf('AD&D $') === 0 && n.indexOf('WellGuard') === -1;
  });
}

function productNames(rows) {
  return (rows || [])
    .map(function (r) {
      return r.rec.name;
    })
    .join(' | ');
}

var ctx = makeSandbox();

var idlePanel = ctx._stBuildProductRatesPanelHtml();
assert(
  idlePanel.indexOf('data-st-rates-action="add"') !== -1,
  'Add product is in the rates panel'
);
assert(
  idlePanel.indexOf('data-st-rates-action="reset-ask"') !== -1,
  'Reset rates is in the rates panel'
);
assert(
  idlePanel.indexOf('st-rates-reset') !== -1,
  'Reset rates uses the secondary class'
);
assert(
  idlePanel.indexOf('Resets all product rates') === -1,
  'first click has not happened; confirm copy is hidden'
);
assert(
  idlePanel.indexOf('reset-apply') === -1,
  'confirm-apply is hidden until step 1'
);

var ratesKey = ctx._stKey('cha_commission_rates');
ctx._stUpsertManualProductRate('Ghost Ancillary', 0.55, 'percent');
var rates = ctx._stLoadCommissionRates();
var fusionKey = ctx._stNormProductKey('AssistPro Discount');
rates.products[fusionKey].source = 'learned';
rates.products[fusionKey].manual = false;
ctx._stSaveCommissionRates(rates);
assert(
  ctx._stCountCustomProductRates() === 2,
  'count is 1 manual + 1 learned, got ' + ctx._stCountCustomProductRates()
);

var salesKey = ctx._stKey('cha_sales');
var histKey = ctx._stKey('cha_reconcile_history');
var payKey = ctx._stKey('cha_paychecks_v1');
ctx._stSet(salesKey, JSON.stringify([{ id: 'keep-me', plan: 'Harbor STM' }]));
ctx._stSet(histKey, JSON.stringify([{ id: 'rh_keep', problems: [] }]));
ctx._stSet(
  payKey,
  JSON.stringify([{ weekStart: 1, paycheck: { source: 'verified' } }])
);
ctx._stReconcileMatchView = { start: 111 };
ctx._stReconcileIgnoredKeys = { 'ignore-me': true };
ctx._stPersistReconcileIgnoredKeys();

var beforeRates = ctx.localStorage.getItem(ratesKey);
ctx._stHandleRatesActionClick(fakeBtn('reset-ask'));
assert(ctx._stRatesResetConfirm === true, 'step 1 sets the confirm flag');
assert(
  ctx.localStorage.getItem(ratesKey) === beforeRates,
  'step 1 does not change stored rates'
);
assert(
  ctx._stProductRateRowsForUi().some(function (r) {
    return r.rec.name === 'Ghost Ancillary';
  }),
  'manual product is still present after step 1'
);

var confirmHtml = ctx._stBuildProductRatesPanelHtml();
assert(
  confirmHtml.indexOf('Resets all product rates to the built-in defaults') !==
    -1,
  'confirm states what reset will do'
);
assert(
  confirmHtml.indexOf('2 edited or learned rates would be discarded') !== -1,
  'confirm counts manual and learned entries'
);
assert(
  confirmHtml.indexOf('st-rates-panel" open') !== -1,
  'panel stays open while confirming'
);

ctx._stHandleRatesActionClick(fakeBtn('reset-apply'));
assert(ctx._stRatesResetConfirm === false, 'step 2 clears the confirm flag');
assert(
  !ctx._stProductRateRowsForUi().some(function (r) {
    return r.rec.name === 'Ghost Ancillary';
  }),
  'manually added product is gone after reset'
);
var afterAdnd = adndRows(ctx);
assert(
  afterAdnd.length === 6,
  'AD&D shows six entries after reset, got ' + afterAdnd.length
);
var i;
for (i = 0; i < afterAdnd.length; i++) {
  assert(
    Number(afterAdnd[i].rec.rate) === 1,
    afterAdnd[i].rec.name + ' is 100%'
  );
}
var named50k = ctx._stResolveProductRate('AD&D $50k - Add-on', {});
assert(named50k.named === true, 'AD&D $50k - Add-on still hits named rate');
assert(Number(named50k.rate) === 1, 'AD&D $50k - Add-on is still 100%');

var nonComm = ctx._stProductRateRowsForUi('noncomm');
assert(
  productNames(nonComm).indexOf('Association fee') !== -1,
  'non-commissionable section still present after reset'
);
assert(ctx._stCountCustomProductRates() === 0, 'no custom rates remain');

assert(
  ctx.localStorage.getItem(salesKey).indexOf('keep-me') !== -1,
  'sales are unchanged by a rates reset'
);
assert(
  ctx.localStorage.getItem(histKey).indexOf('rh_keep') !== -1,
  'saved reconciliations are unchanged by a rates reset'
);
assert(
  ctx.localStorage.getItem(payKey).indexOf('verified') !== -1,
  'paychecks are unchanged by a rates reset'
);
ctx._stHydrateReconcileIgnoredKeys(111);
assert(
  ctx._stReconcileIgnoredKeys['ignore-me'] === true,
  'ignore state is unchanged by a rates reset'
);

ctx._stUpsertManualProductRate('Ghost Ancillary', 0.55, 'percent');
ctx._stHandleRatesActionClick(fakeBtn('reset-apply'));
assert(
  ctx._stProductRateRowsForUi().some(function (r) {
    return r.rec.name === 'Ghost Ancillary';
  }),
  'apply without step 1 does not reset'
);

var harmless = makeSandbox();
harmless._stRatesResetConfirm = true;
var harmlessHtml = harmless._stBuildRatesResetConfirmHtml();
assert(
  harmlessHtml.indexOf(
    'No edited or learned rates to discard. Reset is harmless.'
  ) !== -1,
  'empty custom count says reset is harmless'
);

if (failures.length) {
  console.error('STAGE L TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE L TESTS PASSED');
console.log(
  'adndRows=' +
    afterAdnd.length +
    ' restored=' +
    ctx._stCountSeedProductDisplayRows() +
    ' customAfter=' +
    ctx._stCountCustomProductRates()
);
