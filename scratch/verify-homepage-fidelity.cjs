const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1600x900', width: 1600, height: 900 },
];

const SCREENSHOT_DIR = 'scratch/verification-screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('--- STARTING HOMEPAGE REFERENCE FIDELITY VERIFICATION ---');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    // Wait for intro curtain and layout stabilization
    await page.waitForTimeout(1400);

    // ── 1. Hero Section ──
    console.log('\n--- 1. Hero Section Verification ---');
    const heroSun = await page.$('[class*="heroSun"]');
    console.log('Hero peach glow sun present:', !!heroSun);

    const pupTiles = await page.$$('[class*="lineupSeat"] [class*="lineupPup"]');
    console.log('Puppy photo tiles count:', pupTiles.length);

    const quilt = await page.$('[class*="quilt"]');
    console.log('Layered scalloped quilt hem present:', !!quilt);

    const heroTeddy = await page.$('[class*="heroTeddy"]');
    console.log('Peeking mascot teddy present:', !!heroTeddy);

    // Test hover on second puppy tile (Korean Teacup Maltipoo)
    if (pupTiles.length > 1) {
      await pupTiles[1].hover();
      await page.waitForTimeout(400);
      const ghostTags = await page.$$('[class*="lineupGhost"][data-tag="show"]');
      console.log('Hover active ghost name tag visible:', ghostTags.length > 0);
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `1-hero-${vp.name}.png`),
    });
    console.log(`Hero screenshot saved: 1-hero-${vp.name}.png`);

    // ── 2. Meet the Pups Horizontal Scroll & 3D Doors ──
    console.log('\n--- 2. Doors Showcase Verification ---');
    const meetSection = await page.$('[class*="meetSection"]');
    const isPinned = await meetSection.getAttribute('data-pinned');
    console.log('Desktop pinned treadmill active:', isPinned);

    // Find meetSection position and scroll into the middle of the pin range
    const meetOffsetTop = await page.evaluate(() => {
      const el = document.querySelector('[class*="meetSection"]');
      return el ? el.offsetTop : 0;
    });

    console.log('Meet section offsetTop:', meetOffsetTop);
    // Scroll 1200px into the pin range
    await page.evaluate(y => window.scrollTo({ top: y + 1200, behavior: 'instant' }), meetOffsetTop);
    await page.waitForTimeout(600);

    const trackTransform = await page.$eval('[class*="doorsGrid"]', el => el.style.transform);
    const floorOffset = await page.$eval('[class*="meetHall"]', el => el.style.getPropertyValue('--floor-x'));
    const openDoors = await page.$$('[class*="tp-door"][data-open="true"]');
    const mascotFacing = await page.$eval('[class*="meetTeddy"] [data-facing]', el => el.getAttribute('data-facing'));

    console.log('Track transform in mid-scroll:', trackTransform);
    console.log('Floor offset variable:', floorOffset);
    console.log('Open doors count:', openDoors.length);
    console.log('Mascot walking direction (scrolled down):', mascotFacing);

    // Scroll upwards slightly to test mascot turnaround
    await page.evaluate(y => window.scrollTo({ top: y + 700, behavior: 'instant' }), meetOffsetTop);
    await page.waitForTimeout(400);
    const mascotFacingUp = await page.$eval('[class*="meetTeddy"] [data-facing]', el => el.getAttribute('data-facing'));
    console.log('Mascot walking direction (scrolled up):', mascotFacingUp);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `2-doors-${vp.name}.png`),
    });
    console.log(`Doors screenshot saved: 2-doors-${vp.name}.png`);

    // ── 3. Two Ways Section & Airplane ──
    console.log('\n--- 3. Two Ways Section & Airplane Verification ---');
    const pathsOffsetTop = await page.evaluate(() => {
      const el = document.querySelector('[class*="paths"]');
      return el ? el.offsetTop : 0;
    });

    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), pathsOffsetTop);
    await page.waitForTimeout(500);

    const flightSvg = await page.$('[class*="flightCanvas"] svg');
    console.log('Flight canvas SVG present:', !!flightSvg);

    const rightWay = await page.$('[class*="wayRight"]');
    if (rightWay) {
      const box = await rightWay.boundingBox();
      if (box) {
        // Move near left of route (Korea)
        await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.5);
        await page.waitForTimeout(400);
        const transformKorea = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));

        // Move near right of route (Dubai)
        await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.5);
        await page.waitForTimeout(400);
        const transformDubai = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));

        console.log('Airplane transform near Korea:', transformKorea);
        console.log('Airplane transform near Dubai:', transformDubai);
        console.log('Airplane dynamically moved along curve:', transformKorea !== transformDubai);
      }
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `3-twoways-${vp.name}.png`),
    });
    console.log(`TwoWays screenshot saved: 3-twoways-${vp.name}.png`);

    // ── 4. Happy Families Dusk Background Transition ──
    console.log('\n--- 4. Happy Families Dusk Verification ---');
    const duskOffsetTop = await page.evaluate(() => {
      const el = document.querySelector('[class*="familiesSection"]');
      return el ? el.offsetTop : 0;
    });

    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), duskOffsetTop);
    await page.waitForTimeout(500);

    const duskSky = await page.$('[class*="duskSky"]');
    const duskNote = await page.$('[class*="duskNote"]');
    const duskTeddy = await page.$('[class*="duskTeddy"]');
    const polaroids = await page.$$('[class*="familiesGrid"] [class*="polaroid"]');

    console.log('Dusk sky header present:', !!duskSky);
    console.log('Speech bubble testimonial present:', !!duskNote);
    console.log('Sunset horizon mascot present:', !!duskTeddy);
    console.log('Featured polaroids count:', polaroids.length);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `4-dusk-${vp.name}.png`),
    });
    console.log(`Dusk screenshot saved: 4-dusk-${vp.name}.png`);

    // ── 5. Footer Puppy & Basket ──
    console.log('\n--- 5. Footer Puppy & Basket Verification ---');
    const footerOffsetTop = await page.evaluate(() => {
      const el = document.querySelector('footer');
      return el ? el.offsetTop : 0;
    });

    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), footerOffsetTop);
    await page.waitForTimeout(500);

    const hill = await page.$('[class*="footerHill"]');
    const moon = await page.$('[class*="moon"]');
    const stars = await page.$$('[class*="star"]');
    const basketBack = await page.$('[class*="basketBack"]');
    const basketPup = await page.$('[class*="basketPup"]');
    const basketFront = await page.$('[class*="basketFront"]');

    console.log('Footer hill contour present:', !!hill);
    console.log('Crescent moon present:', !!moon);
    console.log('Twinkling stars count:', stars.length);
    console.log('Basket Layer 1 (Back):', !!basketBack);
    console.log('Basket Layer 2 (Puppy in basket):', !!basketPup);
    console.log('Basket Layer 3 (Front Woven Body):', !!basketFront);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `5-footer-${vp.name}.png`),
    });
    console.log(`Footer screenshot saved: 5-footer-${vp.name}.png`);

    // Check horizontal page overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`Horizontal page overflow: ${hasHorizontalOverflow ? 'FAIL (overflow detected)' : 'PASS (0 overflow)'}`);

    console.log(`Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n--- ALL VERIFICATIONS COMPLETE ---');
}

run().catch(console.error);
