#!/usr/bin/env node
'use strict';

/**
 * Builds data/plan-aliases.json from data/plans/*.json.
 * Tokens come from display_name and plan_id only — never benefit text.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PLANS_DIR = path.join(ROOT, 'data', 'plans');
const OUT_FILE = path.join(ROOT, 'data', 'plan-aliases.json');

function isDigitToken(tok) {
  return /^[0-9]+$/.test(tok);
}

function tokenize(raw) {
  if (raw == null) return [];
  let s = String(raw);
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  s = s.replace(/\+/g, ' plus ');
  s = s.replace(/(\d),(?=\d)/g, '$1');
  s = s.toLowerCase();
  s = s.replace(/([a-z])([0-9])/g, '$1 $2');
  s = s.replace(/([0-9])([a-z])/g, '$1 $2');
  s = s.replace(/[^a-z0-9]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (!s) return [];
  return s.split(' ');
}

function uniqueTokens(list) {
  const seen = Object.create(null);
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    if (!t || seen[t]) continue;
    seen[t] = true;
    out.push(t);
  }
  return out;
}

function intersection(arrays) {
  if (arrays.length === 0) return [];
  const first = arrays[0];
  const out = [];
  for (let i = 0; i < first.length; i++) {
    const t = first[i];
    let inAll = true;
    for (let j = 1; j < arrays.length; j++) {
      if (arrays[j].indexOf(t) === -1) {
        inAll = false;
        break;
      }
    }
    if (inAll) out.push(t);
  }
  return uniqueTokens(out);
}

function main() {
  const files = fs
    .readdirSync(PLANS_DIR)
    .filter(function (f) {
      return f.slice(-5) === '.json';
    })
    .sort();

  const plans = [];
  for (let i = 0; i < files.length; i++) {
    const p = JSON.parse(
      fs.readFileSync(path.join(PLANS_DIR, files[i]), 'utf8')
    );
    const tokens = uniqueTokens(
      tokenize(p.display_name).concat(tokenize(p.plan_id))
    );
    plans.push({
      plan_id: p.plan_id,
      display_name: p.display_name,
      family: p.family,
      tokens: tokens
    });
  }

  const byFamily = Object.create(null);
  for (let i = 0; i < plans.length; i++) {
    const key = String(plans[i].family);
    if (!byFamily[key]) byFamily[key] = [];
    byFamily[key].push(plans[i]);
  }

  const out = [];
  for (let i = 0; i < plans.length; i++) {
    const p = plans[i];
    const members = byFamily[String(p.family)];
    const nonDigitSets = [];
    for (let m = 0; m < members.length; m++) {
      const nd = [];
      for (let t = 0; t < members[m].tokens.length; t++) {
        const tok = members[m].tokens[t];
        if (!isDigitToken(tok) && tok.length >= 2) nd.push(tok);
      }
      nonDigitSets.push(nd);
    }
    let familyTokens = intersection(nonDigitSets);
    if (familyTokens.length === 0) {
      for (let t = 0; t < p.tokens.length; t++) {
        const tok = p.tokens[t];
        if (!isDigitToken(tok) && tok.length >= 2) familyTokens.push(tok);
      }
      familyTokens = uniqueTokens(familyTokens);
    }
    familyTokens.sort();
    const familySet = Object.create(null);
    for (let t = 0; t < familyTokens.length; t++) {
      familySet[familyTokens[t]] = true;
    }
    const variantTokens = [];
    for (let t = 0; t < p.tokens.length; t++) {
      const tok = p.tokens[t];
      if (!familySet[tok]) variantTokens.push(tok);
    }
    variantTokens.sort();
    out.push({
      plan_id: p.plan_id,
      display_name: p.display_name,
      family_tokens: familyTokens,
      variant_tokens: variantTokens
    });
  }

  out.sort(function (a, b) {
    return String(a.plan_id).localeCompare(String(b.plan_id));
  });

  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(
    'Wrote ' + out.length + ' plan aliases to data/plan-aliases.json'
  );
}

main();
