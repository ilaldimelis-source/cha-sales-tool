# CLAUDE.md — Agent Sales Tool

## Project Reference
- Full architecture, stack, routes, models, components: see `PROJECT_NOTES.md`. If it doesn't exist, create one.
- Always read `tasks/lessons.md` at the start of every session before doing anything
- Key stack: Needs to be defined

## Core Principles
- **Simplicity first:** Minimal code impact. Only touch what's necessary.
- **No laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **No regressions:** Before finishing, ask "did I break anything adjacent to this change?"

## Workflow

### 1. Planning
- For any non-trivial task (3+ steps or architectural decisions): write a plan to `tasks/todo.md` first
- Check in with the user before starting implementation
- If something goes sideways mid-task: STOP, re-plan, check in — don't keep pushing

### 2. Verification
- Never mark a task complete without proving it works
- Run tests, check logs, demonstrate correctness
- Ask: "Would a staff engineer approve this?"

### 3. Self-Improvement
- After any correction: update `tasks/lessons.md` with the pattern and a rule to prevent recurrence
- Review `tasks/lessons.md` at session start — it contains hard-won project-specific knowledge

### 4. Bug Fixing
- Fix bugs autonomously using logs, errors, and failing tests
- Don't ask for hand-holding — diagnose and resolve

### 5. Elegance Check (non-trivial changes only)
- Pause and ask: "Is there a more elegant solution?"
- If a fix feels hacky: implement the clean version instead
- Skip for simple, obvious fixes — don't over-engineer

### Execution Rule
- Wait for approval before making changes

## Task Tracking
- Plans → `tasks/todo.md` (checkable items, updated as you go)
- Lessons → `tasks/lessons.md` (updated after every correction)
- Summarize changes at each major step
