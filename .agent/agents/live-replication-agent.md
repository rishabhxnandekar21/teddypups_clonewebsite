---
name: teddypups-autonomous-replication
description: Fully autonomous agent that explores the live TeddyPups UAE website, fixes the local replica, verifies changes, and continues across every page without requiring manual coordination.
---

# TEDDYPUPS UAE — FULL AUTONOMOUS REPLICATION MODE

## 1. MISSION

You are the primary Antigravity agent responsible for replicating the live TeddyPups UAE website as accurately as possible.

Your default mode is **AUTO**.

When invoked, independently perform the complete workflow:

EXPLORE → INSPECT → COMPARE → IDENTIFY → IMPLEMENT → VERIFY → REPEAT.

You must take ownership of the entire task.

Do not merely identify differences or suggest solutions. You must modify the local project and implement the necessary corrections.

Do not wait for separate AUDIT, FIX, or VERIFY instructions.

Do not ask the user to approve every individual correction. Make reasonable implementation decisions autonomously.

There are two mandatory priorities:

1. Fix the five homepage issues explicitly identified by the user.
2. After addressing those issues, explore and replicate every remaining page and section.

Follow this order strictly.

## 2. PROJECT CONFIGURATION

**Reference website:**  
https://puppy.instabizweb.com/

**Local project:**  
D:\Rish\Projects\TeddyPupsUAE

**Local development URL:**  
http://localhost:5174/

**Comparison viewport:**

- Width: 1440px
- Height: 900px
- Browser zoom: 100%
- Device scale factor: 1

Use the same viewport for reference and local comparisons.

Use separate browser contexts whenever supported.

Inspect the existing project structure, components, assets, dependencies, and implementation before making changes.

Reuse the existing local development server if it is already running. Do not start duplicate servers.

If it is unavailable, inspect the project configuration and start it using the correct existing command.

## 3. PRIORITY 0 — FIX THE FIVE HOMEPAGE ISSUES FIRST

These are mandatory first tasks. Do not begin general website-wide replication until these issues have been addressed and verified.

### FIX 1 — HERO TITLE COLOR AND ALIGNMENT

Reference requirements:

- "Premium teacup" must use `#2a170e`.
- "puppies in Dubai" must also use `#2a170e`.
- Both lines must have the same dark-brown text color.
- The second line must not use the terracotta accent color.
- Preserve the existing title alignment and approximately 270px visual gap between the title and mascot.
- Maintain accurate mascot positioning.

Tasks:

- Inspect `.heroLine2` and related CSS.
- Remove conflicting accent-color overrides.
- Match the reference typography, color, alignment, and spacing.
- Verify the result visually.

### FIX 2 — MEET THE PUPS SECTION

Reference requirements:

- The horizontal puppy-door sequence must remain sticky while the user scrolls through it.
- Preserve all 15 correct puppy portraits and the final end card.
- Preserve 3D door rotations and mascot positioning.
- Match the reference section height of approximately 4126px.

Tasks:

- Inspect `DoorsSection.jsx` and related styles.
- Investigate the arbitrary `+400` offset in the scroll-distance calculation.
- Derive the horizontal distance from the actual track width and viewport width.
- Calculate section height from real scroll requirements.
- Remove unnecessary extra scroll distance.
- Preserve horizontal animation, sticky behavior, and release point.
- Verify the complete sequence.

Do not solve the height mismatch by hiding content or reducing the number of doors.

### FIX 3 — PUPPY JOURNEY SECTION

Reference requirements:

- The phone remains sticky at approximately 116px from the viewport top.
- Preserve all three scroll-driven journey steps.
- Target section height: approximately 1697px.
- Target trailing space after the final step: approximately 165px.
- Scrolling down and up must update the journey proportionally.

Tasks:

- Inspect `.journeySection`, `.chatStep`, and related styles.
- Investigate excessive minimum heights and oversized step spacing.
- Remove unnecessary fixed heights and empty space.
- Derive dimensions from actual content and sticky behavior.
- Preserve the three-step sequence.
- Verify downward and upward scrolling.

### FIX 4 — HOMEPAGE FAQ STORYBOOK SECTION

The current generic white accordion is a major mismatch. Recreate the reference design.

Reference requirements:

- Dark chocolate gradient from approximately `#4d2b19` to `#2f1a10`.
- Cream-colored typography.
- Eleven golden twinkling SVG stars.
- Two-column layout.

Left column:

- FAQ heading.
- Ghost-style "Read all questions" CTA.
- Seated Teddy mascot.
- Question-mark speech bubble.

Right column:

- Three reference question-and-answer entries.
- Definition-list-style structure.
- Golden star bullets.

Tasks:

- Inspect the live reference FAQ section and its actual content.
- Replace the generic homepage accordion with the illustrated storybook layout.
- Match spacing, alignment, typography, decorative stars, and mascot placement.
- Preserve the dedicated `/faq` page and its independent functionality.
- Ensure the homepage CTA navigates to the correct FAQ route.

Do not simply restyle the existing generic accordion and call it complete.

### FIX 5 — FINAL DOORWAY CTA AND FOOTER BASKET

Replace the local beige floating CTA card with the reference's illustrated storybook scene.

Reference requirements:

- Full-width dark cocoa scene.
- Gradient from approximately `#2f1a10` to `#24130b`.
- Illustrated house doorway.
- Decorative plants.
- Entrance mat.
- Bowing Teddy mascot.
- Functional WhatsApp CTA.
- Ghost-style "Visit & contact" CTA.

Footer requirements:

- Dark cocoa background.
- Illustrated stars and decorative elements.
- Correct wicker basket.
- Mascot must settle inside the basket at the end of its scroll journey.

Tasks:

- Recreate the full-width doorway scene.
- Preserve correct CTA destinations and functionality.
- Inspect the existing `PupLayer` implementation and scroll interpolation.
- Fix the mismatch between the mascot's final anchor and the basket position.
- Compare viewport-relative bounding boxes at identical scroll states.
- Ensure the mascot stays visible throughout its scroll path.
- Verify that it enters and settles naturally inside the basket.

Do not hardcode coordinates until you inspect the actual DOM geometry and reference positioning.

## 4. PRIORITY 0 VERIFICATION

For each of the five homepage issues:

1. Open the reference and inspect the corresponding section.
2. Inspect the local implementation.
3. Identify the actual root cause.
4. Implement the correction.
5. Revisit the local section.
6. Repeat the same scroll or interaction sequence.
7. Compare the result against the reference.
8. Check for regressions.

Each issue has a maximum of THREE meaningful correction attempts.

If unresolved after three attempts:

- Mark it internally as `MANUAL REVIEW REQUIRED`.
- Remember the remaining mismatch and attempted fixes.
- Move on to the next issue.
- Do not continue experimenting indefinitely.

After all five issues have been addressed, perform a focused homepage regression check:

- Hero.
- Meet the Pups.
- Airplane animation.
- Puppy Journey.
- Happy Families.
- Homepage FAQ.
- Doorway CTA.
- Footer basket.

Only then proceed to Priority 1.

## 5. PRIORITY 1 — AUTONOMOUS WEBSITE-WIDE REPLICATION

After completing Priority 0, independently explore and replicate the rest of the website.

Do not wait for another user prompt.

Inspect all existing routes, including:

- `/`
- `/puppies`
- `/gone-home`
- `/happy-families`
- `/how-it-works`
- `/faq`
- `/contact`
- Individual puppy detail pages.

For every page, explore it like a real human visitor.

### Live exploration

Inspect:

- Header and navigation.
- Hero sections.
- Content layouts.
- Images and galleries.
- Cards and buttons.
- Forms and inputs.
- Accordions and expandable content.
- Sticky sections.
- Scroll-triggered animations.
- Decorative illustrations.
- Footer.
- Internal and external navigation.

Interact with the website:

- Hover over buttons, images, cards, and navigation items.
- Click interactive controls.
- Test galleries and image navigation.
- Test search and filtering.
- Test forms without submitting unintended real-world actions.
- Test keyboard navigation.
- Observe focus indicators.
- Check downward and upward scrolling.
- Check animation timing and reversibility.

Then perform the same exploration on the corresponding local page.

Do not assume existing components are accurate because an earlier implementation marked them PASS.

Recheck important components against the live reference.

## 6. VISUAL AND FUNCTIONAL COMPARISON

Live browser exploration is the primary investigation method.

Screenshots, DOM inspection, computed styles, and pixel comparisons are supporting tools.

Compare:

- Typography and font weights.
- Text colors and backgrounds.
- Gradients and shadows.
- Section dimensions.
- Margins and padding.
- Horizontal and vertical alignment.
- Image selection, cropping, and aspect ratios.
- Border radii and decorative elements.
- Sticky positioning.
- Scroll distances.
- Animation paths and timing.
- Hover and click states.
- Keyboard behavior.
- Navigation and functional outcomes.

For scroll-driven elements, compare equivalent interaction states rather than relying only on percentage page scroll.

Check both scrolling directions.

Do not invent features or content absent from the reference.

Preserve the reference's actual design and behavior.

## 7. AUTONOMOUS IMPLEMENTATION

For every mismatch:

1. Identify the reference behavior.
2. Identify the local behavior.
3. Determine the root cause.
4. Inspect relevant components, CSS, assets, and application logic.
5. Implement the smallest suitable correction.
6. Revisit the local page.
7. Repeat the same interaction.
8. Verify the result.
9. Check related components for regressions.

Prefer fixing the actual root cause instead of adding arbitrary CSS overrides or hardcoded positioning.

Preserve:

- Existing React and Vite architecture.
- Working routes.
- Existing assets and galleries.
- Completed animations.
- Existing functional behavior.
- Project organization.

Do not rebuild already accurate sections unnecessarily.

## 8. STRICT RETRY LIMIT

Maximum three meaningful attempts per individual issue.

**Attempt 1:** Implement the primary root-cause fix.

**Attempt 2:** Reassess the cause and implement a different targeted correction.

**Attempt 3:** Make one final focused correction and verify.

If still unresolved:

- Mark internally as `MANUAL REVIEW REQUIRED`.
- Retain the unresolved issue and attempted fixes in working context.
- Move to the next issue.

Never repeat the same ineffective fix or enter an infinite correction loop.

## 9. PRIORITIZATION

Within each phase, prioritize:

1. Critical: broken routes, missing sections, major structural or functional failures.
2. High: major visual differences, incorrect images, animations, and sticky behavior.
3. Medium: typography, spacing, colors, and alignment.
4. Low: decorative details and subtle microinteractions.

Do not spend excessive time polishing minor details while major mismatches remain.

## 10. BROWSER AUTOMATION

Use browser automation capabilities actually available in Antigravity.

If the built-in browser supports live navigation and interaction, use it.

If Playwright is installed and usable, use it for repeatable checks.

Do not assume Playwright is installed.

Do not claim that a page, interaction, route, or browser context was tested unless you actually tested it.

If a browser capability is unavailable:

- Identify the limitation internally.
- Use available browser and terminal capabilities.
- Do not fabricate results.
- Continue with what can actually be verified.

Wait for fonts, important images, and animations to reach appropriate states before taking measurements.

Do not rely exclusively on `networkidle`.

## 11. REGRESSION TESTING

After each meaningful correction:

- Recheck the affected section.
- Recheck related shared components.
- Check scroll behavior in both directions.
- Check console errors.
- Check failed network requests.
- Check broken images and fonts.
- Run the production build when appropriate.

After Priority 0 and Priority 1, perform a complete website-wide regression check.

## 12. ABSOLUTE PROJECT SAFETY RULES

- Do not deploy the website.
- Do not commit changes.
- Do not push to GitHub.
- Do not delete existing project assets.
- Do not overwrite unrelated files.
- Do not change architecture unnecessarily.
- Preserve Git history.
- Preserve existing tracked assets.
- Keep generated screenshots ignored through the existing `.gitignore` rule.
- Do not add broad image-extension ignore rules.
- Do not untrack existing files.

You are authorized to modify the local source code necessary to complete the replication task.

## 13. NO AUDIT REPORTS OR DOCUMENTATION

**The user does not want audit reports.**

Do not create, generate, or maintain:

- `VISUAL_FIDELITY_REPORT.md`
- `AUTONOMOUS_IMPLEMENTATION_REPORT.md`
- Any other audit report.
- Any implementation report.
- Any separate findings document.
- Any lengthy progress documentation.

Do not spend time documenting every mismatch.

You may use temporary screenshots, browser observations, DOM inspection, and internal working notes to understand and verify differences.

You may save temporary visual evidence when useful, but do not create report documents.

The primary objective is implementing the replica, not producing documentation.

At the end, provide only a concise conversational summary:

- What was fixed.
- What remains unresolved.
- Whether the production build succeeds.

## 14. FINAL COMPLETION CRITERIA

The task is complete only after:

- All five user-identified homepage issues have been addressed.
- All accessible website routes have been explored.
- All major sections have been inspected.
- Important interactive elements have been tested.
- Major visual and behavioral mismatches have been corrected.
- Scroll animations have been checked in both directions.
- No known critical failures remain.
- The final build succeeds.
- Regression checks have been performed.
- Remaining unresolved differences are clearly communicated to the user.

Do not declare full completion if critical mismatches remain.

## 15. EXECUTION COMMAND

START NOW.

First inspect the existing project and understand its current implementation.

Then execute Priority 0, followed automatically by Priority 1.

Do not stop after identifying differences.

Do not wait for additional instructions.

Do not ask the user to manually coordinate the phases.

Do not generate audit reports.

Take ownership of the complete implementation and verification process.

Your goal is to make the local TeddyPups UAE website as visually and functionally identical to the live reference as possible.
