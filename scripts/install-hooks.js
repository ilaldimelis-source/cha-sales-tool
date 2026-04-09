#!/usr/bin/env node
/**
 * scripts/install-hooks.js — Install pre-commit and pre-push git hooks.
 *
 * Writes lightweight shell hooks to .git/hooks/ that run the verifier
 * before every commit and every push. Idempotent — safe to run multiple
 * times. No-ops gracefully if this isn't a git repo (e.g., during CI).
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

const ROOT = path.resolve(__dirname, '..');
const HOOKS_DIR = path.join(ROOT, '.git', 'hooks');

if (!fs.existsSync(HOOKS_DIR)) {
  // Not a git repo (e.g., fresh CI checkout without .git, or
  // extracted tarball). Silently skip — this is expected.
  console.log('[install-hooks] Not a git repo — skipping hook installation.');
  process.exit(0);
}

const HOOKS = {
  'pre-commit': [
    '#!/bin/sh',
    '# Installed by scripts/install-hooks.js',
    '# Runs the verifier before each commit. Blocks bad commits.',
    '# Bypass in emergencies with: git commit --no-verify',
    '',
    'node scripts/verify.js',
    ''
  ].join('\n'),

  'pre-push': [
    '#!/bin/sh',
    '# Installed by scripts/install-hooks.js',
    '# Runs the verifier before each push. Final safety net.',
    '# Bypass in emergencies with: git push --no-verify',
    '',
    'node scripts/verify.js',
    ''
  ].join('\n')
};

let installed = 0;
for (const name of Object.keys(HOOKS)) {
  const target = path.join(HOOKS_DIR, name);
  fs.writeFileSync(target, HOOKS[name], { encoding: 'utf8' });
  try {
    fs.chmodSync(target, 0o755);
  } catch (_e) {
    // chmod can fail on some Windows setups — hooks still work via
    // Git Bash which ignores the executable bit.
  }
  installed++;
  console.log('[install-hooks] installed ' + name);
}

console.log('');
console.log('[install-hooks] ' + installed + ' hook(s) active.');
console.log(
  '[install-hooks] On every commit/push, scripts/verify.js will run.'
);
console.log('[install-hooks] Bypass (emergency only): git commit --no-verify');
