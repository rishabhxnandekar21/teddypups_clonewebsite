# TeddyPups UAE — Complete Desktop Animation & Motion Inventory

## 1. Overview & Motion Identity

The TeddyPups UAE reference website ([puppy.instabizweb.com](https://puppy.instabizweb.com/)) features a playful, tactile motion system designed around storybook and physical-toy motifs:
- **Spring & bounce dynamics**: Utilizes custom easing curves like `var(--ease-pounce)` (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and `var(--ease-snap)` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Physical tactile mechanics**: 3D perspective swinging doors (`tp-door-open`), rotating hanging wooden signs (`tp-tag-swing`), folding airmail letters (`tp-letter-fold`), rising mailbox flags (`tp-flag`), and stamp impressions (`tp-stamp-in`).
- **Puppy character animations**: Running leg cycles, wagging tail, bobbing ears, blinking eyes, and breathing rhythm.
- **Scroll-synchronized triggers**: Elements utilize `data-revealed`, `data-armed`, `data-state`, and `data-phase` attributes triggered via `IntersectionObserver`.

---

## 2. Animation & Transition Inventory Matrix

The table below documents all 46 CSS keyframes and interactive animation triggers extracted from the live reference:

| Element Selector | Trigger | Keyframe / Transition | Duration | Easing Curve | Reference Behavior Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`.tp-curtain[data-state="intro"]`** | Initial page load | `tp-curtain-rest` | `0s` (delay `1.04s`) | `linear` | Hides curtain container from viewport once lift animation finishes |
| **`.tp-curtain__blanket`** | Page load (intro) | `tp-curtain-lift` | `0.48s` (delay `0.56s`) | `cubic-bezier(0.65, 0, 0.3, 1)` | Honey blanket slides upward: `translateY(-100% - 44px)` with scalloped hem trailing |
| **`.tp-curtain__runner`** | Page load / route transition | `tp-runner-x` | `1.15s` | `cubic-bezier(0.32, 0.1, 0.4, 1)` | Cartoon puppy trots horizontally across screen from `-40%` to `calc(0.64 * min(44rem, 86vw))` |
| **`.tp-curtain__print`** | Runner trotting | `tp-print-step` | `1.0s` | `ease-out` | Step-by-step paw prints appear behind puppy: scale `0.4` → `1.08` → fade |
| **`.tp-runner__leg--fn, --bf`**| Trotting | `tp-runner-leg-a` | `0.32s` | `ease-in-out` (infinite alternate) | Front-near and back-far legs swing `24deg` to `-22deg` |
| **`.tp-runner__leg--ff, --bn`**| Trotting | `tp-runner-leg-b` | `0.32s` | `ease-in-out` (infinite alternate) | Front-far and back-near legs swing `-22deg` to `24deg` |
| **`.tp-runner__body`** | Trotting | `tp-runner-bob` | `0.16s` | `ease-in-out` (infinite alternate) | Puppy torso bobs vertically by `-6px` |
| **`.tp-runner__tail`** | Trotting | `tp-runner-wag` | `0.22s` | `ease-in-out` (infinite alternate) | Puppy tail wags between `-16deg` and `14deg` |
| **`.tp-runner__ear`** | Trotting | `tp-runner-ear` | `0.16s` | `ease-in-out` (infinite alternate) | Floppy ear bounces `0deg` to `8deg` |
| **`.tp-curtain[data-state="covering"]`** | Page navigation start | `tp-curtain-cover`| `0.3s` | `cubic-bezier(0.22, 1, 0.36, 1)` | Blanket slides up from bottom: `translateY(100% + 44px)` to `0` |
| **`.tp-hero__sun`** | Hero entrance | `tp-sunrise` | `2.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Golden sun slowly rises from behind hero horizon: `-50% 16%` to `0` |
| **`.tp-lineup__pup[data-state="pop"]`** | Hero line-up entrance | `tp-pop-up` | `0.58s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Arch puppy photo pops up with spring overshoot: scale `0.92` → `1.04` → `1.0` |
| **`.tp-door` (Meet the Pups)** | Hover on puppy door | `tp-door-open` | `0.5s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Door leaf swings open in 3D perspective (`rotateY(-102deg)`), revealing puppy in room |
| **`.tp-flight` (Two Ways)** | Viewport scroll reveal | `tp-plane-bob` | `2.4s` | `ease-in-out` (infinite) | International import airplane floats gently: `translateY(-6px) rotate(-3deg)` |
| **`.tp-msg-group > *` (Journey)** | Scroll reveal in phone | `tp-msg-in` | `0.5s` | `var(--ease-pounce)` | WhatsApp speech bubbles slide up into phone mockup: `translateY(0.8rem) scale(0.92)` |
| **`.tp-typing span`** | Active chat simulation | `tp-dot` | `0.9s` | `ease-in-out` (infinite) | 3 green WhatsApp typing dots bounce vertically: `translateY(-0.35rem)` |
| **`.tp-passport .tp-stamp`** | Scroll into view | `tp-stamp-in` | `0.6s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Passport rubber stamps thump onto page with ink rotation: `scale(1.7) rotate(-16deg)` → `1.0` |
| **`.tp-photowall__print`** | Polaroid hover | `tp-doodle-hop` | `0.45s` | `var(--ease-pounce)` | Polaroid tilts and lifts with spring scale: `scale(1.05) rotate(2deg)` |
| **`.tp-wall__item[data-revealed]`** | Scroll into photowall | `tp-print-bound` | `0.62s` | `cubic-bezier(0.2, 0.7, 0.3, 1)` | Polaroids drop into grid with subtle bounce and staggered delays (`--d`) |
| **`.tp-twinkle`** | Constant ambient | `tp-twinkle` | `3.2s` | `ease-in-out` (infinite) | Starbursts pulsate and rotate across FAQ night sky: `scale(0.8)` to `scale(1.1) rotate(20deg)` |
| **`.tp-night__wonder`** | FAQ header ambient | `tp-float` | `3.4s` | `ease-in-out` (infinite) | Question mark above puppy mascot drifts up and down: `translateY(-8px) rotate(8deg)` |
| **`.tp-house__door` (Cottage)** | Final CTA hover | `tp-house-open` | `0.6s` | `var(--ease-pounce)` | Front door of welcome cottage opens outward revealing warm interior light |
| **`.tp-post .tp-letterform`** | Form submit click | `tp-letter-fold` | `0.65s` | `var(--ease-snap)` | Letterform folds along dashed creases in 3D: `rotateX(62deg)` → `scale(0.35)` |
| **`.tp-post__envelope`** | Letter folding | `tp-env-in` | `0.45s` (delay `0.3s`) | `var(--ease-pounce)` | Airmail envelope scales into view to receive folded letter |
| **`.tp-post__flap`** | Envelope received letter | `tp-flap` | `0.3s` (delay `0.55s`) | `ease-in` | Envelope flap flips closed: `scaleY(-1)` to `1` |
| **`.tp-post__envelope` (Post)** | Flap sealed | `tp-env-post` | `0.85s` | `var(--ease-snap)` | Envelope slides down into red postbox: `translateY(12.5rem) scale(0.55)` |
| **`.tp-post__flag`** | Mail deposited | `tp-flag` | `0.4s` (delay `0.75s`) | `var(--ease-pounce)` | Red mailbox outgoing mail flag springs upright to `0deg` |
| **`.tp-post__sent`** | Post completed | `tp-sent-in` | `0.55s` | `var(--ease-pounce)` | Confirmation note pops in with green checkmark |
| **`.tp-tag[data-revealed]`** | Scroll into tags/badges | `tp-tag-swing` | `1.7s` | `var(--ease-silk)` | Boarding pass luggage tag swings from grommet like a pendulum: `-7deg` → `+4deg` → `-2.2deg` → `0` |
| **`.tp-poster`** | Route entrance | `tp-poster-in` | `0.9s` | `var(--ease-pounce)` | Boarding ticket poster drops in with subtle tilt: `translateY(-1.5rem) rotate(3deg)` |
| **`.tp-menu[open]`** | Mobile menu click | `tp-menu-in` | `0.5s` | `var(--ease-snap)` | Circular honey wash expands from button: `clip-path: circle(0%)` → `circle(150%)` |
| **`.tp-menu[data-closing]`** | Menu close click | `tp-menu-out` | `0.42s` | `var(--ease-snap)` | Circular honey wash collapses back into button |
| **`.tp-menu-link`** | Menu open stagger | `tp-menu-link` | `0.55s` | `var(--ease-pounce)` | Links slide in with stagger: `translateY(1.2rem) rotate(-2deg)` to `0` |
| **`.tp-header__brand`** | Logo hover | `tp-doodle-hop` | `0.4s` | `var(--ease-pounce)` | Header logo hops and wiggles: `scale(1.04) rotate(-2deg)` |
| **`.btn` (Buttons)** | Button hover | `transition` | `150ms` | `var(--ease-silk)` | Background color deepens; subtle `-1px` vertical lift with shadow enlargement |
| **`.btn` (Buttons)** | Button active / press | `transition` | `100ms` | `var(--ease-silk)` | Scale compresses to `0.97` mimicking physical click |

---

## 3. Discrepancies in Current Local Implementation

1. **Meet the Pups Doors vs Plain Cards:**
   - *Reference:* An interactive hallway of 3D swinging wooden doors (`tp-door`) that rotate on Y-axis on hover to reveal the puppy.
   - *Local:* Static 4:3 cards without door perspective or reveal interaction.
2. **Splash Screen Trotting Puppy:**
   - *Reference:* Vector-articulated runner with independent leg cycles (`tp-runner-leg-a/b`), tail wag, ear bounce, and dynamic paw step prints trailing behind.
   - *Local:* Simplified CSS scale/fade on a static mascot icon.
3. **Puppy Journey Smartphone Simulation:**
   - *Reference:* An interactive iPhone frame with incoming/outgoing WhatsApp bubbles, animated typing dots, clickable breed chips, and thumbnail photo clips.
   - *Local:* Static text list of 3 numbered items.
4. **Passport Stamping Effect:**
   - *Reference:* Physical passport notebook layout where circular vet stamps thump onto the page with ink rotation on scroll.
   - *Local:* Standard feature list.
5. **Contact Letterform Submission Sequence:**
   - *Reference:* Multi-phase physical mailing sequence (`sealing` → `folding` → `envelope flap` → `postbox deposit` → `flag flip` → `sent confirmation`).
   - *Local:* Instant form state change showing text message.
6. **Night Sky Twinkling Stars:**
   - *Reference:* 11 layered SVG starbursts with staggered continuous rotating twinkle animations on the FAQ section.
   - *Local:* Solid sand corkboard background.
