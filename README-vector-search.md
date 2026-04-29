# Supabase Vector Search Setup (AI Chat)

This project now supports PDF vector search for AI Chat using:

- Supabase pgvector (`plan_chunks` table)
- OpenAI embeddings (`text-embedding-3-small`)
- Groq answer generation with top matching PDF chunks

## 1) Install dependencies

```bash
npm install
```

## 2) Create Supabase project (free tier)

1. Create a new project in Supabase.
2. In **Project Settings > API**, copy:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Add these env vars locally (for scripts) in `.env`:

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

## 3) Run one-time DB setup

Generate and validate setup:

```bash
node scripts/setup-supabase-vectors.js
```

Then run the generated SQL in Supabase SQL Editor:

```sql
-- file: scripts/supabase-vector-schema.sql
-- includes:
-- create extension vector
-- create table plan_chunks
-- ivfflat index
-- match_plan_chunks(...) RPC function
```

Run setup script again to confirm table is available.

## 4) Embed all plan PDFs

```bash
node scripts/embed-all-pdfs.js
```

What it does:

- Reads every PDF in `knowledge_base/`
- Maps PDF files to plan IDs from `js/plan-pdf-map.js`
- Chunks text to ~500-token segments with overlap
- Creates embeddings with OpenAI `text-embedding-3-small`
- Stores vectors in Supabase `plan_chunks`

## 5) Add env vars in Vercel

Set these in your Vercel project:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `GROQ_API_KEY` (already used by chat)

`/api/vector-search` reads these server-side and keeps keys out of browser code.

## 6) Runtime wiring added

- `api/vector-search.js`: embeds question + calls Supabase `match_plan_chunks`
- `js/vector-search.js`: browser client wrapper around `/api/vector-search`
- `js/chat.js`: now pulls top 5 vector chunks and sends excerpts to Groq

## 7) Test flow

1. Start app locally.
2. Open chat and ask:
   - `What's the ER copay for TDK 4?`
3. Expected behavior:
   - Query embedded via OpenAI (server endpoint)
   - Top 5 chunks fetched from Supabase
   - Groq answer grounded to those excerpts

If no results return, verify:

- `plan_chunks` contains rows
- `match_plan_chunks` function exists
- Vercel/local env vars are set
