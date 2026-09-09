# RAG Rollout Runbook

This is the fastest safe path to roll out server-side RAG for Benefits Reference.

## 1) Run SQL in Supabase

Execute the SQL block provided by the assistant before deployment.

## 2) Configure Vercel environment variables

Required:

- `OPENAI_API_KEY`
- `GROQ_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3) Run setup preflight

```bash
npm run rag:setup
```

Optional smoke test against a live URL:

```bash
npm run rag:setup -- --url https://YOUR-DEPLOYMENT-URL
```

## 4) Deploy

Deploy with your normal workflow.

## 5) Run verification suite

```bash
npm run rag:verify -- --url https://YOUR-DEPLOYMENT-URL
```

## 6) If verify fails

- Confirm all four environment variables are present on the deployed environment.
- Confirm Supabase function `match_plan_chunks_prefer_plan` exists.
- Confirm `plan_chunks` has embedded rows.
- Retry:

```bash
npm run rag:verify -- --url https://YOUR-DEPLOYMENT-URL
```
