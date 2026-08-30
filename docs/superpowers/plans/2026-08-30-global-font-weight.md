# Global 400 Font Weight Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove every 300-weight typography override and make 400 the explicit site-wide base weight.

**Architecture:** The global body rule establishes the minimum weight, while component and page classes express the same rule explicitly instead of relying on inherited defaults. Existing medium and bold emphasis remains unchanged.

**Tech Stack:** React 19, Tailwind CSS 4, Vite, ESLint, in-app browser verification.

**Authorization note:** The user explicitly waived a new automated test. Local source edits, build, lint, source searches, and browser verification are authorized; Git and deployment actions are excluded.

---

### Task 1: Make 400 the explicit global base

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update the body rule**

Change:

```css
@apply bg-cream text-primary antialiased font-sans;
```

to:

```css
@apply bg-cream text-primary antialiased font-sans font-normal;
```

### Task 2: Remove every 300-weight utility

**Files:**
- Modify: every file under `src/` returned by `rg -l "font-light" src`

- [ ] **Step 1: Perform one mechanical replacement**

Replace every exact `font-light` token with `font-normal`. Do not modify `font-medium`, `font-semibold`, `font-bold`, durations such as `duration-300`, dimensions, data values, or article prose.

- [ ] **Step 2: Verify the source invariant**

Run searches for `font-light`, `font-weight: 300`, and `fontWeight: 300` under `src/`. Expected: zero typography matches.

### Task 3: Verify build, lint, and computed styles

**Files:**
- Verify the modified source tree and generated `dist/` output

- [ ] **Step 1: Build all routes**

Run the existing production build. Expected: 31 prerendered pages and exit code 0.

- [ ] **Step 2: Run ESLint**

Run the existing lint script. Expected: exit code 0.

- [ ] **Step 3: Inspect browser-computed weights**

On the homepage, `/journal/when-a-lab-command-says-succeeded`, and `/projects/epibudget`, inspect representative body copy, subtitle or metadata, and references. Expected: each formerly light element computes to `font-weight: 400`, with no Vite error overlay or console error.

- [ ] **Step 4: Stop at the publication boundary**

Report the exact source count, build result, lint result, and browser evidence. Do not stage, commit, merge, push, deploy, or stop the running worktree server.
