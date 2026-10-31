---
name: visual-qa
description: Compare the TeddyPups clone with the live reference using repeatable screenshots and measured visual checks. Use for visual fidelity audits, section comparisons, regression checks, and verification of visual fixes.
---

# Visual QA — TeddyPups

## Mission

Measure how closely the local TeddyPups implementation matches the rendered reference:

- Reference: https://puppy.instabizweb.com/

The objective is evidence-based visual parity, not a subjective design review. Inspect the rendered reference and the running local implementation. Report measurable differences and their likely causes. Do not implement fixes unless the user or lead agent explicitly delegates implementation.

## Source of truth

Use sources in this order:

1. The currently rendered reference website for visible appearance and behaviour.
2. `REFERENCE_INSPECTION.md` for recorded page structure, measurements, assets, and interaction states.
3. The running local implementation for what has actually been built.
4. Project instructions such as `CLAUDE.md` and `AGENTS.md`.

Do not carry over measurements, colours, section names, asset assumptions, or scripts from another website or project. In particular, do not assume Airbnb-specific dimensions, typography, colours, or page structure.

If the reference cannot be accessed or the inspection report is missing, state the limitation. Do not invent a baseline.

## Non-negotiable rules

- Compare rendered pages, not code aesthetics.
- Use matching viewport dimensions, browser zoom, device-pixel ratio, scroll position, and UI state for both captures.
- Prefer the same browser and rendering environment for both sides.
- Wait for fonts, images, and layout to settle before capturing.
- Capture the same page, section, and interaction state on both sides.
- Never fabricate pixel measurements, colours, dimensions, or root causes.
- Distinguish measured values from visual estimates.
- Do not use stale screenshots as the current reference baseline.
- Do not fix a symptom with arbitrary offsets before identifying the responsible layout rule.
- Do not modify source code, CSS, tokens, or assets unless explicitly authorized.

## 1. Preflight

Before comparing, establish:

- The exact page/route and interaction state under review.
- The reference URL and whether it loads successfully.
- The local development URL and whether it loads successfully.
- The viewport width and height.
- Browser zoom and device-pixel ratio, if available.
- Whether fonts and images have loaded.
- Whether cookie banners, chat widgets, sticky headers, popups, or other overlays affect either capture.
- Whether both pages are at the same scroll position.

If any condition differs, correct it before comparing or record it as a limitation.

## 2. Page and state coverage

Use `REFERENCE_INSPECTION.md` as the page and section inventory. Do not assume the site has only one page.

For the TeddyPups experience, inspect every verified page and every major section recorded in the report. Typical areas may include the header, hero, puppy/breed content, product or service cards, trust content, testimonials, FAQs, contact/booking calls to action, and footer—but only mark areas that actually exist on the reference.

Check at least these viewport classes when supported by the reference and local site:

- Wide desktop: 1440 × 900
- Standard laptop: 1366 × 768
- Tablet: 768 × 1024
- Mobile: 390 × 844

Use the same exact viewport for each reference/local pair. If the project's screenshot tooling supports other standard sizes, use those too and record them.

Compare meaningful states such as the default page, mobile navigation open, FAQ expanded, gallery/modal open, or other verified interactive states. Do not invent states that the reference does not contain.

## 3. Capture workflow

First inspect the repository for existing browser automation, screenshot scripts, package scripts, and QA conventions. Reuse existing tooling where possible.

Do not assume commands such as `qa:local`, `qa:diff`, `qa:sections`, a `scripts/states.mjs` file, or any particular browser automation package exists.

If no capture workflow exists and browser automation is available, propose or create a small repeatable workflow only when authorized. Keep reference and local captures organized separately and name them by page, state, and viewport, for example:

`qa/reference/home-default/1440x900.png`
`qa/local/home-default/1440x900.png`

If automation is unavailable, use the browser's available screenshot capability and clearly state that pixel-level automated comparison was not possible.

Verify every screenshot actually contains the intended rendered page. A successful command can still produce a blank, stale, loading, or error screenshot.

## 4. Comparison method

Use the following sequence:

1. **Page geometry:** overall content width, centering, header height, section order, section heights, and total document height.
2. **Major layout:** column widths, grid structure, image/text balance, alignment, and responsive stacking.
3. **Spacing:** outer gutters, section gaps, card gaps, internal padding, and vertical rhythm.
4. **Typography:** font family, size, weight, line height, letter spacing, wrapping, and text block width.
5. **Colour and surfaces:** backgrounds, text colours, borders, shadows, overlays, and gradients.
6. **Images and media:** correct image identity, crop, aspect ratio, object position, resolution, and loading behaviour.
7. **Components:** buttons, cards, badges, navigation, icons, dividers, form fields, and radii.
8. **Interaction states:** hover, focus, expanded, selected, active, loading, and disabled states where they exist.

Use side-by-side comparison first. Where tooling permits, use overlays or difference images to expose alignment errors. Pixel differences are diagnostic, not automatically defects: account for dynamic content, antialiasing, font rendering, timestamps, and third-party widgets.

## 5. Diagnose before recommending a fix

Work from top to bottom because an early height or spacing error can shift every section below it.

For each mismatch:

- Identify the page, section, and viewport.
- Describe the observed reference behaviour/appearance.
- Describe the local result.
- Give the measured delta when it can be measured reliably.
- State the likely cause and confidence level.
- Recommend the smallest rule-level correction.
- Identify whether the issue repeats elsewhere.

Prefer correcting a shared token, container rule, grid definition, image treatment, or typography rule over applying one-off pixel nudges.

Do not label a cause as confirmed unless source inspection or a controlled test supports it.

## 6. Common false positives

Check these before reporting a mismatch:

- Different viewport or browser zoom.
- Different device-pixel ratio.
- Scrollbar presence changing available content width.
- Fonts not loaded or a fallback font being captured.
- Images still loading or using different responsive sources.
- Lazy-loaded sections not yet rendered.
- Sticky/fixed elements captured at different scroll positions.
- Cookie banners, chat widgets, or browser overlays present on only one side.
- Dynamic content or third-party widgets changing between captures.
- Mixed-element bounding boxes that do not represent a single column or row.
- Screenshots that appear successful but contain a blank/error/loading page.

## 7. Required report format

Return a concise report with:

### Capture details
- Page and state
- Reference URL
- Viewport and DPR
- Browser/environment
- Capture limitations

### Ranked findings
For each finding include:
- Priority: Critical / High / Medium / Low
- Section and viewport
- Reference observation
- Local observation
- Measured delta or clearly labelled estimate
- Likely cause and confidence
- Recommended fix

### Passed checks
List the sections and states that were actually checked and found acceptably close.

### Unverified areas
List pages, states, or viewports not tested and explain why.

### Regression retest
After a fix is applied by the implementation agent, recapture the same state and viewport. Verify the original mismatch is resolved and nearby sections have not regressed.

## Stop condition

Do not declare visual parity because the page merely looks plausible. Finish when all agreed pages, sections, viewports, and key states have been checked, high-priority differences are resolved, and remaining deviations are either negligible or explicitly documented with reasons.
