# PROMPTS.md — AI Assistance Log

This file records AI prompts, decisions, corrections, and rationale throughout the TeddyPups UAE clone project.

---

## Phase 0: Project Reconnaissance

**Date:** 2026-11-01  
**Agent:** Antigravity (Google DeepMind)  
**Prompt summary:** Read CLAUDE.md, explore .agent/ and .skills/ directories, inventory the full project structure, understand agent roles and skill workflows, identify environment capabilities (Node, npm, Playwright, Chrome).

**Key discoveries:**
- Node.js v24.13.0, npm 11.6.2, Playwright 1.64.1 (via npx), system Chrome available
- 5 agent definitions found: reference-inspection-agent, main-development-agent, visual-qa, a11y-auditor, code-reviewer
- 4 skill definitions found: reference-inspection, visual-qa, accessibility-auditor, code-reviewer
- npx playwright screenshot confirmed working with `--channel=chrome --wait-for-timeout=5000`
- Reference site uses Next.js + Tailwind CSS v4 with Wix Media CDN images

**Decisions made:**
- Use `npm` (not pnpm/yarn/bun) per CLAUDE.md instruction
- Use `npx playwright` for screenshots (not @playwright/test API which requires separate package)
- NODE_PATH workaround for Playwright API scripts: `C:\Users\risha\AppData\Local\npm-cache\_npx\e41f203b7505f1fb\node_modules`

---

## Phase 1: Reference Website Inspection

**Date:** 2026-11-01  
**Agent:** reference-inspection-agent (subagent, read-only)  
**Prompt summary:** Comprehensive inspection of https://puppy.instabizweb.com/ — all pages, sections, content, typography, colours, responsive layouts, interactive elements. Capture screenshots at 4 viewport sizes.

**Key findings:**
- 8 routes: /, /puppies, /puppies/:slug, /gone-home, /happy-families, /how-it-works, /faq, /contact
- 15 active puppy listings (20 total cards scraped including 5 additional)
- 27 gone-home alumni boarding passes
- 64 happy families testimonial images
- Design tokens extracted via browser DevTools: exact CSS variable values confirmed
- Fonts confirmed: Fraunces (variable), Shantell Sans, Figtree — all from Google Fonts
- Contact details verified: phone, WhatsApp URL, email, address, social links
- 20 reference screenshots captured across all pages and viewport sizes

**Corrections:**
- Initial Playwright screenshots captured splash screen. Fixed by adding `--wait-for-timeout=5000`.
- reference-inspection-agent has read-only tools. Parent agent (Antigravity) wrote REFERENCE_INSPECTION.md from reported findings.

**Output:** `REFERENCE_INSPECTION.md` (fully populated), `reference/` directory with 20 screenshots.

---

## Phase 2: Project Scaffolding

**Date:** 2026-11-01  
**Agent:** Antigravity (Google DeepMind)  
**Prompt summary:** Initialize React + TypeScript + Vite app. Install dependencies. Create directory structure. Design system tokens. Font declarations. Router with 9 routes. Placeholder pages. Layout components (Header, Footer, PageLayout). Data files (puppies, faq, alumni, navigation). TypeScript types. Utility functions. Asset downloads. README.md.

**Approach:**
- `npm create vite@latest . -- --template react-ts` was cancelled by interactive prompt detecting existing files → created all project files manually instead
- All CSS custom properties match verified reference values exactly (not approximated)
- Google Fonts import used (vs self-hosting) — simpler for scaffolding; can switch to self-hosted woff2 in Phase 3
- Puppies data originally had 15 entries; Playwright scrape of /puppies revealed 20 total cards → 5 additional puppies added (pomeranian-ace-boy, poodle-leo-male, maltipoo-mia-girl, maltipoo-sadie-girl, blue-marle-pomeranian)
- All 20 puppy images downloaded via Playwright + HTTPS from reference CDN
- Logo downloaded from https://puppy.instabizweb.com/brand/logo.png (175 KB)

**Quality checks:**
- `tsc --noEmit` → 0 errors
- `npm run build` → success (dist/ created, 344 KB JS, 11.5 KB CSS)
- All 9/9 routes verified via Playwright (HTTP 200, correct page titles)
- Dev server: http://localhost:5173

**Scope respected:**
- No full page implementations (placeholder screens only)
- No backend, auth, cart, or payment systems
- No invented content — all data verified from reference inspection
- CLAUDE.md, .agent/, .skills/, REFERENCE_INSPECTION.md, reference/ preserved intact

---

## Phase 2 Update: Technology Decision — Migration from TypeScript to JavaScript

**Date:** 2026-11-01  
**Agent:** Antigravity (Google DeepMind)  
**Prompt summary:** Migrate the existing React 19 + Vite application from TypeScript to JavaScript while preserving all completed Phase 2 work (routes, layout, data, tokens, styles, assets).

**Approach & Actions:**
- Converted all `.tsx` components and pages to `.jsx`:
  - `src/App.jsx`, `src/main.jsx`
  - `src/components/layout/Header.jsx`, `Footer.jsx`, `PageLayout.jsx`
  - `src/pages/HomePage.jsx`, `PuppiesPage.jsx`, `PuppyDetailPage.jsx`, `GoneHomePage.jsx`, `HappyFamiliesPage.jsx`, `HowItWorksPage.jsx`, `FaqPage.jsx`, `ContactPage.jsx`, `NotFoundPage.jsx`
  - `src/routes/index.jsx`
- Converted data and utility files from `.ts` to `.js`:
  - `src/data/puppies.js` (all 20 puppy listings intact)
  - `src/data/alumni.js` (all 27 alumni boarding passes intact)
  - `src/data/faq.js` (all 9 verified FAQ items intact)
  - `src/data/navigation.js`
  - `src/utils/index.js`
- Removed TypeScript types (`src/types/index.ts`, `src/vite-env.d.ts`) and stripped annotations/generics across components.
- Removed TypeScript configuration files (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.tsbuildinfo`).
- Converted `vite.config.ts` to `vite.config.js`.
- Updated `index.html` entry script reference to `/src/main.jsx`.
- Cleaned up `package.json` (removed `@types/react`, `@types/react-dom`, `typescript`; updated build script to `vite build`).
- Ran `npm install` to prune unused dependencies.

**Verification:**
- `npm run build` executed successfully without errors (`dist/` generated cleanly in < 3s).
- Verified all 9 routes with Playwright in headless Chrome.
- 0 browser console errors / uncaught exceptions detected across all routes.
- Brand logo and images confirmed loaded.

---

## Phase 3: Component & Page Implementation

**Date:** 2026-11-01  
**Agent:** Antigravity (Google DeepMind)  
**Prompt summary:** Implement the complete website, prioritizing visual fidelity to the reference over creative redesign. Build shared UI components, full Homepage, Puppies listing & filters, Puppy detail pages, Gone Home, Happy Families, How It Works, FAQ, Contact, and Not Found page. Use React 19 + JavaScript + Vite, with zero invented content.

**Approach & Implementation Details:**
1. **Shared UI & Layout:**
   - `ScallopHem`: SVG semicircular scallop pattern ribbon for Header and Footer.
   - `PawIcon`: Vector 4-toed paw print used for active route indicator, buttons, and accents.
   - `SplashCurtain`: Fullscreen intro curtain with animated cartoon puppy and paw prints on page load.
   - `Header`: Fixed sticky header with active paw indicator, WhatsApp CTA, and honey mobile menu drawer (`#f2be6b`). Added sticky mobile bottom action bar (`WhatsApp us` + `Call`).
   - `Footer`: Dark chocolate theme with scalloped top, Explore navigation, contact information, and social links.
2. **Page Implementations:**
   - **Home (`/`)**: Hero with arches puppy gallery, "Meet the pups" 6-card preview, "Two ways to meet your puppy" (Showroom vs Import), 3-step journey timeline, "Why families trust TeddyPups" guarantees, Happy Families polaroids preview, FAQ preview, and final booking CTA.
   - **Puppies (`/puppies`)**: Filter bar with origin pills (`All`, `In Dubai`, `Imported`) and breed pills (`All`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih-Tzu`). Responsive grid of `PuppyCard` components with live count, video badges, and bottom alumni banner.
   - **Puppy Detail (`/puppies/:slug`)**: Breadcrumbs navigation, high-res photo with video tag, stitched border spec card, WhatsApp booking CTA with pre-filled message, complete adoption inclusions checklist, and related puppies showcase.
   - **Gone Home (`/gone-home`)**: 27 verified vintage boarding passes with perforated notch cutouts, circular puppy portrait, route lines, amber `admit one` stubs, and departure route filtering.
   - **Happy Families (`/happy-families`)**: Pinned client review note from Sarah M. with translucent washi tape, 64-moments counter badge, and responsive polaroid gallery with realistic angles and tape strips.
   - **How It Works (`/how-it-works`)**: Quick jump nav pills, interactive two-way adoption switcher (`In Dubai (meet in person)` vs `Imported (order upon request)`), 4-step adoption timeline, promise cards, and delivery options.
   - **FAQ (`/faq`)**: Corkboard background with multi-colored pushpins, interactive search bar ("sniff out a question"), note counter, and animated accordion notes.
   - **Contact (`/contact`)**: Downtown Dubai showroom details, operating hours, direct channels, and custom vintage Airmail stationery letterform with red/blue border ribbon, postage stamp, and inline dashed fields.
   - **Not Found (`*`)**: Lost pup alert theme with clear navigation back to Home and Puppies.
3. **Data & Asset Integrity:**
   - Downloaded and locally hosted all 20 puppy portrait assets, 27 alumni portraits, and family polaroids.
   - Preserved all contact details: phone `+971 54 167 6733`, email `teddypupsadmin@gmail.com`, showroom in Downtown Dubai.

**Verification:**
- `npm run build`: Succeeded in **2.96s** (0 errors).
- Automated Playwright suite tested across Desktop (1440x900) and Mobile (390x844).
- All 9 routes verified HTTP 200 with correct page titles.
- Interactive tests passed:
  - Mobile menu drawer open & close
  - Puppy filter pills (e.g. Maltipoo filters from 20 to 8)
  - FAQ accordion expansion
  - How It Works tab switching
- **0 console errors or uncaught exceptions** across all pages and viewports.

---

## Phase 4: Polish, Refinement & Comprehensive Audit

**Date:** 2026-11-01  
**Agent:** Antigravity (Google DeepMind)  
**Prompt summary:** Polish & refine the TeddyPups UAE website clone. Visual fidelity audit against live site and reference screenshots, functional audit of interactive elements, responsive audit across 5 viewports (1440x900, 1366x768, 768x1024, 390x844, 360x800), accessibility checks, and production build verification.

**Git Checkpoint:**
- Committed Phase 3 implementation cleanly to `master` as `0f57d1c` (`feat: implement TeddyPups UAE website pages and components`).

**Visual & Responsive Fixes:**
1. **Header Mobile Height Adaptation:** Added responsive header height rule (`var(--header-h-mobile) = 4rem` at `< 1024px`) to eliminate vertical offset on mobile devices.
2. **Contact Form Mobile Formatting:** Replaced rigid inline input widths with 100% width block layout below 480px, eliminating mobile horizontal overflow on `/contact`.
3. **Boarding Ticket Compact Typography:** Tightened ticket padding, reduced circular photo dimensions slightly on mobile screens (58px vs 70px), and styled the flight route arrow (`➔`) with auto ellipsis to prevent card stretching.
4. **Gone Home Header Actions Wrapping:** Added `flex-wrap: wrap` and column flow on mobile (`< 480px`) for `.headerActions`, eliminating 12px overflow at 390px and 27px overflow at 360px.
5. **Puppy Detail Card & Grid Constraints:** Added `minmax(0, 1fr)` to `.detailGrid`, `min-width: 0; max-width: 100%;` to `.mediaCol` and `.specCard`, and mobile wrapping for `.ctaActions`, eliminating 24px overflow at 360px.
6. **Button Global Safeguards:** Added `max-width: 100%; box-sizing: border-box;` and responsive `.btn-lg` sizing at `< 480px` in `src/styles/global.css`.

**Accessibility & Performance Enhancements:**
- Added universal `:focus-visible` accessible outline rules (3px solid `var(--color-toffee)` with 3px offset) in `global.css`.
- 100% of images verified to have descriptive and meaningful `alt` text.
- 100% of buttons verified to possess accessible text or `aria-label`.
- Semantic heading structure (`h1` through `h4`) maintained across all templates.

**Automated Playwright Audits:**
- **Responsive Layouts (5 Viewports × 9 Routes = 45 Checks):**
  - 1440 × 900: **0px overflow** (all 9 routes)
  - 1366 × 768: **0px overflow** (all 9 routes)
  - 768 × 1024: **0px overflow** (all 9 routes)
  - 390 × 844: **0px overflow** (all 9 routes)
  - 360 × 800: **0px overflow** (all 9 routes)
- **Interactive Functional Checks:**
  - Mobile honey drawer opens, displays links + WhatsApp CTA + phone, and closes cleanly.
  - Puppy listings display all 20 cards; origin filter ("In Dubai") isolates 7 puppies; breed filter ("Maltipoo") isolates 6 puppies; reset restores all 20.
  - FAQ search filters questions dynamically in real time; accordion panels expand and collapse.
  - Contact stationery letterform accepts all input cleanly and formats WhatsApp inquiry message.
  - Gone Home filters show 12 local showroom handovers, 15 international chaperoned flights, and 27 total passes.
- **Production Build:** `npm run build` succeeds in **3.31s** (`dist/` generated with 0 errors).
- **Browser Console:** **0 console errors or warnings** on all routes.
