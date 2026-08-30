# Lab Command `SUCCEEDED` Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved laboratory-command article to the Journal with exact editorial boundaries, complete metadata, citations, prerendering, and regression coverage.

**Architecture:** The new presentation-only React component names one slug and delegates date, canonical identity, byline, and structured data to the existing Journal metadata system. `journalArticles.js` remains the collection source of truth, `routeManifest.js` remains the route/prerender source of truth, and the existing sitemap/build pipeline produces the static page.

**Tech Stack:** React 19, React Router, Vite prerendering, Tailwind utilities, Node test runner, ESLint.

**Authorization note:** Local implementation and verification are authorized. Commit, push, deployment, dependency changes, and edits to `.claude/settings.local.json` are excluded until separately authorized.

---

## File Structure

- Create `src/articles/WhenALabCommandSaysSucceeded.jsx`: approved article copy plus article-local `RefLink` and `CodeBlock` presentation helpers.
- Modify `src/data/journalArticles.js`: date, title, slug, tag, and reading time used by the listing, byline, canonical metadata, and JSON-LD.
- Modify `src/routeManifest.js`: lazy-loaded Journal route and prerender date.
- Modify `tests/site-contracts.test.mjs`: Journal inventory and source-level editorial/reference contracts.
- Modify `tests/dist-contracts.test.mjs`: prerendered metadata and evidence contract.
- Modify `public/sitemap.xml`: generated only by `npm run sitemap`.

### Task 1: Lock the approved source contract

**Files:**
- Modify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Extend the Journal inventory**

Change the expected tag count from `11` to `12`. Add this first entry to the `files` object in `every Journal article renders the shared byline instead of its own`:

```js
'when-a-lab-command-says-succeeded': 'src/articles/WhenALabCommandSaysSucceeded.jsx',
```

Add the article after `const relocated = ...` in the coherent-URL test so it does not inherit a historical `/blog` redirect:

```js
articles.push(['when-a-lab-command-says-succeeded', 'src/articles/WhenALabCommandSaysSucceeded.jsx']);
```

- [ ] **Step 2: Add the source-level article contract**

```js
test('lab command article preserves its approved evidence and editorial boundaries', () => {
    const article = read('src/articles/WhenALabCommandSaysSucceeded.jsx');
    const references = [
        'https://www.anthropic.com/news/model-hardware-standard-research-preview',
        'https://www.nature.com/articles/s41467-026-74425-x',
        'https://zenodo.org/records/18930287',
        'https://arxiv.org/abs/2607.15620',
        'https://www.nature.com/articles/s41597-026-07124-3',
        'https://zenodo.org/records/17395543',
    ];

    assert.match(article, /const SLUG = 'when-a-lab-command-says-succeeded';/);
    assert.match(article, /986\/986 operations paired cleanly/);
    assert.match(article, /34 of 79 labelled recoveries/);
    assert.match(article, /Recovery observability coverage: 43%/);
    assert.match(article, /versioned release 21535243/);
    assert.match(article, /effect_unknown/);
    for (const href of references) assert.ok(article.includes(href), `missing reference ${href}`);
    assert.doesNotMatch(article, /If you operate Chemspeed/);
    assert.doesNotMatch(article, /—/, 'the article adds an em dash');
});
```

- [ ] **Step 3: Prove the contract fails before implementation**

Run `node --test tests/site-contracts.test.mjs`.

Expected: FAIL because the article file and metadata record do not exist. Unrelated pre-existing tests remain green.

### Task 2: Add metadata and route registration

**Files:**
- Modify: `src/data/journalArticles.js`
- Modify: `src/routeManifest.js`

- [ ] **Step 1: Insert the newest Journal record**

Insert first in `journalArticles`:

```js
{
    date: "2026-08-29",
    title: "When a Lab Command Says SUCCEEDED, What Actually Happened?",
    slug: "when-a-lab-command-says-succeeded",
    tag: "AI-for-science",
    readingMinutes: 14
},
```

- [ ] **Step 2: Insert the route after the home route**

```js
{ path: '/journal/when-a-lab-command-says-succeeded', lastmod: '2026-08-29', load: () => import('./articles/WhenALabCommandSaysSucceeded.jsx') },
```

### Task 3: Create the article component

**Files:**
- Create: `src/articles/WhenALabCommandSaysSucceeded.jsx`
- Read: `C:\Users\Lenovo L14\Downloads\when-a-lab-command-says-succeeded-v2.md`
- Read: `docs/superpowers/specs/2026-08-29-lab-command-succeeded-article-design.md`

- [ ] **Step 1: Verify the authoritative source before transcription**

Run:

```powershell
Get-FileHash 'C:\Users\Lenovo L14\Downloads\when-a-lab-command-says-succeeded-v2.md' -Algorithm SHA256
```

Expected SHA-256: `EBD0AE2639D741B1E65CCE528DA9F639DDDE4186AA1A2AF4C116018D1DAFD58B`.

- [ ] **Step 2: Create the component frame and article-local helpers**

Use this exact component interface and metadata:

```jsx
import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import ArticleSEO from '../components/ArticleSEO';
import ArticleByline from '../components/ArticleByline';
import AuthorBio from '../components/AuthorBio';
import Cite from '../components/Cite';

const SLUG = 'when-a-lab-command-says-succeeded';

const RefLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words"
    >
        {children}
    </a>
);

const CodeBlock = ({ children }) => (
    <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-primary/5 p-5 text-sm leading-relaxed">
        <code>{children}</code>
    </pre>
);

```

- [ ] **Step 3: Transcribe the complete approved visible copy**

After the helper definitions, define `WhenALabCommandSaysSucceeded` as an `ArticleLayout` with `backTo="/journal"`, `backLabel="Journal"`, and `width="narrow"`. Its first child is this exact metadata component:

```jsx
<ArticleSEO
    slug={SLUG}
    title="When a Lab Command Says SUCCEEDED, What Actually Happened? | Vivien Perrelle"
    description="What two public automation datasets reveal about the gap between successful lab commands and evidence that their intended physical effects actually occurred."
/>
```

Convert every paragraph, heading, list, blockquote, code block, inline code span, emphasis marker, and citation from the authoritative Markdown into semantic JSX inside that layout. Apply exactly the 24 operations enumerated in the design specification, including deletion of `If you operate Chemspeed...`. Do not perform any other prose edit. Render citation markers as `<Cite n={1} />` through `<Cite n={4} />`; render reference entries with `id="ref-1"` through `id="ref-4"`. Use `h2` for the nine numbered sections, Bottom Line, and References; use `h3` for the three Flex-Cat evidence subsections. Preserve every number and all six external URLs from the design specification. Use `CodeBlock` for all six multiline examples and horizontal overflow on narrow viewports. Do not add an em dash. End the file with `export default WhenALabCommandSaysSucceeded;`.

- [ ] **Step 4: Add the fixed continuation links**

```jsx
<AuthorBio readNext={[
    { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
    { to: '/journal/science-is-entering-its-agentic-era', label: 'Science Is Entering Its Agentic Era' },
    { to: '/journal/regulators-dont-accept-vibes', label: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing" },
]} />
```

- [ ] **Step 5: Run source tests**

Run `node --test tests/site-contracts.test.mjs`.

Expected: PASS. Fix the new article or inventory registration rather than weakening shared contracts.

### Task 4: Lock and generate prerendered output

**Files:**
- Modify: `tests/dist-contracts.test.mjs`
- Modify: `public/sitemap.xml` through the existing generator

- [ ] **Step 1: Add the built-output regression test**

```js
test('lab command article prerenders its approved metadata and evidence', () => {
    const route = '/journal/when-a-lab-command-says-succeeded';
    const article = pages.find((page) => page.route === route);
    assert.ok(article, `${route} was not prerendered`);

    const { html } = article;
    assert.match(html, /<title>When a Lab Command Says SUCCEEDED, What Actually Happened\? \| Vivien Perrelle<\/title>/);
    assert.match(html, /What two public automation datasets reveal about the gap between successful lab commands/);
    assert.match(html, /986\/986 operations paired cleanly/);
    assert.match(html, /34 of 79 labelled recoveries/);
    assert.match(html, /Recovery observability coverage: 43%/);
    assert.match(html, /versioned release 21535243/);
    assert.doesNotMatch(html, /If you operate Chemspeed/);
    assert.doesNotMatch(html, /—/, 'the rendered article adds an em dash');
});
```

- [ ] **Step 2: Prove the output contract fails against the old build**

Run `node --test tests/dist-contracts.test.mjs`.

Expected: FAIL with `/journal/when-a-lab-command-says-succeeded was not prerendered`.

- [ ] **Step 3: Generate the sitemap and build**

Run:

```powershell
npm run sitemap
npm run build
```

Expected: the sitemap gains exactly the new URL with `lastmod` `2026-08-29`; the build produces `dist/journal/when-a-lab-command-says-succeeded/index.html` and one additional prerendered route.

- [ ] **Step 4: Confirm the reading time**

Run `node scripts/reading-time.mjs`.

Expected: the new row measures 14 minutes and matches `readingMinutes: 14`. If deterministic rendered counting rounds differently, change only the new record to the measured integer, rebuild, and rerun the command.

- [ ] **Step 5: Run output tests**

Run `node --test tests/dist-contracts.test.mjs`.

Expected: PASS, including canonical metadata, byline, heading hierarchy, route coverage, inbound links, and reading time.

### Task 5: Complete local verification and stop at the authorization boundary

**Files:**
- Verify all intended files above
- Preserve: `.claude/settings.local.json`

- [ ] **Step 1: Run all gates**

```powershell
npm test
npm run lint
git diff --check
```

Expected: all tests pass, ESLint reports zero errors, and `git diff --check` prints nothing.

- [ ] **Step 2: Inspect intended scope and static content**

```powershell
git status --short
git diff -- src/articles/WhenALabCommandSaysSucceeded.jsx src/data/journalArticles.js src/routeManifest.js tests/site-contracts.test.mjs tests/dist-contracts.test.mjs public/sitemap.xml docs/superpowers/specs/2026-08-29-lab-command-succeeded-article-design.md docs/superpowers/plans/2026-08-29-lab-command-succeeded-article.md
Select-String -Path dist\journal\when-a-lab-command-says-succeeded\index.html -Pattern '986/986 operations paired cleanly','34 of 79 labelled recoveries','If you operate Chemspeed','—'
```

Expected: the intended article files and planning documents are changed, alongside only the pre-existing unrelated `.claude/settings.local.json`. The HTML contains both evidence strings and contains neither the deleted callout nor an em dash.

- [ ] **Step 3: Stop before publication actions**

Report the local result and exact verification evidence. Do not stage, commit, push, deploy, install dependencies, or modify the unrelated untracked file.

### Task 6: Apply the approved thesis-led revision

**Files:**
- Modify: `src/articles/WhenALabCommandSaysSucceeded.jsx`
- Modify: `src/data/journalArticles.js`
- Modify: `tests/site-contracts.test.mjs`
- Modify: `tests/dist-contracts.test.mjs`

- [ ] **Step 1: Strengthen the editorial contract**

Require the source article to preserve the thesis terms `effect state`, `action-linked evidence`, `986/986 operations paired cleanly`, `34 of 79 labelled recoveries`, `Recovery observability coverage: 43%`, `effect_unknown`, and `versioned release 21535243`. Require the removed practitioner framing and an em dash to remain absent.

- [ ] **Step 2: Rewrite the article around one claim**

Replace the descriptive subtitle and long audit sequence with the approved six-part structure. Target approximately 1,800 rendered words. Preserve the evidence and references while removing the standalone logging-configuration inventory, the future-stack predictions, and the question-led Bottom Line.

- [ ] **Step 3: Recalculate derived metadata**

Run `node scripts/reading-time.mjs`, update only the new article's `readingMinutes` value to the measured result, and rebuild so prerendered metadata matches the source of truth.

- [ ] **Step 4: Verify source and generated output**

Run the focused article contracts, production build, reading-time check, ESLint, `git diff --check`, and the complete Node test suite. Report any unrelated baseline failure separately. Do not stage, commit, push, or deploy.

### Task 7: Apply the final approved subtitle

**Files:**
- Modify: `src/articles/WhenALabCommandSaysSucceeded.jsx`
- Modify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Lock the exact subtitle in the source contract**

Require the article source to contain the complete approved three-sentence subtitle and continue rejecting em dashes.

- [ ] **Step 2: Replace the visible subtitle exactly**

Use: `Anthropic's Model Hardware Standard makes lab hardware easier for agents to operate. But device APIs only tell an agent how to act. Reliable autonomy also needs action-linked evidence and a separate effect state: a machine-readable contract for what the system can safely believe before it continues, recovers, or retries.`

- [ ] **Step 3: Verify the revision**

Run the focused source contract, production build, rendered-output contract, and reading-time check. Do not stage, commit, push, or deploy.

### Task 8: Link the two audited public datasets

**Files:**
- Modify: `src/articles/WhenALabCommandSaysSucceeded.jsx`
- Modify: `tests/site-contracts.test.mjs`

- [ ] **Step 1: Require named dataset links**

Assert that `Flex-Cat` is wrapped in `RefLink` targeting `https://zenodo.org/records/18930287` and `Batch Distillation` is wrapped in `RefLink` targeting `https://zenodo.org/records/17395543`.

- [ ] **Step 2: Link the names in the introductory list**

Reuse the existing `RefLink` component and preserve the surrounding list copy exactly.

- [ ] **Step 3: Verify source and rendered output**

Run the focused source contract, production build, and rendered-output contracts. Do not stage, commit, push, or deploy.

### Task 9: Align the Batch Distillation section with the published audit

**Files:**
- Modify: `src/articles/WhenALabCommandSaysSucceeded.jsx`
- Modify: `src/data/journalArticles.js`
- Modify: `tests/site-contracts.test.mjs`
- Modify: `tests/dist-contracts.test.mjs`

- [ ] **Step 1: Lock the revised evidence contract before changing the article**

Require the source and prerendered article to contain:

```text
https://github.com/VivienP/lab-log-observability-audit
34/79 = 43.04%
34/74 = 45.95%
17.67%
2.60×
10,000 iterations
20260830
37/74 = 50.0%
51.1%
0.98×
p = 0.63
2.80–2.85×
temporal association
recipe-engine rows
```

Require the article to state that five recoveries are unanswerable rather than negative, and reject the stale `17 of the 79 windows`, `only eight contained`, `Recovery observability coverage: 43%`, and `event_category` formulations. Require the GitHub URL to appear both as a visible `RefLink` and as `codeRepository` structured data.

- [ ] **Step 2: Run the focused source contract and confirm the expected failure**

Run:

```powershell
node --test --test-name-pattern="lab command article" tests/site-contracts.test.mjs
```

Expected: FAIL because the background comparison, denominator qualification, falsification boundary, and GitHub repository are not yet present.

- [ ] **Step 3: Replace the Batch Distillation interpretation**

Keep the 34/79 headline as `34/79 = 43.04%`, then immediately distinguish the five anchors outside the observable log interval. State that no window can match them, so they are unanswerable rather than negative and the within-log background comparison uses 74 recoveries.

Add a responsive table with these primary results:

| Window | Observed | Random background | Ratio | Empirical p |
| --- | ---: | ---: | ---: | ---: |
| `[-60 s, +120 s]` | `34/74 = 45.95%` | `17.67%` | `2.60×` | `0.0001` |
| `±300 s` | `35/74 = 47.3%` | `35.5%` | `1.33×` | `0.020` |
| `±600 s` | `37/74 = 50.0%` | `51.1%` | `0.98×` | `0.63` |

Explain that widening raises the headline numerator from 34 to 37/79, but random background rises faster and the extra matches at `±600 s` are indistinguishable from chance. State the fixed seed and iterations for the original-window comparison.

Replace the stale event-type counts with the falsification boundary: excluding mode transitions and setpoint changes preserves enrichment at `2.80–2.85×`, ruling out that precise explanation, but residual recipe-engine rows may be coupled to the perturbation boundary in the same way. Conclude that this remains temporal association, not evidence that recovery itself was observed.

- [ ] **Step 4: Add the reproducibility repository without upgrading the claim**

Define:

```js
const AUDIT_REPO = 'https://github.com/VivienP/lab-log-observability-audit';
```

Add `codeRepository: AUDIT_REPO` to an `ArticleSEO` `SoftwareSourceCode` `about` object, and add one visible `RefLink` inviting readers to inspect the audit, methods, and generated results. Do not describe the repository as a general validation of laboratory automation.

- [ ] **Step 5: Recalculate reading time and verify all relevant gates**

Run the focused source contract, `npm run build`, `node scripts/reading-time.mjs`, the focused rendered-output contract, ESLint, `git diff --check`, and the full Node suite. Update only this article's `readingMinutes` to the measured value and rebuild if necessary. Report unrelated baseline failures separately. Do not stage, commit, merge, push, or deploy.
