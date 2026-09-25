(function () {
  var INDEX_PATH = '/knowledge_base/extracted/index.json';
  var PLAN_BASE_PATH = '/knowledge_base/extracted/plans/';
  var CACHE_LIMIT = 4;

  var _indexPromise = null;
  var _planCache = {};
  var _planCacheOrder = [];

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/\([^)]*\)/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getIndex() {
    if (_indexPromise) return _indexPromise;
    _indexPromise = fetch(INDEX_PATH)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load extracted index');
        return res.json();
      })
      .catch(function (err) {
        _indexPromise = null;
        throw err;
      });
    return _indexPromise;
  }

  function _cachePlan(planId, payload) {
    _planCache[planId] = payload;
    var idx = _planCacheOrder.indexOf(planId);
    if (idx !== -1) _planCacheOrder.splice(idx, 1);
    _planCacheOrder.push(planId);
    while (_planCacheOrder.length > CACHE_LIMIT) {
      var oldest = _planCacheOrder.shift();
      delete _planCache[oldest];
    }
  }

  function loadPlanContent(planId) {
    if (!planId) return Promise.reject(new Error('planId required'));
    if (_planCache[planId]) return Promise.resolve(_planCache[planId]);
    var path = PLAN_BASE_PATH + encodeURIComponent(planId) + '.json';
    return fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load plan document');
        return res.json();
      })
      .then(function (payload) {
        _cachePlan(planId, payload);
        return payload;
      });
  }

  function tokenizeQuestion(query) {
    var normalized = normalizeText(query);
    var terms = normalized.split(' ');
    var out = [];
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (t && t.length > 2) out.push(t);
    }
    return out;
  }

  function resolvePlan(query, activePlan, options) {
    var normalized = normalizeText(query);
    var aliasIndex = window.CHA_PLAN_ALIAS_INDEX || {};
    var preferredPlanId =
      options && options.preferredPlanId ? String(options.preferredPlanId) : '';
    var directId = activePlan && activePlan.id ? String(activePlan.id) : '';

    if (normalized) {
      if (aliasIndex[normalized]) {
        return {
          status: 'resolved',
          planId: aliasIndex[normalized],
          method: 'exact_alias'
        };
      }

      var keys = Object.keys(aliasIndex);
      var matches = [];
      for (var i = 0; i < keys.length; i++) {
        var alias = keys[i];
        if (!alias || alias.length < 3) continue;
        if (normalized.indexOf(alias) !== -1) matches.push(aliasIndex[alias]);
      }
      matches = matches.filter(function (value, index, arr) {
        return arr.indexOf(value) === index;
      });
      if (matches.length === 1) {
        return {
          status: 'resolved',
          planId: matches[0],
          method: 'alias_contains'
        };
      }
      if (matches.length > 1) {
        return { status: 'ambiguous', candidates: matches };
      }
    }

    if (preferredPlanId) {
      return {
        status: 'resolved',
        planId: preferredPlanId,
        method: 'preferred_plan'
      };
    }
    if (directId)
      return { status: 'resolved', planId: directId, method: 'active_plan' };
    if (!normalized) return { status: 'no_plan' };
    return { status: 'no_plan' };
  }

  function validatePlanForLoad(planId) {
    var meta = getPlanMeta(planId);
    if (!meta) {
      return {
        ok: false,
        reason: 'missing_plan',
        planId: planId || '',
        planName: ''
      };
    }
    if (meta.status === 'excluded' || meta.status === 'missing_pdf') {
      return {
        ok: false,
        reason: 'not_ready',
        planId: meta.planId,
        planName: meta.planName || ''
      };
    }
    return {
      ok: true,
      reason: 'ok',
      planId: meta.planId,
      planName: meta.planName || ''
    };
  }

  function getPlanMeta(planId) {
    var plans = window.CHA_PLAN_PDF_MAP || [];
    for (var i = 0; i < plans.length; i++) {
      if (plans[i].planId === planId) return plans[i];
    }
    return null;
  }

  function retrieveTopChunks(planPayload, question, maxChunks) {
    var chunks = (planPayload && planPayload.chunks) || [];
    if (!chunks.length) return [];
    var terms = tokenizeQuestion(question);
    if (!terms.length) return chunks.slice(0, maxChunks || 8);

    var scored = chunks.map(function (chunk) {
      var text = chunk.normalizedText || normalizeText(chunk.text || '');
      var score = 0;
      for (var t = 0; t < terms.length; t++) {
        if (text.indexOf(terms[t]) !== -1) score += 1;
      }
      if (
        /copay|deductible|coinsurance|exclusion|pre existing|waiting period|rx|drug|emergency|hospital/.test(
          text
        )
      ) {
        score += 0.3;
      }
      return { chunk: chunk, score: score };
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });
    return scored
      .filter(function (entry) {
        return entry.score > 0;
      })
      .slice(0, maxChunks || 8)
      .map(function (entry) {
        return entry.chunk;
      });
  }

  function listAvailablePlanNames() {
    var plans = window.CHA_PLAN_PDF_MAP || [];
    var names = [];
    for (var i = 0; i < plans.length; i++) {
      if (plans[i].status === 'ready') names.push(plans[i].planName);
    }
    names.sort();
    return names;
  }

  window.CHA_PDF_KNOWLEDGE_RUNTIME = {
    normalizeText: normalizeText,
    getIndex: getIndex,
    getPlanMeta: getPlanMeta,
    loadPlanContent: loadPlanContent,
    resolvePlan: resolvePlan,
    validatePlanForLoad: validatePlanForLoad,
    retrieveTopChunks: retrieveTopChunks,
    listAvailablePlanNames: listAvailablePlanNames
  };
})();
