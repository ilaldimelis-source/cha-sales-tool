# scripts/

Beginner-safe repo protection. Three small Node scripts, no new
dependencies, no background processes.

## Files

| File               | What it does                                                          |
| ------------------ | --------------------------------------------------------------------- |
| `verify.js`        | Read-only safety check. Runs before every commit/push.                |
| `diagnose.js`      | When verify fails, explains the root cause and the smallest safe fix. |
| `install-hooks.js` | Installs git hooks that run verify automatically.                     |

## Commands

```
npm run verify       # Run the safety check manually, any time
npm run diagnose     # Root-cause analysis when something looks broken
```

Hooks install automatically after `npm install` (via `postinstall`).
You can reinstall manually any time:

```
node scripts/install-hooks.js
```

## What verify checks

The verifier looks at your repo by **behavior and pattern**, not by
hard-coded file names. If you rename, split, or reorganize files
later, the checks still work.

1. **Syntax.** Every `.js` file in `js/` and `api/` must parse cleanly.
2. **Data.** Any file matching `js/plan-data*.js` is loaded in a sandbox
   and the resulting `POLICY_DOCS` global must:
   - be an array
   - be non-empty
   - contain objects with string `id` and `name`
   - not have duplicate `id` values
   - if a plan has `benefits`, each benefit's `items` must be an array
     (this is the exact bug that crashed the Benefits panel in PR #34)
3. **Registry.** Any file matching `plan-registry*.js` loads without error.
4. **Service worker.** Any top-level `sw.js` / `service-worker.js` has a
   non-trivial `CACHE_NAME` value.
5. **API functions.** Every `.js` file in `api/` (Vercel serverless) parses.

## What verify does NOT do

- It does not modify any file. Ever.
- It does not run your app or talk to the network.
- It does not run the full test suite. (Use `npm run test:e2e` for that.)
- It does not guarantee the live site works — only that the code is
  safe to commit. Post-deploy issues (service worker cache poisoning,
  Vercel propagation, etc.) are a separate concern.

## When a check fails

The output tells you:

- **what** broke (the check name)
- **where** it broke (file and often the line)
- **what to try next** (usually: open the file, fix the thing, re-run)

Run `npm run diagnose` for deeper root-cause analysis on the most
common failure modes (missing POLICY_DOCS, wrong benefit shape,
syntax errors, serverless function errors).

## Bypass (emergency only)

If you really need to commit or push without running the hook — for
example, during an incident when you know the hook is wrong — you can
bypass it once:

```
git commit --no-verify
git push --no-verify
```

Use sparingly. The hooks exist so broken code can't reach `main`.

## How this stays flexible

Every check auto-discovers files by pattern. Safe against:

- renaming `plan-data.js` → `policy-data.js`
- splitting `plan-data.js` into `plan-data.js` + `plan-data-extra.js`
- moving `sw.js` or renaming it to `service-worker.js`
- adding new serverless functions to `api/`
- merging or reorganizing utility files

If you add a genuinely new kind of critical data flow that the
verifier doesn't know about yet, add another `step(...)` block to
`verify.js`. The pattern is obvious from the existing steps.

## Files explicitly not touched by this protection system

These files are protected by separate project rules and the verifier
treats them as read-only subjects of its checks, not targets of its
enforcement:

- `js/chat.js` — "answer logic" is protected per CLAUDE.md
- `js/plan-data.js` — POLICY_DOCS data is protected per CLAUDE.md

Both are already in `.prettierignore` so they cannot be reformatted.
The verifier loads `plan-data.js` to check shape but never writes to it.
