#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function readText(relPath) {
  return fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf8');
}

function loadRegistryIds() {
  const code = readText('js/plan-registry.js');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'js/plan-registry.js' });
  const registry = sandbox.CHA_PLAN_REGISTRY;
  if (!Array.isArray(registry)) {
    throw new Error('CHA_PLAN_REGISTRY is missing or not an array.');
  }
  return registry
    .map(function (p) {
      return p && typeof p.id === 'string' ? p.id.trim() : '';
    })
    .filter(Boolean);
}

function loadPdfMapIds() {
  const code = readText('js/plan-pdf-map.js');
  const sandbox = { console, window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'js/plan-pdf-map.js' });
  const map = sandbox.window.CHA_PLAN_PDF_MAP;
  if (!Array.isArray(map)) {
    throw new Error('CHA_PLAN_PDF_MAP is missing or not an array.');
  }
  return map
    .map(function (row) {
      return row && typeof row.planId === 'string' ? row.planId.trim() : '';
    })
    .filter(Boolean);
}

function printList(title, arr) {
  console.log('\n' + title + ': ' + arr.length);
  if (!arr.length) {
    console.log('  - none');
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    console.log('  - ' + arr[i]);
  }
}

function main() {
  const registryIds = loadRegistryIds();
  const pdfMapIds = loadPdfMapIds();

  const registrySet = new Set(registryIds);
  const pdfMapSet = new Set(pdfMapIds);

  const missingPdfMap = registryIds.filter(function (id) {
    return !pdfMapSet.has(id);
  });
  const orphanPdfMap = pdfMapIds.filter(function (id) {
    return !registrySet.has(id);
  });

  console.log('CHA plan sync report');
  console.log('====================');
  console.log('Registry plans: ' + registryIds.length);
  console.log('PDF map entries: ' + pdfMapIds.length);
  console.log('Unique registry ids: ' + registrySet.size);
  console.log('Unique PDF map ids: ' + pdfMapSet.size);

  printList('Registry plans with NO PDF map entry', missingPdfMap);
  printList('PDF map entries with NO registry plan (orphans)', orphanPdfMap);

  console.log(
    '\nDone. This is a reporting check only (no non-zero exit on mismatches).'
  );
}

try {
  main();
} catch (err) {
  console.error(
    'plan-sync check failed:',
    err && err.message ? err.message : err
  );
  process.exitCode = 1;
}
