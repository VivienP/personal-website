# epibudget Article Figure System

## Objective

Give the epibudget article one restrained editorial figure system. The article carries interpretation and caveats; each image carries only the structure needed to understand the visual argument.

## Scope

- Replace the article's current caption treatment with one numbered caption block below every image.
- Simplify the three embedded SVG diagrams:
  - `epistasis-loops.svg`;
  - `allocation-strategies.svg`;
  - `structure-vs-dispersion.svg`.
- Keep `downstream-label-boundary.svg` as a compatible supporting asset, but do not embed it in this article.
- Keep the current `workflow.webp` image unchanged internally during this pass. It still receives the shared caption treatment as Figure n°1. Rebuilding it as SVG is deferred.
- Preserve the current scientific evidence boundary and site palette.

## Article Caption Component

Every figure renders in this order:

1. image;
2. bold title line beginning exactly with `Figure n°X:`;
3. italic description line beginning exactly with `Description:`.

The description uses the surrounding article's normal body size. There is no additional subtitle, boxed callout, or duplicate caption below it. Figures are numbered 1 through 4 in reading order.

### Caption Copy

1. **Figure n°1: From target protein to experimental plate**
   *Description: epibudget scores complete variants, maps their interaction structure, and converts a fixed experimental budget into a ranked measurement plate.*
2. **Figure n°2: Interaction coefficients are defined by closed measurement loops**
   *Description: Pairwise and third-order coefficients are defined relative to WT-referenced families of measurements. An isolated combination cannot determine its own epistatic effect.*
3. **Figure n°3: Same candidates, different experimental plates**
   *Description: Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate.*
4. **Figure n°4: What masking dispersion adds to the v1 score**
   *Description: The ablation compares loop count alone with loop count weighted by ESM masking dispersion. Current evidence does not establish an additional benefit from the dispersion term.*

## Shared SVG Visual Language

- Typeface: `Inter, Arial, sans-serif` only.
- Text sizes: exactly `22px` for internal titles and key panel labels; exactly `14px` for every other text element.
- Colors: existing cream, charcoal, gray, border beige, and dark green only.
- Strokes: use a consistent 1.5–2px editorial weight where the scientific encoding does not require stronger emphasis.
- Internal subtitle blocks, explanatory paragraphs, footnotes, and prose footers are removed.
- A compact legend is retained only when symbols or encodings require decoding. Figures whose labels are self-explanatory do not need a legend.
- Symbols that need a different visual scale, such as a plus sign, are drawn as paths rather than oversized text.
- Formulas move into the article whenever the surrounding text already establishes them. A formula remains in a figure only when it is the direct visual object of comparison.
- SVGs scale to the article width without an internal horizontal scroller, clipping, or minimum-width override. Their intrinsic view boxes preserve proportions at desktop and mobile widths.
- Each image may be opened directly in a new browser tab for full-size inspection; no custom fullscreen overlay is required.

## Figure Content

### Figure n°2: Closed loops

Keep the pairwise and third-order graphs, variant labels, highlighted focal combinations, edge encodings, concise `AB alone: insufficient` and `ABC alone: insufficient` annotations, and the legend. Remove both formulas, the WT-reference note, the internal subtitle, interpretations, and footer. The nearby article text and external description carry the inclusion-exclusion definitions.

### Figure n°3: Allocation strategies

Keep the five strategy names, identical candidate geometry, selected nodes, arrows, compact plate outputs, masking-dispersion halos where relevant, and the legend. Remove the internal subtitle, numbered workflow strip, method paragraphs, secondary subtitles, cue notes, plate labels, and footer. Method semantics remain in the preceding article text and external description.

### Supporting asset: Downstream label boundary

Keep four labeled stages, arrows, the two label-leakage barriers, and a compact legend for ordinary flow and restricted information. Remove the subtitle and explanatory text inside boxes. Use concise stage labels only.

### Figure n°4: v1 ablation

Keep the two essential formulas `score(v) = n(v)` and `score(v) = n(v) × τ²(v)`, because their direct comparison is the purpose of the figure. Keep mutation-order groups, tied baseline candidates, dispersion halos, illustrative selected outputs, and the legend. Remove the subtitle, explanatory prose, methodological footnotes, result-status panel, and footer. The external description and the article's evidence section retain the provisional result and limitations.

## Scientific Boundary

The simplification must not alter the current claims:

- On TrpB, `info` beats fitness and random for pairwise map recovery.
- Loop count exceeds `info` at budgets 96 and 192, but not at 48.
- Loop-count selection beats fitness-greedy downstream in 20/20 partitions on both GB1 and TrpB.
- The masking-dispersion gate does not pass on either landscape.
- GB1 map recovery remains `inconclusive_zero_gpu`.
- All comparative results remain provisional, and the TrpB imputation caveat remains in the article.

## Verification

- Contract tests assert four ordered `Figure n°X:` titles and four italic `Description:` lines after their images.
- Contract tests assert exactly two declared font sizes in each redesigned SVG, the shared font family, allowed palette, retained legends, and absence of subtitle classes or old prose blocks.
- Existing scientific-boundary assertions remain active.
- ESLint, the complete Node test suite, the production build, and `git diff --check` must pass.
- Desktop and mobile browser checks confirm caption hierarchy, responsive SVG readability without internal scrolling, direct full-size image access, and absence of clipped text or overlapping elements.
