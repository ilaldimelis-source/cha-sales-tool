#!/usr/bin/env node
/* eslint-disable no-undef -- Node.js CommonJS (require, __dirname, process, console) */
/**
 * scripts/install-hooks.js - Install pre-commit and pre-push git hooks.
 *
 * Writes lightweight shell hooks to .git/hooks/ that run lint-staged (staged
 * files only) then scripts/verify.js before every commit and every push.
 * Idempotent - safe to run multiple times. No-ops gracefully if this isn't a
 * git repo (e.g., during CI).
 *
 * Usage:
 *   node scripts/install-hooks.js
 *
 * This runs automatically after `npm install` (see package.json
 * "postinstall" script) so future clones of the repo get the hooks
 * installed without any manual steps.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const HOOKS_DIR = path.join(path.resolve(__dirname, '..'), '.git', 'hooks');

if (!fs.existsSync(HOOKS_DIR)) {
  // Not a git repo (e.g., fresh CI checkout without .git, or
  // extracted tarball). Silently skip - this is expected.
  console.log('[install-hooks] Not a git repo - skipping hook installation.');
  process.exit(0);
}

const HOOK_BODY = ['npx lint-staged && node scripts/verify.js', ''].join('\n');

const HOOKS = {
  'pre-commit': [
    '#!/bin/sh',
    '# Installed by scripts/install-hooks.js',
    '# Pre-commit runs lint-staged + verify.js (staged files first). Blocks bad commits.',
    '# Bypass in emergencies with: git commit --no-verify',
    '# Bypass: git commit --no-verify (use only in emergencies)',
    '',
    HOOK_BODY
  ].join('\n'),

  'pre-push': [
    '#!/bin/sh',
    '# Installed by scripts/install-hooks.js',
    '# Pre-push runs lint-staged + verify.js (same chain as pre-commit).',
    '# Bypass in emergencies with: git push --no-verify',
    '# Bypass: git push --no-verify (use only in emergencies)',
    '',
    HOOK_BODY
  ].join('\n')
};

let installed = 0;
for (const name of Object.keys(HOOKS)) {
  const target = path.join(HOOKS_DIR, name);
  fs.writeFileSync(target, HOOKS[name], { encoding: 'utf8' });
  try {
    fs.chmodSync(target, 0o755);
  } catch {
    // chmod can fail on some Windows setups - hooks still work via
    // Git Bash which ignores the executable bit.
  }
  installed++;
  console.log('[install-hooks] installed ' + name);
}

console.log('');
console.log('[install-hooks] ' + installed + ' hook(s) active.');
console.log(
  '[install-hooks] Pre-commit and pre-push run: npx lint-staged && node scripts/verify.js'
);
console.log(
  '[install-hooks] lint-staged checks staged .js, .css, .html only (see package.json).'
);
console.log(
  '[install-hooks] verify.js runs after for palette, plan data, SW, and other repo checks.'
);
console.log('[install-hooks] Bypass (emergency only): git commit --no-verify');
console.log('[install-hooks] Bypass (emergency only): git push --no-verify');
