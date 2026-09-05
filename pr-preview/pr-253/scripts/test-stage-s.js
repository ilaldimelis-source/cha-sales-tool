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
  ctx.CHA_USER = { id: 's-test', name: 'S Tester' };
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
  /var CACHE_NAME = 'cha-command-center-v142';/.test(sw),
  'CACHE_NAME bumped to v142'
);
assert(
  indexHtml.indexOf('sales-tracker.css?v=1787901420000') !== -1 &&
    indexHtml.indexOf('1787901410000') === -1,
  'cache bust replaced to v142'
);
assert(
  css.indexOf('st-hist-meta-warn') !== -1,
  'warning meta colour class present'
);
assert(
  css.indexOf('st-hist-meta-danger') !== -1,
  'danger meta colour class present'
);

var ctx = makeSandbox();
var savedAt = new Date(2026, 7, 28, 19, 35, 0).getTime();

assert(
  ctx._stFmtHistoryListSavedAt(savedAt) === 'Aug 28, 7:35 PM',
  'History list date is readable (got ' +
    ctx._stFmtHistoryListSavedAt(savedAt) +
    ')'
);
assert(
  /8\/28\/2026 19:35/.test(ctx._stFmtHistorySavedAt(savedAt)),
  'legacy saved-at formatter unchanged for other surfaces'
);

var cleanMeta = ctx._stBuildHistCardMetaHtml({
  counts: {
    matched: 26,
    missing: 0,
    mislabeled: 0,
    amountmismatch: 0,
    chargebackCandidates: 0,
    untrackedChargebacks: 0
  },
  problems: [],
  savedAt: savedAt
});
assert(cleanMeta.indexOf('26 matched') !== -1, 'clean week shows matched');
assert(cleanMeta.indexOf('missing') === -1, 'clean week omits zero missing');
assert(
  cleanMeta.indexOf('chargeback') === -1,
  'clean week omits zero chargebacks'
);
assert(
  cleanMeta.indexOf('amount mismatch') === -1,
  'clean week with known 0 omits amount mismatch'
);
assert(
  cleanMeta.indexOf('saved Aug 28, 7:35 PM') !== -1,
  'clean week ends with readable saved timestamp'
);

var problemMeta = ctx._stBuildHistCardMetaHtml({
  counts: {
    matched: 7,
    missing: 1,
    mislabeled: 0,
    amountmismatch: 2,
    chargebackCandidates: 5,
    untrackedChargebacks: 0
  },
  problems: [{ kind: 'same_week_cancel' }],
  savedAt: savedAt
});
assert(problemMeta.indexOf('7 matched') !== -1, 'problem week keeps matched');
assert(problemMeta.indexOf('1 missing') !== -1, 'shows non-zero missing');
assert(
  problemMeta.indexOf('2 amount mismatches') !== -1,
  'shows plural amount mismatches'
);
assert(problemMeta.indexOf('5 chargebacks') !== -1, 'shows plural chargebacks');
assert(
  problemMeta.indexOf('1 same-week cancel') !== -1,
  'shows singular same-week cancel'
);
assert(
  problemMeta.indexOf('st-hist-meta-warn') !== -1 &&
    problemMeta.indexOf('st-hist-meta-danger') !== -1,
  'problem counts use warn/danger classes'
);
assert(problemMeta.indexOf('mislabeled') === -1, 'zero mislabeled omitted');

var oldMeta = ctx._stBuildHistCardMetaHtml({
  counts: { matched: 26, missing: 0, mislabeled: 0 },
  problems: [],
  savedAt: savedAt
});
assert(
  oldMeta.indexOf('amount mismatch unknown') !== -1,
  'unknown amountmismatch renders as amount mismatch unknown'
);
assert(
  oldMeta.indexOf('- amount mismatch') === -1,
  'no dash amount mismatch phrasing'
);

ctx._stLoadReconcileHistory = function () {
  return [
    {
      id: 'h1',
      weekStart: Date.now(),
      weekLabel: 'Aug 16 – Aug 22',
      weekMode: 'legacy-mon',
      savedAt: savedAt,
      counts: {
        matched: 26,
        missing: 0,
        mislabeled: 0,
        amountmismatch: 0,
        chargebackCandidates: 1,
        untrackedChargebacks: 0
      },
      problems: [],
      paycheck: { totalEarned: 2662.26 }
    }
  ];
};
ctx._stCollectChargebackCancelLog = function () {
  return [];
};
ctx._stNavPaycheckExists = function () {
  return true;
};
var hist = ctx._stBuildReconcileHistoryPane([]);
assert(hist.indexOf('1 saved reconciliation') !== -1, 'headline keeps count');
assert(
  hist.indexOf('st-tab-hero-period') === -1,
  'History headline has no period label'
);
assert(
  hist.indexOf('Saved pay sheets') === -1,
  'SAVED PAY SHEETS heading removed'
);
assert(hist.indexOf('Week of ') === -1, 'Week of prefix removed');
assert(
  hist.indexOf('Aug 16 – Aug 22') !== -1,
  'row title is the week range alone'
);
assert(
  hist.indexOf('legacy Mon-Sun week') !== -1,
  'legacy week badge still present'
);
assert(
  hist.indexOf('1 chargeback') !== -1 &&
    hist.indexOf('st-hist-meta-danger') !== -1,
  'non-zero chargeback shown in danger colour'
);
assert(hist.indexOf('Paycheck') !== -1, 'Paycheck action still present');

if (failures.length) {
  console.error('STAGE S TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE S TESTS PASSED');
console.log('history cleanup labels+meta+dates ok');
