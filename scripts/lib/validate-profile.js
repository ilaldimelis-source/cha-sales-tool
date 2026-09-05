'use strict';

const META_KEYS = new Set([
  'plan_id',
  'family',
  'variant',
  'plan_variant',
  'display_name',
  'status',
  'doc_completeness',
  'profile_confidence',
  'open_conflicts',
  'aliases',
  'has_profile'
]);

const CONF_RANK = { HIGH: 3, MEDIUM: 2, LOW: 1 };

function isLeaf(node) {
  return Boolean(
    node &&
    typeof node === 'object' &&
    !Array.isArray(node) &&
    Object.prototype.hasOwnProperty.call(node, 'vs') &&
    !Object.prototype.hasOwnProperty.call(node, '__leaf')
  );
}

function emptyNotFoundLeaf(searched) {
  return {
    v: null,
    vs: 'NOT_FOUND_IN_SOURCE',
    searched: Array.isArray(searched) ? searched.slice().sort() : []
  };
}

function isCurrentness(cur) {
  return (
    cur === 'CURRENT' ||
    (typeof cur === 'string' && cur.indexOf('CURRENT_') === 0)
  );
}

function isProtectedField(field) {
  return (
    field === 'limitations' ||
    field.indexOf('limitations.') === 0 ||
    field === 'benefits' ||
    field.indexOf('benefits.') === 0
  );
}

function hasCitation(leaf) {
  if (Number.isInteger(leaf.pg)) return true;
  if (typeof leaf.sec === 'string' && leaf.sec.length > 0) return true;
  if (typeof leaf.url === 'string' && leaf.url.length > 0) return true;
  return false;
}

function issue(gate, severity, planId, field, message) {
  return {
    gate: gate,
    severity: severity,
    plan_id: planId || null,
    field: field || null,
    message: message
  };
}

function walkLeaves(node, prefix, acc) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return acc;
  if (isLeaf(node)) {
    if (prefix) acc.push({ field: prefix, leaf: node });
    return acc;
  }
  const keys = Object.keys(node);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const child = node[key];
    if (key === '__leaf' && isLeaf(child)) {
      if (prefix) acc.push({ field: prefix, leaf: child });
      continue;
    }
    if (!prefix && key === 'unmapped' && child && typeof child === 'object') {
      const uKeys = Object.keys(child);
      for (let j = 0; j < uKeys.length; j++) {
        const uField = uKeys[j];
        const uNode = child[uField];
        if (isLeaf(uNode)) acc.push({ field: uField, leaf: uNode });
        else if (uNode && isLeaf(uNode.__leaf)) {
          acc.push({ field: uField, leaf: uNode.__leaf });
        }
      }
      continue;
    }
    if (!prefix && META_KEYS.has(key)) continue;
    const next = prefix ? prefix + '.' + key : key;
    walkLeaves(child, next, acc);
  }
  return acc;
}

function collectLeaves(profile) {
  return walkLeaves(profile, '', []);
}

function getLeafAt(profile, dotted) {
  const parts = String(dotted).split('.');
  let node = profile;
  for (let i = 0; i < parts.length; i++) {
    if (!node || typeof node !== 'object') return null;
    node = node[parts[i]];
  }
  if (isLeaf(node)) return node;
  if (node && isLeaf(node.__leaf)) return node.__leaf;
  return null;
}

function validateLeaf(leaf, field, planId) {
  const fails = [];
  if (!leaf || typeof leaf !== 'object') {
    fails.push(issue('G1', 'FAIL', planId, field, 'missing fact leaf'));
    return fails;
  }

  if (leaf.vs === 'NOT_FOUND_IN_SOURCE') return fails;

  const vNull = leaf.v === null || leaf.v === undefined;
  if (!vNull) {
    if (!Number.isInteger(leaf.src)) {
      fails.push(
        issue('G1', 'FAIL', planId, field, 'non-null fact missing integer src')
      );
    }
    if (!hasCitation(leaf)) {
      fails.push(
        issue(
          'G1',
          'FAIL',
          planId,
          field,
          'non-null fact needs pg, sec, or url'
        )
      );
    }
  }

  if (!leaf.app) {
    fails.push(issue('G2', 'FAIL', planId, field, 'fact missing app'));
  } else if (
    leaf.app !== 'EXACT_VARIANT' &&
    (!Array.isArray(leaf.gov) || leaf.gov.length === 0)
  ) {
    fails.push(
      issue(
        'G2',
        'FAIL',
        planId,
        field,
        'app ' + leaf.app + ' requires non-empty gov'
      )
    );
  }

  if (leaf.conf === 'HIGH' && leaf.cur === 'SUPERSEDED') {
    fails.push(
      issue('G3', 'FAIL', planId, field, 'conf=HIGH with cur=SUPERSEDED')
    );
  }

  if (leaf.cur === 'UNKNOWN' && leaf.conf === 'HIGH') {
    fails.push(
      issue('G5', 'FAIL', planId, field, 'cur=UNKNOWN caps conf at MEDIUM')
    );
  }

  return fails;
}

function notFoundRatio(profile, fieldKeys) {
  const keys = Array.isArray(fieldKeys) ? fieldKeys : [];
  if (!keys.length) return 0;
  let missing = 0;
  for (let i = 0; i < keys.length; i++) {
    const leaf = getLeafAt(profile, keys[i]);
    if (!leaf || leaf.vs === 'NOT_FOUND_IN_SOURCE') missing += 1;
  }
  return missing / keys.length;
}

function needsG4Cap(leaf, field) {
  return Boolean(
    leaf &&
    isProtectedField(field) &&
    leaf.vs !== 'NOT_FOUND_IN_SOURCE' &&
    leaf.conf === 'HIGH' &&
    Number.isInteger(leaf.auth) &&
    leaf.auth >= 6 &&
    leaf.vs !== 'CONFLICTED'
  );
}

function applyG4Cap(leaf, field, planId) {
  if (!needsG4Cap(leaf, field)) return null;
  const originalConf = leaf.conf;
  const sourceId = leaf.src;
  const auth = leaf.auth;
  leaf.conf = 'MEDIUM';
  leaf.vs = 'NEEDS_MANUAL_VERIFICATION';
  return {
    gate: 'G4',
    severity: 'WARN',
    plan_id: planId || null,
    field: field || null,
    source_id: sourceId,
    auth: auth,
    original_conf: originalConf,
    message:
      'capped conf ' +
      originalConf +
      ' to MEDIUM and vs to NEEDS_MANUAL_VERIFICATION (auth=' +
      auth +
      ' sole source on protected field)'
  };
}

function validateProfile(profile, options) {
  const opts = options || {};
  const fieldKeys = opts.fieldKeys || [];
  const planId = profile && profile.plan_id ? profile.plan_id : null;
  const fails = [];
  const warns = [];
  const g4Caps = [];
  const leaves = collectLeaves(profile || {});

  for (let i = 0; i < leaves.length; i++) {
    const item = leaves[i];
    const cap = applyG4Cap(item.leaf, item.field, planId);
    if (cap) {
      warns.push(cap);
      g4Caps.push(cap);
    }
    const leafFails = validateLeaf(item.leaf, item.field, planId);
    for (let j = 0; j < leafFails.length; j++) fails.push(leafFails[j]);
  }

  const ratio = notFoundRatio(profile, fieldKeys);
  if (fieldKeys.length && ratio > 0.4) {
    warns.push(
      issue(
        'G8',
        'WARN',
        planId,
        null,
        Math.round(ratio * 1000) / 10 +
          '% of keys are NOT_FOUND_IN_SOURCE (threshold 40%)'
      )
    );
  }

  return { fails: fails, warns: warns, g4Caps: g4Caps };
}

function validateRegistryCoverage(facts, registryIds) {
  const idSet = new Set(registryIds || []);
  const fails = [];
  const seen = new Set();
  const list = Array.isArray(facts) ? facts : [];
  for (let i = 0; i < list.length; i++) {
    const fact = list[i];
    const planId = fact && fact.plan_id;
    if (!planId || idSet.has(planId)) continue;
    if (seen.has(planId)) continue;
    seen.add(planId);
    fails.push(
      issue(
        'G6',
        'FAIL',
        planId,
        fact.field || null,
        'plan_id is not in the registry'
      )
    );
  }
  return fails;
}

function findFamilyIdenticalFields(profiles, fieldKeys) {
  const warns = [];
  const keys = Array.isArray(fieldKeys) ? fieldKeys : [];
  const byFamily = new Map();
  const list = Array.isArray(profiles) ? profiles : [];

  for (let i = 0; i < list.length; i++) {
    const profile = list[i];
    const family = profile && profile.family;
    if (!family) continue;
    if (!byFamily.has(family)) byFamily.set(family, []);
    byFamily.get(family).push(profile);
  }

  const families = Array.from(byFamily.keys()).sort();
  for (let f = 0; f < families.length; f++) {
    const family = families[f];
    const group = byFamily.get(family);
    if (group.length < 2) continue;
    for (let k = 0; k < keys.length; k++) {
      const field = keys[k];
      const values = [];
      let allPresent = true;
      for (let p = 0; p < group.length; p++) {
        const leaf = getLeafAt(group[p], field);
        if (!leaf || leaf.v === null || leaf.v === undefined) {
          allPresent = false;
          break;
        }
        values.push(JSON.stringify(leaf.v));
      }
      if (!allPresent || !values.length) continue;
      let identical = true;
      for (let v = 1; v < values.length; v++) {
        if (values[v] !== values[0]) {
          identical = false;
          break;
        }
      }
      if (identical) {
        warns.push(
          issue(
            'G7',
            'WARN',
            family,
            field,
            'byte-identical across ' +
              group.length +
              ' variants in family ' +
              family
          )
        );
      }
    }
  }

  return warns;
}

function compareFactRank(a, b) {
  const aCur = a.currentness || a.cur;
  const bCur = b.currentness || b.cur;
  const aApp = a.applicability || a.app;
  const bApp = b.applicability || b.app;
  const aAuth = Number.isInteger(a.authority_rank) ? a.authority_rank : a.auth;
  const bAuth = Number.isInteger(b.authority_rank) ? b.authority_rank : b.auth;

  const aCurrent = isCurrentness(aCur);
  const bCurrent = isCurrentness(bCur);
  const aSup = aCur === 'SUPERSEDED';
  const bSup = bCur === 'SUPERSEDED';
  if (aCurrent && bSup) return -1;
  if (bCurrent && aSup) return 1;

  if (aApp === 'EXACT_VARIANT' && bApp === 'FAMILY_WIDE') return -1;
  if (bApp === 'EXACT_VARIANT' && aApp === 'FAMILY_WIDE') return 1;

  if (Number.isInteger(aAuth) && Number.isInteger(bAuth) && aAuth !== bAuth) {
    return aAuth - bAuth;
  }
  return 0;
}

function lowestVerifiedConfidence(leaves) {
  let lowest = null;
  const list = Array.isArray(leaves) ? leaves : [];
  for (let i = 0; i < list.length; i++) {
    const leaf = list[i].leaf || list[i];
    if (!leaf || leaf.v === null || leaf.v === undefined) continue;
    const vs = String(leaf.vs || '');
    if (vs.indexOf('VERIFIED') !== 0) continue;
    const rank = CONF_RANK[leaf.conf];
    if (!rank) continue;
    if (lowest === null || rank < CONF_RANK[lowest]) lowest = leaf.conf;
  }
  return lowest;
}

function capUnknownConfidence(conf, cur) {
  if (cur === 'UNKNOWN' && conf === 'HIGH') return 'MEDIUM';
  return conf;
}

module.exports = {
  META_KEYS,
  CONF_RANK,
  isLeaf,
  isCurrentness,
  isProtectedField,
  emptyNotFoundLeaf,
  hasCitation,
  collectLeaves,
  getLeafAt,
  validateLeaf,
  validateProfile,
  validateRegistryCoverage,
  findFamilyIdenticalFields,
  notFoundRatio,
  compareFactRank,
  lowestVerifiedConfidence,
  capUnknownConfidence,
  needsG4Cap,
  applyG4Cap
};
