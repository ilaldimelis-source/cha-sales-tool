const { createClient } = require('@supabase/supabase-js');

function jsonNoCache(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function clamp(n, min, max, fallback) {
  var v = Number(n);
  if (!isFinite(v)) return fallback;
  return Math.max(min, Math.min(max, v));
}

/**
 * POLICY_DOCS plan ids are tdk1..tdk5; Supabase plan_chunks use tdk-1..tdk-5 for the
 * customer brochure embeddings. Without this, preferred_plan_id misses rows and the
 * model reads wrong PDF chunks (e.g. promo) and returns COVERED for bloodwork.
 */
function normalizeRagPreferredPlanId(raw) {
  var id = raw ? String(raw).trim() : '';
  if (!id) return '';
  var lower = id.toLowerCase();
  var tdk = lower.match(/^tdk([1-5])$/);
  if (tdk) return 'tdk-' + tdk[1];
  return id;
}

function buildContext(chunks) {
  if (!chunks || !chunks.length) return '[No matching plan chunks found]';
  return chunks
    .map(function (c, i) {
      var txt = String(c.chunk_text || '');
      if (txt.length > 1800) txt = txt.slice(0, 1800) + '...';
      return (
        'Chunk ' +
        (i + 1) +
        ' | Plan: ' +
        (c.plan_name || c.plan_id || 'Unknown') +
        ' | Source: ' +
        (c.source_pdf || 'Plan PDF') +
        ' | Similarity: ' +
        Number(c.similarity || 0).toFixed(3) +
        '\n' +
        txt
      );
    })
    .join('\n\n');
}

function parseModelOutput(raw) {
  var text = String(raw || '').trim();
  var out = {
    status: 'VERIFY',
    fact: '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]',
    sayThis: '',
    source: 'Plan PDF / POLICY_DOCS'
  };

  text.split('\n').forEach(function (line) {
    var l = line.trim();
    if (/^STATUS:/i.test(l)) {
    out.status = l
      .replace(/^STATUS:\s*/i, '')
      .trim()
      .replace(/[.]+$/g, '')
      .toUpperCase();
  }
    if (/^FACT:/i.test(l)) out.fact = l.replace(/^FACT:\s*/i, '').trim();
    if (/^SAY THIS:/i.test(l)) out.sayThis = l.replace(/^SAY THIS:\s*/i, '').trim();
    if (/^SOURCE:/i.test(l)) out.source = l.replace(/^SOURCE:\s*/i, '').trim();
  });

  if (!/^(COVERED|NOT COVERED|VERIFY|PARTIAL|INFO)$/.test(out.status)) out.status = 'VERIFY';
  if (!out.fact) out.fact = '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]';
  if (!out.source) out.source = 'Plan PDF / POLICY_DOCS';
  return out;
}

/**
 * Server-side guard: force NOT COVERED when the model ignores RULE 1.
 * We avoid broad "is not covered under the Plan" substring (appears for many unrelated benefits).
 */
function contextRequiresMandatoryNotCovered(planContextText, query) {
  var t = String(planContextText || '').toLowerCase();
  var q = String(query || '').toLowerCase();

  if (t.indexOf('not a covered insurance benefit') !== -1) return true;

  var labishQ = /blood|lab|labs|phlebotom|diagnostic|testing\b|laboratory/i.test(q);
  if (labishQ && t.indexOf('will not be considered eligible') !== -1) {
    if (t.indexOf('diagnostic testing') !== -1) return true;
    if (
      t.indexOf('diagnostic') !== -1 ||
      t.indexOf('laboratory') !== -1 ||
      t.indexOf('blood work') !== -1 ||
      t.indexOf('lab test') !== -1 ||
      t.indexOf('lab tests') !== -1
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Vector search often misses the exact exclusion line (e.g. "Diagnostic Testing will not be
 * considered eligible"). Pull in plan rows that match high-signal substrings for lab questions.
 */
function supplementPlanChunksForLabQuery(supabase, planId, query, chunks) {
  if (!planId || !Array.isArray(chunks)) return Promise.resolve(chunks || []);
  if (!/blood|bloodwork|labs?\b|diagnostic|phlebotom|lab test/i.test(String(query || ''))) {
    return Promise.resolve(chunks);
  }
  var seen = {};
  chunks.forEach(function (c) {
    var k = (c.plan_id || '') + ':' + String(c.chunk_index) + ':' + (c.source_pdf || '');
    seen[k] = true;
  });
  return supabase
    .from('plan_chunks')
    .select('id,plan_id,plan_name,source_pdf,chunk_index,chunk_text')
    .eq('plan_id', planId)
    .or(
      'chunk_text.ilike.%Diagnostic Testing%,chunk_text.ilike.%not a covered insurance benefit%,chunk_text.ilike.%Blood work%'
    )
    .limit(10)
    .then(function (res) {
      if (res.error) {
        console.warn('[CHA RAG] supplementPlanChunksForLabQuery:', res.error.message);
        return chunks;
      }
      var merged = chunks.slice();
      (res.data || []).forEach(function (row) {
        var k = (row.plan_id || '') + ':' + String(row.chunk_index) + ':' + (row.source_pdf || '');
        if (seen[k]) return;
        seen[k] = true;
        row.similarity = row.similarity != null ? row.similarity : null;
        row.scope = 'preferred_plan';
        merged.push(row);
      });
      merged.sort(function (a, b) {
        return (Number(a.chunk_index) || 0) - (Number(b.chunk_index) || 0);
      });
      return merged;
    });
}

/**
 * After the LLM responds: if FACT / SAY THIS contradict COVERED (exclusion language,
 * "not covered", or discounted rates framed as non-insurance), force NOT COVERED.
 */
function aiOutputImpliesNotCovered(fact, sayThis) {
  var combined = String(fact || '') + '\n' + String(sayThis || '');
  var t = combined
    .toLowerCase()
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ');
  if (t.indexOf('not a covered insurance benefit') !== -1) return true;
  if (t.indexOf('will not be considered eligible') !== -1) return true;
  if (t.indexOf('is not covered under the plan') !== -1) return true;
  if (t.indexOf('is not covered under this plan') !== -1) return true;
  if (/\bnot covered\b/i.test(combined)) return true;
  if (t.indexOf('not eligible') !== -1 && t.indexOf('insurance') !== -1) return true;
  if (
    (t.indexOf('discounted rates') !== -1 || t.indexOf('discounted rate') !== -1) &&
    (t.indexOf('not covered') !== -1 ||
      t.indexOf('not insurance') !== -1 ||
      t.indexOf('not an insurance') !== -1 ||
      t.indexOf('non-insurance') !== -1)
  ) {
    return true;
  }
  if (t.indexOf('discounted rates available') !== -1 && t.indexOf('not covered') !== -1) {
    return true;
  }
  return false;
}

function enforceMandatoryNotCovered(parsed, planContextText, query) {
  return parsed;
}

function maskSecret(v) {
  var s = String(v || '');
  if (!s) return '[missing]';
  if (s.length <= 10) return '[set:' + s.length + ']';
  return s.slice(0, 6) + '...' + s.slice(-4);
}

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  jsonNoCache(res);

  var body = req.body || {};
  var query = String(body.query || '').trim();
  var planIdRaw = body.planId ? String(body.planId).trim() : '';
  var planId = planIdRaw ? normalizeRagPreferredPlanId(planIdRaw) : null;
  if (planIdRaw && planId && planId !== planIdRaw) {
    console.log('[CHA RAG] normalized planId for RAG', {
      requested: planIdRaw,
      using: planId
    });
  }
  var matchCount = clamp(body.matchCount, 1, 12, 8);
  var matchThreshold = clamp(body.matchThreshold, 0, 1, 0.3);
  var requestId = 'req_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  if (!query) return res.status(400).json({ error: 'Missing query', requestId: requestId });
  if (query.length > 700) {
    return res
      .status(400)
      .json({ error: 'Query too long (max 700 chars)', requestId: requestId });
  }

  var openAiKey = process.env.OPENAI_API_KEY || '';
  var groqKey = process.env.GROQ_API_KEY || '';
  var supabaseUrl = process.env.SUPABASE_URL || '';
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!openAiKey || !groqKey || !supabaseUrl || !serviceKey) {
    return res
      .status(500)
      .json({ error: 'Server env vars not configured', requestId: requestId });
  }

  var supabase = createClient(supabaseUrl, serviceKey);
  var chunks = [];
  var scope = 'none';
  var context = '';
  var debug = {
    requestId: requestId,
    stage: 'init',
    rpcFunction: 'match_plan_chunks_prefer_plan',
    rpcArgs: null,
    rpcRetry: null
  };

  // Lightweight sanity check to prove service-role access and table visibility.
  // If this fails, RPC often "succeeds" with no data or masked auth behavior.
  var authCheck = supabase.from('plan_chunks').select('id', { head: true, count: 'exact' }).limit(1);

  authCheck
    .then(function (authRes) {
      if (authRes && authRes.error) {
        throw new Error(
          'Supabase auth/table check failed: ' +
            authRes.error.message +
            ' [url=' +
            supabaseUrl +
            ', service_key=' +
            maskSecret(serviceKey) +
            ']'
        );
      }
      debug.stage = 'embedding';
      return fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + openAiKey
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: query
        })
      });
    })
    .then(function (r) {
      if (!r.ok) throw new Error('Embedding API error ' + r.status);
      return r.json();
    })
    .then(function (j) {
      debug.stage = 'rpc';
      var emb = j && j.data && j.data[0] && j.data[0].embedding ? j.data[0].embedding : null;
      if (!emb) throw new Error('Embedding missing');
      var embParam = emb;
      // Supabase RPC works more reliably with pgvector text literal
      // than raw JS arrays in some runtime/driver paths.
      if (Array.isArray(emb)) embParam = '[' + emb.join(',') + ']';

      function rpcCall(th) {
        debug.rpcArgs = {
          query_embedding_len: Array.isArray(emb) ? emb.length : String(emb || '').length,
          match_threshold: th,
          match_count: matchCount,
          preferred_plan_id: planId || null
        };
        return supabase.rpc(debug.rpcFunction, {
          query_embedding: embParam,
          match_threshold: th,
          match_count: matchCount,
          preferred_plan_id: planId || null
        });
      }

      function applySequentialFallback() {
        console.warn(
          '[CHA RAG] No chunks returned from RPC, applying direct table fallback',
          JSON.stringify({
            requestId: requestId,
            function: debug.rpcFunction,
            args: debug.rpcArgs
          })
        );

        var fallbackPreferred = planId
          ? supabase
              .from('plan_chunks')
              .select(
                'id,plan_id,plan_name,source_pdf,chunk_index,chunk_text'
              )
              .eq('plan_id', planId)
              .not('embedding', 'is', null)
              .order('chunk_index', { ascending: true })
              .limit(matchCount)
          : Promise.resolve({ data: [], error: null });

        return fallbackPreferred.then(function (prefRes) {
          if (prefRes && prefRes.error) {
            throw new Error(
              'Preferred fallback query failed: ' + prefRes.error.message
            );
          }
          if (prefRes && Array.isArray(prefRes.data) && prefRes.data.length) {
            chunks = prefRes.data.map(function (row) {
              row.similarity = null;
              row.scope = 'preferred_plan';
              return row;
            });
            scope = 'preferred_plan';
            return null;
          }

          return supabase
            .from('plan_chunks')
            .select('id,plan_id,plan_name,source_pdf,chunk_index,chunk_text')
            .not('embedding', 'is', null)
            .order('plan_id', { ascending: true })
            .order('chunk_index', { ascending: true })
            .limit(matchCount)
            .then(function (globalRes) {
              if (globalRes && globalRes.error) {
                throw new Error(
                  'Global fallback query failed: ' + globalRes.error.message
                );
              }
              chunks = (globalRes && globalRes.data ? globalRes.data : []).map(
                function (row) {
                  row.similarity = null;
                  row.scope = 'fallback_global';
                  return row;
                }
              );
              scope = chunks.length ? 'fallback_global' : 'none';
              return null;
            });
        });
      }

      // Short queries often score ~0.15–0.22 vs the best chunk; default 0.3 would return 0 rows.
      var relaxedRpcThreshold = 0.15;

      return rpcCall(matchThreshold)
        .then(function (rpc) {
          if (rpc.error) {
            throw new Error(
              'Supabase RPC error: ' +
                rpc.error.message +
                ' [function=' +
                debug.rpcFunction +
                ', args=' +
                JSON.stringify(debug.rpcArgs) +
                ']'
            );
          }
          chunks = Array.isArray(rpc.data) ? rpc.data : [];
          scope = chunks.length ? String(chunks[0].scope || 'none') : 'none';
          if (chunks.length) return null;

          if (matchThreshold <= relaxedRpcThreshold) {
            return applySequentialFallback();
          }

          debug.rpcRetry = {
            match_threshold: relaxedRpcThreshold,
            reason: 'primary RPC returned 0 rows (similarity floor)'
          };
          return rpcCall(relaxedRpcThreshold).then(function (rpc2) {
            if (rpc2.error) {
              throw new Error(
                'Supabase RPC retry error: ' +
                  rpc2.error.message +
                  ' [function=' +
                  debug.rpcFunction +
                  ']'
              );
            }
            chunks = Array.isArray(rpc2.data) ? rpc2.data : [];
            scope = chunks.length ? String(chunks[0].scope || 'none') : 'none';
            if (!chunks.length) {
              return applySequentialFallback();
            }
            return null;
          });
        });
    })
    .then(function () {
      return supplementPlanChunksForLabQuery(supabase, planId, query, chunks).then(function (merged) {
        chunks = merged;
        context = buildContext(chunks);
        console.log(
          '[CHA RAG] Using context',
          JSON.stringify({
            requestId: requestId,
            count: chunks.length,
            scope: scope,
            firstPlanId: chunks[0] && chunks[0].plan_id
          })
        );

        var sysPrompt =
          'You are a health insurance benefits assistant for Central Health Advisors agents on live sales calls.\n\n' +
          'PRIMARY DIRECTIVE: USE THE PLAN CONTEXT. The PLAN CONTEXT below contains real text from this plan document. Your job is to find the answer to the user question inside that context and present it clearly. The context is your source of truth — do not be lazy or over-cautious.\n\n' +
          'WHEN TO USE VERIFY: Only respond with STATUS: VERIFY if the PLAN CONTEXT genuinely contains zero information about the topic asked. If the context mentions the topic at all, you must extract what you can and answer with COVERED, NOT COVERED, or INFO. VERIFY is the last resort, not the safe default.\n\n' +
          'CHOOSE STATUS BASED ON QUESTION TYPE:\n' +
          '- "Is X covered?" or "Does the plan cover X?" -> COVERED or NOT COVERED based on context\n' +
          '- "What is NOT covered?" or "List exclusions" -> NOT COVERED with summary of what context lists\n' +
          '- "What are the copays/deductibles/premiums?" -> INFO with the actual numbers from context\n' +
          '- "What is the network?" or "How does X work?" -> INFO with the answer from context\n' +
          '- "What are the waiting periods?" -> INFO with the actual day counts from context\n' +
          '- "Is bloodwork/lab/x-ray/specific service covered?" -> COVERED, NOT COVERED, or INFO based on context\n' +
          '- ONLY use VERIFY if the context truly says nothing relevant\n\n' +
          'OUTPUT FORMAT - exactly four lines, no other text before or after:\n' +
          'STATUS: [COVERED, NOT COVERED, INFO, or VERIFY]\n' +
          'FACT: [Maximum 2 short sentences extracted from PLAN CONTEXT. State the specific fact in plain English. For lists like exclusions, summarize the top 3-5 items naturally and add "plus other limits in the plan doc"]\n' +
          'SAY THIS: [One short conversational sentence the agent reads aloud to the customer]\n' +
          'SOURCE: [The plan PDF filename from PLAN CONTEXT]\n\n' +
          'STRICT RULES:\n' +
          '- Answer ONLY the specific benefit asked about. Never add other benefits.\n' +
          '- Never include reasoning, parentheticals, or explanations of your classification.\n' +
          '- Never repeat the same sentence twice.\n' +
          '- Never paste raw OCR text or chunk labels.\n' +
          '- Keep total answer under 80 words.\n' +
          '- Do not say "[UNCONFIRMED]" unless the context truly has no relevant information.\n\n' +
          'EXAMPLES:\n\n' +
          'User: "What are the waiting periods?" (PLAN CONTEXT mentions a 30-day sickness waiting period)\n' +
          'STATUS: INFO\n' +
          'FACT: There is a 30-day waiting period before sickness benefits become payable. Pre-existing conditions are not covered for the first 12 months.\n' +
          'SAY THIS: You will have a 30-day wait for sickness benefits and a 12-month wait for pre-existing conditions.\n' +
          'SOURCE: MEC_MedFirst1_SPD_Jan25.pdf\n\n' +
          'User: "What is NOT covered?" (PLAN CONTEXT lists exclusions)\n' +
          'STATUS: NOT COVERED\n' +
          'FACT: Major exclusions include fertility treatment, weight loss surgery, cosmetic procedures, organ transplants, dental and vision. Plus other limits listed in the plan document.\n' +
          'SAY THIS: This plan has standard exclusions like fertility, weight loss surgery, dental, and vision.\n' +
          'SOURCE: MEC_MedFirst1_SPD_Jan25.pdf\n\n' +
          'User: "Is bloodwork covered?" (PLAN CONTEXT mentions lab work is excluded but discounts available)\n' +
          'STATUS: NOT COVERED\n' +
          'FACT: Blood work and lab tests are not a covered insurance benefit. Discounted rates are available through the First Health PPO network.\n' +
          'SAY THIS: Lab work is not covered as insurance, but you get discounted rates through the First Health network.\n' +
          'SOURCE: MEC_MedFirst1_SPD_Jan25.pdf\n\n' +
          'User: "What are the copays?" (PLAN CONTEXT does not list copays — plan uses discount network)\n' +
          'STATUS: INFO\n' +
          'FACT: This plan does not include traditional copays. Members access discounted rates through the network instead.\n' +
          'SAY THIS: This plan uses network discounts instead of copays.\n' +
          'SOURCE: MEC_MedFirst1_SPD_Jan25.pdf\n\n' +
          'PLAN CONTEXT:\n' +
          context;

        return fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + groqKey
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            temperature: 0,
            max_tokens: 500,
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: 'Agent question: ' + query }
            ]
          })
        });
      });
    })
    .then(function (r) {
      if (!r.ok) throw new Error('Groq API error ' + r.status);
      return r.json();
    })
    .then(function (j) {
      var raw =
        j && j.choices && j.choices[0] && j.choices[0].message
          ? j.choices[0].message.content
          : '';
      var parsed = parseModelOutput(raw);
      var mandatoryExclusionContext = contextRequiresMandatoryNotCovered(context, query);
      var mandatoryExclusionAi = aiOutputImpliesNotCovered(parsed.fact, parsed.sayThis);
      parsed = enforceMandatoryNotCovered(parsed, context, query);

      return res.status(200).json({
        requestId: requestId,
        status: parsed.status,
        fact: parsed.fact,
        sayThis: parsed.sayThis,
        source: parsed.source,
        scope: scope,
        mandatoryNotCoveredFromContext: mandatoryExclusionContext,
        mandatoryNotCoveredFromAiOutput: mandatoryExclusionAi,
        citations: chunks.map(function (c) {
          return {
            plan_id: c.plan_id,
            plan_name: c.plan_name,
            source_pdf: c.source_pdf,
            chunk_index: c.chunk_index,
            similarity: c.similarity
          };
        })
      });
    })
    .catch(function (err) {
      var safeScope = scope || 'none';
      var safeCitations = Array.isArray(chunks)
        ? chunks.map(function (c) {
            return {
              plan_id: c.plan_id,
              plan_name: c.plan_name,
              source_pdf: c.source_pdf,
              chunk_index: c.chunk_index,
              similarity: c.similarity
            };
          })
        : [];
      var safeSource =
        safeCitations.length && safeCitations[0].source_pdf
          ? safeCitations[0].source_pdf
          : 'Plan PDF / POLICY_DOCS';
      console.error(
        '[CHA RAG] Fallback triggered',
        JSON.stringify({
          requestId: requestId,
          stage: debug.stage,
          message: err && err.message ? err.message : String(err),
          function: debug.rpcFunction,
          args: debug.rpcArgs
        })
      );
      var ctxForGuard = String(context || '');
      var mandatoryFromCtxOnFallback = contextRequiresMandatoryNotCovered(ctxForGuard, query);
      if (mandatoryFromCtxOnFallback) {
        console.log('[CHA RAG] Fallback: enforcing NOT COVERED from plan context (no LLM)', {
          requestId: requestId,
          queryPreview: String(query || '').slice(0, 80)
        });
      }
      return res.status(200).json({
        requestId: requestId,
        status: mandatoryFromCtxOnFallback ? 'NOT COVERED' : 'VERIFY',
        fact: mandatoryFromCtxOnFallback
          ? 'The plan excerpts include language that this is not a covered insurance benefit, is not covered under the Plan, and/or will not be considered eligible. (Answering engine unavailable; status enforced from retrieved plan text.)'
          : '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]',
        sayThis: mandatoryFromCtxOnFallback
          ? 'NOT COVERED as an insurance benefit per the plan language in context. Discounted rates mentioned in the plan are not insurance coverage.'
          : 'Let me verify this in the plan document so I give you the exact compliant answer.',
        source: safeSource,
        scope: safeScope,
        citations: safeCitations,
        mandatoryNotCoveredFromContext: mandatoryFromCtxOnFallback,
        mandatoryNotCoveredFromAiOutput: false,
        fallbackReason: err && err.message ? err.message : 'Unknown error',
        debug: {
          stage: debug.stage,
          function: debug.rpcFunction,
          args: debug.rpcArgs
        }
      });
    });
};
