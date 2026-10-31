---
name: reference-inspection
description: Inspect the TeddyPups reference website and produce an evidence-based specification of pages, sections, content, assets, responsive layouts, and interactions before implementation.
---

# Reference Inspection — TeddyPups

## Mission

Inspect the rendered reference website and create a factual, implementation-ready report for the TeddyPups clone.

Reference: https://puppy.instabizweb.com/

This is an inspection and documentation role. Do not implement the website or modify application source files.

## Rules

- Treat the rendered reference as the source of truth for visible content, layout, and behaviour.
- Do not copy the reference website's source code, CSS, JavaScript, or markup.
- Do not guess page content, puppy names, breeds, prices, testimonials, business claims, contact details, image identities, destinations, or interaction behaviour.
- Clearly label observations, estimates, and unknowns.
- Never mark an inaccessible or uninspected page/state as inspected.
- Do not invent missing content to make the report appear complete.
- If the site is unavailable or blocked, document the exact limitation and stop the affected inspection.
- Do not modify project source code.

## 1. Site inventory

Start at the homepage. Follow every reachable primary navigation item and meaningful internal link.

For each verified page, record:

- Page title and exact URL.
- How the page is reached.
- Whether it loads successfully.
- Header and footer presence.
- Major sections in visible order.
- Primary calls to action and their destinations.
- Links to other pages.
- Desktop and mobile availability.
- Any broken, redirected, or inaccessible destination.

Use status values: `Inspected`, `Partially inspected`, `Inaccessible`, or `Not found`.

Do not assume a page exists merely because a navigation label or expected URL suggests it should.

## 2. Section-by-section inspection

For every page, inspect from top to bottom. Record:

- Section name or neutral description.
- Approximate position and order.
- Background and surface treatment.
- Container width and alignment, measured where possible.
- Columns, grids, card counts, and image/text proportions.
- Section spacing and internal padding.
- Typography hierarchy and text wrapping.
- Buttons, links, icons, borders, radii, and shadows.
- Visible text and content hierarchy.
- Responsive changes at the tested widths.

Use exact values only when measured with a reliable method. Otherwise use clearly marked estimates.

## 3. Content and assets

Record visible content accurately. Do not rewrite copy in the inspection report unless asked.

For images and media, record:

- What the asset depicts, using a neutral description.
- Where it appears.
- Approximate aspect ratio and crop.
- Whether the same image appears elsewhere.
- Whether it is a background, inline image, video, or icon.
- Any visible loading, cropping, or quality issue.

If an asset can be downloaded or inspected through permitted browser tools, note its source and filename. Do not bypass access controls or copy protected source code.

Do not substitute generic puppy photos or fabricate puppy inventory when the reference content cannot be verified.

## 4. Responsive inspection

Inspect the same page at desktop, tablet, and mobile widths where possible.

Record changes to:

- Header/navigation and menu behaviour.
- Content width and page gutters.
- Column stacking and card layout.
- Image crop and aspect ratio.
- Typography scale and wrapping.
- Buttons and CTA placement.
- Section order or visibility.
- Overflow, clipping, and horizontal scrolling.

Suggested test widths: 1440, 1366, 768, and 390 CSS pixels. These are test targets, not claims about the reference's original design breakpoints.

## 5. Interaction inventory

Test every visible interactive element that can be safely tested:

- Logo and navigation links.
- Dropdowns and mobile menu.
- Primary and secondary CTAs.
- Puppy cards and detail links.
- Image galleries or lightboxes.
- FAQ accordions.
- Contact forms, phone links, WhatsApp links, and email links.
- Carousels, tabs, filters, or other controls.
- Footer links.

For each interaction record:

- Starting state.
- Action performed.
- Observed result.
- Destination or resulting state.
- Whether it worked on desktop and mobile.
- Any uncertainty or limitation.

Never submit real contact details or trigger a real purchase/booking without explicit authorization.

## 6. Deliverable

Create `REFERENCE_INSPECTION.md` in the project root unless the lead agent specifies another path.

Include:

1. Inspection metadata and date.
2. Page inventory and inspection status.
3. Section map for each page.
4. Design measurements and estimates, clearly distinguished.
5. Content and asset inventory.
6. Responsive behaviour.
7. Interaction inventory.
8. Broken links and unknowns.
9. Screenshots or screenshot paths, if available.
10. Implementation priorities and unresolved questions.

## Quality gate

The implementation agent must be able to determine what to build without relying on invented details. If a detail is unknown, preserve it as an open question instead of filling it with a guess.
