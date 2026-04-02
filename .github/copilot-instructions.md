# GitHub Copilot instructions for CHA Command Center

This repository powers CHA Command Center, a dashboard for health insurance telesales agents.

## Core product goals
- Optimize for live call usage, fast scanning, and clarity under pressure.
- Improve readability before adding new complexity.
- Keep the UI clean, soft-luxury, modern, feminine-professional, and never cluttered.
- Favor simple HTML, CSS, and JavaScript over framework-heavy rewrites unless explicitly requested.

## Safety rules
- Preserve existing working behavior unless the task explicitly asks for logic changes.
- For large refactors, plan first, then change one section at a time.
- Prefer small, reversible edits.
- Do not rewrite the entire project to solve a local issue.
- If a user asks for changes in one tab, constrain edits to that tab and any shared styles it truly depends on.

## UI priorities
1. Typography and readability
2. Spacing and layout clarity
3. Scan speed for agents on live calls
4. Visual consistency across cards, tabs, badges, and content blocks
5. Responsive behavior without making desktop scanning worse

## Policy Reference requirements
- Prefer a left-side vertical pill tab layout with a focused right-side content panel.
- Present information in three agent-friendly sections when appropriate:
  - Dashboard
  - Internal Answer
  - Say This to Client
- Avoid dense walls of text.
- Break long content into smaller blocks or bullets without changing meaning.

## Training and Compliance requirements
- Break dense content into smaller cards.
- Use strong headings and short support text.
- Make compliance warnings easy to spot.
- Favor quick scanning over decorative layout.

## Data and content handling
- Do not invent benefit details.
- Keep insurance language accurate.
- If text comes from a source of truth, preserve meaning exactly.
- Surface uncertainty instead of guessing.

## Code style
- Keep code readable for a beginner.
- Prefer descriptive names and small helper functions.
- Add comments only where they reduce confusion.
- Avoid duplicated layout logic when a reusable helper is cleaner.

## Output expectations
When proposing changes:
- explain what is changing
- explain why it improves usability for a telesales agent
- keep edits scoped and production-safe
