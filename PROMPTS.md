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

## Pending (Phase 3+)

- Phase 3: Full component and page implementation
- Phase 4: Polish and animations
- Phase 5: QA, accessibility audit, code review, visual comparison
