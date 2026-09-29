#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var failures = [];

function assert(cond, msg) {
  if (!cond) failures.push(String(msg));
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
  ctx.CHA_USER = { id: 'r-test', name: 'R Tester' };
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

assert(
  /var CACHE_NAME = 'cha-command-center-v\d+'/.test(sw),
  'CACHE_NAME present'
);
assert(
  /sales-tracker\.css\?v=\d+/.test(indexHtml) &&
    /sales-tracker\.js\?v=\d+/.test(indexHtml),
  'sales-tracker assets are cache-busted'
);

assert(
  css.indexOf('.st-hist-card .st-record-card-actions') !== -1 &&
    /flex-wrap:\s*nowrap/.test(css),
  'History actions use nowrap flex'
);
assert(
  css.indexOf('.st-hist-card .st-record-card-side') !== -1 &&
    /min-width:\s*118px/.test(css),
  'History side column can widen past 118px'
);

var ctx = makeSandbox();

ctx._stReconcileTableRows = [
  { status: 'matched' },
  { status: 'amountmismatch' },
  { status: 'amountmismatch', ignored: true },
  { status: 'missing' }
];
var rec = ctx._stBuildReconcileHistoryRecord(
  'sheet',
  { start: Date.now() },
  {
    matched: 10,
    missing: [{}],
    mislabeled: [],
    notOnSheet: [],
    chargebackCandidates: [],
    untrackedChargebacks: [],
    gap: 0,
    problems: []
  }
);
assert(
  rec.counts &&
    Object.prototype.hasOwnProperty.call(rec.counts, 'amountmismatch'),
  'new history records store amountmismatch key'
);
assert(
  rec.counts.amountmismatch === 1,
  'amountmismatch counts non-ignored table rows (got ' +
    rec.counts.amountmismatch +
    ')'
);

ctx._stLoadReconcileHistory = function () {
  return [
    {
      id: 'old',
      weekStart: Date.now(),
      weekLabel: 'Aug 16 – Aug 22',
      savedAt: Date.now(),
      counts: { matched: 26, missing: 0, mislabeled: 0 },
      problems: [],
      paycheck: { totalEarned: 100 }
    },
    {
      id: 'new',
      weekStart: Date.now(),
      weekLabel: 'Aug 23 – Aug 29',
      savedAt: Date.now(),
      counts: {
        matched: 20,
        missing: 0,
        mislabeled: 0,
        amountmismatch: 0
      },
      problems: [],
      paycheck: { totalEarned: 50 }
    }
  ];
};
ctx._stCollectChargebackCancelLog = function () {
  return [];
};
ctx._stNavPaycheckExists = function (ws) {
  return !!ws;
};
var hist = ctx._stBuildReconcileHistoryPane([]);
assert(
  hist.indexOf('st-filter-sep') === -1 ||
    hist.indexOf('st-record-card-actions') !== -1,
  'History actions row present'
);
assert(
  !/st-record-card-actions[\s\S]*st-filter-sep[\s\S]*st-recon-history-delete/.test(
    hist
  ),
  'no · separator between History action buttons'
);
assert(
  hist.indexOf('Paycheck') !== -1 &&
    hist.indexOf('st-recon-history-view') !== -1 &&
    hist.indexOf('st-recon-history-delete') !== -1,
  'Paycheck, View, and Delete actions present when paycheck exists'
);

var oldIdx = hist.indexOf('Week of Aug 16');
var newIdx = hist.indexOf('Week of Aug 23');
if (oldIdx === -1) oldIdx = hist.indexOf('Aug 16');
if (newIdx === -1) newIdx = hist.indexOf('Aug 23');
assert(oldIdx !== -1 && newIdx !== -1, 'both old and new snapshots render');
var oldChunk = hist.slice(oldIdx, newIdx);
var newChunk = hist.slice(newIdx);
assert(
  oldChunk.indexOf('amount mismatch unknown') !== -1,
  'old snapshot keeps unknown amount mismatch (not backfilled)'
);
assert(
  newChunk.indexOf('amount mismatch unknown') === -1 &&
    newChunk.indexOf('amount mismatch') === -1,
  'new snapshot with stored 0 omits amount mismatch from meta'
);

ctx._stNavPaycheckExists = function () {
  return false;
};
var hist2 = ctx._stBuildReconcileHistoryPane([]);
assert(
  hist2.indexOf('>Paycheck<') === -1 &&
    hist2.indexOf('st-recon-history-view') !== -1,
  'Paycheck omitted when no linked paycheck; View remains'
);

if (failures.length) {
  console.error('STAGE R TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE R TESTS PASSED');
console.log('history actions + amountmismatch save checks ok');
