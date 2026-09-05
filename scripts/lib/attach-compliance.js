'use strict';

const FACT_CLASSES = new Set([
  'verified_plan_fact',
  'training_guidance',
  'internal_interpretation',
  'recommended_wording'
]);

const BLOCKING_GAP_CATEGORIES = new Set([
  'missing_active_plan_documents',
  'missing_certificates_and_spds',
  'missing_add_ons',
  'no_source_of_any_kind',
  'undisclosed_product_type',
  'undisclosed_pre_existing',
  'undefined_term',
  'eligibility_unknown'
]);

function cleanToken(token) {
  return String(token || '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitPlanTokens(raw) {
  return String(raw || '')
    .split('|')
    .map(cleanToken)
    .filter(Boolean);
}

function expandRangeToken(token) {
  const compact = String(token).replace(/\s*\.\.\s*/g, '..');
  const m = compact.match(/^(.*?)(\d+)\.\.(.*?)(\d+)$/);
  if (!m) return [token];
  const leftPrefix = m[1];
  const rightPrefix = m[3];
  if (rightPrefix !== '' && rightPrefix !== leftPrefix) return [token];
  const start = Number(m[2]);
  const end = Number(m[4]);
  if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) {
    return [token];
  }
  const out = [];
  for (let n = start; n <= end; n++) out.push(leftPrefix + n);
  return out;
}

function isClassWildcard(token) {
  const t = cleanToken(token);
  if (!t) return false;
  if (
    t === 'ALL' ||
    t === 'MULTI' ||
    t === 'ALL_ADDONS' ||
    t === 'ALL_PRODUCT_NAMES' ||
    t === 'ALL_FIRSTENROLL' ||
    t === 'NEO-PLATFORM' ||
    t === 'PLATFORM-WIDE' ||
    t === 'discount-programs'
  ) {
    return true;
  }
  if (t.slice(-1) === '*') return true;
  if (/-ALL$/i.test(t)) return true;
  if (/^all-/i.test(t)) return true;
  return false;
}

function listedOn(plan, platform) {
  return (
    Array.isArray(plan.listed_on) && plan.listed_on.indexOf(platform) !== -1
  );
}

function tokenMatchesPlanId(token, planId) {
  if (token === planId) return true;
  if (token.slice(-1) === '*') {
    return planId.indexOf(token.slice(0, -1)) === 0;
  }
  if (token.indexOf('..') !== -1) {
    return expandRangeToken(token).indexOf(planId) !== -1;
  }
  return false;
}

function planMatchesToken(plan, token) {
  const t = cleanToken(token);
  if (!t || !plan || !plan.plan_id) return false;
  if (t === 'ALL' || t === 'MULTI' || t === 'ALL_PRODUCT_NAMES') return true;
  if (t === 'ALL_ADDONS') return Boolean(plan.is_addon);
  if (t === 'discount-programs') {
    return plan.product_type === 'discount_program';
  }
  if (t === 'ALL_FIRSTENROLL' || t === 'PLATFORM-WIDE') {
    return listedOn(plan, 'firstenroll');
  }
  if (t === 'NEO-PLATFORM') return listedOn(plan, 'neo');
  if (/-ALL$/i.test(t)) {
    const stem = t.replace(/-ALL$/i, '');
    return plan.plan_id === stem || plan.plan_id.indexOf(stem + '-') === 0;
  }
  if (/^all-/i.test(t)) {
    const slug = t.slice(4);
    return plan.plan_id === slug || plan.plan_id.indexOf(slug + '-') === 0;
  }
  return tokenMatchesPlanId(t, plan.plan_id);
}

function familyPrefix(token) {
  const t = cleanToken(token);
  const dash = t.lastIndexOf('-');
  if (dash <= 0) return '';
  return t.slice(0, dash + 1);
}

function aliasToken(token) {
  const t = cleanToken(token);
  if (!t) return t;
  if (/UNREGISTERED/i.test(t)) return t;
  const colon = t.indexOf('::');
  if (colon > 0) return t.slice(0, colon);
  if (/\d\+$/.test(t)) return t.slice(0, -1) + '-plus';
  return t;
}

function plusTierSlug(token) {
  const aliased = aliasToken(token);
  if (/^\d+-plus$/.test(aliased)) return aliased;
  return '';
}

function planHasPlusTier(plan, slug) {
  if (!plan || !plan.plan_id || !slug) return false;
  const id = plan.plan_id;
  return id === slug || id.slice(-(slug.length + 1)) === '-' + slug;
}

function resolveShorthandTokens(tokens, idSet) {
  const list = Array.isArray(tokens) ? tokens : [];
  const ids = idSet || new Set();
  const out = [];
  let prefix = '';
  for (let i = 0; i < list.length; i++) {
    const token = list[i];
    const aliased = aliasToken(token);
    const known =
      ids.has(token) ||
      ids.has(aliased) ||
      isClassWildcard(token) ||
      token.slice(-1) === '*' ||
      token.indexOf('..') !== -1;
    if (known) {
      out.push(ids.has(aliased) && aliased !== token ? aliased : token);
      if (
        !isClassWildcard(token) &&
        token.slice(-1) !== '*' &&
        token.indexOf('::') === -1
      ) {
        const nextPrefix = familyPrefix(ids.has(token) ? token : aliased);
        if (nextPrefix) prefix = nextPrefix;
      }
      continue;
    }
    if (prefix && ids.has(prefix + token)) {
      out.push(prefix + token);
      continue;
    }
    if (prefix && ids.has(prefix + aliased)) {
      out.push(prefix + aliased);
      continue;
    }
    const slug = plusTierSlug(token);
    if (slug && !prefix) {
      let any = false;
      ids.forEach(function (id) {
        if (id === slug || id.slice(-(slug.length + 1)) === '-' + slug) {
          any = true;
        }
      });
      if (any) {
        out.push(aliased);
        continue;
      }
    }
    out.push(token);
  }
  return out;
}

function recordTokens(record) {
  if (Array.isArray(record.plan_ids) && record.plan_ids.length) {
    const out = [];
    for (let i = 0; i < record.plan_ids.length; i++) {
      const parts = splitPlanTokens(record.plan_ids[i]);
      for (let j = 0; j < parts.length; j++) out.push(parts[j]);
    }
    return out;
  }
  return splitPlanTokens(record.plan_id);
}

function recordApplies(record, plan) {
  const tokens = recordTokens(record);
  if (!tokens.length) return { matches: false, portfolio: false };
  let matches = false;
  let portfolio = false;
  let prefix = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const aliased = aliasToken(token);
    if (isClassWildcard(token)) portfolio = true;
    if (planMatchesToken(plan, token) || planMatchesToken(plan, aliased)) {
      matches = true;
    }
    if (prefix) {
      if (
        planMatchesToken(plan, prefix + token) ||
        planMatchesToken(plan, prefix + aliased)
      ) {
        matches = true;
      }
    }
    const slug = plusTierSlug(token);
    if (slug) {
      if (prefix) {
        if (plan.plan_id === prefix + slug) matches = true;
      } else if (planHasPlusTier(plan, slug)) {
        matches = true;
        portfolio = true;
      }
    }
    if (
      !isClassWildcard(token) &&
      token.slice(-1) !== '*' &&
      token.indexOf('::') === -1 &&
      !plusTierSlug(token)
    ) {
      const nextPrefix = familyPrefix(token);
      if (nextPrefix) prefix = nextPrefix;
    }
  }
  return { matches: matches, portfolio: portfolio };
}

function unregisteredTokens(records, registryPlans, kind) {
  const plans = Array.isArray(registryPlans) ? registryPlans : [];
  const idSet = new Set(
    plans.map(function (plan) {
      return plan.plan_id;
    })
  );
  const list = Array.isArray(records) ? records : [];
  const seen = new Set();
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const record = list[i];
    const tokens = resolveShorthandTokens(recordTokens(record), idSet);
    const recordId = record.compliance_id || record.gap_id || null;
    for (let t = 0; t < tokens.length; t++) {
      const token = tokens[t];
      let matched = false;
      const slug = plusTierSlug(token);
      for (let p = 0; p < plans.length; p++) {
        if (planMatchesToken(plans[p], token)) {
          matched = true;
          break;
        }
        if (slug && planHasPlusTier(plans[p], slug)) {
          matched = true;
          break;
        }
      }
      if (matched) continue;
      const key = kind + '|' + recordId + '|' + token;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        kind: kind,
        record_id: recordId,
        plan_id: token
      });
    }
  }
  out.sort(function (a, b) {
    const k = String(a.kind).localeCompare(String(b.kind));
    if (k !== 0) return k;
    const r = String(a.record_id || '').localeCompare(
      String(b.record_id || '')
    );
    if (r !== 0) return r;
    return String(a.plan_id).localeCompare(String(b.plan_id));
  });
  return out;
}

function parseSourceRef(record) {
  const url =
    record && record.url != null && record.url !== '' ? String(record.url) : '';
  const raw = String((record && record.SOURCE) || '');
  let src = null;
  let pg = null;
  let sec = '';
  const srcMatch = raw.match(/sources?\s+(\d+)/i);
  if (srcMatch) src = Number(srcMatch[1]);
  const pageMatch = raw.match(/pages?\s+(\d+)/i);
  if (pageMatch) pg = Number(pageMatch[1]);
  if (raw) {
    const commaParts = raw.split(',');
    if (commaParts.length >= 3) {
      sec = commaParts.slice(2).join(',').trim();
    } else if (pageMatch) {
      const idx = raw.toLowerCase().indexOf(pageMatch[0].toLowerCase());
      sec = raw
        .slice(idx + pageMatch[0].length)
        .replace(/^[\s,;:-]+/, '')
        .trim();
    } else if (commaParts.length === 2) {
      sec = commaParts[1].trim();
    }
  }
  return { src: src, pg: pg, sec: sec, url: url };
}

function mapFactClass(record) {
  const raw = String((record && record.fact_class) || '');
  if (FACT_CLASSES.has(raw)) return raw;
  if (record && record.VERIFIED_FACT) return 'verified_plan_fact';
  return 'internal_interpretation';
}

function mapComplianceRisk(record, portfolio) {
  const doNotSay = String(
    (record && (record.WHAT_NOT_TO_SAY || record.do_not_say)) ||
      (record && !record.VERIFIED_FACT && record.agent_action_required) ||
      ''
  );
  const risk = {
    risk_id: record && record.compliance_id ? String(record.compliance_id) : '',
    verified_fact: String(
      (record && (record.VERIFIED_FACT || record.finding)) || ''
    ),
    source: parseSourceRef(record || {}),
    could_misstate: String(
      (record && record.WHAT_AN_AGENT_COULD_MISSTATE) || ''
    ),
    safe_wording: String(
      (record && record.SAFE_CLIENT_FACING_EXPLANATION) || ''
    ),
    do_not_say: doNotSay,
    verify_before_saying: String((record && record.VERIFY_BEFORE_SAYING) || ''),
    fact_class: mapFactClass(record),
    severity: String((record && record.severity) || '')
  };
  if (portfolio) risk.scope = 'PORTFOLIO';
  return risk;
}

function gapBlocksStatement(record) {
  const status = String((record && record.status) || '');
  if (/^CLOSED/i.test(status)) return false;
  if (record && record.result === 'NOT_FOUND_IN_SOURCE') return true;
  if (record && BLOCKING_GAP_CATEGORIES.has(record.category)) return true;
  const missing = String((record && record.what_is_missing) || '');
  if (/^Nothing missing/i.test(missing)) return false;
  if (
    /does not state|does not contain|no document|not in Drive|NOT_FOUND_IN_SOURCE/i.test(
      missing
    )
  ) {
    return true;
  }
  return false;
}

function mapOpenGap(record) {
  const field = String((record && record.field) || '');
  const unknown = String(
    (record &&
      (record.what_is_missing || record.question || record.note || '')) ||
      ''
  );
  return {
    gap_id: record && record.gap_id ? String(record.gap_id) : '',
    field: field,
    what_is_unknown: unknown,
    blocks_statement: gapBlocksStatement(record)
  };
}

function uniqueSortedStrings(values) {
  const set = new Set();
  for (let i = 0; i < values.length; i++) {
    const value = String(values[i] || '').trim();
    if (value) set.add(value);
  }
  return Array.from(set).sort();
}

function attachToProfile(profile, plan, complianceRecords, gapRecords) {
  const risks = [];
  const list = Array.isArray(complianceRecords) ? complianceRecords : [];
  for (let i = 0; i < list.length; i++) {
    const applied = recordApplies(list[i], plan);
    if (!applied.matches) continue;
    risks.push(mapComplianceRisk(list[i], applied.portfolio));
  }
  risks.sort(function (a, b) {
    return String(a.risk_id).localeCompare(String(b.risk_id));
  });

  const gaps = [];
  const gapList = Array.isArray(gapRecords) ? gapRecords : [];
  for (let i = 0; i < gapList.length; i++) {
    const applied = recordApplies(gapList[i], plan);
    if (!applied.matches) continue;
    gaps.push(mapOpenGap(gapList[i]));
  }
  gaps.sort(function (a, b) {
    return String(a.gap_id).localeCompare(String(b.gap_id));
  });

  profile.compliance_risks = risks;
  profile.open_gaps = gaps;
  profile.do_not_say = uniqueSortedStrings(
    risks.map(function (risk) {
      return risk.do_not_say;
    })
  );
  return profile;
}

function summarizeAttachment(profiles) {
  let withRisks = 0;
  let withBlockingGaps = 0;
  const list = Array.isArray(profiles) ? profiles : [];
  for (let i = 0; i < list.length; i++) {
    const profile = list[i];
    if (
      Array.isArray(profile.compliance_risks) &&
      profile.compliance_risks.length
    ) {
      withRisks += 1;
    }
    const gaps = Array.isArray(profile.open_gaps) ? profile.open_gaps : [];
    let blocking = false;
    for (let g = 0; g < gaps.length; g++) {
      if (gaps[g].blocks_statement) {
        blocking = true;
        break;
      }
    }
    if (blocking) withBlockingGaps += 1;
  }
  return {
    profilesWithComplianceRisks: withRisks,
    profilesWithBlockingGaps: withBlockingGaps
  };
}

module.exports = {
  cleanToken,
  splitPlanTokens,
  expandRangeToken,
  isClassWildcard,
  planMatchesToken,
  aliasToken,
  plusTierSlug,
  recordTokens,
  resolveShorthandTokens,
  recordApplies,
  unregisteredTokens,
  parseSourceRef,
  mapComplianceRisk,
  gapBlocksStatement,
  mapOpenGap,
  attachToProfile,
  summarizeAttachment
};
