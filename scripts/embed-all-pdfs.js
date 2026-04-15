/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

const ROOT = path.resolve(__dirname, '..');
const KB_DIR = path.join(ROOT, 'knowledge_base');
const MAP_PATH = path.join(ROOT, 'js', 'plan-pdf-map.js');

const CHUNK_SIZE_TOKENS = 500;
const CHUNK_OVERLAP_TOKENS = 50;

function requiredEnv(name) {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error('Missing required env var: ' + name);
  }
  return String(v).trim();
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/**
 * Normalize problematic text patterns that can break Postgres/Supabase
 * JSON/string parsing (e.g. invalid \u escape sequences, control chars).
 */
function sanitizeForSupabaseText(input) {
  let s = String(input == null ? '' : input);
  // Replace literal \u sequences that are not valid 4-hex escapes.
  s = s.replace(/\\u(?![0-9a-fA-F]{4})/g, '\\\\u');
  // Drop ASCII control chars except tab/newline/carriage return.
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ' ');
  // Remove lone surrogate halves.
  s = s.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, '');
  s = s.replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '');
  return s;
}

/**
 * Approximate token chunking using whitespace-separated tokens.
 * Keeps ~500-token chunks with 50-token overlap.
 */
function chunkTextApprox(text, size, overlap) {
  const tokens = normalizeText(text).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const out = [];
  const step = Math.max(1, size - overlap);
  for (let start = 0; start < tokens.length; start += step) {
    const end = Math.min(tokens.length, start + size);
    const chunkTokens = tokens.slice(start, end);
    if (!chunkTokens.length) continue;
    out.push({
      index: out.length,
      tokenCountApprox: chunkTokens.length,
      text: chunkTokens.join(' ')
    });
    if (end >= tokens.length) break;
  }
  return out;
}

async function embedChunk(openai, chunkText) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunkText
  });
  const item = res && res.data && res.data[0];
  if (!item || !item.embedding) {
    throw new Error('Embedding API returned no vector');
  }
  return item.embedding;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout(promise, ms, label) {
  let timer = null;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(label + ' timed out after ' + ms + 'ms'));
    }, ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function embedChunkWithRetry(openai, chunkText, opts) {
  const maxAttempts = opts && opts.maxAttempts ? opts.maxAttempts : 3;
  const timeoutMs = opts && opts.timeoutMs ? opts.timeoutMs : 30000;
  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await withTimeout(
        embedChunk(openai, chunkText),
        timeoutMs,
        'OpenAI embedding call'
      );
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) {
        console.warn(
          'Retry attempt ' +
            attempt +
            '/' +
            maxAttempts +
            ' failed: ' +
            (err && err.message ? err.message : String(err))
        );
        await sleep(750);
      }
    }
  }
  throw lastErr || new Error('Embedding failed after retries');
}

function loadPdfMap() {
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error('Missing map file: ' + MAP_PATH);
  }
  // Support both:
  // 1) Node export map: { "file.pdf": { planId, ... } }
  // 2) Browser map file that sets window.CHA_PLAN_PDF_MAP.
  let required = null;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    required = require(MAP_PATH);
  } catch (e) {
    required = null;
  }
  if (required && typeof required === 'object' && !Array.isArray(required)) {
    const keys = Object.keys(required);
    if (keys.length && typeof required[keys[0]] === 'object') {
      return required;
    }
  }

  const src = fs.readFileSync(MAP_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: path.basename(MAP_PATH) });
  const planList = sandbox.window && sandbox.window.CHA_PLAN_PDF_MAP;
  if (!Array.isArray(planList)) {
    throw new Error('Invalid map format in ' + MAP_PATH);
  }
  const out = {};
  planList.forEach((entry) => {
    if (!entry || !entry.planId || !Array.isArray(entry.pdfFiles)) return;
    entry.pdfFiles.forEach((pdfFile) => {
      if (!pdfFile) return;
      out[pdfFile] = {
        planId: entry.planId,
        planName: entry.planName || entry.planId,
        category: entry.category || entry.type || 'plan',
        aliases: Array.isArray(entry.aliases) ? entry.aliases : []
      };
    });
  });
  if (!Object.keys(out).length) {
    throw new Error('No usable PDF mappings found in ' + MAP_PATH);
  }
  return out;
}

function getPdfFiles() {
  if (!fs.existsSync(KB_DIR)) {
    throw new Error('knowledge_base folder not found: ' + KB_DIR);
  }
  return fs
    .readdirSync(KB_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .sort();
}

async function upsertChunk(supabase, row) {
  // Keep columns minimal and explicit per request: chunks + embeddings in plan_chunks.
  const safeChunkText = sanitizeForSupabaseText(row.chunkText);
  const safePlanName = row.planName ? sanitizeForSupabaseText(row.planName) : null;
  const safeSourcePdf = sanitizeForSupabaseText(row.sourcePdf);
  const safeCategory = row.category ? sanitizeForSupabaseText(row.category) : null;
  const safeAliases = Array.isArray(row.aliases)
    ? row.aliases.map((a) => sanitizeForSupabaseText(a))
    : [];

  const payload = {
    plan_id: row.planId,
    plan_name: safePlanName,
    category: safeCategory,
    aliases: safeAliases.length ? safeAliases : null,
    source_pdf: safeSourcePdf,
    chunk_index: row.chunkIndex,
    chunk_text: safeChunkText,
    token_count_approx: row.tokenCountApprox,
    embedding: row.embedding,
    metadata: {
      category: safeCategory,
      aliases: safeAliases,
      source_pdf: safeSourcePdf,
      plan_id: row.planId
    }
  };

  const { error } = await supabase.from('plan_chunks').insert(payload);
  if (error) {
    throw new Error('Supabase insert failed: ' + error.message);
  }
}

async function processPdf({
  fileName,
  planMeta,
  supabase,
  openai
}) {
  const abs = path.join(KB_DIR, fileName);
  const started = Date.now();
  console.log('\n------------------------------------------------------------');
  console.log('PDF:', fileName);
  console.log('Plan ID:', planMeta.planId);
  console.log('Plan Name:', planMeta.planName || '');
  if (planMeta.category) console.log('Category:', planMeta.category);
  if (Array.isArray(planMeta.aliases) && planMeta.aliases.length) {
    console.log('Aliases:', planMeta.aliases.join(', '));
  }
  console.log('Reading + parsing PDF...');

  const buf = fs.readFileSync(abs);
  const parsed = await pdfParse(buf);
  const text = normalizeText(parsed.text || '');

  if (!text) {
    console.log('No extractable text. Skipping.');
    return { pdf: fileName, chunks: 0, inserted: 0, skipped: true };
  }

  const chunks = chunkTextApprox(text, CHUNK_SIZE_TOKENS, CHUNK_OVERLAP_TOKENS);
  console.log(
    'Pages:',
    parsed.numpages || '?',
    '| Chars:',
    text.length,
    '| Chunks:',
    chunks.length
  );

  let inserted = 0;
  let failedChunks = 0;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const label = '[' + (i + 1) + '/' + chunks.length + ']';
    process.stdout.write(
      label + ' embedding + insert... '
    );

    try {
      const embedding = await embedChunkWithRetry(openai, chunk.text, {
        maxAttempts: 3,
        timeoutMs: 30000
      });
      await upsertChunk(supabase, {
        planId: planMeta.planId,
        planName: planMeta.planName || null,
        category: planMeta.category || null,
        aliases: Array.isArray(planMeta.aliases) ? planMeta.aliases : [],
        sourcePdf: fileName,
        chunkIndex: chunk.index,
        chunkText: chunk.text,
        tokenCountApprox: chunk.tokenCountApprox,
        embedding
      });
      inserted++;
      console.log('ok');
      // Small pacing delay between chunk writes to reduce rate spikes.
      await sleep(500);
    } catch (err) {
      console.log('failed');
      failedChunks++;
      console.error(
        'Chunk ' +
          chunk.index +
          ' failed for ' +
          fileName +
          ' after retries: ' +
          (err && err.message ? err.message : String(err)) +
          ' (continuing)'
      );
      await sleep(500);
    }
  }

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    'Completed',
    fileName,
    '- inserted',
    inserted,
    'chunks, failed',
    failedChunks,
    'in',
    elapsed + 's'
  );
  return {
    pdf: fileName,
    chunks: chunks.length,
    inserted,
    failedChunks,
    skipped: false
  };
}

async function main() {
  const supabaseUrl = requiredEnv('SUPABASE_URL');
  const supabaseKey =
    (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim() ||
    (process.env.SUPABASE_ANON_KEY || '').trim();
  if (!supabaseKey) {
    throw new Error(
      'Missing Supabase key: set SUPABASE_SERVICE_ROLE_KEY (recommended) or SUPABASE_ANON_KEY'
    );
  }
  const openAiApiKey = requiredEnv('OPENAI_API_KEY');

  const pdfMap = loadPdfMap();
  const targetPdf = process.env.TARGET_PDF
    ? String(process.env.TARGET_PDF).trim()
    : '';
  const pdfFiles = getPdfFiles().filter((f) => !targetPdf || f === targetPdf);

  console.log('Embedding job started at', new Date().toISOString());
  console.log('knowledge_base PDFs:', pdfFiles.length);
  if (targetPdf) console.log('TARGET_PDF filter:', targetPdf);
  console.log('Chunk target:', CHUNK_SIZE_TOKENS, 'overlap:', CHUNK_OVERLAP_TOKENS);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const openai = new OpenAI({ apiKey: openAiApiKey });

  let totalInserted = 0;
  let totalChunks = 0;
  let totalFailedChunks = 0;
  let processed = 0;
  const missingMap = [];

  for (const fileName of pdfFiles) {
    const meta = pdfMap[fileName];
    if (!meta || !meta.planId) {
      console.warn('\nSkipping (no map entry with planId):', fileName);
      missingMap.push(fileName);
      continue;
    }

    const res = await processPdf({
      fileName,
      planMeta: meta,
      supabase,
      openai
    });

    processed++;
    totalInserted += res.inserted;
    totalChunks += res.chunks;
    totalFailedChunks += res.failedChunks || 0;
  }

  console.log('\n============================================================');
  console.log('Embedding job complete.');
  console.log('PDFs discovered:', pdfFiles.length);
  console.log('PDFs processed:', processed);
  console.log('Chunks prepared:', totalChunks);
  console.log('Rows inserted:', totalInserted);
  console.log('Chunks failed:', totalFailedChunks);
  if (missingMap.length) {
    console.log('Missing map entries (' + missingMap.length + '):');
    missingMap.forEach((f) => console.log(' -', f));
  }
}

main().catch((err) => {
  console.error('\nEmbedding job failed.');
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});
