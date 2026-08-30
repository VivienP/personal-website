# Global 400 Font Weight Design

## Goal

Make `400` the minimum base font weight throughout the website. No source element may request Tailwind's `font-light` utility or an explicit `font-weight: 300`.

## Scope

- Add `font-normal` to the global `body` rule in `src/index.css`.
- Replace every `font-light` occurrence under `src/` with `font-normal`.
- Preserve intentional heavier weights such as `font-medium`, `font-semibold`, `font-bold`, and the `strong { font-weight: 700; }` rule.
- Do not change font families, sizes, line heights, colours, spacing, or article copy.
- Do not add an automated test, as explicitly requested by the user.
- Do not stage, commit, merge, push, deploy, or modify unrelated files.

## Verification

- Search the complete source tree for `font-light`, `font-weight: 300`, and JavaScript-style `fontWeight: 300`; all must return zero typography occurrences.
- Build the 31 prerendered routes and run ESLint.
- Use the running worktree dev server to inspect computed font weights on the homepage, the laboratory-command article, and a project page. Representative body text and metadata must compute to `400`; headings and strong text may remain heavier.
