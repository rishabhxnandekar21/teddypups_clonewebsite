const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VERIFY_DIR = 'audit_screenshots/visual_fidelity/pass1_verify_mode';
if (!fs.existsSync(VERIFY_DIR)) {
  fs.mkdirSync(VERIFY_DIR, { recursive: true });
}

async function inspect() {
  console.log('=== STARTING STRICT VERIFY MODE AUDIT (1440x900) ===');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // Create isolated contexts
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refContext.newPage();
  const locPage = await locContext.newPage();

  console.log('Navigating to Reference (https://puppy.instabizweb.com/)...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await refPage.waitForTimeout(2000);

  console.log('Navigating to Local (http://localhost:5173/)...');
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
  await locPage.waitForTimeout(1500);

  // =========================================================================
  // ITEM 3: PUPPY DOORS INSPECTION (15 Doors Comparison)
  // =========================================================================
  console.log('\n======================================================');
  console.log('ITEM 3: INSPECTING 15 PUPPY DOORS');
  console.log('======================================================');

  // Extract reference doors info
  const refDoorsData = await refPage.evaluate(() => {
    // Select all door elements in Meet the Pups
    const doors = Array.from(document.querySelectorAll('.tp-door, [class*="door"]'));
    // Filter doors that have puppy info (exclude "Meet them all" door if any)
    return doors.map((d, i) => {
      const nameEl = d.querySelector('h3, .tp-door__name, [class*="name"]');
      const breedEl = d.querySelector('p, .tp-door__breed, [class*="breed"]');
      const imgEl = d.querySelector('img');
      const numberEl = d.querySelector('.tp-door__num, [class*="num"], [class*="badge"]');
      return {
        index: i,
        name: nameEl ? nameEl.textContent.trim() : null,
        breed: breedEl ? breedEl.textContent.trim() : null,
        imgSrc: imgEl ? imgEl.src : null,
        imgAlt: imgEl ? imgEl.alt : null,
        number: numberEl ? numberEl.textContent.trim() : null,
        className: d.className,
      };
    }).filter(d => d.imgSrc); // only doors with images
  });

  const locDoorsData = await locPage.evaluate(() => {
    const doors = Array.from(document.querySelectorAll('.tp-door, [class*="door"]'));
    return doors.map((d, i) => {
      const nameEl = d.querySelector('h3, [class*="name"]');
      const breedEl = d.querySelector('p, [class*="breed"]');
      const imgEl = d.querySelector('img');
      const numberEl = d.querySelector('[class*="num"], [class*="number"]');
      return {
        index: i,
        name: nameEl ? nameEl.textContent.trim() : null,
        breed: breedEl ? breedEl.textContent.trim() : null,
        imgSrc: imgEl ? imgEl.src : null,
        imgAlt: imgEl ? imgEl.alt : null,
        number: numberEl ? numberEl.textContent.trim() : null,
        className: d.className,
      };
    }).filter(d => d.imgSrc);
  });

  console.log(`Reference doors count with images: ${refDoorsData.length}`);
  console.log(`Local doors count with images: ${locDoorsData.length}`);

  console.log('\n--- REFERENCE DOORS (First 15) ---');
  refDoorsData.slice(0, 16).forEach((d, idx) => {
    console.log(`Ref Door ${idx + 1}: Name="${d.name}", Breed="${d.breed}", Img="${d.imgSrc ? d.imgSrc.split('/').pop() : 'none'}"`);
  });

  console.log('\n--- LOCAL DOORS (First 15) ---');
  locDoorsData.slice(0, 16).forEach((d, idx) => {
    console.log(`Loc Door ${idx + 1}: Name="${d.name}", Breed="${d.breed}", Img="${d.imgSrc ? d.imgSrc.split('/').pop() : 'none'}"`);
  });

  // Capture matched screenshots of doors section
  console.log('\nCapturing doors screenshots...');
  // Scroll to doors section
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-meet, #puppies, [class*="doors"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await locPage.evaluate(() => {
    const el = document.querySelector('[class*="doorsSection"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(VERIFY_DIR, '03_doors_reference.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '03_doors_local.png') });

  // =========================================================================
  // ITEM 1: AIRPLANE POSITION, ORIENTATION & TRAJECTORY COMPARISON
  // =========================================================================
  console.log('\n======================================================');
  console.log('ITEM 1: INSPECTING AIRPLANE SCROLL ANIMATION');
  console.log('======================================================');

  // Let's inspect how the Reference airplane is placed and animated
  const refPlaneInfo = await refPage.evaluate(() => {
    const section = document.querySelector('.tp-paths, [class*="paths"]');
    const plane = document.querySelector('.tp-plane, [class*="plane"]');
    const pathEl = document.querySelector('.tp-paths svg path, svg path[stroke-dasharray]');
    const flightGroup = plane ? (plane.tagName === 'g' ? plane : plane.querySelector('g')) : null;
    return {
      sectionFound: !!section,
      planeFound: !!plane,
      sectionRect: section ? section.getBoundingClientRect() : null,
      planeTag: plane ? plane.tagName : null,
      planeTransform: plane ? plane.getAttribute('transform') || plane.style.transform : null,
      flightGroupTransform: flightGroup ? flightGroup.getAttribute('transform') || flightGroup.style.transform : null,
      pathD: pathEl ? pathEl.getAttribute('d') : null,
    };
  });
  console.log('Ref Plane Info at initial position:', JSON.stringify(refPlaneInfo, null, 2));

  // Measure airplane at various scroll points on Reference and Local
  // We'll scroll through the section in increments
  const refPathsBox = await refPage.evaluate(() => {
    const s = document.querySelector('.tp-paths, [class*="paths"]');
    if (!s) return null;
    const r = s.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });

  const locPathsBox = await locPage.evaluate(() => {
    const s = document.querySelector('[class*="paths"]');
    if (!s) return null;
    const r = s.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });

  console.log('Ref Paths Box:', refPathsBox);
  console.log('Loc Paths Box:', locPathsBox);

  // We test 5 scroll positions across the airplane section:
  // 1. Entering viewport (start 95%)
  // 2. 25% through section
  // 3. 50% through section
  // 4. 75% through section
  // 5. 100% arrival (end 25%)
  // And 2 reverse scroll positions: 50% and 0%
  const scrollSteps = [
    { label: '01_start_korea', refOffset: -200, locOffset: -200 },
    { label: '02_midflight_25', refOffset: 50, locOffset: 50 },
    { label: '03_midflight_50', refOffset: 250, locOffset: 250 },
    { label: '04_midflight_75', refOffset: 450, locOffset: 450 },
    { label: '05_arrival_dubai', refOffset: 650, locOffset: 650 },
    { label: '06_reverse_midflight', refOffset: 250, locOffset: 250, reverse: true },
    { label: '07_reverse_korea', refOffset: -200, locOffset: -200, reverse: true },
  ];

  for (const step of scrollSteps) {
    const refTargetY = (refPathsBox ? refPathsBox.top : 2000) + step.refOffset;
    const locTargetY = (locPathsBox ? locPathsBox.top : 2000) + step.locOffset;

    await refPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), refTargetY);
    await locPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), locTargetY);
    await refPage.waitForTimeout(400);
    await locPage.waitForTimeout(400);

    const refPlaneState = await refPage.evaluate(() => {
      // Find the g element or path or plane element
      const el = document.querySelector('.tp-plane, g[transform*="translate"], [class*="plane"] g');
      if (!el) return null;
      return {
        transform: el.getAttribute('transform') || el.style.transform,
        box: el.getBoundingClientRect(),
      };
    });

    const locPlaneState = await locPage.evaluate(() => {
      const el = document.querySelector('[class*="flightCanvas"] g[transform*="translate"]');
      if (!el) return null;
      return {
        transform: el.getAttribute('transform') || el.style.transform,
        box: el.getBoundingClientRect(),
      };
    });

    console.log(`\nAirplane [${step.label}]:`);
    console.log(`  Ref transform: ${refPlaneState ? refPlaneState.transform : 'none'}`);
    console.log(`  Loc transform: ${locPlaneState ? locPlaneState.transform : 'none'}`);

    await refPage.screenshot({ path: path.join(VERIFY_DIR, `01_ref_airplane_${step.label}.png`) });
    await locPage.screenshot({ path: path.join(VERIFY_DIR, `01_loc_airplane_${step.label}.png`) });
  }

  // =========================================================================
  // ITEM 2: MASCOT JOURNEY HERO TO FOOTER INSPECTION
  // =========================================================================
  console.log('\n======================================================');
  console.log('ITEM 2: INSPECTING MASCOT COMPLETE JOURNEY');
  console.log('======================================================');

  // Let's first inspect Reference mascot architecture:
  // How does Reference do the mascot?
  const refMascotDetails = await refPage.evaluate(() => {
    const pupLayer = document.querySelector('.pup-layer');
    const pupActor = document.querySelector('.pup-actor');
    const pupPrints = document.querySelector('.pup-prints');
    const pupStops = Array.from(document.querySelectorAll('.pup-stop, [data-pup-stop]'));
    const basket = document.querySelector('.tp-basket, [class*="basket"]');

    return {
      hasPupLayer: !!pupLayer,
      pupLayerHTML: pupLayer ? pupLayer.outerHTML.substring(0, 300) : null,
      hasPupActor: !!pupActor,
      pupActorTransform: pupActor ? pupActor.style.transform || pupActor.getAttribute('transform') : null,
      pupStopsCount: pupStops.length,
      pupStops: pupStops.map((s, i) => ({
        index: i,
        tag: s.tagName,
        className: s.className,
        box: s.getBoundingClientRect(),
        attrs: Array.from(s.attributes).map(a => `${a.name}="${a.value}"`).join(' '),
      })),
      printsCount: pupPrints ? pupPrints.children.length : 0,
      basketBox: basket ? basket.getBoundingClientRect() : null,
    };
  });
  console.log('Reference Mascot Architecture:', JSON.stringify(refMascotDetails, null, 2));

  // Now let's inspect Local mascot architecture:
  const locMascotDetails = await locPage.evaluate(() => {
    const pupLayer = document.querySelector('.pup-layer');
    const pupActor = document.querySelector('.pup-actor');
    const pupPrints = document.querySelector('.pup-prints');
    const pupStops = Array.from(document.querySelectorAll('[data-pup-stop]'));
    const basket = document.querySelector('[class*="basket"]');

    return {
      hasPupLayer: !!pupLayer,
      hasPupActor: !!pupActor,
      pupActorTransform: pupActor ? pupActor.style.transform : null,
      pupStopsCount: pupStops.length,
      pupStops: pupStops.map((s, i) => ({
        index: i,
        tag: s.tagName,
        className: s.className,
        box: s.getBoundingClientRect(),
        attrs: Array.from(s.attributes).map(a => `${a.name}="${a.value}"`).join(' '),
      })),
      printsCount: pupPrints ? pupPrints.children.length : 0,
      basketBox: basket ? basket.getBoundingClientRect() : null,
    };
  });
  console.log('Local Mascot Architecture:', JSON.stringify(locMascotDetails, null, 2));

  // Now, test scrolling down in 10% steps from 0% to 100%, and inspect the actor bounding box:
  // Is it visible in viewport? Are there jumps? What is its coordinate?
  console.log('\n--- SCROLL PROGRESSION INSPECTION (0% to 100%) ---');
  const scrollFractions = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

  const refMaxScroll = await refPage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const locMaxScroll = await locPage.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  for (const frac of scrollFractions) {
    const refY = refMaxScroll * frac;
    const locY = locMaxScroll * frac;

    await refPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), refY);
    await locPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), locY);
    await refPage.waitForTimeout(300);
    await locPage.waitForTimeout(300);

    const refActor = await refPage.evaluate(() => {
      const a = document.querySelector('.pup-actor');
      if (!a) return null;
      const r = a.getBoundingClientRect();
      const style = window.getComputedStyle(a);
      return {
        transform: a.style.transform,
        rect: { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right },
        inViewport: r.bottom >= 0 && r.top <= window.innerHeight && r.right >= 0 && r.left <= window.innerWidth,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
      };
    });

    const locActor = await locPage.evaluate(() => {
      const a = document.querySelector('.pup-actor');
      if (!a) return null;
      const r = a.getBoundingClientRect();
      const style = window.getComputedStyle(a);
      return {
        transform: a.style.transform,
        rect: { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right },
        inViewport: r.bottom >= 0 && r.top <= window.innerHeight && r.right >= 0 && r.left <= window.innerWidth,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
      };
    });

    const refPrints = await refPage.evaluate(() => {
      const prints = Array.from(document.querySelectorAll('.pup-prints > *'));
      const active = prints.filter(p => window.getComputedStyle(p).opacity > 0.1);
      return { total: prints.length, active: active.length };
    });

    const locPrints = await locPage.evaluate(() => {
      const prints = Array.from(document.querySelectorAll('.pup-prints > *'));
      const active = prints.filter(p => window.getComputedStyle(p).opacity > 0.1);
      return { total: prints.length, active: active.length };
    });

    console.log(`\nScroll ${(frac * 100).toFixed(0)}%:`);
    console.log(`  Ref Actor: inViewport=${refActor?.inViewport}, rect=${JSON.stringify(refActor?.rect)}, tf="${refActor?.transform}"`);
    console.log(`  Loc Actor: inViewport=${locActor?.inViewport}, rect=${JSON.stringify(locActor?.rect)}, tf="${locActor?.transform}"`);
    console.log(`  Active Paw Prints: Ref=${refPrints.active}/${refPrints.total}, Loc=${locPrints.active}/${locPrints.total}`);

    // Capture screenshot at key fractions
    if ([0, 0.2, 0.5, 0.7, 1.0].includes(frac)) {
      const pct = (frac * 100).toFixed(0);
      await refPage.screenshot({ path: path.join(VERIFY_DIR, `02_ref_mascot_scroll_${pct}pct.png`) });
      await locPage.screenshot({ path: path.join(VERIFY_DIR, `02_loc_mascot_scroll_${pct}pct.png`) });
    }
  }

  // Check final footer basket positioning
  console.log('\n--- FOOTER BASKET POSITIONING ---');
  await refPage.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await locPage.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const refBasketComparison = await refPage.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const basket = document.querySelector('.tp-basket, [class*="basket"]');
    return {
      actorRect: actor ? actor.getBoundingClientRect() : null,
      basketRect: basket ? basket.getBoundingClientRect() : null,
    };
  });

  const locBasketComparison = await locPage.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const basket = document.querySelector('[class*="basket"]');
    return {
      actorRect: actor ? actor.getBoundingClientRect() : null,
      basketRect: basket ? basket.getBoundingClientRect() : null,
    };
  });

  console.log('Ref Basket Alignment:', JSON.stringify(refBasketComparison, null, 2));
  console.log('Loc Basket Alignment:', JSON.stringify(locBasketComparison, null, 2));

  await refPage.screenshot({ path: path.join(VERIFY_DIR, '02_ref_mascot_final_basket.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '02_loc_mascot_final_basket.png') });

  await refContext.close();
  await locContext.close();
  await browser.close();

  console.log('\n=== STRICT VERIFY MODE AUDIT COMPLETED ===');
}

inspect().catch(console.error);