# epibudget Editorial Figures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the epibudget article one responsive editorial figure system with numbered captions below each image and three concise embedded SVG diagrams.

**Architecture:** Extend the article-local `Figure` component with explicit `number`, `title`, and `description` fields, and make the image itself a direct full-size link. Replace each SVG as an independent static asset that uses the same palette, `Inter/Arial`, exactly two text sizes, and no minimum-width scrolling wrapper.

**Tech Stack:** React, React Router, Tailwind CSS, accessible SVG, Node test runner, ESLint, Vite prerender build.

---

### Task 1: Lock the editorial contract in tests

**Files:**
- Modify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Replace the old mobile-scroller contract with caption and SVG-system assertions**

Add a test that reads `src/articles/WhatShouldWeMeasureNext.jsx`, locates all four `<Figure>` calls, and requires:

```js
const expectedCaptions = [
    ['1', 'From target protein to experimental plate', 'epibudget scores complete variants, maps their interaction structure, and converts a fixed experimental budget into a ranked measurement plate.'],
    ['2', 'Interaction coefficients are defined by closed measurement loops', 'Pairwise and third-order coefficients are defined relative to WT-referenced families of measurements. An isolated combination cannot determine its own epistatic effect.'],
    ['3', 'Same candidates, different experimental plates', 'Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate.'],
    ['4', 'What masking dispersion adds to the v1 score', 'The ablation compares loop count alone with loop count weighted by ESM masking dispersion. Current evidence does not establish an additional benefit from the dispersion term.'],
];

for (const [number, title, description] of expectedCaptions) {
    assert.match(article, new RegExp(`number="${number}"`));
    assert.match(article, new RegExp(`title="${escapeRegex(title)}"`));
    assert.match(article, new RegExp(`description="${escapeRegex(description)}"`));
}

assert.match(article, /<a href=\{src\}[^>]*>\s*<img[\s\S]*?<\/a>\s*<figcaption/);
assert.doesNotMatch(article, /mobileScrollable|min-w-\[760px\]|overflow-x-auto/);
```

For each redesigned SVG, assert `font-family:Inter,Arial,sans-serif`, the allowed palette, a `viewBox`, no fixed pixel `width`/`height` attributes on the root, and exactly two distinct CSS `font-size` values: `22px` and `14px`.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```powershell
node --test --test-name-pattern="editorial figure|responsive SVG|allocation figure|epistasis figure|v1 ablation figure" tests/site-contracts.test.mjs
```

Expected: failure because the current component still uses `caption`, `mobileScrollable`, and SVGs with more than two font sizes.

### Task 2: Implement the article caption system

**Files:**
- Modify: `src/articles/WhatShouldWeMeasureNext.jsx`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Replace the `Figure` component API**

Use this structure:

```jsx
const Figure = ({ src, alt, number, title, description, width, height, wide = false }) => (
    <figure className={`my-10 -mx-6 ${wide ? 'md:mx-0 lg:-mx-16' : 'md:mx-0'} not-prose`}>
        <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open Figure n°${number}: ${title} at full size`}>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="block w-full h-auto border-y md:border border-border-subtle md:rounded-lg bg-cream"
                loading="lazy"
            />
        </a>
        <figcaption className="mt-4 space-y-1 text-base leading-relaxed text-primary">
            <p className="font-semibold">Figure n°{number}: {title}</p>
            <p className="italic font-normal"><span>Description:</span> {description}</p>
        </figcaption>
    </figure>
);
```

- [ ] **Step 2: Update all four figure calls**

Replace each `caption` prop with the exact approved `number`, `title`, and `description` strings from Task 1. Remove all `mobileScrollable` props. Keep `wide` only on Figure n°3.

- [ ] **Step 3: Run the caption test and verify GREEN**

Run the focused test from Task 1. Expected: caption assertions pass; SVG assertions still fail.

### Task 3: Simplify the closed-loop SVG

**Files:**
- Modify: `public/epibudget/epistasis-loops.svg`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Rewrite the figure around graph structure only**

Use `viewBox="0 0 1200 680"`. Define only `.key{font-size:22px}` and `.label{font-size:14px}` for text. Retain:

- title `Closed measurement loops`;
- panel labels `Pairwise` and `Third-order`;
- focal annotations `AB alone: insufficient` and `ABC alone: insufficient`;
- pairwise WT/A/B/AB graph and third-order A/B/C/AB/AC/BC/ABC graph;
- filled measured nodes, dashed focal rings, dark loop edges, and light related edges;
- compact four-item legend.

Remove subtitle, formulas, WT note, interpretations, and prose footer. Preserve an accessible `<title>` and `<desc>` that carry the full scientific meaning.

- [ ] **Step 2: Run the epistasis and SVG-system tests**

Expected: Figure n°2 and its two-size contract pass.

### Task 4: Simplify the allocation-strategy SVG

**Files:**
- Modify: `public/epibudget/allocation-strategies.svg`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Rewrite the five-panel comparison**

Use `viewBox="0 0 1120 1000"` and only 22px/14px text. Retain the shared candidate-graph definition, five strategy names, selected nodes, arrows, compact four-well outputs, and the legend. Use concise normal-size labels below each name:

```text
Random              uniform
Fitness             predicted fitness
Loop-count          interaction coverage
Dispersion-weighted masking dispersion
Practice            singles → combinations
```

Remove the subtitle, numbered workflow strip, descriptions, cue notes, plate labels, and prose footer. Keep exactly three selected nodes in every panel and identical candidate geometry.

- [ ] **Step 2: Run the allocation and SVG-system tests**

Expected: Figure n°3 and its five equal-budget assertions pass.

### Task 5: Simplify the downstream-boundary SVG

**Files:**
- Modify: `public/epibudget/downstream-label-boundary.svg`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Rewrite the flow with compact stage labels**

Use `viewBox="0 0 1200 440"` and only 22px/14px text. Keep:

```text
Select plate → Reveal fitness → Train fixed learner → Rank held-out variants
```

Place compact barrier labels `no measured labels` before reveal and `no held-out ESM` before ranking. Use a path-based arrow marker and a two-item legend for ordinary flow and restricted information. Remove the subtitle and all explanatory sentences inside the boxes.

- [ ] **Step 2: Run the downstream and SVG-system tests**

Expected: the supporting SVG passes its asset-system checks without being embedded in the article.

### Task 6: Simplify the masking-dispersion ablation SVG

**Files:**
- Modify: `public/epibudget/structure-vs-dispersion.svg`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Rewrite the direct ablation**

Use `viewBox="0 0 1200 760"` and only 22px/14px text. Retain:

- title `Loop count with or without masking dispersion`;
- panel labels `Loop-count baseline` and `Dispersion-weighted`;
- essential formulas `score(v) = n(v)` and `score(v) = n(v) × τ²(v)`;
- mutation-order rows and equal within-order baseline scores;
- dispersion halos on the weighted side;
- illustrative selected strips with the same fixed budget;
- compact legend for candidate, selected candidate, and masking dispersion.

Draw the central plus sign with two paths. Remove the subtitle, explanatory paragraphs, calibration footnotes, current-evidence panel, status summary, and prose footer. Preserve those claims in the accessible `<desc>` and article caption.

- [ ] **Step 2: Run the ablation and SVG-system tests**

Expected: Figure n°4 passes while the scientific-boundary article assertions remain green.

### Task 7: Full verification and visual review

**Files:**
- Verify: `src/articles/WhatShouldWeMeasureNext.jsx`
- Verify: `public/epibudget/*.svg`
- Verify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Run automated verification**

```powershell
node --test
node node_modules\eslint\bin\eslint.js src\articles\WhatShouldWeMeasureNext.jsx tests\site-contracts.test.mjs
node scripts\build.mjs
git diff --check
```

Expected: 19 or more tests pass, ESLint exits 0, Vite builds and prerenders all routes, and diff check reports no whitespace errors.

- [ ] **Step 2: Inspect desktop and mobile rendering**

At 1200×900 and 390×844, verify:

- image appears before its title and description;
- all four titles begin `Figure n°X:`;
- descriptions are italic at article body size;
- no figure has an internal scroller or clipped content;
- direct image links open the SVG or raster asset at full size;
- every SVG uses consistent spacing, strokes, palette, and typography;
- the unchanged workflow remains legible and is clearly identified as Figure n°1.

- [ ] **Step 3: Publish the explicitly authorized scope**

Stage the confirmed worktree, commit it as one coherent editorial update, push `main`, and verify the resulting production deployment. Defer the workflow SVG rebuild to a separate pass.
