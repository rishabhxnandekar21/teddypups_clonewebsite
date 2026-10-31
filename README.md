# TeddyPups UAE — Clone Project

A high-fidelity recreation of the [TeddyPups UAE](https://puppy.instabizweb.com/) website, built as a React + JavaScript + Vite application.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | JavaScript (ESNext / JSX) |
| Build Tool | Vite 6 |
| Routing | React Router 7 |
| Icons | Lucide React |
| Styling | CSS Modules + Global CSS with design tokens |
| Package Manager | npm |

## Fonts

- **Fraunces** — Display headings (variable weight, optical size)
- **Shantell Sans** — Handwritten/informal accent text
- **Figtree** — Body text, navigation, controls

All fonts loaded via Google Fonts.

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
```

Output in `dist/`

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  assets/           Static assets imported by components
  components/
    layout/         Header, Footer, PageLayout
    common/         Shared UI primitives (Button, Badge, etc.)
    sections/       Page section components
    ui/             Domain-specific UI (PuppyCard, AccordionItem, etc.)
  pages/            Route-level page components
  routes/           React Router configuration
  hooks/            Custom React hooks
  styles/
    tokens.css      CSS custom properties (design system)
    global.css      CSS reset, base styles, utility classes
    typography.css  Font declarations
  data/             Static content (puppies, faq, alumni, navigation)
  utils/            Helper functions

public/
  brand/            Logo and brand assets
  media/            Puppy photography
  fonts/            Self-hosted fonts (if applicable)

reference/          Reference screenshots from live site (not committed)
.agent/             Agent definitions
.skills/            Skill definitions
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/puppies` | Available Puppies |
| `/puppies/:slug` | Individual Puppy Profile |
| `/gone-home` | Alumni Gallery |
| `/happy-families` | Testimonials |
| `/how-it-works` | Adoption Guide |
| `/faq` | FAQ Accordion |
| `/contact` | Contact & Showroom |

## Design System

Design tokens are defined in [`src/styles/tokens.css`](src/styles/tokens.css).

### Brand Colours

| Token | Value | Usage |
|---|---|---|
| `--color-cocoa` | `#2a170e` | Primary text |
| `--color-milk` | `#fffdf8` | Page background |
| `--color-toffee` | `#c2622b` | Primary CTA |
| `--color-honey` | `#f2be6b` | Warm accent |
| `--color-cream` | `#fbf5e8` | Card backgrounds |
| `--color-night` | `#24130b` | Footer background |
| `--color-whatsapp` | `#1f7a4d` | WhatsApp CTA |

## Reference Website

- URL: https://puppy.instabizweb.com/
- Inspection report: [`REFERENCE_INSPECTION.md`](REFERENCE_INSPECTION.md)
- Reference screenshots: `reference/` directory

## Development Guidelines

See [`CLAUDE.md`](CLAUDE.md) for the complete development specification.

## AI Assistance Log

See [`PROMPTS.md`](PROMPTS.md) for a record of AI prompts and decisions.
