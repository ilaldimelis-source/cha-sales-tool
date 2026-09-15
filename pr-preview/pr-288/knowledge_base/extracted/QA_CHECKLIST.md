# PDF Knowledge QA Checklist

Run this checklist before enabling the PDF-grounded chat flow in production.

## Mapping and Artifact Validation
- [ ] Run `npm run build:pdf-knowledge`.
- [ ] Run `node scripts/verify-pdf-knowledge.js`.
- [ ] Confirm `knowledge_base/extracted/index.json` exists and includes all expected plan IDs.
- [ ] Confirm excluded plans are marked `excluded` (SigmaCare, Pinnacle Critical Care 1-4, MyChoice Low/Mid/High).

## Plan Resolution Behavior
- [ ] Ask a question with a selected active plan and verify it resolves that plan.
- [ ] Ask with explicit plan mention (no active plan) and verify alias matching works (e.g., `GHDP-1`, `GoodHealth 1`).
- [ ] Ask with no plan mention and no active plan and verify response is: `Which plan are you asking about?`.
- [ ] Ask for a non-existent plan and verify available-plan fallback is returned.

## Grounded Answer Behavior
- [ ] Ask a known covered benefit question and confirm answer comes from the target plan document.
- [ ] Ask a known exclusion question and confirm exclusion language is returned from document excerpts.
- [ ] Ask a detail not in document and verify fallback: `That specific detail is not in the [Plan] document.`.
- [ ] Confirm model temperature is `0` in outgoing payload.

## Performance Checks
- [ ] Verify initial page load does not fetch all plan JSON files.
- [ ] Verify only the selected plan JSON is fetched during a question.
- [ ] Ask two follow-up questions on same plan and verify cache prevents redundant fetches.
- [ ] Switch plans and verify new plan JSON is fetched while prior plan remains cached.

## Failure Handling
- [ ] Temporarily remove API key and confirm key-missing guidance appears.
- [ ] Simulate API failure and verify graceful fallback error appears.
- [ ] Temporarily rename a plan JSON file and verify missing-document fallback is shown.
