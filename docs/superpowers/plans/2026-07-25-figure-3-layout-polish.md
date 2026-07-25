# Figure 3 Layout Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify and enlarge the interactive allocation-strategy figure, add correct pointer affordances, and align its SVG groups on one vertical centerline.

**Architecture:** Keep the change local to the existing article call site and `AllocationStrategiesDiagram`. Source-level contracts lock the requested copy removal, width scope, cursor affordance, and shared SVG centerline; rendered desktop and mobile checks cover visual geometry.

**Tech Stack:** React 19, JSX, Tailwind CSS 4, Node.js test runner, Vite prerender build.

---

### Task 1: Add the failing Figure 3 contract

**Files:**
- Modify: `tests/site-contracts.test.mjs`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Write the failing source-level test**

Insert this test immediately before the existing static allocation-figure test:

```js
test('interactive allocation figure fills the article column and aligns its pointer controls', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const figure = read('src/components/epibudget/AllocationStrategiesDiagram.jsx');
    const [call = ''] = article.match(/<AllocationStrategiesDiagram[\s\S]*?\/>/) ?? [];

    assert.ok(call, 'Figure 3 call site is missing');
    assert.doesNotMatch(call, /\bsrc=|maxWidthClass=/);
    assert.equal((article.match(/maxWidthClass="max-w-\[600px\]"/g) ?? []).length, 2);

    assert.doesNotMatch(figure, /Every strategy selects|Open the full static comparison|\(\{ src,/);
    assert.match(figure, /cursor-pointer disabled:cursor-default/);
    assert.match(figure, /const DIAGRAM_CENTER_Y = 126\.5;/);
    assert.match(figure, /const CANDIDATE_GRAPH_Y = DIAGRAM_CENTER_Y - CANDIDATE_GRAPH_LOCAL_CENTER_Y;/);
    assert.match(figure, /const PLATE_Y = DIAGRAM_CENTER_Y - \(PLATE_HEIGHT \/ 2\);/);
    assert.match(figure, /y1=\{DIAGRAM_CENTER_Y\}[\s\S]*?y2=\{DIAGRAM_CENTER_Y\}/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
node --test --test-name-pattern="interactive allocation figure" tests/site-contracts.test.mjs
```

Expected: one failure because the call still passes `src` and `maxWidthClass`, the sentence/link still exist, and the pointer/centerline code is absent.

### Task 2: Implement the bounded layout cleanup

**Files:**
- Modify: `src/components/epibudget/AllocationStrategiesDiagram.jsx`
- Modify: `src/articles/WhatShouldWeMeasureNext.jsx`
- Test: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Define a shared SVG centerline**

Near the existing plate constants, add:

```js
const DIAGRAM_CENTER_Y = 126.5;
const CANDIDATE_GRAPH_LOCAL_CENTER_Y = 86.5;
const CANDIDATE_GRAPH_Y = DIAGRAM_CENTER_Y - CANDIDATE_GRAPH_LOCAL_CENTER_Y;
const PLATE_HEIGHT = 96;
const PLATE_Y = DIAGRAM_CENTER_Y - (PLATE_HEIGHT / 2);
```

Use it in the three SVG groups:

```jsx
<g transform={`translate(60 ${CANDIDATE_GRAPH_Y})`}>
```

```jsx
<g transform={`translate(420 ${PLATE_Y})`}>
    <rect
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        rx="12"
        fill="none"
        stroke={PALETTE.border}
        strokeWidth="1.5"
    />
```

```jsx
<line
    x1="300"
    y1={DIAGRAM_CENTER_Y}
    x2="386"
    y2={DIAGRAM_CENTER_Y}
    stroke={PALETTE.secondary}
    strokeWidth="1.5"
/>
<path
    d={`M400 ${DIAGRAM_CENTER_Y}L386 ${DIAGRAM_CENTER_Y - 6}V${DIAGRAM_CENTER_Y + 6}Z`}
    fill={PALETTE.secondary}
/>
```

The local midpoint `86.5` is the midpoint of the candidate graph’s visible bounds, including dashed halos. Keep every horizontal coordinate unchanged.

- [ ] **Step 2: Remove the obsolete fallback link API and copy**

Change the component signature to:

```js
const AllocationStrategiesDiagram = ({ maxWidthClass = 'max-w-full', number, title, description }) => {
```

Delete the paragraph containing “Every strategy selects” and “Open the full static comparison”. Update the opening component comment so it says the static SVG remains the canonical archived comparison, without claiming it is linked underneath.

- [ ] **Step 3: Add the pointer affordance**

Extend the button class with the two cursor states:

```jsx
className={`font-mono text-xs px-3 py-2 border cursor-pointer disabled:cursor-default disabled:opacity-60 ${
```

- [ ] **Step 4: Let only Figure 3 fill the article column**

Change its call site to:

```jsx
<AllocationStrategiesDiagram
    number="3"
    title="Same candidates, different experimental plates"
    description="Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate."
/>
```

Do not alter the two remaining `maxWidthClass="max-w-[600px]"` props used by Figures 2 and 4.

- [ ] **Step 5: Run the targeted test and verify GREEN**

Run:

```powershell
node --test --test-name-pattern="interactive allocation figure" tests/site-contracts.test.mjs
```

Expected: the targeted contract passes with zero failures.

### Task 3: Verify behavior and rendering

**Files:**
- Verify: `src/components/epibudget/AllocationStrategiesDiagram.jsx`
- Verify: `src/articles/WhatShouldWeMeasureNext.jsx`
- Verify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Run fresh static verification**

Run each command and require exit code 0:

```powershell
node --test
node node_modules\eslint\bin\eslint.js .
git diff --check
node scripts\build.mjs
```

Expected: all tests pass, ESLint reports no errors, `git diff --check` is silent, and the production build prerenders every route successfully.

- [ ] **Step 2: Verify the rendered desktop figure**

Start the site with `npm run dev -- --host 127.0.0.1`, open `/blog/designing-protein-experiments-for-epistasis` at a desktop viewport, and confirm:

- Figure 3 fills the article content width but does not break outside it.
- The removed sentence/link is absent.
- The candidate graph, arrow, and plate share one horizontal centerline.
- All five enabled buttons show a pointer cursor.
- No label, node, well, or control clips or overlaps.

- [ ] **Step 3: Verify the rendered mobile figure**

At a 375 px viewport, confirm that buttons wrap, the SVG scales within the card, the caption remains readable, and no label, node, well, or control clips or overlaps.

- [ ] **Step 4: Review the final diff and preserve commit scope**

Run:

```powershell
git status --short
git diff -- src/components/epibudget/AllocationStrategiesDiagram.jsx src/articles/WhatShouldWeMeasureNext.jsx tests/site-contracts.test.mjs
```

Expected: only the approved product/test files are uncommitted. Do not commit or push them unless the user explicitly asks.
