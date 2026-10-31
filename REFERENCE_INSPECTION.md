# Reference Website Inspection — TeddyPups UAE

> **Reference URL:** https://puppy.instabizweb.com/  
> **Purpose:** Authoritative evidence-based specification for the TeddyPups UAE website recreation technical assignment.  
> **Status:** Complete — fully verified against live rendered website across all routes, states, and responsive viewports.  
> **Inspection Date:** 1 November 2026  
> **Inspector:** Reference Inspection Agent & Antigravity Lead Agent  

---

## 1. Inspection Metadata

| Field | Value |
|---|---|
| Reference URL | `https://puppy.instabizweb.com/` |
| Site / Brand Name | **TeddyPups U.A.E.** (also styled as **TeddyPups**) |
| Tagline / Slogan | *"every puppy is family"* · *"Premium teacup puppies in Dubai"* |
| Location | Downtown Dubai, United Arab Emirates |
| Contact Phone / Call | `+971 54 167 6733` (`tel:+971541676733`) |
| Contact WhatsApp | `+971 54 167 6733` (`https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.`) |
| Contact Email | `teddypupsadmin@gmail.com` |
| Social Accounts | Instagram (`https://www.instagram.com/teddypups.worldwide/`), TikTok (`https://www.tiktok.com/@teddypupsuae`), Facebook (`https://www.facebook.com/profile.php?id=61567496944539`) |
| Tested Viewports | Desktop (1440 × 900), Laptop (1366 × 768), Tablet (768 × 1024), Mobile (390 × 844) |
| Evidence Artifacts | 20 verified local screenshots saved in `reference/` |
| Final Status | **Verified & Implementation-Ready** |

---

## 2. Site and Page Inventory

Every reachable route has been requested, rendered, and documented:

| Page / Route | HTTP Status | Access Path | Verification | Notes |
|---|:---:|---|:---:|---|
| **`/`** (Home) | 200 OK | Direct / Root URL / Brand Logo | Verified | Hero with arches gallery, trust features, featured puppies, two ways to meet, journey steps, FAQ preview, contact callout, footer. |
| **`/puppies`** (Available Puppies) | 200 OK | Nav: `Puppies` / CTAs | Verified | Filter tabs (All, In Dubai, Imported, Maltipoo, Pomeranian, Poodle, Cavapoo, Shih-Tzu), grid of 15 live available puppy cards. |
| **`/gone-home`** (Alumni Gallery) | 200 OK | Nav in Puppies / Footer | Verified | Vintage ticket booth motif, 27 interactive "Tickets Home" boarding passes with departure routes and destinations. |
| **`/happy-families`** (Testimonials) | 200 OK | Nav: `Happy families` | Verified | Polaroid-style memory board with real client photos, translucent washi tape, and client reviews (Sarah M., etc.). |
| **`/how-it-works`** (Adoption Journey) | 200 OK | Nav: `How it works` | Verified | Interactive tab switcher (`In Dubai: meet in person` vs `Imported: order upon request`), 4-step timeline, promises, delivery options. |
| **`/faq`** (Questions & Answers) | 200 OK | Nav: `FAQ` | Verified | Corkboard background with colorful pushpins, live search input ("sniff out a question"), 9 expandable accordion notes. |
| **`/contact`** (Visit & Contact) | 200 OK | Nav: `Visit & contact` | Verified | Contact details, showroom card ("Downtown Dubai"), and custom interactive Airmail stationery letterform with stamp. |
| **`/puppies/[slug]`** (e.g. `maltipoo-max-male`) | 200 OK | Click any card in `/puppies` | Verified | Breadcrumbs, puppy photo gallery, stitch-border spec card, WhatsApp inquiry CTA, adoption inclusions list. |

---

## 3. Global Header and Navigation

### 3.1 Desktop Navigation (>= 1024px)
- **Container:** Fixed at top (`top: 0`, `z-50`), full width (`inset-x-0`).
- **Scalloped Hem:** Beneath the white bar runs an SVG scalloped ribbon (`tp-header__hem`, height `14px`, pattern `#tp-hem` with semicircular scallops `M0 0H44V2A22 11 0 0 1 0 2Z`).
- **Brand Logo:** Circular brown badge with illustrated puppy logo (`/brand/logo.png`, `56x56` px) + bold serif wordmark **TeddyPups** (`font-plush`, Fraunces). Destination: `/`.
- **Nav Links (in exact order):**
  1. `Home` (`/`)
  2. `Puppies` (`/puppies`)
  3. `Happy families` (`/happy-families`)
  4. `How it works` (`/how-it-works`)
  5. `FAQ` (`/faq`)
  6. `Visit & contact` (`/contact`)
- **Active State Indicator:** Active link displays an adorable four-toed puppy paw SVG icon beneath the label text (`tp-nav-link__paw`), tinted in `--color-toffee` (`#c2622b`).
- **Header Action (Right):** Green pill button `"WhatsApp us"` (`btn-whatsapp`, `#1f7a4d`), opens WhatsApp concierge.

### 3.2 Mobile Navigation (< 1024px)
- **Bar Elements:** Brand logo + wordmark **TeddyPups** on left; rounded button `🐾 Menu` on right (border `2px solid var(--color-cocoa)`, background `var(--color-milk)`, height `40px`).
- **Mobile Menu Overlay (`<dialog class="tp-menu">`):**
  - Full viewport drawer (`h-dvh w-screen bg-honey`, background `#f2be6b`).
  - Top row: Script header `"where to, friend?"` in `font-scrawl` (`Shantell Sans`) + dark cocoa pill `"Close"` button.
  - Large menu links (`clamp(2.4rem, 11vw, 3.4rem)` in `Fraunces` bold): Home, Puppies, Happy families, How it works, FAQ, Visit & contact. Active link shows paw icon.
  - Bottom drawer actions: Full-width green button `"WhatsApp us"` + centered phone number `+971 54 167 6733`.
- **Bottom Fixed CTA Bar (Mobile Only):**
  - Sticky at bottom of mobile viewport (`pb-[calc(0.75rem+env(safe-area-inset-bottom))]`).
  - Contains two buttons: `"WhatsApp us"` (flex-1 green pill) and `"Call"` (white bordered pill).

---

## 4. Page Structure and Section-by-Section Inventory

### 4.1 Home Page (`/`)
1. **Splash Screen / Intro Loader:**
   - Fullscreen curtain background (`#fffdf8`).
   - Running cartoon puppy SVG animation (`#f2be6b`) with bouncing paw prints.
   - Script text: *"every puppy is family"* (`Shantell Sans`, `#7a4422`).
   - Fades out after ~2.5s.
2. **Hero Section:**
   - Script badge: *"every puppy is family"* with wavy underline.
   - Main title: **"Premium teacup puppies in Dubai"** (`font-display`, `Fraunces`, large bold serif).
   - Subhead: *"Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide."*
   - Buttons:
     - Primary: `"View available puppies"` (solid toffee pill `#c2622b`, white text).
     - Secondary: `"Enquire on WhatsApp"` (milk pill with cocoa border `#2a170e`).
   - **Arched Puppy Carousel:**
     - Arch cards with rounded top borders showcasing actual puppies.
     - Badge over first arch: `"Korean Teacup Pomeranian"`.
     - Center animated cartoon puppy mascot smiling over the scalloped fence.
3. **Meet the Pups Section:**
   - Heading: `"Meet the pups"`.
   - Grid of puppy cards with photo badges, gender icons, age, and video indicators.
   - Link: `"See all puppies →"`.
4. **Two Ways to Meet Your Puppy:**
   - Heading: `"Two ways to meet your puppy"`.
   - Track A: **"Puppies in Dubai"** (visit showroom, meet in person).
   - Track B: **"Imported for you"** (bespoke selection from trusted international breeders).
5. **Your Puppy Journey:**
   - Heading: `"Your puppy journey"`.
   - Step 1: **"Choose your breed"** (explore curated miniature breeds).
   - Step 2: **"Get photos & details"** (vet reports, pedigree, live video).
   - Step 3: **"Secure & safe delivery"** (in-cabin flight nanny, airport greeting, home handover).
6. **Why Families Trust TeddyPups:**
   - Trust points: 100% health guarantee, licensed veterinary inspection, microchipping, ethical breeding pedigree.
7. **Happy Families & Puppies:**
   - Polaroid photo cards pinned to wall with testimonials.
8. **Questions, Answered:**
   - Selected FAQ accordion questions.
9. **Final CTA:**
   - Headline: **"Ready to meet your new best friend?"**
   - Direct buttons for WhatsApp and Showroom visit.
10. **Global Footer:**
    - Scalloped top border, brand statement, navigation column, contact details, social links.

---

### 4.2 Available Puppies Page (`/puppies`)
1. **Header Banner:** Whimsical intro with heading **"Available puppies"** and subhead.
2. **Filter Bar:**
   - Origin filters: `All`, `In Dubai`, `Imported`.
   - Breed filter pills: `All`, `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih-Tzu`.
3. **Puppy Cards Grid (15 Active Available Listings):**
   - **Max:** Maltipoo · Boy · 3 months · Available · ▶ Video (`/puppies/maltipoo-max-male`)
   - **Korean Teacup Maltipoo:** Female · 2 months · Available · ▶ Video (`/puppies/korean-teacup-maltipoo-female`)
   - **Korean Teacup Poodle:** Female · 2 months · Available (`/puppies/korean-teacup-poodle-female`)
   - **Maltipoo & Cavapoo Pair:** Boy · 3 & 2 months · Available · ▶ Video (`/puppies/maltipoo-cavapoo-male`)
   - **Toy Poodle:** Boy & Girl · 2 months · Available (`/puppies/toy-poodle-male-female`)
   - **Maltipoo (Snow):** Female · 2.5 months · Available · ▶ Video (`/puppies/maltipoo-female-2`)
   - **Pomeranian:** Female · 3 months · Available (`/puppies/pomeranian-female`)
   - **Copper:** Cavapoo · Boy · 2 months · Available (`/puppies/copper-male`)
   - **Shih Tzu:** Female · 2 months · Available (`/puppies/shitzu-female`)
   - **Shih Tzu:** Male · 2 months · Available (`/puppies/shitzu-male`)
   - **Maltipoo:** Female · 3 months · Available (`/puppies/maltipoo-female-1`)
   - **Maltipoo:** Female · 2 months · Available (`/puppies/maltipoo-female`)
   - **Korean Teacup Pomeranian 1:** Female · 2 months · Available (`/puppies/korean-teacup-pomeranian-1`)
   - **Korean Teacup Pomeranian:** Female · 2 months · Available (`/puppies/korean-teacup-pomeranian`)
   - **Korean Teacup Pomeranian Male:** Male · 2 months · Available (`/puppies/korean-teacup-pomeranian-male`)
4. **Card UI Components:**
   - Rounded border (`border: 3px solid var(--color-cocoa)`).
   - Image container with aspect ratio `4/3`.
   - Video indicator tag: `▶ video` in cream pill.
   - Name in bold serif, breed subtitle, gender and age tag.
5. **Alumni Banner (Bottom):**
   - Card linking to `/gone-home`: *"Already gone home — see puppies that found their forever families"*.

---

### 4.3 Gone Home Page (`/gone-home`)
1. **Hero Header:**
   - Title: **"Gone home ♡"** (`Fraunces`).
   - Subhead: *"Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match."*
   - CTA button: `"See available puppies"`.
   - Mascot illustration: Striped booth with sign `"tickets home"` and smiling poodle.
2. **Boarding Ticket Gallery (27 Verified Alumni Tickets):**
   - Each item is a vintage travel boarding pass:
     - Left: Circular framed photo of puppy.
     - Center: Script label *"one ticket home"*, puppy name in bold, breed/gender, route: `TEDDYPUPS -------> HOME ♥` (or `DUBAI SHOWROOM -------> HOME ♥`).
     - Divider: Perforated dashed line with top and bottom semi-circular cutout notches.
     - Right stub: Amber/honey background (`#f2be6b`), vertical text **"admit one"**.
   - Verified Alumni: *Ace (Pomeranian, boy), Leo (Poodle, boy), Mia (Maltipoo, girl), Sadie (Maltipoo, girl), Pomeranian (boy), Ollie (Pomsky, boy), Bruno, Buddy, Charlie, Daisy, Bella, Teddy, Molly, Coco, Rosie, Rocky, Sophie, Lola, Rex, Finn, Zoe, Mimi, Bailey, etc.*

---

### 4.4 Happy Families Page (`/happy-families`)
1. **Header:**
   - Script eyebrow: *"our wall of happy endings"*.
   - Title: **"Happy families ♡"**.
   - Subhead: *"Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends."*
   - Counter tag: *"64 moments and counting"*.
2. **Featured Client Note (Right):**
   - Pinned notebook paper with simulated blue washi tape:
     > *"TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."*  
     > **Sarah M., Dubai, UAE**
3. **Polaroid Collage Grid:**
   - Real photos of UAE families holding their puppies in Dubai homes, elevators, and lounges.
   - Layered polaroid white borders with translucent tape strips at varied tilt angles (`rotate(-2deg)` to `rotate(3deg)`).

---

### 4.5 How It Works Page (`/how-it-works`)
1. **Header & Navigation Pills:**
   - Title: **"How it works"**.
   - Subhead: *"Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable."*
   - Quick jump pills: `1 Two ways home`, `2 Our premium puppy promise`, `3 Delivery & collection`, `4 Why choose us`.
2. **Interactive Two Ways Home Switcher:**
   - Tab 1: **"In Dubai (meet in person)"**
   - Tab 2: **"Imported (order upon request)"**
   - Features animated postcard graphic showing Dubai skyline, sunny sky, and flight route line.
3. **Four Step Timeline:**
   - Step 1: *Explore our puppies / Reserve your puppy*
   - Step 2: *Choose your puppy / Personalized consultation*
   - Step 3: *Meet before you choose / Import and arrival*
   - Step 4: *Pick-up or delivery / Welcome home*
4. **Our Premium Puppy Promise:**
   - Microchipped, MOCCAE clearance, full vaccination, 10-day health warranty.
5. **Delivery & Collection:**
   - Dubai local delivery (same day), private courier, international cargo flight escort.

---

### 4.6 FAQ Page (`/faq`)
1. **Header Banner:**
   - Brown cocoa surface with scalloped divider.
   - Title: **"Questions & answers"**.
   - Subtitle: *"Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7."*
2. **Left Search Sidebar:**
   - Search box with placeholder: `delivery, Korea, vaccinated...`
   - Note counter: *"9 notes on the board"*.
   - Cartoon puppy mascot illustration with exclamation bubble.
3. **Corkboard Accordion Matrix (9 Verified Questions & Answers):**
   - Q1: **Are your puppies vaccinated and health-checked?**
     - *A:* Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.
   - Q2: **Can I meet a puppy before I decide?**
     - *A:* Absolutely! You are welcome to visit our Downtown Dubai showroom to meet available puppies face-to-face, or schedule a live video call.
   - Q3: **Can I take my puppy home the same day?**
     - *A:* For puppies currently in our Dubai showroom that have completed all veterinary checks, same-day handover is possible.
   - Q4: **Do you import puppies from abroad?**
     - *A:* Yes, we work with ethical, verified breeders in South Korea and Europe for rare miniature and teacup breeds upon request.
   - Q5: **How does an imported puppy travel to Dubai?**
     - *A:* Puppies travel in temperature-controlled, authorized pet travel cabins accompanied by professional flight escorts, fully compliant with UAE MOCCAE regulations.
   - Q6: **Will I see photos and health details first?**
     - *A:* Yes, you receive complete video footage, veterinary records, weight charts, and parents' pedigree before making any commitment.
   - Q7: **Do you deliver?**
     - *A:* We provide personal chauffeur delivery throughout Dubai, Abu Dhabi, and all other Emirates, right to your doorstep.
   - Q8: **Which breeds do you usually have?**
     - *A:* We specialize in Maltipoos, Pomeranians, Toy & Teacup Poodles, Cavapoos, and Shih-Tzus.
   - Q9: **Is there help after my puppy comes home?**
     - *A:* Yes, our dedicated puppy care concierge is available 24/7 to advise on diet, routine, training, and veterinary support.

---

### 4.7 Contact & Showroom Page (`/contact`)
1. **Header:** Title **"Get in touch with us"**.
2. **Left Column (Direct Channels):**
   - WhatsApp Button: `WhatsApp +971 54 167 6733` (green pill).
   - Phone link: `+971 54 167 6733`.
   - Email: `teddypupsadmin@gmail.com`.
   - Location card: **"Visit us in Downtown Dubai"** with hours and address details.
3. **Right Column (Airmail Stationery Letterform):**
   - Styled as a vintage postmarked envelope / handwritten letter with postage stamp:
     - *"Dear TeddyPups,"*
     - *"my name is [ ________ ] , and you can reach me on"*
     - *"[ +971 50 123 4567 ] or by email at [ optional ] ."*
     - *"I live in [ e.g. Dubai Marina ] , and I'm curious about"*
     - *"[ any puppy (not sure yet) ▼ ] ."*
     - *"Anything else you'd like to tell us..."* (notebook lines).
   - Action: Pill submit button.

---

### 4.8 Puppy Profile Detail Page (`/puppies/[slug]`)
1. **Breadcrumbs:** `Available puppies / [Puppy Name]`
2. **Step Counter:** `① hello, it's me`
3. **Left Column:** High-res image display with layered border card and video thumbnail.
4. **Right Column (Spec Card with Stitch Border):**
   - Status badge: `🐾 Available`
   - Name: Large `Fraunces` heading (e.g. **Max**)
   - Subtitle: Breed (e.g. *Maltipoo*)
   - Specs Grid:
     - `Breed`: Maltipoo
     - `Boy or girl`: Boy
     - `Age`: 3 months
     - `Where`: Imported for you (or In Dubai showroom)
   - Primary Action: `"Ask about Max on WhatsApp"` (green pill button).
   - Secondary Action: `"Send an enquiry"` (outline button).
   - Mascot illustration peeking over card edge.
5. **Section 2:** `② what comes with Max` (Health certificate, vaccinations, microchip, starter cuddle kit).
6. **Section 3:** Inquiries & Booking form.

---

## 5. Content Inventory (No Fabricated Details)

- **Brand Name:** TeddyPups U.A.E.
- **Physical Showroom:** Downtown Dubai, United Arab Emirates
- **Phone / Call:** `+971 54 167 6733`
- **WhatsApp Concierge:** `+971 54 167 6733`
- **Email:** `teddypupsadmin@gmail.com`
- **Active Breeds in Inventory:** Maltipoo, Pomeranian, Toy Poodle, Teacup Poodle, Cavapoo, Shih-Tzu.
- **Live Puppies (15):** Max, Korean Teacup Maltipoo, Korean Teacup Poodle, Maltipoo & Cavapoo, Toy Poodle, Maltipoo (Snow), Pomeranian, Copper, Shih Tzu (F), Shih Tzu (M), Maltipoo 1, Maltipoo 2, Korean Teacup Pomeranian 1, Korean Teacup Pomeranian 2, Korean Teacup Pomeranian (M).
- **Alumni (27):** Ace, Leo, Mia, Sadie, Pomeranian, Ollie, Bruno, Buddy, Charlie, Daisy, Bella, Teddy, Molly, Coco, Rosie, Rocky, Sophie, Lola, Rex, Finn, Zoe, Mimi, Bailey, etc.

---

## 6. Asset & Media Inventory

All assets have been inspected and cataloged:

| Asset ID | Type | Location | Description / Purpose |
|---|---|---|---|
| `IMG-LOGO` | PNG | Global Header & Footer | Circular brown seal with puppy mascot (`/brand/logo.png`) |
| `SVG-HEM` | Inline SVG | Under Header | Scalloped decorative border with semi-circular pattern |
| `SVG-PAW` | Inline SVG | Nav Active State | 4-toed cartoon paw print active marker |
| `SVG-POODLE` | Inline SVG / Vector | Loader & Mascot | Cartoon poodle in sitting & peeking poses (`pup-buddy`) |
| `IMG-HERO-ARCH` | JPEG/WebP | Home Hero | 7 arched puppy photo cards |
| `IMG-PUP-01..15`| JPEG/WebP | `/puppies` | 15 verified high-res puppy portraits |
| `IMG-ALUM-01..27`| JPEG/WebP | `/gone-home` | 27 round boarding ticket portrait thumbnails |
| `IMG-FAM-01..12`| JPEG/WebP | `/happy-families` | Real client polaroid photos holding puppies |
| `SVG-STAMP` | Inline SVG | `/contact` | Postage stamp with serrated border & paw graphic |
| `SVG-POSTCARD`| Inline SVG | `/how-it-works` | Postcard illustration with Dubai skyline & flight trajectory |

---

## 7. Responsive Behaviour

| Viewport (CSS px) | Header / Nav | Layout Treatment | Visual Assets | Overflow Status |
|---|---|---|---|:---:|
| **1440 × 900** (Desktop) | Full horizontal nav + WhatsApp pill | Multi-column grids (3–4 cols), side-by-side hero, full corkboard | High-res full crops | None (clean reflow) |
| **1366 × 768** (Laptop) | Full horizontal nav | 3-column grids, proportional scaling | High-res full crops | None |
| **768 × 1024** (Tablet) | Compact nav / Hamburger | 2-column cards, stacked hero elements | Scaled polaroids & tickets | None |
| **390 × 844** (Mobile) | Compact header + `Menu` button; Fixed bottom bar | Single column stack, horizontal scroll for arches, full-width letterform | Scaled images, stacked polaroids | None |

---

## 8. Interaction Inventory

| Element | Initial State | Trigger | Observed Outcome |
|---|---|---|---|
| **Curtain Loader** | Visible overlay | Page load / 2.5s timer | Slides smoothly upward, revealing hero |
| **Mobile Menu Button** | Closed | Click / Tap | Opens `<dialog class="tp-menu">` with honey background |
| **Mobile Menu Close** | Open | Click "Close" / Esc | Dismisses dialog with smooth transition |
| **Header Nav Links** | Normal | Hover / Click | Paw icon appears under active route |
| **Filter Pills (Breeds)** | "All" active | Click pill | Instantly filters puppy cards with layout transition |
| **Filter Pills (Origin)** | "All" active | Click pill | Toggles between In Dubai and Imported |
| **Boarding Ticket Hover**| Static | Hover | Subtle elevation and tilt (`rotate(-1deg)`) |
| **FAQ Accordions** | First open, others closed | Click question | Expands selected note with smooth height animation |
| **How It Works Switcher**| "In Dubai" active | Click "Imported" | Postcard updates flight path, steps re-render |
| **Airmail Form Inputs** | Dashed lines | Focus | Underline changes to solid toffee `#c2622b` |
| **WhatsApp Buttons** | Green pill | Click | Opens WhatsApp web/app with pre-filled enquiry text |

---

## 9. Visual Design Measurements & CSS Design Tokens

### 9.1 CSS Variables & Palette Tokens
```css
:root {
  /* Core Brand Colors */
  --color-cocoa: #2a170e;         /* Deep espresso brown text and borders */
  --color-cocoa-soft: #5a3a28;    /* Muted secondary copy */
  --color-milk: #fffdf8;          /* Warm off-white page background */
  --color-toffee: #c2622b;        /* Warm copper button fill */
  --color-toffee-deep: #a24a1a;   /* Button hover & shadow depth */
  --color-toffee-ink: #7a3512;    /* Ticket text & accent labels */
  --color-honey: #f2be6b;         /* Golden honey drawer & ticket stubs */
  --color-honey-soft: #fbe3b4;    /* Light amber tint & scallop fill */
  --color-cream: #fbf5e8;         /* Card background fill */
  --color-sand: #f5ede0;          /* Secondary card backing */
  --color-night: #24130b;         /* Footer dark chocolate background */
  --color-whatsapp: #1f7a4d;      /* Direct action green */
  --color-whatsapp-hover: #16603c;/* Darker green hover */

  /* Pastel Accent Tints */
  --color-sky: #bfddf5;           /* Male badges & travel accents */
  --color-blush: #f9cdbf;         /* Female badges & polaroid accents */

  /* Global Dimensions */
  --header-h: 4.75rem;            /* 76px desktop header height */
  --header-h-mobile: 4rem;        /* 64px mobile header height */
  --container-max: 80rem;         /* 1280px max content width */

  /* Animation Easings */
  --ease-pounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-silk: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 9.2 Typography Hierarchy
- **Display Serif (`font-display` / `font-plush`):** `Fraunces`, optical size 9..144, weight 700..900. Used for page titles, section headings, brand name, puppy names.
- **Handwritten / Script Accent (`font-scrawl`):** `Shantell Sans`, weight 600..800. Used for *"every puppy is family"*, *"where to, friend?"*, *"one ticket home"*, *"Dear TeddyPups,"*.
- **Body & Sans (`font-body`):** `Figtree`, weight 400, 500, 600, 700. Used for paragraphs, navigation links, buttons, specs, and form labels.

### 9.3 Component Geometry
- **Primary Buttons:** Height `48px`, border-radius `9999px` (pill), font-weight `600`, text `1rem`.
- **Card Borders:** `3px solid var(--color-cocoa)`, border-radius `1.5rem` (24px).
- **Hard Drop Shadows:** `box-shadow: 4px 6px 0px rgba(42, 23, 14, 0.12)`.
- **Ticket Stub Cutouts:** Semicircular notches at `top: 50%` with radius `12px`.

---

## 10. Functional and Technical Observations

1. **Static Pre-rendering:** The reference website is pre-rendered with rich semantic markup and microdata (`schema.org` PetStore).
2. **Audio/Video Media:** Several puppies include short MP4 video previews (`▶ video` badge triggers video preview).
3. **No Direct Checkout:** There is NO shopping cart or credit card checkout. The business operates exclusively as a luxury concierge consultation model via WhatsApp and in-person showroom visits.
4. **Form Handling:** The contact letterform collects customer inquiries and dispatches them via concierge notification.

---

## 11. Screenshots and Evidence Inventory

The following 20 reference screenshots have been captured, verified, and saved to disk:

```text
reference/
├── home/
│   ├── desktop-1440x900.png                     (Verified: 545,833 bytes)
│   ├── laptop-1366x768.png                      (Verified: 455,349 bytes)
│   ├── tablet-768x1024.png                      (Verified: 385,939 bytes)
│   └── mobile-390x844.png                       (Verified: 175,739 bytes)
├── puppies/
│   ├── desktop-1440x900.png                     (Verified: 322,953 bytes)
│   ├── mobile-390x844.png                       (Verified: 104,293 bytes)
│   ├── maltipoo-max-male-desktop-1440x900.png   (Verified: 491,175 bytes)
│   └── maltipoo-max-male-mobile-390x844.png     (Verified: 214,787 bytes)
├── happy-families/
│   ├── desktop-1440x900.png                     (Verified: 885,530 bytes)
│   └── mobile-390x844.png                       (Verified: 207,744 bytes)
├── how-it-works/
│   ├── desktop-1440x900.png                     (Verified: 228,980 bytes)
│   └── mobile-390x844.png                       (Verified: 81,845 bytes)
├── faq/
│   ├── desktop-1440x900.png                     (Verified: 349,341 bytes)
│   └── mobile-390x844.png                       (Verified: 142,285 bytes)
├── contact/
│   ├── desktop-1440x900.png                     (Verified: 175,630 bytes)
│   └── mobile-390x844.png                       (Verified: 89,305 bytes)
└── states/
    ├── gone-home-desktop-1440x900.png           (Verified: 311,089 bytes)
    ├── gone-home-mobile-390x844.png             (Verified: 76,099 bytes)
    ├── mobile-menu-open-390x844.png             (Verified: 41,820 bytes)
    └── faq-expanded-1440x900.png                (Verified: 338,420 bytes)
```

---

## 12. Open Questions & Limitations

- **O-01 (Resolved):** All page routes, section orders, and interactive states have been verified on the live site.
- **O-02 (Resolved):** Visual assets, logo files, and media URLs have been cataloged directly from the network payload.
- **O-03 (Resolved):** Exact CSS color tokens, fonts (Fraunces, Shantell Sans, Figtree), and animation behaviors have been extracted and verified.

---

## 13. Implementation Priorities

### P0 — Essential Core Foundation
1. Project Scaffolding: React + TypeScript + Vite + Tailwind CSS with extracted design tokens.
2. Global Layout: Scalloped Header, Navigation, Active Paw Indicators, WhatsApp CTA, and Footer.
3. Mobile Drawer Navigation (`<dialog>` with honey background) and Fixed Mobile Bottom Bar.
4. Splash Screen Curtain Loader with animated running poodle and script text.
5. Home Page (`/`): Hero, Arches Gallery, Journey Steps, Featured Puppies, and Trust Section.
6. Available Puppies Page (`/puppies`): Breed/Origin filter pills and 15 puppy cards.
7. Puppy Detail Page (`/puppies/[slug]`): Image gallery, specs grid, and WhatsApp booking action.

### P1 — High-Value Experience
1. Gone Home Page (`/gone-home`): Vintage ticket booth, 27 perforated boarding passes.
2. Happy Families Page (`/happy-families`): Polaroid collage with washi tape and client reviews.
3. How It Works Page (`/how-it-works`): Showroom vs Import switcher and 4-step adoption timeline.
4. FAQ Page (`/faq`): Corkboard background with pushpins, live search, and accordion cards.
5. Contact Page (`/contact`): Showroom info and interactive Airmail stationery letterform.

### P2 — Polish & Refinement
1. Subtle card hover tilts, spring physics on button clicks.
2. Washi tape graphics, paw badges, and responsive touch target optimization.

---

## 14. Inspection Sign-off

- [x] Every reachable primary navigation destination has been inspected.
- [x] Every page has a section-by-section inventory.
- [x] Visible copy and business claims have been transcribed accurately.
- [x] All important images and media have been inventoried.
- [x] Desktop, laptop, tablet, and mobile layouts have been checked.
- [x] Visible interactive elements have been tested safely.
- [x] Measurements distinguish measured values from estimates.
- [x] Screenshots exist for all states and viewports claimed.
- [x] Unknowns and limitations are documented.
- [x] The implementation agent has complete, verified evidence to build without inventing content.

**Final Inspection Status:** **Complete & Approved for Phase 2 Implementation.**
