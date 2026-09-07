'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const target = path.join(root, 'js', 'call-playbook.js');
const replacement = path.join(__dirname, 'plan-scripts-replacement.js');

const content = fs.readFileSync(target, 'utf8');
const newBlock = fs.readFileSync(replacement, 'utf8').trim();

const startMarker = 'var PLAN_SCRIPTS = [';
const endMarker = '\n];\n\nconst ISA_SCRIPTS';

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  console.error('Could not locate PLAN_SCRIPTS block markers');
  process.exit(1);
}

const updated =
  content.slice(0, start) + newBlock + content.slice(end + '\n];'.length);

fs.writeFileSync(target, updated);
console.log('Updated PLAN_SCRIPTS in js/call-playbook.js');
