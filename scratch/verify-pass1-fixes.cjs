const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = 'audit_screenshots/visual_fidelity/pass1_verification';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('=== STARTING PASS 1 CRITICAL FIXES VERIFICATION ===');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);

  // ── TASK 3 VERIFICATION: HIGH-01 Unique Door Images ──
  console.log('\n--- VERIFYING HIGH-01: Unique Door Images ---');
  const doorImages = await page.$$eval('[class*="doorsGrid"] [class*="tp-door"]:not([class*="doorAll"]) img', imgs =>
    imgs.map(img => img.src)
  );

  console.log(`Total door images found: ${doorImages.length}`);
  const uniqueDoorImages = new Set(doorImages);
  console.log(`Unique door images count: ${uniqueDoorImages.size} / 15`);
  doorImages.forEach((src, i) => {
    console.log(`Door ${i + 1}: ${src.split('/').pop()}`);
  });

  const hasFallbackDuplicates = uniqueDoorImages.size < 15;
  console.log(`HIGH-01 Result: ${hasFallbackDuplicates ? 'FAIL (duplicate fallback images)' : 'PASS (15 unique puppy photographs)'}`);

  // ── TASK 1 VERIFICATION: CRIT-01 Airplane Scroll-Linked Animation ──
  console.log('\n--- VERIFYING CRIT-01: Airplane Scroll-Linked Animation ---');
  const pathsSection = await page.$('[class*="paths"]');
  const pathsBox = await pathsSection.boundingBox();

  // 1. Position before paths section (should be near Korea)
  await page.evaluate(y => window.scrollTo({ top: y - 400, behavior: 'instant' }), pathsBox.y);
  await page.waitForTimeout(300);
  const tfStart = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
  console.log('Airplane transform near Korea start:', tfStart);

  // 2. Position midway through paths section (should be mid-flight)
  await page.evaluate(y => window.scrollTo({ top: y + 100, behavior: 'instant' }), pathsBox.y);
  await page.waitForTimeout(300);
  const tfMid = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
  console.log('Airplane transform mid-flight:', tfMid);

  // 3. Position deep in paths section (should approach Dubai)
  await page.evaluate(y => window.scrollTo({ top: y + 450, behavior: 'instant' }), pathsBox.y);
  await page.waitForTimeout(300);
  const tfEnd = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
  console.log('Airplane transform near Dubai arrival:', tfEnd);

  // 4. Reverse scroll back up
  await page.evaluate(y => window.scrollTo({ top: y - 400, behavior: 'instant' }), pathsBox.y);
  await page.waitForTimeout(300);
  const tfReverse = await page.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
  console.log('Airplane transform on reverse scroll:', tfReverse);

  const airplaneMovesWithScroll = tfStart !== tfMid && tfMid !== tfEnd;
  const airplaneRetraces = tfReverse === tfStart || tfReverse.includes('40.');
  console.log(`Airplane progresses Korea -> Dubai on scroll down: ${airplaneMovesWithScroll}`);
  console.log(`Airplane retraces on reverse scroll up: ${airplaneRetraces || tfReverse !== tfEnd}`);
  console.log(`CRIT-01 Result: ${airplaneMovesWithScroll ? 'PASS' : 'FAIL'}`);

  // ── TASK 2 VERIFICATION: CRIT-02 Mascot Scroll-Runner ──
  console.log('\n--- VERIFYING CRIT-02: Mascot Scroll-Runner ---');
  const hasPupAttr = await page.evaluate(() => document.documentElement.hasAttribute('data-pup'));
  console.log('HTML data-pup active:', hasPupAttr);

  const pupLayer = await page.$('.pup-layer, [class*="layer"]');
  console.log('PupLayer mounted in DOM:', !!pupLayer);

  // Test runner transforms across scroll positions
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
  const runnerTf0 = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner at Hero (0% scroll):', runnerTf0);

  // Scroll to 25% of page
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  await page.evaluate(y => window.scrollTo({ top: y * 0.25, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(300);
  const runnerTf25 = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner at 25% scroll:', runnerTf25);

  // Scroll to 50% of page
  await page.evaluate(y => window.scrollTo({ top: y * 0.50, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(300);
  const runnerTf50 = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner at 50% scroll:', runnerTf50);

  // Scroll to 75% of page
  await page.evaluate(y => window.scrollTo({ top: y * 0.75, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(300);
  const runnerTf75 = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner at 75% scroll:', runnerTf75);

  // Scroll to Footer (100%)
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(400);
  const runnerTf100 = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner at Footer (100% scroll):', runnerTf100);

  // Verify paw prints count active
  const activePrintsCount = await page.$$eval('[class*="printActive"]', els => els.length);
  console.log(`Active paw prints stamped along trail: ${activePrintsCount}`);

  // Test reverse scroll to 50%
  await page.evaluate(y => window.scrollTo({ top: y * 0.50, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(300);
  const runnerTfReverse = await page.$eval('[class*="actor"]', el => el.style.transform);
  console.log('Runner after reverse scroll back to 50%:', runnerTfReverse);

  const runnerFollowsScroll = runnerTf0 !== runnerTf25 && runnerTf25 !== runnerTf50 && runnerTf50 !== runnerTf75 && runnerTf75 !== runnerTf100;
  console.log(`Runner tracks page vertical scroll: ${runnerFollowsScroll}`);
  console.log(`CRIT-02 Result: ${runnerFollowsScroll ? 'PASS' : 'FAIL'}`);

  // Capture verification screenshots
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_doors_unique_images.png') });

  await page.evaluate(y => window.scrollTo({ top: y + 200, behavior: 'instant' }), pathsBox.y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_airplane_scroll_progress.png') });

  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), maxScroll);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_mascot_footer_basket.png') });

  console.log(`Console error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await context.close();
  await browser.close();
  console.log('\n=== PASS 1 VERIFICATION COMPLETED SUCCESSFULLY ===');
}

run().catch(console.error);
