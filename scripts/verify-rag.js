#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const STATUS_ENUM = ['COVERED', 'NOT COVERED', 'VERIFY', 'PARTIAL'];
const color = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`
};

const CASES = [
  { query: 'Is maternity covered?', planId: 'sigmacare' },
  { query: 'Is there a waiting period?', planId: 'sigmacare' },
  { query: 'Are specialist visits covered?', planId: 'sigmacare' },
  { query: 'Does this plan cover mental health?', planId: 'sigmacare' },
  { query: 'Is this ACA major medical?', planId: 'sigmacare' }
];

function parseArgs() {
  var args = process.argv.slice(2);
  var out = { url: '' };
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) out.url = String(args[i + 1]).trim();
  }
  return out;
}

function callApi(baseUrl, tcase) {
  var endpoint = baseUrl.replace(/\/+$/, '') + '/api/br-answer?t=' + Date.now();
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: tcase.query,
      planId: tcase.planId,
      matchCount: 5,
      matchThreshold: 0.3
    })
  }).then(function (response) {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  });
}

function validateResponse(data) {
  if (!data || typeof data !== 'object') return 'Response is not JSON object';
  if (STATUS_ENUM.indexOf(String(data.status || '')) === -1) {
    return 'Invalid status enum: ' + String(data.status || '');
  }
  if (!data.fact || typeof data.fact !== 'string') return 'Missing fact';
  if (!data.source || typeof data.source !== 'string') return 'Missing source';
  if (!Array.isArray(data.citations)) return 'Missing citations array';
  return '';
}

console.log('');
console.log(color.bold('RAG verification'));
console.log('');

var args = parseArgs();
var baseUrl = args.url || process.env.RAG_VERIFY_URL || process.env.RAG_BASE_URL || '';
if (!baseUrl) {
  console.log(
    color.red('[FAIL] Missing URL. Use --url https://your-deployment-url or set RAG_VERIFY_URL')
  );
  process.exit(1);
}

var failures = 0;
var p = Promise.resolve();
CASES.forEach(function (tcase, idx) {
  p = p
    .then(function () {
      return callApi(baseUrl, tcase);
    })
    .then(function (data) {
      var err = validateResponse(data);
      if (err) {
        failures++;
        console.log(color.red('[FAIL] [' + (idx + 1) + '/' + CASES.length + '] ' + tcase.query));
        console.log(color.red('  ' + err));
        return;
      }
      console.log(color.green('[OK] [' + (idx + 1) + '/' + CASES.length + '] ' + tcase.query));
      console.log(
        color.green(
          '  status=' +
            data.status +
            ', scope=' +
            String(data.scope || 'none') +
            ', source=' +
            String(data.source || '')
        )
      );
    })
    .catch(function (err) {
      failures++;
      console.log(color.red('[FAIL] [' + (idx + 1) + '/' + CASES.length + '] ' + tcase.query));
      console.log(color.red('  API error: ' + err.message));
    });
});

p.then(function () {
  console.log('');
  if (failures > 0) {
    console.log(color.red(color.bold('Verification failed with ' + failures + ' failing case(s).')));
    process.exit(1);
  }
  console.log(color.green(color.bold('[OK] Verification passed.')));
  process.exit(0);
});
