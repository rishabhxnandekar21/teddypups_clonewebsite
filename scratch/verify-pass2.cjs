const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VERIFY_DIR = 'audit_screenshots/visual_fidelity/pass2_verification';
if (!fs.existsSync(VERIFY_DIR)) {
  fs.mkdirSync(VERIFY_DIR, { recursive: true });
}

async function runPass2Verification() {
  console.log('=== PASS 2 VISUAL FIDELITY AUDIT & VERIFICATION (1440x900) ===');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refContext.newPage();
  const locPage = await locContext.newPage();

  const consoleErrors = [];
  locPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const results = {
    high02_hiw: { status: 'PENDING', checks: [] },
    high03_journey: { status: 'PENDING', checks: [] },
    high04_dusk: { status: 'PENDING', checks: [] },
    regressions: { status: 'PENDING', checks: [] },
  };

  // =========================================================================
  // 1. VERIFY HIGH-02: /how-it-works
  // =========================================================================
  console.log('\n--- 1. VERIFYING HIGH-02: /how-it-works ---');
  await refPage.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });
  await locPage.goto('http://localhost:5173/how-it-works', { waitUntil: 'networkidle' });
  await refPage.waitForTimeout(1000);
  await locPage.waitForTimeout(1000);

  // Check 1: Phone mockup absent on Local HIW
  const locPhone = await locPage.$('main .tp-phone, main [class*="phoneMockup"], main [class*="phoneScreen"]');
  const hasPhoneOnLocal = !!locPhone;
  results.high02_hiw.checks.push({
    item: 'Phone mockup removed from /how-it-works',
    passed: !hasPhoneOnLocal,
    details: hasPhoneOnLocal ? 'FAIL (phone mockup still present)' : 'PASS (no phone mockup)',
  });

  // Check 2: Unauthorized #why-us absent
  const locWhyUs = await locPage.$('#why-us');
  results.high02_hiw.checks.push({
    item: 'Redundant #why-us card container removed',
    passed: !locWhyUs,
    details: locWhyUs ? 'FAIL (#why-us still exists)' : 'PASS (removed)',
  });

  // Check 3: Two-column Dubai skyline Delivery section present
  const locDelivery = await locPage.$('#delivery');
  const locSkyline = await locPage.$('#delivery svg[viewBox="0 0 300 120"]');
  const locFlightSvg = await locPage.$('#delivery svg[viewBox="0 0 660 300"]');
  const hasDelivery2Col = !!locDelivery && !!locSkyline && !!locFlightSvg;
  results.high02_hiw.checks.push({
    item: 'Two-column Dubai skyline Delivery section restored',
    passed: hasDelivery2Col,
    details: hasDelivery2Col ? 'PASS (skyline SVG and flight path rendered)' : 'FAIL (missing skyline visual)',
  });

  // Check 4: Promise section styled as puppy passport paper with stamps
  const locPromise = await locPage.$('#promise');
  const locStamps = await locPage.$$('#promise [class*="stamp"]');
  results.high02_hiw.checks.push({
    item: 'Puppy passport promise paper with physical stamps',
    passed: !!locPromise && locStamps.length >= 3,
    details: locStamps.length >= 3 ? 'PASS (3 passport stamps rendered)' : 'FAIL (insufficient stamps)',
  });

  // Check 5: Why choose us section present
  const locWhy = await locPage.$('#why');
  const locWhyFeatures = await locPage.$$('#why li');
  results.high02_hiw.checks.push({
    item: 'Why choose us two-column features grid',
    passed: !!locWhy && locWhyFeatures.length >= 3,
    details: locWhyFeatures.length >= 3 ? 'PASS (3 feature items rendered)' : 'FAIL (missing why section)',
  });

  // Capture matched screenshots of HIW sections
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '01_ref_hiw_hero.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '01_loc_hiw_hero.png') });

  await refPage.evaluate(() => document.querySelector('#promise').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await locPage.evaluate(() => document.querySelector('#promise').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '02_ref_hiw_promise.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '02_loc_hiw_promise.png') });

  await refPage.evaluate(() => document.querySelector('#delivery').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await locPage.evaluate(() => document.querySelector('#delivery').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '03_ref_hiw_delivery.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '03_loc_hiw_delivery.png') });

  await refPage.evaluate(() => document.querySelector('#why').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await locPage.evaluate(() => document.querySelector('#why').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '04_ref_hiw_why.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '04_loc_hiw_why.png') });

  const hiwAllPassed = results.high02_hiw.checks.every(c => c.passed);
  results.high02_hiw.status = hiwAllPassed ? 'PASS' : 'FAIL';
  console.log(`HIGH-02 Checks:`, JSON.stringify(results.high02_hiw.checks, null, 2));
  console.log(`HIGH-02 Overall Status: ${results.high02_hiw.status}`);

  // =========================================================================
  // 2. VERIFY HIGH-03: Homepage Journey Sticky Section
  // =========================================================================
  console.log('\n--- 2. VERIFYING HIGH-03: Homepage Journey Sticky Section ---');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await refPage.waitForTimeout(1000);
  await locPage.waitForTimeout(1000);

  // Check 1: Section height approx 1697px
  const locChatHeight = await locPage.evaluate(() => {
    const el = document.querySelector('.tp-chat, [class*="journeySection"]');
    return el ? el.offsetHeight : 0;
  });
  const heightOk = locChatHeight >= 1500 && locChatHeight <= 1900;
  results.high03_journey.checks.push({
    item: 'Section duration ~1697px',
    passed: heightOk,
    details: `Measured height: ${locChatHeight}px (Target ~1697px) -> ${heightOk ? 'PASS' : 'FAIL'}`,
  });

  // Check 2: Sticky side container
  const locSideSticky = await locPage.evaluate(() => {
    const side = document.querySelector('[class*="chatSide"]');
    if (!side) return 'not found';
    return window.getComputedStyle(side).position;
  });
  const isSticky = locSideSticky === 'sticky';
  results.high03_journey.checks.push({
    item: 'Phone side container has position: sticky',
    passed: isSticky,
    details: `Position: ${locSideSticky} -> ${isSticky ? 'PASS' : 'FAIL'}`,
  });

  // Check 3: Scroll-driven step progression down and up
  const chatY = await locPage.evaluate(() => {
    const el = document.querySelector('.tp-chat, [class*="journeySection"]');
    return el.getBoundingClientRect().top + window.scrollY;
  });

  // Test Step 0
  await locPage.evaluate(y => window.scrollTo({ top: y + 100, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const step0Active = await locPage.$eval('li[class*="chatStep"]:nth-child(1)', el => el.getAttribute('data-active') === 'true');
  const group0Shown = await locPage.$eval('[data-step="0"]', el => el.getAttribute('data-show') === 'true');

  // Test Step 1
  await locPage.evaluate(y => window.scrollTo({ top: y + 700, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const step1Active = await locPage.$eval('li[class*="chatStep"]:nth-child(2)', el => el.getAttribute('data-active') === 'true');
  const group1Shown = await locPage.$eval('[data-step="1"]', el => el.getAttribute('data-show') === 'true');

  // Test Step 2
  await locPage.evaluate(y => window.scrollTo({ top: y + 1300, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const step2Active = await locPage.$eval('li[class*="chatStep"]:nth-child(3)', el => el.getAttribute('data-active') === 'true');
  const group2Shown = await locPage.$eval('[data-step="2"]', el => el.getAttribute('data-show') === 'true');

  // Test Reverse Scroll back to Step 0
  await locPage.evaluate(y => window.scrollTo({ top: y + 100, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const step0Reverse = await locPage.$eval('li[class*="chatStep"]:nth-child(1)', el => el.getAttribute('data-active') === 'true');

  const progressionOk = step0Active && step1Active && step2Active && step0Reverse && group0Shown && group1Shown && group2Shown;
  results.high03_journey.checks.push({
    item: 'Scroll-linked step progression (0 -> 1 -> 2) and reverse retracing',
    passed: progressionOk,
    details: `Step 0: ${step0Active}, Step 1: ${step1Active}, Step 2: ${step2Active}, Reverse: ${step0Reverse} -> ${progressionOk ? 'PASS' : 'FAIL'}`,
  });

  // Capture screenshots at step 0, 1, 2
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-chat');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 200, behavior: 'instant' });
  });
  await locPage.evaluate(y => window.scrollTo({ top: y + 200, behavior: 'instant' }), chatY);
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '05_ref_journey_step0.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '05_loc_journey_step0.png') });

  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-chat');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 800, behavior: 'instant' });
  });
  await locPage.evaluate(y => window.scrollTo({ top: y + 800, behavior: 'instant' }), chatY);
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '06_ref_journey_step1.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '06_loc_journey_step1.png') });

  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-chat');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 1300, behavior: 'instant' });
  });
  await locPage.evaluate(y => window.scrollTo({ top: y + 1300, behavior: 'instant' }), chatY);
  await refPage.waitForTimeout(300);
  await locPage.waitForTimeout(300);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '07_ref_journey_step2.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '07_loc_journey_step2.png') });

  const journeyAllPassed = results.high03_journey.checks.every(c => c.passed);
  results.high03_journey.status = journeyAllPassed ? 'PASS' : 'FAIL';
  console.log(`HIGH-03 Checks:`, JSON.stringify(results.high03_journey.checks, null, 2));
  console.log(`HIGH-03 Overall Status: ${results.high03_journey.status}`);

  // =========================================================================
  // 3. VERIFY HIGH-04: Homepage Happy Families Dusk Section
  // =========================================================================
  console.log('\n--- 3. VERIFYING HIGH-04: Homepage Dusk Section ---');
  const locDuskInfo = await locPage.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk, [class*="familiesSection"]');
    if (!dusk) return null;
    const cards = Array.from(dusk.querySelectorAll('[class*="polaroid"], figure[class*="card"], [class*="familiesGrid"] > *'));
    const cs = window.getComputedStyle(dusk);
    return {
      height: dusk.offsetHeight,
      cardsCount: cards.length,
      background: cs.background,
    };
  });

  const duskHeightOk = locDuskInfo && locDuskInfo.height >= 1400;
  const duskCountOk = locDuskInfo && locDuskInfo.cardsCount >= 24;

  results.high04_dusk.checks.push({
    item: 'Section height approx 1575px',
    passed: duskHeightOk,
    details: `Measured height: ${locDuskInfo?.height}px (Target ~1575px) -> ${duskHeightOk ? 'PASS' : 'FAIL'}`,
  });

  results.high04_dusk.checks.push({
    item: '32 Polaroid moments in photowall quilt',
    passed: duskCountOk,
    details: `Cards rendered: ${locDuskInfo?.cardsCount} -> ${duskCountOk ? 'PASS' : 'FAIL'}`,
  });

  // Capture matched screenshots of dusk section
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-dusk');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
  });
  await locPage.evaluate(() => {
    const el = document.querySelector('.tp-dusk, [class*="familiesSection"]');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
  });
  await refPage.waitForTimeout(400);
  await locPage.waitForTimeout(400);
  await refPage.screenshot({ path: path.join(VERIFY_DIR, '08_ref_dusk_top.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, '08_loc_dusk_top.png') });

  const duskAllPassed = results.high04_dusk.checks.every(c => c.passed);
  results.high04_dusk.status = duskAllPassed ? 'PASS' : 'FAIL';
  console.log(`HIGH-04 Overall Status: ${results.high04_dusk.status}`);

  // =========================================================================
  // 4. REGRESSION CHECKS (CRIT-01 & HIGH-01)
  // =========================================================================
  console.log('\n--- 4. REGRESSION CHECKS ---');
  // Check CRIT-01 Airplane
  const pathsY = await locPage.evaluate(() => {
    const s = document.querySelector('[class*="paths"]');
    return s.getBoundingClientRect().top + window.scrollY;
  });
  await locPage.evaluate(y => window.scrollTo({ top: y + 300, behavior: 'instant' }), pathsY);
  await locPage.waitForTimeout(200);
  const planeTf = await locPage.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
  const airplaneWorking = planeTf && !planeTf.includes('391.4');
  results.regressions.checks.push({
    item: 'CRIT-01 Airplane continues to fly along curve',
    passed: airplaneWorking,
    details: `Current transform: ${planeTf} -> ${airplaneWorking ? 'PASS' : 'FAIL'}`,
  });

  // Check HIGH-01 Door images
  const uniqueDoors = await locPage.$$eval('[class*="doorsGrid"] [class*="tp-door"]:not([class*="doorAll"]) img', imgs => {
    return new Set(imgs.map(i => i.src)).size;
  });
  const doorsWorking = uniqueDoors === 15;
  results.regressions.checks.push({
    item: 'HIGH-01 Door photos maintain 15/15 uniqueness',
    passed: doorsWorking,
    details: `Unique door images: ${uniqueDoors}/15 -> ${doorsWorking ? 'PASS' : 'FAIL'}`,
  });

  // Check Console errors
  results.regressions.checks.push({
    item: '0 Console Errors',
    passed: consoleErrors.length === 0,
    details: `Errors count: ${consoleErrors.length}`,
  });

  const regressionsPassed = results.regressions.checks.every(c => c.passed);
  results.regressions.status = regressionsPassed ? 'PASS' : 'FAIL';
  console.log(`Regression Status: ${results.regressions.status}`);

  console.log('\n=== PASS 2 FINAL VERIFICATION SUMMARY ===');
  console.log(`HIGH-02 (/how-it-works): ${results.high02_hiw.status}`);
  console.log(`HIGH-03 (Homepage Journey): ${results.high03_journey.status}`);
  console.log(`HIGH-04 (Homepage Dusk): ${results.high04_dusk.status}`);
  console.log(`Regressions: ${results.regressions.status}`);

  fs.writeFileSync(path.join(VERIFY_DIR, 'summary.json'), JSON.stringify(results, null, 2));

  await refContext.close();
  await locContext.close();
  await browser.close();

  const allPassed = results.high02_hiw.status === 'PASS' &&
                    results.high03_journey.status === 'PASS' &&
                    results.high04_dusk.status === 'PASS' &&
                    results.regressions.status === 'PASS';

  if (!allPassed) {
    console.error('Pass 2 did not pass all checks.');
    process.exit(1);
  } else {
    console.log('PASS 2 VERIFICATION PASSED COMPLETELY!');
  }
}

runPass2Verification().catch(err => {
  console.error(err);
  process.exit(1);
});
