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
  ctx.CHA_USER = { id: 'o-test', name: 'O Tester' };
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
  'index.html sales-tracker assets are cache-busted'
);

assert(
  css.indexOf('width: 118px') !== -1,
  'record card side column is fixed ~118px'
);
assert(
  css.indexOf('.st-tab-filter-row .st-pc-chip:hover') !== -1 &&
    css.indexOf('.st-recon-v2-chips .st-recon-v2-chip:hover') !== -1,
  'quiet chips keep hover interactivity'
);
assert(
  /padding:\s*10px\s+13px/.test(css),
  'card padding tightened to ~10px 13px'
);
assert(
  css.indexOf('color: var(--cha-text-secondary)') !== -1 &&
    /\.st-recon-v2-tr\.is-muted td[\s\S]*?color: var\(--cha-text-secondary\)/.test(
      css
    ),
  'matched reconcile rows use secondary text, not tertiary'
);

var ctx = makeSandbox();

var chips = ctx._stBuildReconcileChipsHtml({
  counts: {
    needs: 0,
    all: 26,
    matched: 26,
    missing: 0,
    mislabeled: 0,
    amountmismatch: 0,
    chargeback: 1,
    samecancel: 0
  }
});
assert(
  chips.indexOf('st-filter-sep') !== -1,
  'Reconcile has primary/secondary chip separator'
);
assert(
  chips.indexOf('Needs attention') !== -1,
  'Reconcile keeps Needs attention chip'
);
assert(
  chips.indexOf('>Cancels <') !== -1 || chips.indexOf('Cancels') !== -1,
  'Cancels label shortened'
);
assert(
  chips.indexOf('Needs attention') < chips.indexOf('st-filter-sep') &&
    chips.indexOf('st-filter-sep') < chips.indexOf('Matched'),
  'Needs attention is primary before separator'
);

var cbcChips = ctx._stBuildCbcTimeChipsHtml();
assert(
  cbcChips.indexOf('st-filter-sep') !== -1,
  'Chargebacks filter row has separator'
);
assert(
  cbcChips.indexOf('data-st-cbc-action="time"') !== -1 &&
    cbcChips.indexOf('data-st-cbc-action="type"') !== -1,
  'Chargebacks time and type chips share one row'
);

var cbcRow = ctx._stBuildCbcTableRowHtml({
  type: 'chargeback',
  customer: 'Ada Lovelace',
  plan: 'Assist Health',
  saleId: '',
  saleTs: Date.now(),
  eventTs: Date.now(),
  memberId: 'M1',
  amountLost: 120,
  originalCommission: 200,
  deductionPaycheckWeek: null
});
assert(
  cbcRow.indexOf('st-record-card-side') !== -1,
  'Chargeback row has fixed side column'
);
assert(
  cbcRow.indexOf('st-record-card-line') !== -1,
  'Chargeback line 1 is customer/product/type'
);
assert(cbcRow.indexOf('Chargeback') !== -1, 'Chargeback badge present');
assert(
  cbcRow.indexOf('Same-week cancel') === -1,
  'Chargeback row is not merged with cancel'
);
assert(cbcRow.indexOf('Lost ') !== -1, 'Chargeback meta includes lost amount');
assert(cbcRow.indexOf('st-cbc-view') !== -1, 'Chargeback View action present');

var cancelRow = ctx._stBuildCbcTableRowHtml({
  type: 'samecancel',
  customer: 'Grace Hopper',
  plan: 'Gap',
  saleId: '',
  saleTs: Date.now(),
  eventTs: Date.now(),
  memberId: 'M2',
  amountLost: 40,
  originalCommission: 80,
  deductionPaycheckWeek: null
});
assert(
  cancelRow.indexOf('Same-week cancel') !== -1,
  'Same-week cancel stays a distinct badge'
);

var pcHtml = ctx._stBuildPcTableRowHtml({
  weekStart: Date.now(),
  weekLabel: 'Aug 16 – Aug 22',
  paycheck: {
    source: 'derived',
    totalEarned: 100,
    grossCommission: 120,
    chargebacks: 0,
    sameWeekCancels: 0,
    dealsPaid: 2,
    tierBonus: null,
    enrollmentFeeBonus: null,
    spiffBonus: null
  }
});
assert(
  pcHtml.indexOf('st-record-card-side') !== -1,
  'Paycheck row has fixed side column'
);
assert(
  pcHtml.indexOf('Lost $0.00') !== -1,
  'Paycheck zero lost renders as $0.00'
);
assert(
  pcHtml.indexOf('st-pc-lost') !== -1,
  'Paycheck lost uses danger colour class'
);

var pcUnknown = ctx._stBuildPcTableRowHtml({
  weekStart: Date.now(),
  weekLabel: 'Aug 9 – Aug 15',
  paycheck: {
    source: 'derived',
    totalEarned: 50,
    grossCommission: 50,
    chargebacks: null,
    sameWeekCancels: null,
    dealsPaid: 1,
    tierBonus: null,
    enrollmentFeeBonus: null,
    spiffBonus: null
  }
});
assert(
  pcUnknown.indexOf('Lost -') !== -1,
  'Paycheck unknown lost renders as dash'
);

ctx._stLoadReconcileHistory = function () {
  return [
    {
      id: 'h1',
      weekStart: Date.now(),
      weekLabel: 'Aug 16 – Aug 22',
      savedAt: Date.now(),
      counts: {
        matched: 26,
        missing: 0,
        mislabeled: 0,
        amountmismatch: 0,
        chargeback: 1
      },
      problems: [],
      paycheck: {}
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
  hist.indexOf('1 saved reconciliation') !== -1,
  'History headline uses saved reconciliation count'
);
assert(hist.indexOf('st-delete') !== -1, 'History Delete uses .st-delete');
assert(
  hist.indexOf('st-record-card-figure') !== -1 &&
    /st-record-card-figure">\s*-/.test(hist.replace(/\s+/g, '')),
  'History with no stored paycheck amount shows a dash'
);
assert(
  hist.indexOf(' matched</div>') === -1,
  'History does not invent matched count as figure'
);

if (failures.length) {
  console.error('STAGE O TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE O TESTS PASSED');
console.log('density+chips+alignment+history dash checks ok');
