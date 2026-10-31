# CLAUDE.md — TeddyPups Website Clone

> **Project:** TeddyPups website recreation  
> **Reference website:** https://puppy.instabizweb.com/  
> **Purpose:** Technical assignment — recreate the reference website, deploy it, publish the complete source code, and explain the implementation process in a Loom walkthrough.

This file is the primary project instruction document. Read it before making changes. Follow the repository's existing conventions and the specialist instructions in `.agents/` and `.skills/`.

---

## 1. Project objective

Recreate the TeddyPups reference website as accurately as reasonably possible.

The goal is to reproduce the actual reference experience—not to redesign it, create a generic pet-store website, or add features simply because they are common in e-commerce websites.

The implementation should reproduce, based on verified inspection:

- Page structure and section order.
- Visible text, headings, labels, and calls to action.
- Layout, spacing, sizing, alignment, and responsive behaviour.
- Typography, colours, borders, shadows, radii, and other visual details.
- Images, image crops, icons, and other media.
- Navigation destinations and interactive behaviour.
- Mobile, tablet, and desktop layouts.

Visual fidelity and functional correctness are both important. A static screenshot-like page is not sufficient if visible controls do not work.

## 2. Required final deliverables

The assignment is complete only when the following deliverables are ready:

1. **Working website:** a responsive implementation that closely matches the reference.
2. **Live deployment:** a public URL that opens and works without requiring a local development environment.
3. **GitHub repository:** complete source code, relevant project documentation, and setup instructions. Do not commit secrets, credentials, or unnecessary generated files.
4. **Loom walkthrough:** a clear recording explaining:
   - The final website and its important pages/interactions.
   - Project structure and implementation approach.
   - Technology stack and tools used.
   - AI tools/agents used and the prompts supplied to them.
   - Important technical and design decisions.
   - Challenges encountered and how they were resolved.
   - Testing, QA, and deployment process.

The user must understand the implementation well enough to explain and defend the work. Do not create code that the user cannot reasonably inspect or describe.

## 3. Project instructions and source of truth

Use the following evidence hierarchy:

1. **Live reference website** — source of truth for rendered appearance, visible content, routes, and behaviour.
2. **`REFERENCE_INSPECTION.md`** — shared record of verified pages, sections, assets, measurements, responsive layouts, and interactions.
3. **Current application code** — source of truth for what has actually been implemented.
4. **Existing repository documentation and configuration** — source of truth for project conventions, scripts, and tooling.
5. **Agent/skill instructions** — role-specific procedures and quality checks.

Do not silently replace missing evidence with assumptions.

### Important content rule

Never invent or casually alter:

- Puppy names, breeds, ages, availability, or other animal details.
- Prices, discounts, offers, or payment terms.
- Health claims, vaccination records, guarantees, or certifications.
- Customer names, testimonials, ratings, or reviews.
- Business credentials, locations, contact details, or social accounts.
- Navigation destinations, booking/enquiry flows, or other business actions.

Use only information verified from the reference or explicitly supplied by the user. If a detail cannot be verified, record it as unknown and ask for clarification or use a neutral implementation that does not misrepresent the business.

Do not use unrelated stock images as though they depict a specific puppy from the reference. Do not infer a puppy's breed or identity from an ambiguous image.

## 4. Repository structure and agent organization

The project uses two dedicated folders:

- `.agents/` — agent role definitions. These explain each agent's responsibility, scope, collaboration rules, and expected output.
- `.skills/` — reusable specialist workflows. Each skill should have its own folder and a `SKILL.md` entrypoint.

Expected organization (adapt names to the actual files present; do not overwrite existing user files without checking them):

```text
project-root/
├── .agents/
│   ├── reference-inspection.md
│   ├── visual-qa.md
│   ├── accessibility-auditor.md
│   └── code-reviewer.md
├── .skills/
│   ├── reference-inspection/
│   │   └── SKILL.md
│   ├── visual-qa/
│   │   └── SKILL.md
│   ├── accessibility-auditor/
│   │   └── SKILL.md
│   └── code-reviewer/
│       └── SKILL.md
├── CLAUDE.md
├── REFERENCE_INSPECTION.md
├── PROMPTS.md
├── README.md
├── package.json
└── src/
```

This is a suggested structure, not a requirement to force the repository into a particular framework or file layout. Inspect the actual files before creating, renaming, or moving anything.

### Agent responsibilities

- **Reference Inspection Agent:** inspects the live reference and maintains `REFERENCE_INSPECTION.md`. Inspection/documentation only; does not implement the application.
- **Main Development Agent:** implements the clone using verified findings. Owns application code and coordinates changes.
- **Visual QA Agent:** compares local and reference screenshots under matching conditions; reports ranked, measurable visual differences. Does not edit code unless explicitly asked.
- **Accessibility Auditor:** checks keyboard access, semantics, focus, forms, images, contrast, and responsive accessibility. Does not make broad refactors.
- **Code Reviewer:** reviews correctness, maintainability, functionality, scope, security, responsiveness, and build health. Does not edit code unless explicitly asked.

Agents must read this file and the relevant skill before starting their task. Do not assume the agent runtime automatically loads a skill just because a folder exists; use the installed environment's supported discovery/invocation mechanism.

## 5. Required working process

Follow this sequence. Parallelize independent inspection/review tasks only when doing so will not create conflicting edits.

### Phase 1 — Understand the repository

Before changing code:

1. Inspect the repository tree and current Git status.
2. Read `CLAUDE.md`, existing `README.md`, `package.json`, lockfile, and any existing `AGENTS.md` or project instructions.
3. Identify the current framework, build tool, package manager, routing approach, styling system, and available scripts.
4. Identify existing components, assets, and reusable code.
5. Preserve working configuration and conventions unless there is a clear reason to change them.

Do not assume a particular framework, directory structure, package manager, test runner, or deployment provider.

### Phase 2 — Inspect the reference

1. Open the reference website and confirm the final URL and page title.
2. Discover pages through the visible navigation and meaningful internal links.
3. Inspect every reachable page from top to bottom.
4. Record exact section order, visible copy, images, layout, and interactions.
5. Inspect desktop, tablet, and mobile layouts.
6. Capture screenshots for the key pages and states when tooling permits.
7. Update `REFERENCE_INSPECTION.md` with verified observations, measurements, estimates, and unknowns.

Do not treat a blank template or an unverified section list as completed inspection. Mark untested pages and states accurately.

### Phase 3 — Plan implementation

Before substantial coding:

1. Translate the inspection report into a page/section checklist.
2. Identify reusable components and shared design tokens.
3. Map reference assets to implementation assets.
4. Identify interactions and their expected outcomes.
5. Identify responsive layout changes.
6. Break implementation into small, verifiable tasks.

Prefer the simplest architecture that supports the requirements. Avoid unnecessary libraries, abstractions, state management, and infrastructure.

### Phase 4 — Implement

Build the page structure and core responsive layout first. Then implement styling, assets, and interactions.

After each major section:

- Run the application.
- Inspect the rendered result.
- Compare it with the corresponding reference section.
- Check the browser console for errors.
- Verify relevant interactions.
- Fix regressions before moving on.

Do not wait until the entire site is complete to perform visual checks.

### Phase 5 — QA and refinement

Use the specialist workflows in `.skills/`:

1. Visual QA for visual comparison and regression checks.
2. Accessibility audit for keyboard and accessibility issues.
3. Code review for engineering quality and build health.

Fix Critical and High priority findings before final delivery. Re-run the relevant checks after fixes. Record any deliberate deviations and any areas that could not be tested.

### Phase 6 — Deployment and submission

1. Run the production build using the repository's actual package scripts.
2. Resolve build errors and important console/runtime issues.
3. Deploy using the selected hosting provider.
4. Test the deployed public URL, including direct route loading and refresh where relevant.
5. Verify images, fonts, navigation, CTAs, and responsive layouts on the deployed site.
6. Push the complete source to GitHub.
7. Confirm the repository does not contain secrets or local-only dependencies.
8. Record the Loom walkthrough.
9. Update `README.md` with setup, run, build, and deployment information.

Do not claim deployment or testing succeeded until it has actually been verified.

## 6. Technology and implementation guidance

### Existing stack takes priority

If the repository already has a working stack, continue using it unless the user explicitly requests a change or there is a compelling technical blocker.

If starting from an empty repository, a reasonable default for this assignment is:

- React for UI.
- Vite for the development/build tool.
- TypeScript where it can be introduced without slowing or destabilizing the project.
- CSS modules or organized plain CSS for styling.
- A lightweight router only if multiple routes require it.

These are defaults, not mandatory requirements. Do not migrate an existing application merely to match this suggested stack.

### Component design

- Build components around real, repeated interface patterns.
- Keep components understandable and appropriately scoped.
- Separate repeated content data from presentation where useful.
- Avoid one enormous component for the entire website.
- Avoid creating abstractions for elements used only once unless they improve clarity.
- Keep state local unless it genuinely needs to be shared.

### Styling

- Reuse shared variables/tokens for repeated colours, spacing, radii, and typography where appropriate.
- Prefer layout systems such as Flexbox and Grid over arbitrary positioning.
- Avoid excessive absolute positioning for primary page layout.
- Avoid accumulating contradictory CSS overrides.
- Do not add arbitrary pixel nudges to hide a deeper layout issue.
- Use responsive rules based on the observed design, not assumed breakpoints.
- Preserve the reference's visual hierarchy and content density.

### Assets

- Prefer verified reference assets when they are accessible and permitted for use in the assignment.
- Keep asset filenames meaningful and paths stable.
- Use appropriate image formats and dimensions.
- Preserve the observed aspect ratio and crop.
- Use `object-fit` and `object-position` intentionally.
- Add suitable alt text.
- Do not use emoji as a substitute for a reference icon or logo.
- Do not add unrelated images or decorative elements that change the reference design.

### Functionality

Every visible control that appears interactive should work as expected:

- Navigation links should navigate to the correct destination.
- Buttons should perform their advertised action.
- Mobile navigation should open and close correctly.
- Accordions, galleries, carousels, tabs, forms, and dialogs should work if they exist on the reference.
- Phone, email, messaging, and social links should use verified destinations.
- Forms should provide useful validation and feedback if included.

Do not invent a backend or real booking/purchase flow when the reference only exposes a contact link. Do not submit real enquiries or trigger real-world actions during testing without authorization.

## 7. Visual fidelity requirements

The reference—not personal design preference—is the visual target.

Pay particular attention to:

- Overall content width and horizontal alignment.
- Header height, position, and spacing.
- Hero dimensions, text placement, and image treatment.
- Section order and vertical rhythm.
- Grid and card dimensions.
- Typography family, scale, weight, line-height, and wrapping.
- Image identity, aspect ratio, crop, and object position.
- Button dimensions, colours, borders, and hover/focus states.
- Background colours, dividers, shadows, and corner radii.
- Footer layout and spacing.
- Mobile-specific layout and navigation.

Capture reference and local screenshots at the same viewport dimensions, browser zoom, and device-pixel ratio whenever possible. Wait for fonts and images to load. Compare the same scroll position and interaction state.

Do not assume a screenshot is valid merely because the capture command completed. Confirm that it contains the intended rendered page.

### Recommended viewport test set

Use these as repeatable test sizes where browser tooling permits:

- 1440 × 900 — wide desktop.
- 1366 × 768 — laptop.
- 768 × 1024 — tablet.
- 390 × 844 — mobile.

These are test viewports, not claims about the reference's original breakpoints.

## 8. Accessibility and usability

At minimum:

- Use semantic HTML elements.
- Maintain a logical heading hierarchy.
- Use anchors for navigation and buttons for actions.
- Provide accessible names for icon-only controls.
- Provide meaningful alt text for informative images and empty alt text for decorative images.
- Ensure all interactive elements are keyboard accessible.
- Keep visible focus indicators.
- Ensure menus, dialogs, and overlays manage focus appropriately.
- Associate form controls with labels and errors.
- Do not communicate essential information using colour alone.
- Check text and control contrast.
- Prevent unintended horizontal overflow at mobile widths.
- Respect reduced-motion preferences where animations are used.

Do not claim formal WCAG conformance unless the scope of testing supports that claim.

## 9. Performance, security, and code quality

- Avoid unnecessary dependencies.
- Optimize image sizes and formats.
- Avoid shipping large assets that are not used.
- Use lazy loading for below-the-fold imagery where appropriate.
- Avoid avoidable layout shifts.
- Handle loading and error states where needed.
- Do not expose API keys, passwords, tokens, or private configuration.
- Keep secrets in environment variables and out of Git.
- Avoid unsafe HTML injection and untrusted content rendering.
- Do not log personal information unnecessarily.
- Remove debug code and dead code before delivery.
- Keep naming and formatting consistent with the existing project.
- Do not suppress warnings without understanding them.

## 10. Testing and verification

Inspect `package.json` and project documentation to determine which commands actually exist. Do not invent script names.

Run the relevant available checks, such as:

- Development server and manual browser verification.
- Lint.
- Type checking.
- Unit/component tests.
- Production build.
- Direct route loading and refresh.
- Responsive viewport checks.
- Browser console and failed network request checks.

For each check, report:

- Exact command or manual test.
- Whether it was run.
- Observed result.
- Any limitation or failure.

A check that was not run must be marked `Not run`, not `Passed`.

## 11. AI tool and prompt transparency

Maintain `PROMPTS.md` throughout development.

Record the meaningful prompts used with AI tools and agents, including:

- Date or development phase.
- Tool/agent used.
- The actual prompt or a faithful record of it.
- Files or tasks affected.
- Any important human decision or correction.

Do not fabricate prompts after the fact or claim that AI generated work it did not generate. The Loom walkthrough should explain how AI assistance was used and what was independently reviewed or changed.

## 12. Collaboration and change management

- Read the relevant agent and skill instructions before delegating work.
- Give agents a clearly bounded task and expected output.
- Do not let inspection/review agents modify implementation files unless authorized.
- Avoid multiple agents editing the same files simultaneously.
- Before accepting a proposed change, inspect its diff.
- Preserve existing user work; never overwrite files blindly.
- Do not delete configuration, assets, or documentation without checking their purpose.
- Keep changes focused and explain non-obvious decisions.
- If an instruction conflicts with the live reference or verified project evidence, report the conflict rather than silently guessing.

## 13. Definition of done

### Reference coverage
- [ ] All reachable pages have been inventoried.
- [ ] All major sections have been inspected and recorded.
- [ ] Visible content and business claims are verified.
- [ ] Important assets are identified and mapped.
- [ ] Key interactions and destinations are recorded.
- [ ] Desktop, tablet, and mobile behaviour has been inspected.

### Implementation
- [ ] All agreed pages and sections are implemented.
- [ ] Content and section order match verified reference evidence.
- [ ] Images, icons, typography, colours, and layout are close to the reference.
- [ ] Navigation and visible controls work.
- [ ] Responsive layouts work without unintended overflow.
- [ ] No important placeholder content or dead controls remain.

### Quality
- [ ] Visual QA completed for agreed viewports and states.
- [ ] Accessibility audit completed within its stated scope.
- [ ] Code review completed.
- [ ] Critical and High findings are resolved or explicitly accepted.
- [ ] Relevant lint/type/test/build checks have been run and results recorded.
- [ ] No known secrets are committed.
- [ ] No important browser console/runtime errors remain.

### Submission
- [ ] Production build succeeds.
- [ ] Public deployment URL is verified.
- [ ] GitHub repository is pushed and accessible as intended.
- [ ] README contains setup and run instructions.
- [ ] `PROMPTS.md` reflects actual AI-assisted work.
- [ ] Loom walkthrough is recorded and ready to share.
- [ ] The user can explain the implementation and key decisions.

---

## 14. Final instruction

When uncertain, inspect first and ask rather than inventing. Prioritize an accurate, functional, responsive recreation of the actual TeddyPups reference over unnecessary complexity or speculative features. Keep the implementation understandable, test every important claim, and make the final submission easy to run, review, and explain.
