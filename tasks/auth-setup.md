# CHA Auth Setup — Claude Code Instructions

## What's already built (do NOT recreate these)

- `login.html` — CHA branded login page
- `js/auth.js` — session guard, logout, user display
- `vercel.json` — Vercel routing config
- `index.html` — already has `<script src="js/auth.js">` as first script

## Step 1 — Create Free Clerk Account

1. Go to https://clerk.com and sign up free
2. Create a new application — name it "CHA Sales Command Center"
3. Choose "Email + Password" as the sign-in method
4. From the Clerk dashboard, copy:
   - **Publishable Key** (starts with `pk_live_` or `pk_test_`)
   - **Frontend API URL** (looks like `xxx.clerk.accounts.dev`)

## Step 2 — Update auth.js and login.html with real Clerk keys

In `js/auth.js`, replace TWO placeholders:

- Line with `var CLERK_PK = 'CLERK_PUBLISHABLE_KEY'` → replace with real key
- Line with `s.src = 'https://[your-clerk-frontend-api]...'` → replace with real Frontend API URL

In `login.html`, replace TWO placeholders (same values):

- `data-clerk-publishable-key="CLERK_PUBLISHABLE_KEY"` → real key
- `src="https://[your-clerk-frontend-api]..."` → real URL

## Step 3 — Deploy to Vercel (free)

Run in the repo root:

```
npm install -g vercel
vercel --prod
```

Follow prompts — link to GitHub account, select the cha-sales-tool repo.
Vercel will give you a URL like `cha-sales-tool.vercel.app`

## Step 4 — Add Agents in Clerk Dashboard

In Clerk dashboard → Users → Add user:

- Enter agent email + set a temporary password
- Agent logs in and sets their own password

To make someone a Manager:

- Clerk dashboard → Users → click agent → Metadata → Public metadata
- Add: `{ "role": "manager" }`

## Step 5 — After deployment, run these checks

1. `node --check js/auth.js` → must pass
2. Visit the Vercel URL — should redirect to login.html
3. Sign in with a test account → should land on the tool
4. Logout button (bottom of sidebar) → should go back to login

## Step 6 — Commit and push

```
git add js/auth.js login.html vercel.json index.html
git commit -m "Add Clerk auth, login page, Vercel deploy config"
git push origin main
```

## Cost Summary

- Clerk: FREE (up to 10,000 monthly active users)
- Vercel: FREE (hobby tier — unlimited static sites)
- GitHub private repo: FREE
- Total: $0/month

## Notes

- Do NOT add defer or async to auth.js script tag
- Do NOT move auth.js — it must be first script loaded
- The CLERK_PUBLISHABLE_KEY is safe to expose in frontend code (it's designed for this)
- Groq API key stays in localStorage per agent — not in code
