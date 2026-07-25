# Figure 3 layout polish

## Goal

Make the interactive allocation-strategy figure easier to read on the article page without changing its scientific content or interaction model.

## Design

- Remove the explanatory sentence and the “Open the full static comparison” link below the interactive card. The figure caption remains unchanged.
- Remove the now-unused `src` prop from the component API and from the Figure 3 call site.
- Let Figure 3 use the full width of the article content column instead of stopping at 600 px. It remains constrained by the article container and responsive at narrower viewports; it does not break out toward the viewport edges.
- Show the pointer cursor on each of the five enabled strategy buttons. Before hydration, disabled controls retain a non-interactive cursor so the pointer does not promise an unavailable action.
- At the new article width, align the candidate graph, arrow, and plate to one named vertical-centerline constant. Derive the arrow position, plate transform, and candidate-graph transform from that constant and the groups’ documented local midpoints. Preserve the existing horizontal coordinates unless rendered verification reveals clipping or overlap; this is a geometry cleanup, not a redesign.
- Keep the existing five labels, graph topology, typography, strategy data, accessibility attributes, caption, and mobile wrapping behavior unchanged.

## Implementation boundaries

`AllocationStrategiesDiagram.jsx` owns the removable sentence, its obsolete `src` prop, button styling, bounded SVG-alignment cleanup, and the component comment that currently says the static SVG is linked underneath. `WhatShouldWeMeasureNext.jsx` owns the Figure 3 call site and width constraint. The static fallback asset, shared layout, and global typography styles do not change.

## Verification

- Add source-level regression assertions covering removal of the sentence/link and `src` prop, article-width sizing for Figure 3, preservation of the 600 px constraints for Figures 2 and 4, pointer styling, and use of the shared SVG centerline.
- Verify the rendered figure at the desktop article width and at a narrow mobile width, checking that the graph, arrow, and plate share a centerline and that no control, label, node, or plate well clips or overlaps.
- Run the targeted site-contract tests, the full test suite, ESLint, `git diff --check`, and the production build.
