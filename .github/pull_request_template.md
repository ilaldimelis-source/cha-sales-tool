## What changed

<!-- One or two plain sentences. -->

## Source + date

<!-- Every plan fact: where it came from and when you saw it.
     Rank: 1 live e-sign, 2 live NEO / FirstEnroll / Premier portal, 3 carrier PDF (newest first).
     Not sources: repo data, ledger, old docs, scripts, sheets, TalentLMS, memory. -->

- Source:
- Date seen:

## Plans touched

-

## Checklist

- [ ] Source + date listed for every plan fact
- [ ] Script text changed only where the owner approved each line word for word
- [ ] Compliance OK (no "covered", "PPO", "$0/free" or MEC claims without a source; right billing name, underwriter, network)
- [ ] No client names or details anywhere
- [ ] `npm run check`, `format:check`, `lint` (0 errors) and `verify` pass
- [ ] Fact check passes (0 errors)
- [ ] sw2.js CACHE_NAME bumped by exactly 1 and matching `?v=` updated
- [ ] Vercel preview link opened and checked (On Call, Scripts, Plans)
- [ ] Not merged without the owner's APPROVE - MERGE

## Roll back

Vercel instant rollback (Deployments > previous > Instant Rollback) or `npm run revert`.
