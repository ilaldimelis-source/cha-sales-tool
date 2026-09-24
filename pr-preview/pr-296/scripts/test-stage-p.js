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
  ctx.CHA_USER = { id: 'p-test', name: 'P Tester' };
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

var css = fs.readFileSync(path.join(ROOT, 'css/sales-tracker.css'), 'utf8');
var sw = fs.readFileSync(path.join(ROOT, 'sw2.js'), 'utf8');
var indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
var stJs = fs.readFileSync(path.join(ROOT, 'js/sales-tracker.js'), 'utf8');

assert(
  /var CACHE_NAME = 'cha-command-center-v\d+'/.test(sw),
  'CACHE_NAME present'
);
assert(
  /sales-tracker\.css\?v=\d+/.test(indexHtml) &&
    /sales-tracker\.js\?v=\d+/.test(indexHtml),
  'index.html sales-tracker assets are cache-busted'
);

assert(
  typeof makeSandbox()._stBuildPcChartHtml === 'undefined',
  'Paychecks chart builder removed'
);
assert(stJs.indexOf('st-pc-chart') === -1, 'no st-pc-chart markup left in JS');
assert(stJs.indexOf('_stPcChartMetric') === -1, 'chart metric state removed');
assert(css.indexOf('.st-pc-chart') === -1, 'no .st-pc-chart CSS remains');
assert(css.indexOf('st-pc-chart-') === -1, 'no st-pc-chart-* CSS remains');

assert(
  !/^\.st-recon-history-delete\s*\{[^}]*border-radius:\s*999px/m.test(css),
  'circular History delete override removed'
);
assert(
  css.indexOf('.st-hist-card .st-recon-history-delete') !== -1 &&
    css.indexOf('var(--cha-danger-text)') !== -1,
  'History Delete uses danger text token styling'
);

var ctx = makeSandbox();
ctx._stLoadReconcileHistory = function () {
  return [
    {
      id: 'h1',
      weekStart: Date.now(),
      weekLabel: 'Aug 16 – Aug 22',
      savedAt: Date.now(),
      counts: { matched: 26, missing: 0, mislabeled: 0, amountmismatch: 0 },
      problems: [],
      paycheck: { totalEarned: 100 }
    }
  ];
};
ctx._stCollectChargebackCancelLog = function () {
  return [];
};
ctx._stNavPaycheckExists = function () {
  return false;
};
var hist = ctx._stBuildReconcileHistoryPane([]);
assert(
  hist.indexOf('st-recon-history-delete') !== -1 &&
    hist.indexOf('>Delete</button>') !== -1,
  'History Delete remains a text button'
);
assert(
  hist.indexOf('st-delete') !== -1 &&
    hist.indexOf('aria-label="Delete saved pay sheet"') !== -1,
  'History Delete keeps accessible name and .st-delete'
);

var pcHtml = ctx._stBuildPcPane([]);
assert(pcHtml.indexOf('st-pc-chart') === -1, 'Paychecks pane has no chart');
assert(
  pcHtml.indexOf('Net commission by paycheck') === -1,
  'Paychecks pane has no chart heading'
);
assert(
  pcHtml.indexOf('st-record-card-list') !== -1,
  'Paychecks still lists cards'
);

assert(
  stJs.indexOf('aria-label="Row actions"') !== -1,
  'row menu ⋯ labeled Row actions'
);
assert(
  stJs.indexOf('aria-label="Clear pay sheet"') !== -1,
  'clear pay sheet icon button labeled'
);
assert(
  stJs.indexOf('aria-label="Export all sales as CSV"') !== -1,
  'Export control labeled'
);

var plans = fs.readFileSync(path.join(ROOT, 'js/plans-benefits.js'), 'utf8');
var live = fs.readFileSync(path.join(ROOT, 'js/live-assist.js'), 'utf8');
var app = fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8');
assert(
  plans.indexOf('aria-label="Clear benefit search"') !== -1 &&
    plans.indexOf('aria-label="Clear plan search"') !== -1,
  'Plans/Benefits clear × buttons labeled'
);
assert(
  live.indexOf('aria-label="Close live assist panel"') !== -1,
  'Live Assist close × labeled'
);
assert(
  app.indexOf('aria-label="Clear plan"') !== -1,
  'plan pill clear × labeled'
);

if (failures.length) {
  console.error('STAGE P TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE P TESTS PASSED');
console.log('chart removed + history delete quiet + a11y labels ok');
