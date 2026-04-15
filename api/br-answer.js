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
    if (/^STATUS:/i.test(l)) out.status = l.replace(/^STATUS:\s*/i, '').trim().toUpperCase();
    if (/^FACT:/i.test(l)) out.fact = l.replace(/^FACT:\s*/i, '').trim();
    if (/^SAY THIS:/i.test(l)) out.sayThis = l.replace(/^SAY THIS:\s*/i, '').trim();
    if (/^SOURCE:/i.test(l)) out.source = l.replace(/^SOURCE:\s*/i, '').trim();
  });

  if (!/^(COVERED|NOT COVERED|VERIFY|PARTIAL)$/.test(out.status)) out.status = 'VERIFY';
  if (!out.fact) out.fact = '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]';
  if (!out.source) out.source = 'Plan PDF / POLICY_DOCS';
  return out;
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
  var planId = body.planId ? String(body.planId).trim() : null;
  var matchCount = clamp(body.matchCount, 1, 8, 5);
  var matchThreshold = clamp(body.matchThreshold, 0, 1, 0.65);
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
    rpcArgs: null
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
      debug.rpcArgs = {
        query_embedding_len: Array.isArray(emb) ? emb.length : 0,
        match_threshold: matchThreshold,
        match_count: matchCount,
        preferred_plan_id: planId || null
      };
      return supabase.rpc(debug.rpcFunction, {
        query_embedding: emb,
        match_threshold: matchThreshold,
        match_count: matchCount,
        preferred_plan_id: planId || null
      });
    })
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
      if (!chunks.length) {
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
      return null;
    })
    .then(function () {
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
        'You are a health insurance benefits assistant for Central Health Advisors.\n' +
        'Use ONLY PLAN CONTEXT. Never guess. If unsupported, use VERIFY.\n' +
        'Allowed STATUS values: COVERED, NOT COVERED, VERIFY, PARTIAL.\n' +
        'FORMAT EXACTLY:\n' +
        'STATUS: ...\nFACT: ...\nSAY THIS: ...\nSOURCE: ...\n\n' +
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

      return res.status(200).json({
        requestId: requestId,
        status: parsed.status,
        fact: parsed.fact,
        sayThis: parsed.sayThis,
        source: parsed.source,
        scope: scope,
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
      return res.status(200).json({
        requestId: requestId,
        status: 'VERIFY',
        fact: '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]',
        sayThis:
          'Let me verify this in the plan document so I give you the exact compliant answer.',
        source: 'Plan PDF / POLICY_DOCS',
        scope: 'none',
        citations: [],
        fallbackReason: err && err.message ? err.message : 'Unknown error',
        debug: {
          stage: debug.stage,
          function: debug.rpcFunction,
          args: debug.rpcArgs
        }
      });
    });
};
