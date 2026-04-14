#!/usr/bin/env node
/**
 * scripts/verify.js — Beginner-safe repo verifier.
 *
 * Runs a set of fast, read-only sanity checks that catch the most common
 * ways this repo can get broken. Used by:
 *   • `npm run verify`                    (manual)
 *   • the pre-commit git hook             (automatic — blocks bad commits)
 *   • the pre-push git hook                (automatic — blocks bad pushes)
 *
 * DESIGN NOTES
 * - Read-only. Never modifies files. Safe to run any time.
 * - Auto-discovers files by pattern, never by exact name. If you rename,
 *   split, or reorganize `js/plan-data.js` or similar, this verifier still
 *   finds the files via patterns like /^plan-data.*\.js$/.
 * - Exits 0 on success, 1 on any blocker (so git hooks can gate on it).
 * - Uses only Node built-ins (fs, path, vm, child_process). No new deps.
 * - Beginner-friendly output: tells you what broke, where, and what to
 *   try next. No stack traces unless --verbose is passed.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const VERBOSE = process.argv.includes('--verbose');
const ROOT = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');
const API_DIR = path.join(ROOT, 'api');

const color = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`
};

const blockers = [];
const warnings = [];
const passed = [];

function step(name, fn) {
  try {
    fn();
    passed.push(name);
  } catch (e) {
    blockers.push({
      step: name,
      message: e.message,
      stack: VERBOSE ? e.stack : null
    });
  }
}

function listFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => pattern.test(f))
    .map((f) => path.join(dir, f));
}

function nodeCheck(file) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
  } catch (e) {
    const stderr = (e.stderr && e.stderr.toString()) || e.message;
    // Extract just the meaningful line from node --check output
    const firstLine = stderr.split('\n').find((l) => l.trim()) || stderr;
    throw new Error(
      `Syntax error in ${path.relative(ROOT, file)}:\n    ${firstLine.trim()}`
    );
  }
}

// ---------------------------------------------------------------
// STEP 1 — syntax check every .js file in js/ (auto-discovered)
// ---------------------------------------------------------------
step('Syntax: all js/ files parse', () => {
  const files = listFiles(JS_DIR, /\.js$/);
  if (files.length === 0) {
    throw new Error('No .js files found in js/ directory.');
  }
  for (const f of files) nodeCheck(f);
});

// ---------------------------------------------------------------
// STEP 2 — critical data flow: load any plan-data*.js into a vm
//            and verify POLICY_DOCS ends up populated and valid
// ---------------------------------------------------------------
step('Data: POLICY_DOCS loads and has valid shape', () => {
  // Auto-discover by pattern so rename/split/merge is safe.
  const dataFiles = listFiles(JS_DIR, /^plan-data.*\.js$/).sort((a, b) => {
    // Load the "base" file first if one is clearly named plan-data.js,
    // then any plan-data-*.js extension files in lexicographic order.
    const aBase = path.basename(a) === 'plan-data.js';
    const bBase = path.basename(b) === 'plan-data.js';
    if (aBase && !bBase) return -1;
    if (bBase && !aBase) return 1;
    return a.localeCompare(b);
  });

  if (dataFiles.length === 0) {
    warnings.push('No plan-data*.js files found — skipping data check.');
    return;
  }

  const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(ctx);

  for (const f of dataFiles) {
    try {
      vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, {
        filename: path.basename(f)
      });
    } catch (e) {
      throw new Error(`Failed to load ${path.relative(ROOT, f)}: ${e.message}`);
    }
  }

  if (!Array.isArray(ctx.POLICY_DOCS)) {
    throw new Error(
      'POLICY_DOCS is not an array after loading plan-data files.\n' +
        '    Every plan-data file should define or extend a POLICY_DOCS array.'
    );
  }
  if (ctx.POLICY_DOCS.length === 0) {
    throw new Error(
      'POLICY_DOCS is empty — no plans would be visible to agents.'
    );
  }

  // Shape check: every plan must have id + name. If it has benefits, they
  // must be an array of { category, items[] } — this is the contract
  // the rest of the codebase assumes (see chat.js brBuildSOB, utils.js
  // buildSearchIndex). Catching this at commit time prevents the
  // "schema mismatch crash at brInit" failure mode.
  const ids = {};
  for (let i = 0; i < ctx.POLICY_DOCS.length; i++) {
    const p = ctx.POLICY_DOCS[i];
    const tag = `POLICY_DOCS[${i}]${p && p.id ? ' (' + p.id + ')' : ''}`;
    if (!p || typeof p !== 'object') {
      throw new Error(`${tag} is not an object.`);
    }
    if (typeof p.id !== 'string' || !p.id) {
      throw new Error(`${tag} is missing a string id.`);
    }
    if (typeof p.name !== 'string' || !p.name) {
      throw new Error(`${tag} is missing a string name.`);
    }
    ids[p.id] = (ids[p.id] || 0) + 1;
    if ('benefits' in p && p.benefits != null) {
      if (!Array.isArray(p.benefits)) {
        throw new Error(`${tag}.benefits is not an array.`);
      }
      for (let j = 0; j < p.benefits.length; j++) {
        const b = p.benefits[j];
        if (!b || typeof b !== 'object') {
          throw new Error(`${tag}.benefits[${j}] is not an object.`);
        }
        // Consumers call b.items.forEach — if items is missing, brInit crashes.
        if (b.items != null && !Array.isArray(b.items)) {
          throw new Error(
            `${tag}.benefits[${j}].items must be an array (not ${typeof b.items}).`
          );
        }
      }
    }
  }

  const dupes = Object.keys(ids).filter((k) => ids[k] > 1);
  if (dupes.length > 0) {
    throw new Error(
      `Duplicate plan IDs detected: ${dupes.join(', ')}\n` +
        '    The last-loaded plan with a duplicate id silently overrides the earlier one.'
    );
  }
});

// ---------------------------------------------------------------
// STEP 3 — critical data flow: plan-registry loads if present
// ---------------------------------------------------------------
step('Data: plan-registry loads (if present)', () => {
  const regFiles = listFiles(
    JS_DIR,
    /(plan-?registry|chaplanregistry).*\.js$/i
  );
  if (regFiles.length === 0) {
    warnings.push('No plan-registry file found — skipping (not required).');
    return;
  }
  const ctx = { window: {}, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(ctx);
  for (const f of regFiles) {
    try {
      vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, {
        filename: path.basename(f)
      });
    } catch (e) {
      throw new Error(`Failed to load ${path.relative(ROOT, f)}: ${e.message}`);
    }
  }
  // Be flexible about the global name — look for any array-of-objects-with-ids.
  const keys = Object.keys(ctx).filter((k) => Array.isArray(ctx[k]));
  const candidates = keys.filter((k) => {
    const arr = ctx[k];
    return (
      arr.length > 0 &&
      typeof arr[0] === 'object' &&
      arr[0] != null &&
      typeof arr[0].id === 'string'
    );
  });
  if (candidates.length === 0) {
    warnings.push(
      'plan-registry file loaded but defines no array of plans with ids — ' +
        'Plans tab / enrollment URLs may be empty. Not blocking.'
    );
  }
});

// ---------------------------------------------------------------
// STEP 4 — service worker cache safety: CACHE_NAME must exist,
//            look reasonable, and not be obviously corrupted.
//            Uses pattern match so sw.js can be renamed.
// ---------------------------------------------------------------
step('Service worker: CACHE_NAME present and reasonable', () => {
  // Look for any top-level sw-like file
  let swPath = null;
  const rootEntries = fs
    .readdirSync(ROOT)
    .filter((f) => /(^|[-_])(sw|service-worker|serviceworker)\.js$/i.test(f));
  if (rootEntries.length > 0) {
    swPath = path.join(ROOT, rootEntries[0]);
  }
  if (!swPath) {
    warnings.push('No service worker file found — skipping SW check.');
    return;
  }
  const src = fs.readFileSync(swPath, 'utf8');
  const match = src.match(/CACHE_NAME\s*=\s*['"`]([^'"`]+)['"`]/);
  if (!match) {
    warnings.push(
      `${path.basename(swPath)} has no CACHE_NAME — skipping version check.`
    );
    return;
  }
  if (match[1].length < 3) {
    throw new Error(
      `${path.basename(swPath)} CACHE_NAME is suspiciously short: "${match[1]}"`
    );
  }
});

// ---------------------------------------------------------------
// STEP 5 — serverless API functions parse (if api/ exists)
// ---------------------------------------------------------------
step('API: serverless function files parse (if api/ exists)', () => {
  if (!fs.existsSync(API_DIR)) {
    return; // no api folder, that's fine
  }
  const files = listFiles(API_DIR, /\.js$/);
  if (files.length === 0) {
    warnings.push('api/ exists but has no .js files.');
    return;
  }
  for (const f of files) nodeCheck(f);
});

// ---------------------------------------------------------------
// OUTPUT
// ---------------------------------------------------------------
const totalChecks = passed.length + blockers.length;
console.log('');
console.log(color.bold('scripts/verify.js — repo safety check'));
console.log(color.gray('  ' + totalChecks + ' check(s) ran'));
console.log('');

for (const name of passed) {
  console.log('  ' + color.green('✓') + ' ' + name);
}

if (warnings.length > 0) {
  console.log('');
  console.log(color.yellow(color.bold('Warnings (not blocking):')));
  for (const w of warnings) {
    console.log('  ' + color.yellow('!') + ' ' + w);
  }
}

if (blockers.length > 0) {
  console.log('');
  console.log(color.red(color.bold('BLOCKER — commit/push stopped:')));
  for (const b of blockers) {
    console.log('  ' + color.red('✗') + ' ' + color.bold(b.step));
    console.log('    ' + color.gray(b.message.replace(/\n/g, '\n    ')));
    if (b.stack) {
      console.log(
        '    ' + color.gray('---\n    ' + b.stack.replace(/\n/g, '\n    '))
      );
    }
  }
  console.log('');
  console.log(color.yellow(color.bold('What to do:')));
  console.log('  1. Read the error above — it says what broke and where.');
  console.log('  2. Open the file the error names and fix it.');
  console.log('  3. Run:  ' + color.bold('npm run verify') + '   to re-check.');
  console.log('');
  console.log(color.gray('Emergency bypass (only if you are sure):'));
  console.log(
    color.gray('  git commit --no-verify     # skip pre-commit hook')
  );
  console.log(color.gray('  git push --no-verify       # skip pre-push hook'));
  console.log('');
  process.exit(1);
}

console.log('');
console.log(color.green(color.bold('✓ All safety checks passed.')));
console.log(color.gray('  Repo is safe to commit and push.'));
console.log('');
process.exit(0);
