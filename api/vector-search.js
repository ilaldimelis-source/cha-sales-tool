const OpenAI = require('openai');

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(payload);
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (_err) {
      return {};
    }
  }
  return req.body;
}

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method Not Allowed' });
  }

  var supabaseUrl = process.env.SUPABASE_URL || '';
  var supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
  var openaiKey = process.env.OPENAI_API_KEY || '';
  if (!supabaseUrl || !supabaseAnonKey || !openaiKey) {
    return json(res, 500, {
      error:
        'SUPABASE_URL, SUPABASE_ANON_KEY, and OPENAI_API_KEY must be configured.'
    });
  }

  var body = parseBody(req);
  var question = String(body.question || '').trim();
  var planId = body.planId ? String(body.planId).trim() : null;
  var topK = Math.max(1, Math.min(Number(body.topK || 5), 10));
  if (!question) return json(res, 400, { error: 'question is required' });

  var openai = new OpenAI({ apiKey: openaiKey });
  openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question
  })
    .then(function (emb) {
      var questionEmbedding = emb.data[0].embedding;
      return fetch(supabaseUrl + '/rest/v1/rpc/match_plan_chunks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: 'Bearer ' + supabaseAnonKey
        },
        body: JSON.stringify({
          query_embedding: questionEmbedding,
          match_count: topK,
          filter_plan_id: planId || null
        })
      });
    })
    .then(function (sbRes) {
      if (!sbRes.ok) {
        return sbRes.text().then(function (errText) {
          throw new Error('Supabase vector RPC failed: ' + errText.slice(0, 400));
        });
      }
      return sbRes.json();
    })
    .then(function (rows) {
      json(res, 200, {
        chunks: Array.isArray(rows) ? rows : [],
        query: question,
        planId: planId,
        topK: topK
      });
    })
    .catch(function (err) {
      json(res, 500, {
        error: 'Vector search request failed',
        details: err && err.message ? err.message : String(err)
      });
    });
};
