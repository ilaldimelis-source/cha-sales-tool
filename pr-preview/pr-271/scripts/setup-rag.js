#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REQUIRED_FILES = [
  path.join(ROOT, 'api', 'br-answer.js'),
  path.join(ROOT, 'js', 'chat.js')
];
const REQUIRED_ENVS = [
  'OPENAI_API_KEY',
  'GROQ_API_KEY',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];
const color = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`
};

function parseArgs() {
  var args = process.argv.slice(2);
  var out = { url: '' };
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1])
      out.url = String(args[i + 1]).trim();
  }
  return out;
}

function existsOrFail(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Missing required file: ' + path.relative(ROOT, filePath));
  }
}

function checkEnv() {
  var missing = [];
  REQUIRED_ENVS.forEach(function (k) {
    if (!process.env[k] || !String(process.env[k]).trim()) missing.push(k);
  });
  return missing;
}

function smokeApi(url) {
  var endpoint = url.replace(/\/+$/, '') + '/api/br-answer?t=' + Date.now();
  var body = {
    query: 'Is maternity covered?',
    planId: 'sigmacare',
    matchCount: 5,
    matchThreshold: 0.3
  };
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var validStatus =
        data &&
        /^(COVERED|NOT COVERED|VERIFY|PARTIAL)$/.test(
          String(data.status || '')
        );
      if (!validStatus) {
        throw new Error(
          'Unexpected status enum: ' + JSON.stringify(data && data.status)
        );
      }
      if (!data.source) {
        throw new Error('Missing source in /api/br-answer response');
      }
      return data;
    });
}

function printSqlReminder() {
  console.log('');
  console.log(color.bold('Run this SQL in Supabase before deploy:'));
  console.log(color.yellow('1) Add missing column + indexes'));
  console.log(
    color.yellow('2) Create match_plan_chunks_prefer_plan() function')
  );
  console.log(color.yellow("3) Run: notify pgrst, 'reload schema';"));
  console.log('');
}

console.log('');
console.log(color.bold('RAG setup preflight'));
console.log('');

try {
  if (
    !process.versions.node ||
    Number(process.versions.node.split('.')[0]) < 22
  ) {
    throw new Error('Node 22+ required. Found: ' + process.versions.node);
  }

  REQUIRED_FILES.forEach(existsOrFail);
  console.log(color.green('[OK] Required files present'));

  var missingEnvs = checkEnv();
  if (missingEnvs.length) {
    console.log(
      color.yellow(
        '! Missing env vars (set in Vercel): ' + missingEnvs.join(', ')
      )
    );
  } else {
    console.log(color.green('[OK] Required env vars detected in this shell'));
  }

  printSqlReminder();

  var args = parseArgs();
  var baseUrl = args.url || process.env.RAG_BASE_URL || '';
  if (!baseUrl) {
    console.log(
      color.yellow(
        '! Smoke test skipped. Provide --url https://your-deployment-url or set RAG_BASE_URL'
      )
    );
    process.exit(0);
  }

  smokeApi(baseUrl)
    .then(function (data) {
      console.log(color.green('[OK] Smoke test passed at ' + baseUrl));
      console.log(
        color.green(
          '[OK] Response status=' +
            data.status +
            ', source=' +
            String(data.source || '')
        )
      );
      console.log('');
      process.exit(0);
    })
    .catch(function (err) {
      console.log(color.red('[FAIL] Smoke test failed: ' + err.message));
      process.exit(1);
    });
} catch (err) {
  console.log(color.red('[FAIL] Setup failed: ' + err.message));
  process.exit(1);
}
