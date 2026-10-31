const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = path.join(__dirname, '..', 'audit_screenshots', 'local_milestone5');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: '1440x900_primary', width: 1440, height: 900 },
  { name: '1366x768_secondary', width: 1366, height: 768 },
  { name: '1600x900_additional', width: 1600, height: 900 },
];

async function runAudit() {
  console.log('=== STARTING MILESTONE 5 COMPREHENSIVE DESKTOP AUDIT ===\n');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = {
    viewportsTested: [],
    lightboxModalTest: false,
    luggageTagTest: false,
    faqStarsCount: 0,
    passportStampsCount: 0,
    overflowErrors: [],
    consoleErrors: [],
    screenshotsCaptured: [],
  };

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        results.consoleErrors.push(`[${vp.name}] ${msg.text()}`);
        console.error(`  [Console Error]: ${msg.text()}`);
      }
    });

    page.on('pageerror', err => {
      results.consoleErrors.push(`[${vp.name}] PAGE ERROR: ${err.message}`);
      console.error(`  [Page Error]: ${err.message}`);
    });

    const routes = [
      { path: '/', name: '01_homepage' },
      { path: '/puppies', name: '02_puppies' },
      { path: '/puppies/maltipoo-max-male', name: '03_puppy_detail' },
      { path: '/gone-home', name: '04_gone_home' },
      { path: '/happy-families', name: '05_happy_families' },
      { path: '/how-it-works', name: '06_how_it_works' },
      { path: '/faq', name: '07_faq' },
      { path: '/contact', name: '08_contact' },
    ];

    for (const r of routes) {
      await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      // Check horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      if (hasOverflow) {
        results.overflowErrors.push(`Overflow on ${r.path} @ ${vp.name}`);
        console.warn(`  ⚠️ Horizontal overflow detected on ${r.path}`);
      }

      // Capture screenshot
      const shotPath = path.join(OUTPUT_DIR, `${r.name}_${vp.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      results.screenshotsCaptured.push(shotPath);
      console.log(`  ✓ Route ${r.path} rendered clean. Screenshot: ${path.basename(shotPath)}`);
    }

    results.viewportsTested.push(vp.name);
    await context.close();
  }

  // --- Specialized Functional Verification on Primary Viewport (1440x900) ---
  console.log('\n--- Running Functional Verification on Primary 1440x900 ---');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Verify Lightbox Modal on /happy-families
  console.log('Testing Lightbox Modal on /happy-families...');
  await page.goto(`${BASE_URL}/happy-families`, { waitUntil: 'networkidle' });
  const polaroids = page.locator('button[class*="polaroidBtn"]');
  const polaroidCount = await polaroids.count();
  console.log(`  Found ${polaroidCount} polaroid cards on /happy-families (expected 64)`);

  if (polaroidCount > 0) {
    // Click first polaroid to open lightbox
    await polaroids.first().click();
    await page.waitForTimeout(400);

    const dialog = page.locator('div[role="dialog"]');
    const isDialogVisible = await dialog.isVisible();
    console.log(`  Lightbox dialog visible after click: ${isDialogVisible}`);

    if (isDialogVisible) {
      // Test Next arrow button
      const nextBtn = dialog.locator('button[aria-label="Next photo"]');
      await nextBtn.click();
      await page.waitForTimeout(200);

      // Test Right Arrow Key
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);

      // Test Left Arrow Key
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(200);

      // Capture lightbox screenshot
      const lightboxShot = path.join(OUTPUT_DIR, '09_lightbox_active_1440x900.png');
      await page.screenshot({ path: lightboxShot });
      results.screenshotsCaptured.push(lightboxShot);

      // Test Escape Key to close
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const isDialogClosed = !(await dialog.isVisible());
      console.log(`  Lightbox closed on Escape key: ${isDialogClosed}`);

      results.lightboxModalTest = isDialogVisible && isDialogClosed && polaroidCount === 64;
    }
  }

  // 2. Verify Boarding Passes & Pendulum tag on /gone-home
  console.log('\nTesting Boarding Passes on /gone-home...');
  await page.goto(`${BASE_URL}/gone-home`, { waitUntil: 'networkidle' });
  const boardingTickets = page.locator('li[class*="ticket"]');
  const ticketCount = await boardingTickets.count();
  console.log(`  Found ${ticketCount} boarding passes on /gone-home (expected 27)`);

  const firstTicket = boardingTickets.first();
  if (await firstTicket.isVisible()) {
    await firstTicket.hover();
    await page.waitForTimeout(300);
    const shotTicket = path.join(OUTPUT_DIR, '10_boarding_pass_hover_1440x900.png');
    await page.screenshot({ path: shotTicket });
    results.screenshotsCaptured.push(shotTicket);
    results.luggageTagTest = ticketCount === 27;
  }

  // 3. Verify exact 9 starburst SVGs on /faq
  console.log('\nVerifying 9 starburst SVGs on /faq...');
  await page.goto(`${BASE_URL}/faq`, { waitUntil: 'networkidle' });
  const stars = page.locator('svg[class*="starburst"]');
  results.faqStarsCount = await stars.count();
  console.log(`  Found ${results.faqStarsCount} starburst SVGs on /faq (exact live reference target: 9)`);

  // 4. Verify 4 rubber guarantee stamps on /
  console.log('\nVerifying 4 passport guarantee stamps on /...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  const stamps = page.locator('li[class*="entry"]');
  results.passportStampsCount = await stamps.count();
  console.log(`  Found ${results.passportStampsCount} passport stamps on / (exact live reference target: 4)`);

  // 5. Verify Contact Page Letterform
  console.log('\nTesting Contact Page Letterform on /contact...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  const nameInput = page.locator('input[name="name"]');
  const phoneInput = page.locator('input[name="phone"]');
  await nameInput.fill('Sarah Smith');
  await phoneInput.fill('+971 50 123 4567');
  const shotContact = path.join(OUTPUT_DIR, '11_contact_filled_1440x900.png');
  await page.screenshot({ path: shotContact });
  results.screenshotsCaptured.push(shotContact);

  await context.close();
  await browser.close();

  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Viewports Tested: ${results.viewportsTested.join(', ')}`);
  console.log(`Lightbox Modal Open & Close Test: ${results.lightboxModalTest ? 'PASSED' : 'FAILED'}`);
  console.log(`Luggage Tag Count (27): ${results.luggageTagTest ? 'PASSED' : 'FAILED'}`);
  console.log(`FAQ Starburst SVGs (9): ${results.faqStarsCount === 9 ? 'PASSED' : 'FAILED'}`);
  console.log(`Passport Stamps (4): ${results.passportStampsCount === 4 ? 'PASSED' : 'FAILED'}`);
  console.log(`Horizontal Overflows: ${results.overflowErrors.length === 0 ? '0 (ALL CLEAR)' : results.overflowErrors.join(', ')}`);
  console.log(`Console Errors: ${results.consoleErrors.length === 0 ? '0 (ALL CLEAR)' : results.consoleErrors.length}`);
  console.log(`Total Screenshots: ${results.screenshotsCaptured.length}`);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audit-results.json'),
    JSON.stringify(results, null, 2)
  );
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
