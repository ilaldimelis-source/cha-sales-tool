#!/usr/bin/env node
/**
 * scripts/diagnose.js — Bug Fixer (read-only diagnose mode).
 *
 * When the verifier reports a blocker, this script traces the first
 * real problem to its root cause and suggests the smallest safe fix.
 * It does NOT modify any file — auto-fixing live sales tool data is
 * too dangerous without human review. Its job is to tell you exactly
 * what to change so you can make an informed one-line fix.
 *
 * Usage:
 *   npm run diagnose
 *
 * Exits 0 if nothing is wrong. Exits 1 if a blocker is found (and
 * prints a root-cause analysis with a suggested fix).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');

const color = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`
};

function listFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => pattern.test(f))
    .map((f) => path.join(dir, f));
}

function report(title, rootCause, suggestion) {
  console.log('');
  console.log(color.red(color.bold('✗ ' + title)));
  console.log('');
  console.log(color.bold('Root cause:'));
  console.log('  ' + rootCause.replace(/\n/g, '\n  '));
  console.log('');
  console.log(color.bold('Safest next action:'));
  console.log('  ' + suggestion.replace(/\n/g, '\n  '));
  console.log('');
  process.exit(1);
}

// -----------------------------------------------------------------
// Trace 1: syntax errors in any js/ file
// -----------------------------------------------------------------
const jsFiles = listFiles(JS_DIR, /\.js$/);
for (const f of jsFiles) {
  try {
    execSync(`node --check "${f}"`, { stdio: 'pipe' });
  } catch (e) {
    const rel = path.relative(ROOT, f);
    const stderr = (e.stderr && e.stderr.toString()) || '';
    const line =
      stderr.split('\n').find((l) => /:\d+$/.test(l)) || stderr.split('\n')[0];
    report(
      `Syntax error in ${rel}`,
      `Node rejected ${rel} with:\n${stderr.split('\n').slice(0, 5).join('\n')}`,
      `Open ${rel} at the line node pointed at and fix the syntax.\nRe-run: npm run verify`
    );
  }
}

// -----------------------------------------------------------------
// Trace 2: POLICY_DOCS won't load or has invalid shape
// -----------------------------------------------------------------
const dataFiles = listFiles(JS_DIR, /^plan-data.*\.js$/).sort((a, b) => {
  const aBase = path.basename(a) === 'plan-data.js';
  const bBase = path.basename(b) === 'plan-data.js';
  if (aBase && !bBase) return -1;
  if (bBase && !aBase) return 1;
  return a.localeCompare(b);
});

if (dataFiles.length > 0) {
  const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(ctx);
  for (const f of dataFiles) {
    try {
      vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, {
        filename: path.basename(f)
      });
    } catch (e) {
      const rel = path.relative(ROOT, f);
      report(
        `${rel} failed to load`,
        `The file parses but throws at runtime: ${e.message}\nThis usually means an IIFE inside the file has an error, or it references a variable that wasn't defined by an earlier plan-data file.`,
        `If this is a plan-data-extended style file, make sure it only uses POLICY_DOCS (which should exist from plan-data.js) and handles the fallback when POLICY_DOCS is undefined.\nRe-run: npm run verify`
      );
    }
  }

  if (!Array.isArray(ctx.POLICY_DOCS)) {
    report(
      'POLICY_DOCS is not an array',
      'After loading every plan-data*.js file, the POLICY_DOCS global is not an array. This means no plan-data file is defining POLICY_DOCS = [...] OR one of them overwrote it with something else.',
      'Open js/plan-data.js and verify the very first declaration is:\n    var POLICY_DOCS = [ ... ];\nThe extended files should only push() into this array, never replace it.'
    );
  }

  if (ctx.POLICY_DOCS.length === 0) {
    report(
      'POLICY_DOCS is empty',
      'POLICY_DOCS loads but has zero entries. No plans would appear in the Benefits Reference panel.',
      'Open js/plan-data.js and verify it still defines plan objects inside the array brackets.'
    );
  }

  // Shape traces
  const seen = {};
  for (let i = 0; i < ctx.POLICY_DOCS.length; i++) {
    const p = ctx.POLICY_DOCS[i];
    const tag = `POLICY_DOCS[${i}]${p && p.id ? ' (id=' + p.id + ')' : ''}`;

    if (!p || typeof p !== 'object') {
      report(
        `${tag} is not a plan object`,
        `One of the POLICY_DOCS entries is ${p === null ? 'null' : typeof p} instead of an object. This will crash anything that tries to read plan.id or plan.benefits.`,
        `Find entry number ${i} in js/plan-data*.js and replace it with a proper object literal.`
      );
    }
    if (typeof p.id !== 'string' || !p.id) {
      report(
        `${tag} missing id`,
        'A plan has no string id. chat.js uses plan.id as the dataset attribute for plan buttons, so this plan would not render.',
        `Add id: 'somestring' to entry ${i} in js/plan-data*.js.`
      );
    }
    if (typeof p.name !== 'string' || !p.name) {
      report(
        `${tag} missing name`,
        'A plan has no string name. The plan button would render blank.',
        `Add name: 'Plan Display Name' to the "${p.id}" entry.`
      );
    }
    if (seen[p.id]) {
      report(
        `Duplicate plan id "${p.id}"`,
        `Two entries in POLICY_DOCS share the same id. The second one silently replaces the first.`,
        `Search for "${p.id}" in js/plan-data*.js and rename one of the duplicates.`
      );
    }
    seen[p.id] = true;

    if ('benefits' in p && p.benefits != null) {
      if (!Array.isArray(p.benefits)) {
        report(
          `${tag}.benefits is not an array`,
          'benefits must be an array of { category, items: [...] } objects. brBuildSOB in chat.js iterates it with .forEach.',
          `Change benefits in "${p.id}" to an array: benefits: [ ... ]`
        );
      }
      for (let j = 0; j < p.benefits.length; j++) {
        const b = p.benefits[j];
        if (!b || typeof b !== 'object') {
          report(
            `${tag}.benefits[${j}] not an object`,
            'Every benefit entry must be an object { category: "...", items: [...] }.',
            `Fix benefit #${j} in "${p.id}" to be a proper object.`
          );
        }
        if (b.items != null && !Array.isArray(b.items)) {
          report(
            `${tag}.benefits[${j}].items is not an array (it's a ${typeof b.items})`,
            `This is the EXACT bug that crashed brInit in PR #34 — b.items.forEach() throws TypeError when items is a string or missing.\nThe codebase expects shape: { category: 'X', items: ['line 1', 'line 2'] }\nNOT:                       { category: 'X', detail: 'single string' }`,
            `Convert benefit #${j} in "${p.id}" from { detail: 'X' } to { items: ['X'] }.\nIf many plans have this pattern, a one-line regex replace works:\n  detail: '([^']*)'  ->  items: ['$1']`
          );
        }
      }
    }
  }
}

// -----------------------------------------------------------------
// Trace 3: api/ files have syntax errors
// -----------------------------------------------------------------
const apiDir = path.join(ROOT, 'api');
if (fs.existsSync(apiDir)) {
  const apiFiles = listFiles(apiDir, /\.js$/);
  for (const f of apiFiles) {
    try {
      execSync(`node --check "${f}"`, { stdio: 'pipe' });
    } catch (e) {
      const rel = path.relative(ROOT, f);
      const stderr = (e.stderr && e.stderr.toString()) || '';
      report(
        `Syntax error in ${rel}`,
        `A serverless function has a syntax error. Vercel will fail to deploy.`,
        `Open ${rel} and fix the error shown in:\n${stderr.split('\n').slice(0, 5).join('\n')}`
      );
    }
  }
}

// -----------------------------------------------------------------
// All clear
// -----------------------------------------------------------------
console.log('');
console.log(color.green(color.bold('✓ diagnose: no blockers detected.')));
console.log(
  color.gray('  If something still looks broken on the live site, check the')
);
console.log(
  color.gray('  service worker cache (hard-refresh the page) and the Vercel')
);
console.log(color.gray('  deploy status before suspecting the code.'));
console.log('');
process.exit(0);
