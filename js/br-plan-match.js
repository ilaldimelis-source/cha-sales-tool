// br-plan-match.js — plan-name matcher against data/plan-aliases.json
// Match family_tokens + variant_tokens only. Never benefit text.
(function (global) {
  'use strict';

  var ALIAS_URL = 'data/plan-aliases.json?v=1788810779609';
  var _cache = null;
  var _loading = null;

  function isDigitToken(tok) {
    return /^[0-9]+$/.test(tok);
  }

  function tokenize(raw) {
    if (raw == null) return [];
    var s = String(raw);
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
    var seen = {};
    var out = [];
    var i;
    var t;
    for (i = 0; i < list.length; i++) {
      t = list[i];
      if (!t || seen[t]) continue;
      seen[t] = true;
      out.push(t);
    }
    return out;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var al = a.length;
    var bl = b.length;
    if (!al) return bl;
    if (!bl) return al;
    if (al > bl + 2 || bl > al + 2) return 3;
    var prev = [];
    var cur;
    var i;
    var j;
    var cost;
    var del;
    var ins;
    var sub;
    var m;
    for (j = 0; j <= bl; j++) prev[j] = j;
    for (i = 1; i <= al; i++) {
      cur = [i];
      for (j = 1; j <= bl; j++) {
        cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        del = prev[j] + 1;
        ins = cur[j - 1] + 1;
        sub = prev[j - 1] + cost;
        m = del < ins ? del : ins;
        cur[j] = m < sub ? m : sub;
      }
      prev = cur;
    }
    return prev[bl];
  }

  function allowedEdits(tok) {
    if (isDigitToken(tok)) return 0;
    if (tok.length <= 4) return 0;
    if (tok.length >= 6) return 2;
    return 1;
  }

  function tokensMatch(a, b) {
    if (a === b) return true;
    if (isDigitToken(a) || isDigitToken(b)) return false;
    var max = allowedEdits(a);
    var maxB = allowedEdits(b);
    if (maxB < max) max = maxB;
    if (max <= 0) return false;
    return levenshtein(a, b) <= max;
  }

  function none() {
    return { status: 'NONE' };
  }

  function candidate(plan) {
    return { planId: plan.plan_id, displayName: plan.display_name };
  }

  function sortCandidates(list) {
    list.sort(function (a, b) {
      return String(a.planId).localeCompare(String(b.planId));
    });
    return list;
  }

  function sequencesEqual(a, b) {
    if (a.length !== b.length) return false;
    var i;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function consumeFamily(familyTokens, qTokens) {
    var used = [];
    var i;
    var j;
    var k;
    var acc;
    var ft;
    var matched = 0;
    for (i = 0; i < qTokens.length; i++) used[i] = false;
    for (i = 0; i < familyTokens.length; i++) {
      ft = familyTokens[i];
      var found = false;
      for (j = 0; j < qTokens.length; j++) {
        if (used[j]) continue;
        if (tokensMatch(ft, qTokens[j])) {
          used[j] = true;
          found = true;
          break;
        }
      }
      if (!found) {
        for (j = 0; j < qTokens.length; j++) {
          if (used[j]) continue;
          acc = qTokens[j];
          if (acc === ft) {
            used[j] = true;
            found = true;
            break;
          }
          for (k = j + 1; k < qTokens.length; k++) {
            if (used[k]) break;
            acc += qTokens[k];
            if (acc === ft) {
              used[j] = true;
              for (var u = j; u <= k; u++) used[u] = true;
              found = true;
              break;
            }
            if (acc.length > ft.length) break;
          }
          if (found) break;
        }
      }
      if (found) matched += 1;
    }
    return {
      matched: matched,
      all: familyTokens.length > 0 && matched === familyTokens.length,
      used: used
    };
  }

  function leftoverTokens(qTokens, used) {
    var out = [];
    var i;
    for (i = 0; i < qTokens.length; i++) {
      if (!used[i]) out.push(qTokens[i]);
    }
    return out;
  }

  function variantHitCount(variantTokens, pool) {
    var hits = 0;
    var i;
    var j;
    var vt;
    var found;
    for (i = 0; i < variantTokens.length; i++) {
      vt = variantTokens[i];
      found = false;
      for (j = 0; j < pool.length; j++) {
        if (vt === pool[j]) {
          found = true;
          break;
        }
      }
      if (found) hits += 1;
    }
    return hits;
  }

  function planTotalScore(plan, qTokens) {
    var ft = plan.family_tokens || [];
    var cons = consumeFamily(ft, qTokens);
    if (cons.matched <= 0) return null;
    var pool = leftoverTokens(qTokens, cons.used);
    var vt = plan.variant_tokens || [];
    var hits = variantHitCount(vt, pool);
    var full = vt.length > 0 && hits === vt.length;
    var total =
      (cons.all ? 10000 : 0) +
      cons.matched * 1000 +
      (full ? 100 + vt.length : hits);
    if (vt.length === 0 && cons.all && hits === 0) total += 10;
    return { total: total, plan: plan };
  }

  function exactNameHits(qSeq) {
    var hits = [];
    var i;
    var plan;
    var seen = {};
    for (i = 0; i < _cache.length; i++) {
      plan = _cache[i];
      if (
        sequencesEqual(qSeq, tokenize(plan.display_name)) ||
        sequencesEqual(qSeq, tokenize(plan.plan_id))
      ) {
        if (!seen[plan.plan_id]) {
          seen[plan.plan_id] = true;
          hits.push(plan);
        }
      }
    }
    return hits;
  }

  function brLoadPlanAliases() {
    if (_cache) {
      return Promise.resolve(_cache);
    }
    if (_loading) return _loading;
    _loading = fetch(ALIAS_URL)
      .then(function (res) {
        if (!res || !res.ok) {
          throw new Error('plan aliases load failed');
        }
        return res.json();
      })
      .then(function (data) {
        _cache = data && data.length ? data : [];
        _loading = null;
        return _cache;
      })
      .catch(function () {
        _loading = null;
        _cache = null;
        return [];
      });
    return _loading;
  }

  function brMatchPlan(text) {
    if (!_cache || !_cache.length) return none();
    var qSeq = tokenize(text);
    if (!qSeq.length) return none();

    var exact = exactNameHits(qSeq);
    if (exact.length === 1) {
      return { status: 'EXACT', planId: exact[0].plan_id };
    }
    if (exact.length > 1) {
      var exactCands = [];
      var e;
      for (e = 0; e < exact.length; e++) exactCands.push(candidate(exact[e]));
      return { status: 'AMBIGUOUS', candidates: sortCandidates(exactCands) };
    }

    var qTokens = uniqueTokens(qSeq);

    var scored = [];
    var i;
    var row;
    var maxScore = 0;
    for (i = 0; i < _cache.length; i++) {
      row = planTotalScore(_cache[i], qTokens);
      if (row) {
        scored.push(row);
        if (row.total > maxScore) maxScore = row.total;
      }
    }

    if (!maxScore) return none();

    var top = [];
    for (i = 0; i < scored.length; i++) {
      if (scored[i].total === maxScore) top.push(scored[i].plan);
    }

    if (top.length === 1) {
      return { status: 'EXACT', planId: top[0].plan_id };
    }

    var tied = [];
    for (i = 0; i < top.length; i++) tied.push(candidate(top[i]));
    return { status: 'AMBIGUOUS', candidates: sortCandidates(tied) };
  }

  global.brLoadPlanAliases = brLoadPlanAliases;
  global.brMatchPlan = brMatchPlan;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        brLoadPlanAliases();
      });
    } else {
      brLoadPlanAliases();
    }
  }
})(typeof window !== 'undefined' ? window : this);
