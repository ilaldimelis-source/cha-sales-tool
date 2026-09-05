#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const {
  isLeaf,
  emptyNotFoundLeaf,
  validateProfile,
  validateRegistryCoverage,
  findFamilyIdenticalFields,
  collectLeaves,
  compareFactRank,
  lowestVerifiedConfidence,
  capUnknownConfidence
} = require('./lib/validate-profile.js');
const FIELD_MAP = require('./lib/field-map.json');

// CLI-only paths. Pass --sources ledger/01_source_inventory.csv even though
// that inventory is numbered 03_ in some internal ledger artefacts.
const REQUIRED_ARGS = ['facts', 'registry', 'sources', 'conflicts', 'out'];
const FIELD_KEYS = Object.keys(FIELD_MAP).sort();

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token.slice(0, 2) !== '--') {
      throw new Error('Unexpected argument: ' + token);
    }
    const key = token.slice(2);
    const value = argv[i + 1];
    if (value == null || value.slice(0, 2) === '--') {
      throw new Error('Missing value for --' + key);
    }
    out[key] = value;
    i += 1;
  }
  return out;
}

function failUsage(message) {
  console.error(message);
  process.exit(1);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function readJsonl(filePath) {
  const lines = readText(filePath).split(/\n/);
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    try {
      rows.push(JSON.parse(line));
    } catch (err) {
      throw new Error(
        filePath + ' line ' + (i + 1) + ' is malformed JSON: ' + err.message,
        { cause: err }
      );
    }
  }
  return rows;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  const src = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      continue;
    }
    if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    if (ch === '\r') continue;
    cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function csvObjects(filePath) {
  const rows = parseCsv(readText(filePath));
  if (!rows.length) return [];
  const header = rows[0];
  const out = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row.length || (row.length === 1 && row[0] === '')) continue;
    const obj = {};
    for (let c = 0; c < header.length; c++) {
      obj[header[c]] = row[c] == null ? '' : row[c];
    }
    out.push(obj);
  }
  return out;
}

function sortDeep(value) {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    const out = {};
    const keys = Object.keys(value).sort();
    for (let i = 0; i < keys.length; i++) {
      out[keys[i]] = sortDeep(value[keys[i]]);
    }
    return out;
  }
  return value;
}

function stableStringify(value) {
  return JSON.stringify(sortDeep(value), null, 2) + '\n';
}

function uniqueSortedInts(values) {
  const set = new Set();
  for (let i = 0; i < values.length; i++) {
    const n = Number(values[i]);
    if (Number.isInteger(n)) set.add(n);
  }
  return Array.from(set).sort(function (a, b) {
    return a - b;
  });
}

function uniqueSortedStrings(values) {
  const set = new Set();
  for (let i = 0; i < values.length; i++) {
    if (values[i] == null) continue;
    const s = String(values[i]).trim();
    if (s) set.add(s);
  }
  return Array.from(set).sort();
}

function normalizeSourceType(raw) {
  const s = String(raw || '')
    .trim()
    .toLowerCase();
  if (s === 'training_module' || s === 'training') return 'training';
  if (s === 'portal_page_archived') return 'portal_page';
  if (s === 'certificate' || s === 'cert') return 'certificate';
  if (s === 'sob' || s === 'summary_of_benefits') return 'sob';
  return s;
}

function docCompleteness(sourceTypes, registryStatus) {
  if (registryStatus === 'STATUS_UNCERTAIN') return 'STATUS_UNCERTAIN';
  const types = uniqueSortedStrings(
    (sourceTypes || []).map(normalizeSourceType)
  );
  if (!types.length) return 'NO_CURRENT_SOURCE';
  const set = new Set(types);
  if (set.has('certificate') || set.has('spd')) return 'FULL_DOCS';
  if (set.has('benefit_schedule')) return 'PARTIAL_DOCS';
  const onlySob = types.every(function (t) {
    return t === 'sob' || t === 'brochure';
  });
  if (onlySob) return 'SOB_ONLY';
  const onlyPortal = types.every(function (t) {
    return t === 'portal_page' || t === 'training';
  });
  if (onlyPortal) return 'PORTAL_ONLY';
  return 'PARTIAL_DOCS';
}

function buildAliases(plan) {
  const set = new Set();
  function add(value) {
    if (value == null) return;
    const raw = String(value).trim();
    if (!raw) return;
    set.add(raw);
    const lower = raw.toLowerCase();
    set.add(lower);
    set.add(lower.replace(/\s+/g, ''));
    set.add(lower.replace(/[^a-z0-9]+/g, ''));
    const spaced = lower.replace(/[^a-z0-9]+/g, ' ').trim();
    if (spaced) set.add(spaced);
  }
  add(plan.display_name);
  add(plan.family);
  add(plan.variant);
  add(String(plan.family || '') + ' ' + String(plan.variant || ''));
  add(plan.plan_id);
  const extras = plan.aliases || [];
  for (let i = 0; i < extras.length; i++) add(extras[i]);
  return Array.from(set).sort();
}

function mappedPath(field) {
  return FIELD_MAP[field] || null;
}

function setLeaf(root, dotted, leaf) {
  const parts = String(dotted).split('.');
  let node = root;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    const last = i === parts.length - 1;
    if (last) {
      if (node[key] && typeof node[key] === 'object' && !isLeaf(node[key])) {
        node[key].__leaf = leaf;
      } else {
        node[key] = leaf;
      }
      return;
    }
    if (!(key in node) || node[key] == null) {
      node[key] = {};
    } else if (isLeaf(node[key])) {
      node[key] = { __leaf: node[key] };
    } else if (typeof node[key] !== 'object') {
      node[key] = {};
    }
    node = node[key];
  }
}

function pageValue(ref) {
  if (!ref || ref.page == null || ref.page === '') return null;
  if (Number.isInteger(ref.page)) return ref.page;
  const n = Number(ref.page);
  return Number.isInteger(n) ? n : null;
}

function toLeaf(fact) {
  const ref = fact.source_ref || {};
  const cur = fact.currentness || 'UNKNOWN';
  const conf = capUnknownConfidence(fact.confidence || 'LOW', cur);
  return {
    v: fact.value,
    src: fact.source_id,
    pg: pageValue(ref),
    sec: typeof ref.section === 'string' ? ref.section : '',
    url: ref.url == null || ref.url === '' ? null : String(ref.url),
    cur: cur,
    app: fact.applicability || 'EXACT_VARIANT',
    gov: Array.isArray(fact.governs_variants)
      ? uniqueSortedStrings(fact.governs_variants)
      : [],
    auth: fact.authority_rank,
    conf: conf,
    vs: fact.verification_status || 'VERIFIED'
  };
}

function resolveFieldFacts(facts) {
  const sourceIds = uniqueSortedInts(
    facts.map(function (f) {
      return f.source_id;
    })
  );
  if (facts.length === 1) {
    return { leaf: toLeaf(facts[0]), sourceIds: sourceIds, conflicted: false };
  }
  const sorted = facts.slice().sort(function (a, b) {
    const ranked = compareFactRank(a, b);
    if (ranked !== 0) return ranked;
    return String(a.fact_id || '').localeCompare(String(b.fact_id || ''));
  });
  const best = sorted[0];
  let beatsAll = true;
  for (let i = 1; i < sorted.length; i++) {
    if (compareFactRank(best, sorted[i]) >= 0) {
      beatsAll = false;
      break;
    }
  }
  if (beatsAll) {
    const leaf = toLeaf(best);
    leaf.vs = 'CONFLICTED';
    return { leaf: leaf, sourceIds: sourceIds, conflicted: true };
  }
  const leaf = toLeaf(best);
  leaf.v = null;
  leaf.vs = 'NEEDS_MANUAL_VERIFICATION';
  return { leaf: leaf, sourceIds: sourceIds, conflicted: true };
}

function expandRangeToken(token) {
  const m = String(token).match(/^(.*?)(\d+)\.\.(.*?)(\d+)$/);
  if (!m) return [token];
  const leftPrefix = m[1];
  const rightPrefix = m[3];
  const prefix = rightPrefix === '' ? leftPrefix : leftPrefix;
  if (rightPrefix !== '' && rightPrefix !== leftPrefix) return [token];
  const start = Number(m[2]);
  const end = Number(m[4]);
  if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) {
    return [token];
  }
  const out = [];
  for (let n = start; n <= end; n++) out.push(prefix + n);
  return out;
}

function tokenMatchesPlan(token, planId) {
  if (token === planId) return true;
  if (token.slice(-1) === '*') {
    return planId.indexOf(token.slice(0, -1)) === 0;
  }
  if (token.indexOf('..') !== -1) {
    return expandRangeToken(token).indexOf(planId) !== -1;
  }
  return false;
}

function conflictApplies(conflict, planId) {
  const raw = String(conflict.plan_id || '');
  const tokens = raw.split('|').map(function (t) {
    return t.trim();
  });
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] && tokenMatchesPlan(tokens[i], planId)) return true;
  }
  return false;
}

function issueRow(gate, severity, planId, field, message) {
  return {
    gate: gate,
    severity: severity,
    plan_id: planId || null,
    field: field || null,
    message: message
  };
}

function renderReport(report) {
  const lines = [];
  lines.push('# Plan profile validation report');
  lines.push('');
  lines.push('## Counts');
  lines.push('');
  lines.push('- Plans emitted: ' + report.plansEmitted);
  lines.push('- Facts consumed: ' + report.factsConsumed);
  lines.push('- Facts rejected: ' + report.factsRejected);
  lines.push('');

  function section(title, rows) {
    lines.push('## ' + title);
    lines.push('');
    if (!rows.length) {
      lines.push('- none');
      lines.push('');
      return;
    }
    const byGate = {};
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const gate = row.gate || 'OTHER';
      if (!byGate[gate]) byGate[gate] = [];
      byGate[gate].push(row);
    }
    const gates = Object.keys(byGate).sort();
    for (let g = 0; g < gates.length; g++) {
      lines.push('### ' + gates[g]);
      lines.push('');
      const group = byGate[gates[g]].slice().sort(function (a, b) {
        const p = String(a.plan_id || '').localeCompare(
          String(b.plan_id || '')
        );
        if (p !== 0) return p;
        return String(a.field || '').localeCompare(String(b.field || ''));
      });
      for (let i = 0; i < group.length; i++) {
        const row = group[i];
        lines.push(
          '- `' +
            String(row.plan_id || '-') +
            '` `' +
            String(row.field || '-') +
            '`: ' +
            row.message
        );
      }
      lines.push('');
    }
  }

  section('FAILs', report.fails);
  section('WARNs', report.warns);

  lines.push('## SOB_ONLY / PORTAL_ONLY limitations overrides');
  lines.push('');
  if (!report.overrides.length) {
    lines.push('- none');
  } else {
    const rows = report.overrides.slice().sort(function (a, b) {
      const p = String(a.plan_id).localeCompare(String(b.plan_id));
      if (p !== 0) return p;
      return String(a.field).localeCompare(String(b.field));
    });
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      lines.push(
        '- `' +
          row.plan_id +
          '` `' +
          row.field +
          '` (src ' +
          String(row.src) +
          ', completeness ' +
          row.completeness +
          ')'
      );
    }
  }
  lines.push('');
  lines.push('## Registry plan_ids with zero facts');
  lines.push('');
  if (!report.zeroFacts.length) {
    lines.push('- none');
  } else {
    const ids = report.zeroFacts.slice().sort();
    for (let i = 0; i < ids.length; i++) {
      lines.push('- `' + ids[i] + '`');
    }
  }
  lines.push('');
  return lines.join('\n');
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, contents);
}

function loadInputs(args) {
  const registry = readJson(args.registry);
  if (!registry || !Array.isArray(registry.plans)) {
    throw new Error('Registry is missing a plans array: ' + args.registry);
  }
  const facts = readJsonl(args.facts);
  const conflicts = readJsonl(args.conflicts);
  const sources = csvObjects(args.sources);
  if (!sources.length) {
    throw new Error(
      'Sources inventory is empty or missing header: ' + args.sources
    );
  }
  if (!Object.prototype.hasOwnProperty.call(sources[0], 'source_id')) {
    throw new Error('Sources inventory is missing source_id column');
  }
  return {
    registry: registry,
    facts: facts,
    conflicts: conflicts,
    sources: sources
  };
}

function sourceTypeById(sources) {
  const map = new Map();
  for (let i = 0; i < sources.length; i++) {
    const id = Number(sources[i].source_id);
    if (!Number.isInteger(id)) continue;
    map.set(id, sources[i].source_type);
  }
  return map;
}

function citedTypesForFacts(facts, typeById) {
  const types = [];
  for (let i = 0; i < facts.length; i++) {
    const id = facts[i].source_id;
    const fromInventory = typeById.get(id);
    types.push(fromInventory || facts[i].source_type);
  }
  return types;
}

function buildProfile(plan, planFacts, typeById, conflicts, warns, overrides) {
  const profile = {
    open_conflicts: [],
    unmapped: {}
  };

  const byField = new Map();
  for (let i = 0; i < planFacts.length; i++) {
    const fact = planFacts[i];
    const field = fact.field;
    if (!byField.has(field)) byField.set(field, []);
    byField.get(field).push(fact);
  }

  const resolved = new Map();
  const fieldNames = Array.from(byField.keys()).sort();
  for (let i = 0; i < fieldNames.length; i++) {
    const field = fieldNames[i];
    const group = byField.get(field);
    const result = resolveFieldFacts(group);
    resolved.set(field, result);
    if (result.conflicted) {
      profile.open_conflicts.push({
        field: field,
        source_ids: result.sourceIds
      });
    }
  }

  for (let i = 0; i < FIELD_KEYS.length; i++) {
    const field = FIELD_KEYS[i];
    const dest = mappedPath(field);
    const result = resolved.get(field);
    if (result) {
      setLeaf(profile, dest, result.leaf);
    } else {
      setLeaf(profile, dest, emptyNotFoundLeaf());
    }
  }

  for (let i = 0; i < fieldNames.length; i++) {
    const field = fieldNames[i];
    if (mappedPath(field)) continue;
    const result = resolved.get(field);
    profile.unmapped[field] = result.leaf;
    warns.push(
      issueRow(
        'UNMAPPED',
        'WARN',
        plan.plan_id,
        field,
        'field is not in field-map.json; stored under unmapped'
      )
    );
  }

  const completeness = docCompleteness(
    citedTypesForFacts(planFacts, typeById),
    plan.status
  );
  profile.doc_completeness = completeness;

  if (completeness === 'SOB_ONLY' || completeness === 'PORTAL_ONLY') {
    for (let i = 0; i < FIELD_KEYS.length; i++) {
      const field = FIELD_KEYS[i];
      if (field !== 'limitations' && field.indexOf('limitations.') !== 0) {
        continue;
      }
      const dest = mappedPath(field);
      const existing = resolved.get(field);
      const hadFact = Boolean(
        existing && existing.leaf && existing.leaf.vs !== 'NOT_FOUND_IN_SOURCE'
      );
      setLeaf(profile, dest, emptyNotFoundLeaf());
      if (hadFact) {
        overrides.push({
          plan_id: plan.plan_id,
          field: field,
          src: existing.leaf.src,
          completeness: completeness
        });
      }
    }
  }

  for (let i = 0; i < conflicts.length; i++) {
    const conflict = conflicts[i];
    if (!conflictApplies(conflict, plan.plan_id)) continue;
    const sourceIds = uniqueSortedInts([
      conflict.source_a && conflict.source_a.source_id,
      conflict.source_b && conflict.source_b.source_id
    ]);
    profile.open_conflicts.push({
      conflict_id: conflict.conflict_id || null,
      field: conflict.field || null,
      source_ids: sourceIds
    });
  }

  profile.open_conflicts.sort(function (a, b) {
    const c = String(a.conflict_id || '').localeCompare(
      String(b.conflict_id || '')
    );
    if (c !== 0) return c;
    return String(a.field || '').localeCompare(String(b.field || ''));
  });

  profile.profile_confidence = lowestVerifiedConfidence(collectLeaves(profile));
  profile.plan_id = plan.plan_id;
  profile.family = plan.family;
  profile.plan_variant = plan.variant;
  profile.display_name = plan.display_name;
  profile.status = plan.status;
  return profile;
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv);
  } catch (err) {
    failUsage(err.message);
    return;
  }
  for (let i = 0; i < REQUIRED_ARGS.length; i++) {
    const key = REQUIRED_ARGS[i];
    if (!args[key]) {
      failUsage('Missing required --' + key);
      return;
    }
  }

  let loaded;
  try {
    loaded = loadInputs(args);
  } catch (err) {
    failUsage(err.message);
    return;
  }

  const registryPlans = loaded.registry.plans;
  const registryById = new Map();
  for (let i = 0; i < registryPlans.length; i++) {
    registryById.set(registryPlans[i].plan_id, registryPlans[i]);
  }
  const registryIds = Array.from(registryById.keys());
  const typeById = sourceTypeById(loaded.sources);

  const fails = validateRegistryCoverage(loaded.facts, registryIds);
  const warns = [];
  const overrides = [];
  let factsRejected = 0;
  const acceptedByPlan = new Map();

  for (let i = 0; i < loaded.facts.length; i++) {
    const fact = loaded.facts[i];
    if (!registryById.has(fact.plan_id)) {
      factsRejected += 1;
      continue;
    }
    if (!acceptedByPlan.has(fact.plan_id)) acceptedByPlan.set(fact.plan_id, []);
    acceptedByPlan.get(fact.plan_id).push(fact);
  }

  const factsConsumed = loaded.facts.length - factsRejected;
  const profiles = [];
  const planIds = Array.from(acceptedByPlan.keys()).sort();
  for (let i = 0; i < planIds.length; i++) {
    const planId = planIds[i];
    const plan = registryById.get(planId);
    const profile = buildProfile(
      plan,
      acceptedByPlan.get(planId),
      typeById,
      loaded.conflicts,
      warns,
      overrides
    );
    profiles.push(profile);
    const result = validateProfile(profile, { fieldKeys: FIELD_KEYS });
    for (let f = 0; f < result.fails.length; f++) fails.push(result.fails[f]);
    for (let w = 0; w < result.warns.length; w++) warns.push(result.warns[w]);
  }

  const g7 = findFamilyIdenticalFields(profiles, FIELD_KEYS);
  for (let i = 0; i < g7.length; i++) warns.push(g7[i]);

  const zeroFacts = [];
  for (let i = 0; i < registryPlans.length; i++) {
    const id = registryPlans[i].plan_id;
    if (!acceptedByPlan.has(id)) zeroFacts.push(id);
  }

  const hasFail = fails.length > 0;
  const plansEmitted = hasFail ? 0 : profiles.length;
  const report = {
    plansEmitted: plansEmitted,
    factsConsumed: factsConsumed,
    factsRejected: factsRejected,
    fails: fails,
    warns: warns,
    overrides: overrides,
    zeroFacts: zeroFacts
  };

  const reportPath = path.join(process.cwd(), 'build', 'validation-report.md');
  writeFile(reportPath, renderReport(report));

  if (hasFail) {
    console.error(
      'Validation FAILs: ' + fails.length + '. Report: ' + reportPath
    );
    process.exit(1);
  }

  const outRoot = path.resolve(args.out);
  const plansDir = path.join(outRoot, 'plans');
  mkdirp(plansDir);

  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    const filePath = path.join(plansDir, profile.plan_id + '.json');
    writeFile(filePath, stableStringify(profile));
  }

  const indexPlans = registryPlans
    .slice()
    .sort(function (a, b) {
      return String(a.plan_id).localeCompare(String(b.plan_id));
    })
    .map(function (plan) {
      const profile = profiles.find(function (p) {
        return p.plan_id === plan.plan_id;
      });
      const include =
        plan.status === 'ACTIVE' ||
        plan.status === 'STATUS_UNCERTAIN' ||
        Boolean(profile);
      if (!include) return null;
      const completeness = profile
        ? profile.doc_completeness
        : plan.status === 'STATUS_UNCERTAIN'
          ? 'STATUS_UNCERTAIN'
          : 'NO_CURRENT_SOURCE';
      return {
        plan_id: plan.plan_id,
        family: plan.family,
        variant: plan.variant,
        display_name: plan.display_name,
        status: plan.status,
        aliases: buildAliases(plan),
        doc_completeness: completeness,
        has_profile: Boolean(profile)
      };
    })
    .filter(Boolean);

  writeFile(
    path.join(outRoot, 'plan-index.json'),
    stableStringify({ plans: indexPlans })
  );
  console.log(
    'Wrote ' +
      profiles.length +
      ' profiles and index to ' +
      outRoot +
      '. Report: ' +
      reportPath
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  parseArgs,
  parseCsv,
  docCompleteness,
  buildAliases,
  resolveFieldFacts,
  toLeaf
};
