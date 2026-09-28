/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const ROOT = path.join(__dirname, '..');
const OUT_SQL = path.join(__dirname, 'supabase-vector-schema.sql');

const REQUIRED = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];

const SQL = [
  'create extension if not exists vector;',
  '',
  'create table if not exists plan_chunks (',
  '  id serial primary key,',
  '  plan_id text,',
  '  plan_name text,',
  '  chunk_text text not null,',
  '  chunk_index int not null,',
  '  page_number int,',
  '  source_pdf text,',
  '  embedding vector(1536) not null',
  ');',
  '',
  'create index if not exists plan_chunks_embedding_idx',
  '  on plan_chunks using ivfflat (embedding vector_cosine_ops);',
  '',
  'create index if not exists plan_chunks_plan_id_idx',
  '  on plan_chunks(plan_id);',
  '',
  'create or replace function match_plan_chunks (',
  '  query_embedding vector(1536),',
  '  match_count int default 5,',
  '  filter_plan_id text default null',
  ')',
  'returns table (',
  '  id int,',
  '  plan_id text,',
  '  plan_name text,',
  '  chunk_text text,',
  '  chunk_index int,',
  '  page_number int,',
  '  source_pdf text,',
  '  similarity float',
  ')',
  'language sql stable',
  'as $$',
  '  select',
  '    c.id,',
  '    c.plan_id,',
  '    c.plan_name,',
  '    c.chunk_text,',
  '    c.chunk_index,',
  '    c.page_number,',
  '    c.source_pdf,',
  '    1 - (c.embedding <=> query_embedding) as similarity',
  '  from plan_chunks c',
  '  where filter_plan_id is null or c.plan_id = filter_plan_id',
  '  order by c.embedding <=> query_embedding',
  '  limit greatest(match_count, 1);',
  '$$;'
].join('\n');

function assertEnv() {
  const missing = REQUIRED.filter(function (k) {
    return !process.env[k];
  });
  if (missing.length) {
    throw new Error(
      'Missing required environment variables: ' + missing.join(', ')
    );
  }
}

function main() {
  assertEnv();
  fs.writeFileSync(OUT_SQL, SQL + '\n', 'utf8');
  console.log('Wrote SQL schema file:', path.relative(ROOT, OUT_SQL));

  const client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false }
    }
  );

  return client
    .from('plan_chunks')
    .select('id', { count: 'exact', head: true })
    .then(function (test) {
      if (test.error) {
        console.log('\nSupabase check: table/function not ready yet.');
        console.log(
          'Run scripts/supabase-vector-schema.sql in Supabase SQL Editor, then rerun this script.'
        );
        console.log('Supabase said:', test.error.message);
        process.exit(1);
      }

      console.log('\nSupabase check passed: plan_chunks is queryable.');
      console.log(
        'Next step: run `node scripts/embed-all-pdfs.js` after setting OPENAI_API_KEY.'
      );
    });
}

main().catch(function (err) {
  console.error(err.message || err);
  process.exit(1);
});
