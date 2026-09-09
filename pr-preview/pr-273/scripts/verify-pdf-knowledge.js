/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MAP_PATH = path.join(ROOT, 'js', 'plan-pdf-map.js');
const INDEX_PATH = path.join(ROOT, 'knowledge_base', 'extracted', 'index.json');
const PLANS_DIR = path.join(ROOT, 'knowledge_base', 'extracted', 'plans');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function main() {
  assert(fs.existsSync(MAP_PATH), 'Missing js/plan-pdf-map.js');
  assert(
    fs.existsSync(INDEX_PATH),
    'Missing knowledge_base/extracted/index.json'
  );
  assert(fs.existsSync(PLANS_DIR), 'Missing knowledge_base/extracted/plans/');

  const mapJs = fs.readFileSync(MAP_PATH, 'utf8');
  assert(
    mapJs.indexOf('window.CHA_PLAN_PDF_MAP') !== -1,
    'plan map not exported'
  );
  assert(
    mapJs.indexOf('window.CHA_PLAN_ALIAS_INDEX') !== -1,
    'alias map not exported'
  );

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  assert(Array.isArray(index.plans), 'index.plans must be an array');
  assert(index.plans.length > 0, 'index.plans must not be empty');

  var readyCount = 0;
  var excludedCount = 0;
  var missingPlanFiles = [];
  index.plans.forEach(function (plan) {
    const artifactPath = path.join(PLANS_DIR, plan.planId + '.json');
    if (!fs.existsSync(artifactPath)) {
      missingPlanFiles.push(plan.planId);
      return;
    }
    if (plan.status === 'ready') readyCount += 1;
    if (plan.status === 'excluded') excludedCount += 1;
  });

  assert(
    missingPlanFiles.length === 0,
    'Missing plan artifacts: ' + missingPlanFiles.join(', ')
  );
  assert(readyCount > 0, 'No ready plans found in extracted index');
  assert(excludedCount > 0, 'Expected excluded plans were not marked');

  console.log('PDF knowledge artifacts verified.');
  console.log('Total plans:', index.plans.length);
  console.log('Ready plans:', readyCount);
  console.log('Excluded plans:', excludedCount);
}

main();
