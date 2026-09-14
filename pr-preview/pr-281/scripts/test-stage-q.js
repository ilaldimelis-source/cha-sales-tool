#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var failures = [];

function assert(cond, msg) {
  if (!cond) failures.push(String(msg));
}

var css = fs.readFileSync(path.join(ROOT, 'css/sales-tracker.css'), 'utf8');
var tokens = fs.readFileSync(path.join(ROOT, 'css/tokens.css'), 'utf8');
var sw = fs.readFileSync(path.join(ROOT, 'sw2.js'), 'utf8');
var indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

assert(
  /var CACHE_NAME = 'cha-command-center-v\d+'/.test(sw),
  'CACHE_NAME present'
);
assert(
  /sales-tracker\.css\?v=\d+/.test(indexHtml),
  'sales-tracker.css is cache-busted'
);

var exactHex = [
  '#ffffff',
  '#fff',
  '#f1f5f9',
  '#f8fafc',
  '#eef1f6',
  '#0f172a',
  '#475569',
  '#64748b',
  '#3b82f6',
  '#1e40af',
  '#fef3c7',
  '#fee2e2',
  '#92400e'
];

exactHex.forEach(function (hex) {
  var re = new RegExp(hex.replace('#', '#') + '(?![0-9a-fA-F])', 'i');
  if (hex === '#fff') {
    re = /#fff(?![0-9a-fA-F])/i;
  }
  assert(!re.test(css), 'exact-match hex removed: ' + hex);
});

assert(
  css.indexOf('var(--cha-text-tertiary)') !== -1,
  'uses --cha-text-tertiary for former #64748b'
);
assert(
  css.indexOf('var(--cha-bg-card)') !== -1,
  'uses --cha-bg-card for former #fff'
);
assert(
  /--cha-accent:\s*#3b82f6/.test(tokens),
  'tokens.css left unchanged (accent still defined)'
);

var remaining = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
assert(
  remaining.length === 347,
  'remaining hardcoded hex count is 347 (got ' + remaining.length + ')'
);

if (failures.length) {
  console.error('STAGE Q TESTS FAILED:');
  failures.forEach(function (f) {
    console.error(' - ' + f);
  });
  process.exit(1);
}

console.log('STAGE Q TESTS PASSED');
console.log('exact-match hex migrated; 347 orphans remain by design');
