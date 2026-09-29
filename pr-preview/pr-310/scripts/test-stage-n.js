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
  ctx.CHA_USER = { id: 'n-test', name: 'N Tester' };
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
var weekStart = ctx._stStartOfWeek(new Date(2026, 7, 16, 12, 0, 0)).getTime();

assert(
  typeof ctx._stBuildTabHeroHtml === 'function',
  'shared tab hero builder exists'
);
assert(ctx._stFmtDiffApart(0.02) === '2c apart', '2 cents formats as 2c apart');
assert(
  ctx._stFmtDiffApart(0) === '0c apart',
  'zero difference formats as 0c apart'
);

var pcHtml = ctx._stBuildPcPane([]);
assert(pcHtml.indexOf('st-tab-hero') !== -1, 'Paychecks has a tab hero');
assert(
  pcHtml.indexOf('st-pc-figures') === -1,
  'Paychecks dropped multi-figure strip'
);
assert(
  pcHtml.indexOf('st-pc-table') === -1,
  'Paychecks no longer uses a table'
);
assert(
  pcHtml.indexOf('st-record-card-list') !== -1,
  'Paychecks uses a card list'
);
assert(
  pcHtml.indexOf('st-tab-filter-row') !== -1,
  'Paychecks has one filter row'
);
assert(
  pcHtml.indexOf('st-pc-custom') !== -1 && pcHtml.indexOf('hidden') !== -1,
  'Paychecks custom dates stay hidden until Custom'
);

var cbcHtml = ctx._stBuildCbcPane([]);
assert(cbcHtml.indexOf('st-tab-hero') !== -1, 'Chargebacks has a tab hero');
assert(
  cbcHtml.indexOf('st-cbc-figures') === -1,
  'Chargebacks dropped multi-figure strip'
);
assert(
  cbcHtml.indexOf('st-cbc-table') === -1,
  'Chargebacks no longer uses a table'
);
assert(
  cbcHtml.indexOf('st-cbc-card-list') !== -1,
  'Chargebacks uses a card list'
);
assert(
  cbcHtml.indexOf('data-st-cbc-action="type"') !== -1,
  'Chargebacks type filters live in the same filter row'
);
assert(
  cbcHtml.indexOf('st-cbc-type-chips') === -1,
  'Chargebacks no longer has a second type-chip row'
);

var histHtml = ctx._stBuildReconcileHistoryPane([]);
assert(histHtml.indexOf('st-tab-hero') !== -1, 'History has a tab hero');
assert(
  histHtml.indexOf('Read-only snapshots') !== -1,
  'History supporting line mentions read-only snapshots'
);

ctx._stReconcileMatchView = { start: weekStart };
ctx._stPaySheetRows = [];
ctx._stReconcileTableRows = [];
var recon = ctx._stBuildReconcilePane([], {
  start: weekStart,
  endExclusive: weekStart + 7 * 24 * 60 * 60 * 1000
});
assert(recon.indexOf('st-tab-hero') !== -1, 'Reconcile has a tab hero');
assert(
  recon.indexOf('st-recon-v2-figures') === -1,
  'Reconcile dropped figure strip'
);
assert(
  recon.indexOf('st-recon-v2-table') !== -1,
  'Reconcile keeps its results table'
);
assert(
  recon.indexOf('Product commission rates') !== -1,
  'rates panel still on Reconcile'
);
assert(
  recon.indexOf('recalc-preview') !== -1,
  'Recalculate still on Reconcile'
);

if (failures.length) {
  console.error('STAGE N TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE N TESTS PASSED');
console.log('hero+cards+filters presentation checks ok');
