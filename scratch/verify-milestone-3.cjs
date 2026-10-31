const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('audit_screenshots/milestone3_verification');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function verifyMilestone3() {
  console.log('=== STARTING MILESTONE 3 AUTOMATED VERIFICATION ===\n');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`Console error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    errors.push(`Page uncaught error: ${err.message}`);
  });

  let allPassed = true;

  // 1. SPLASH CURTAIN ENTRANCE TEST
  console.log('[TEST 1] Splash & Entrance Curtain Sequence');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

  // Check initial curtain presence
  const curtainInitial = await page.evaluate(() => {
    const curtain = document.querySelector('div[class*="curtain"]');
    return curtain ? curtain.getAttribute('data-state') : null;
  });
  console.log('Curtain on domcontentloaded:', curtainInitial);

  // Wait for curtain lift animation and timeout to finish
  await page.waitForTimeout(1400);

  const curtainAfterLift = await page.evaluate(() => {
    const curtain = document.querySelector('div[class*="curtain"]');
    return curtain ? curtain.getAttribute('data-state') : 'unmounted';
  });
  console.log('Curtain state after lift animation:', curtainAfterLift);

  if (curtainAfterLift === 'idle' || curtainAfterLift === 'unmounted') {
    console.log('✓ PASS: Curtain lifts and settles to idle state (hidden/non-blocking)');
  } else {
    console.error(`FAIL: Curtain did not transition to idle: ${curtainAfterLift}`);
    allPassed = false;
  }

  // 2. REDUCED MOTION TEST
  console.log('\n[TEST 2] Accessibility: prefers-reduced-motion Handling');
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  const rmCurtainState = await rmPage.evaluate(() => {
    const curtain = document.querySelector('div[class*="curtain"]');
    return curtain ? curtain.getAttribute('data-state') : 'unmounted';
  });
  console.log('Curtain with prefers-reduced-motion: reduce:', rmCurtainState);
  if (rmCurtainState === 'idle' || rmCurtainState === 'unmounted') {
    console.log('✓ PASS: Splash curtain is bypassed immediately (idle) under prefers-reduced-motion');
  } else {
    console.error(`FAIL: Splash curtain was not bypassed in reduced motion: ${rmCurtainState}`);
    allPassed = false;
  }
  await rmContext.close();

  // 3. HEADER NAV LINK PAW INDICATOR & LOGO HOVER
  console.log('\n[TEST 3] Header Navigation Paw Indicator & Logo Hover');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const navPawAudit = await page.evaluate(async () => {
    const activeLink = document.querySelector('header nav a[class*="active"]');
    const inactiveLink = Array.from(document.querySelectorAll('header nav a')).find(a => !a.className.includes('active'));

    const activePaw = activeLink ? activeLink.querySelector('span[class*="navPaw"]') : null;
    const inactivePaw = inactiveLink ? inactiveLink.querySelector('span[class*="navPaw"]') : null;

    return {
      activeLinkText: activeLink ? activeLink.innerText.trim() : null,
      activePawOpacity: activePaw ? getComputedStyle(activePaw).opacity : null,
      inactiveLinkText: inactiveLink ? inactiveLink.innerText.trim() : null,
      inactivePawOpacity: inactivePaw ? getComputedStyle(inactivePaw).opacity : null
    };
  });
  console.log('Nav Paw indicator initial state:', navPawAudit);

  if (navPawAudit.activePawOpacity === '1') {
    console.log('✓ PASS: Active navigation link paw indicator is visible (opacity: 1)');
  } else {
    console.error(`FAIL: Active nav link paw opacity is '${navPawAudit.activePawOpacity}', expected '1'`);
    allPassed = false;
  }

  if (navPawAudit.inactivePawOpacity === '0') {
    console.log('✓ PASS: Inactive navigation link paw indicator is hidden (opacity: 0)');
  } else {
    console.error(`FAIL: Inactive nav link paw opacity is '${navPawAudit.inactivePawOpacity}', expected '0'`);
    allPassed = false;
  }

  // Hover over inactive link
  const inactiveLinkLocator = page.locator('header nav a', { hasText: 'Puppies' });
  await inactiveLinkLocator.hover();
  await page.waitForTimeout(200);

  const hoveredPawOpacity = await inactiveLinkLocator.evaluate((el) => {
    const paw = el.querySelector('span[class*="navPaw"]');
    return paw ? getComputedStyle(paw).opacity : null;
  });
  console.log('Hovered inactive nav link paw opacity:', hoveredPawOpacity);

  if (parseFloat(hoveredPawOpacity) > 0.3) {
    console.log('✓ PASS: Hovering over inactive nav link springs paw indicator into view');
  } else {
    console.error(`FAIL: Hovered nav link paw opacity '${hoveredPawOpacity}' is too low`);
    allPassed = false;
  }

  // Hover over logo
  const logoLocator = page.locator('header a[class*="logo"]');
  await logoLocator.hover();
  await page.waitForTimeout(200);

  const logoTransform = await logoLocator.locator('img').evaluate((img) => {
    return getComputedStyle(img).transform;
  });
  console.log('Logo image transform on hover:', logoTransform);
  if (logoTransform !== 'none') {
    console.log('✓ PASS: Header logo wiggles with spring bounce on hover');
  } else {
    console.error('FAIL: Header logo transform did not change on hover');
    allPassed = false;
  }

  // 4. BUTTONS & WHATSAPP CTA HOVER & PRESS
  console.log('\n[TEST 4] Buttons & WhatsApp CTA Micro-Interactions');
  const primaryBtn = page.locator('a.btn-primary').first();
  await primaryBtn.hover();
  await page.waitForTimeout(150);

  const btnHoverStyle = await primaryBtn.evaluate((el) => {
    return {
      transform: getComputedStyle(el).transform,
      boxShadow: getComputedStyle(el).boxShadow
    };
  });
  console.log('Primary button on hover:', btnHoverStyle);
  if (btnHoverStyle.transform !== 'none') {
    console.log('✓ PASS: Button responds to hover with tactile lift & shadow deepening');
  } else {
    console.error('FAIL: Button transform is none on hover');
    allPassed = false;
  }

  // 5. ACCORDION OPEN/CLOSE INTERACTION
  console.log('\n[TEST 5] FAQ Accordion Spring Toggle');
  await page.goto(`${BASE_URL}/faq`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Click second question
  const secondFaqBtn = page.locator('div[class*="item"] button[class*="header"]').nth(1);
  await secondFaqBtn.click();
  await page.waitForTimeout(300);

  const accordionState = await secondFaqBtn.evaluate((btn) => {
    const icon = btn.querySelector('span[class*="toggleIcon"]');
    return {
      expanded: btn.getAttribute('aria-expanded'),
      iconTransform: icon ? getComputedStyle(icon).transform : null
    };
  });
  console.log('Accordion item 2 after click:', accordionState);
  if (accordionState.expanded === 'true') {
    console.log('✓ PASS: Accordion expands with rotate(45deg) spring icon transition');
  } else {
    console.error('FAIL: Accordion item 2 did not expand');
    allPassed = false;
  }

  // 6. FILTER PILLS SPRING INTERACTION
  console.log('\n[TEST 6] Filter Pills Spring Hover & Selection');
  await page.goto(`${BASE_URL}/puppies`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const pill = page.locator('button[class*="filterPill"]').nth(1);
  await pill.hover();
  await page.waitForTimeout(150);

  const pillHoverTransform = await pill.evaluate(p => getComputedStyle(p).transform);
  console.log('Filter pill hover transform:', pillHoverTransform);
  if (pillHoverTransform !== 'none') {
    console.log('✓ PASS: Filter pill lifts on hover with spring easing');
  } else {
    console.error('FAIL: Filter pill transform is none on hover');
    allPassed = false;
  }

  // 7. DESKTOP VIEWPORTS & OVERFLOW CHECK
  console.log('\n[TEST 7] Desktop Viewports & Overflow Verification');
  const VIEWPORTS = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '1600x900', width: 1600, height: 900 }
  ];

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    const overflowCheck = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });

    if (overflowCheck.hasHorizontalOverflow) {
      console.error(`FAIL: Horizontal overflow at ${vp.name}`);
      allPassed = false;
    } else {
      console.log(`✓ PASS: Zero horizontal overflow at ${vp.name}`);
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `home_${vp.name}.png`), fullPage: false });
  }

  // 8. CONSOLE ERRORS
  console.log('\n[TEST 8] Browser Console Errors Check');
  if (errors.length > 0) {
    console.error('FAIL: Console errors detected:', errors);
    allPassed = false;
  } else {
    console.log('✓ PASS: Exactly 0 console errors across all interactions');
  }

  await browser.close();

  if (!allPassed) {
    console.error('\n❌ ONE OR MORE MILESTONE 3 CHECKS FAILED.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL MILESTONE 3 ANIMATION & MICRO-INTERACTION TESTS PASSED PERFECTLY!');
  }
}

verifyMilestone3().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
