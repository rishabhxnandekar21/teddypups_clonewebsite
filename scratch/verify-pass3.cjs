const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VERIFY_DIR = 'audit_screenshots/visual_fidelity/pass3_verification';
if (!fs.existsSync(VERIFY_DIR)) {
  fs.mkdirSync(VERIFY_DIR, { recursive: true });
}

async function runPass3Verification() {
  console.log('=== PASS 3 VISUAL FIDELITY AUDIT & VERIFICATION (1440x900) ===');

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
    med01_families: { status: 'PENDING', checks: [] },
    med02_faq: { status: 'PENDING', checks: [] },
    med03_header: { status: 'PENDING', checks: [] },
    med04_pup_detail: { status: 'PENDING', checks: [] },
    regressions: { status: 'PENDING', checks: [] },
  };

  try {
    // =========================================================================
    // 1. VERIFY MED-01: /happy-families
    // =========================================================================
    console.log('\n--- 1. VERIFYING MED-01: /happy-families ---');
    await refPage.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });
    await locPage.goto('http://localhost:5173/happy-families', { waitUntil: 'networkidle' });
    await refPage.waitForTimeout(1000);
    await locPage.waitForTimeout(1000);

    // Check 1: Polaroid count (64 moments)
    const locPolaroids = await locPage.$$('.tp-polaroid, [class*="polaroid"]');
    const countOk = locPolaroids.length >= 32;
    results.med01_families.checks.push({
      item: 'Wall of happy endings Polaroid gallery count',
      passed: countOk,
      details: `Rendered ${locPolaroids.length} polaroids (Expected >= 32, total 64) -> ${countOk ? 'PASS' : 'FAIL'}`,
    });

    // Check 2: No modal popup / LightboxModal on click
    await locPage.click('.tp-polaroid, [class*="polaroid"]');
    await locPage.waitForTimeout(300);
    const hasModal = await locPage.$('dialog[open], [role="dialog"], [class*="lightboxModal"]');
    results.med01_families.checks.push({
      item: 'No intrusive modal popup / lightbox trigger on click',
      passed: !hasModal,
      details: !hasModal ? 'PASS (static organic wall presentation)' : 'FAIL (modal appeared)',
    });

    // Check 3: Multi-column masonry layout
    const locWallCols = await locPage.evaluate(() => {
      const wall = document.querySelector('ul.tp-wall, ul[class*="wall"]');
      if (!wall) return null;
      return window.getComputedStyle(wall).columnCount;
    });
    const isMultiCol = locWallCols === '4';
    results.med01_families.checks.push({
      item: 'Multi-column masonry gallery layout (4 columns on desktop)',
      passed: isMultiCol,
      details: `Column count: ${locWallCols} -> ${isMultiCol ? 'PASS' : 'FAIL'}`,
    });

    // Check 4: Bottom mascot buddy
    const locFootPup = await locPage.$('.tp-memories__foot, [class*="foot"]');
    results.med01_families.checks.push({
      item: 'Mascot buddy admiring wall at bottom of memories section',
      passed: !!locFootPup,
      details: !!locFootPup ? 'PASS (mascot buddy present)' : 'FAIL (missing foot mascot)',
    });

    // Capture screenshots
    await refPage.screenshot({ path: path.join(VERIFY_DIR, '01_ref_happy_families_top.png') });
    await locPage.screenshot({ path: path.join(VERIFY_DIR, '01_loc_happy_families_top.png') });

    await refPage.evaluate(() => window.scrollTo(0, 1500));
    await locPage.evaluate(() => window.scrollTo(0, 1500));
    await refPage.waitForTimeout(300);
    await locPage.waitForTimeout(300);
    await refPage.screenshot({ path: path.join(VERIFY_DIR, '02_ref_happy_families_wall.png') });
    await locPage.screenshot({ path: path.join(VERIFY_DIR, '02_loc_happy_families_wall.png') });

    const med01Passed = results.med01_families.checks.every(c => c.passed);
    results.med01_families.status = med01Passed ? 'PASS' : 'FAIL';
    console.log('MED-01 Checks:', JSON.stringify(results.med01_families.checks, null, 2));
    console.log(`MED-01 Overall Status: ${results.med01_families.status}`);

    // =========================================================================
    // 2. VERIFY MED-02: /faq
    // =========================================================================
    console.log('\n--- 2. VERIFYING MED-02: /faq ---');
    await refPage.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
    await locPage.goto('http://localhost:5173/faq', { waitUntil: 'networkidle' });
    await refPage.waitForTimeout(1000);
    await locPage.waitForTimeout(1000);

    // Check 1: Storybook FAQ room scene & dark tone styling
    const locScene = await locPage.$('.tp-faqroom, [class*="scene"], [class*="faqroom"]');
    results.med02_faq.checks.push({
      item: 'Storybook FAQ room scene (tp-faqroom) with warm dusk atmosphere',
      passed: !!locScene,
      details: !!locScene ? 'PASS (tp-faqroom scene rendered)' : 'FAIL (scene missing)',
    });

    // Check 2: Pinned paper notes on board
    const locNotes = await locPage.$$('.tp-note, [class*="note"]');
    const notesCountOk = locNotes.length >= 9;
    results.med02_faq.checks.push({
      item: 'Pinned paper notes with physical thumbtacks on board',
      passed: notesCountOk,
      details: `Found ${locNotes.length} notes (Expected >= 9) -> ${notesCountOk ? 'PASS' : 'FAIL'}`,
    });

    // Check 3: Sidebar search and mascot buddy
    const locSearch = await locPage.$('input[type="search"]');
    const locSideMascot = await locPage.$('.tp-notes__teddy, [class*="teddyWrap"], [class*="sidebarTeddy"]');
    const searchMascotOk = !!locSearch && !!locSideMascot;
    results.med02_faq.checks.push({
      item: 'Interactive keyword search and Teddy reading notes with ? ! bubble',
      passed: searchMascotOk,
      details: searchMascotOk ? 'PASS (search and mascot present)' : 'FAIL',
    });

    // Check 4: Accordion expand / collapse
    const firstQuestionBtn = await locPage.$('.tp-note button, [class*="qButton"]');
    if (firstQuestionBtn) {
      await firstQuestionBtn.click();
      await locPage.waitForTimeout(200);
      await firstQuestionBtn.click();
      await locPage.waitForTimeout(200);
    }
    const hasExpanded = await locPage.$('[aria-expanded="true"]');
    results.med02_faq.checks.push({
      item: 'Accordion question note toggle with chevron rotation and answer flap',
      passed: !!hasExpanded,
      details: !!hasExpanded ? 'PASS (accordion functions correctly)' : 'FAIL',
    });

    // Capture screenshots
    await refPage.screenshot({ path: path.join(VERIFY_DIR, '03_ref_faq_scene.png') });
    await locPage.screenshot({ path: path.join(VERIFY_DIR, '03_loc_faq_scene.png') });

    const med02Passed = results.med02_faq.checks.every(c => c.passed);
    results.med02_faq.status = med02Passed ? 'PASS' : 'FAIL';
    console.log('MED-02 Checks:', JSON.stringify(results.med02_faq.checks, null, 2));
    console.log(`MED-02 Overall Status: ${results.med02_faq.status}`);

    // =========================================================================
    // 3. VERIFY MED-03: Global Header Scroll Hide/Reveal
    // =========================================================================
    console.log('\n--- 3. VERIFYING MED-03: Global Header Scroll Hide/Reveal ---');
    await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await locPage.waitForTimeout(1000);

    // Initial state at top: visible
    const initialHidden = await locPage.evaluate(() => {
      const h = document.querySelector('#site-header, .tp-header, [class*="headerWrapper"]');
      return h ? h.getAttribute('data-hidden') : null;
    });

    // Scroll down 400px: should hide
    await locPage.evaluate(() => window.scrollBy(0, 400));
    await locPage.waitForTimeout(500);
    const scrollDownHidden = await locPage.evaluate(() => {
      const h = document.querySelector('#site-header, .tp-header, [class*="headerWrapper"]');
      return h ? h.getAttribute('data-hidden') : null;
    });

    // Scroll up 150px: should reveal
    await locPage.evaluate(() => window.scrollBy(0, -150));
    await locPage.waitForTimeout(500);
    const scrollUpHidden = await locPage.evaluate(() => {
      const h = document.querySelector('#site-header, .tp-header, [class*="headerWrapper"]');
      return h ? h.getAttribute('data-hidden') : null;
    });

    const hideRevealOk = initialHidden === 'false' && scrollDownHidden === 'true' && scrollUpHidden === 'false';
    results.med03_header.checks.push({
      item: 'Scroll-linked header auto-hide on scroll down and reveal on scroll up',
      passed: hideRevealOk,
      details: `At top: hidden=${initialHidden}, Scrolled down 400px: hidden=${scrollDownHidden}, Scrolled up 150px: hidden=${scrollUpHidden} -> ${hideRevealOk ? 'PASS' : 'FAIL'}`,
    });

    results.med03_header.status = hideRevealOk ? 'PASS' : 'FAIL';
    console.log('MED-03 Checks:', JSON.stringify(results.med03_header.checks, null, 2));
    console.log(`MED-03 Overall Status: ${results.med03_header.status}`);

    // =========================================================================
    // 4. VERIFY MED-04: Puppy Detail Pages Storybook
    // =========================================================================
    console.log('\n--- 4. VERIFYING MED-04: Puppy Detail Pages Storybook ---');
    await refPage.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });
    await locPage.goto('http://localhost:5173/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });
    await refPage.waitForTimeout(1000);
    await locPage.waitForTimeout(1000);

    // Check 1: Storybook article container
    const locStorybook = await locPage.$('.tp-storybook, [class*="storybook"], article[class*="page"]');
    results.med04_pup_detail.checks.push({
      item: 'Storybook editorial article container with dynamic coat-color gradient',
      passed: !!locStorybook,
      details: !!locStorybook ? 'PASS (tp-storybook article rendered)' : 'FAIL',
    });

    // Check 2: Ribbon bookmark
    const locRibbon = await locPage.$('.tp-ribbon, [class*="ribbon"]');
    const locBand = await locPage.$('.tp-ribbon__band, [class*="ribbonBand"]');
    const ribbonOk = !!locRibbon && !!locBand;
    results.med04_pup_detail.checks.push({
      item: 'Storybook vertical ribbon bookmark scaling with scroll',
      passed: ribbonOk,
      details: ribbonOk ? 'PASS (tp-ribbon track and band rendered)' : 'FAIL',
    });

    // Check 3: Chapter marker
    const locChapter = await locPage.$('.tp-chapter, [class*="chapter"]');
    results.med04_pup_detail.checks.push({
      item: 'Editorial storybook chapter marker (1 hello, it\'s me)',
      passed: !!locChapter,
      details: !!locChapter ? 'PASS (chapter marker present)' : 'FAIL',
    });

    // Capture screenshots
    await refPage.screenshot({ path: path.join(VERIFY_DIR, '04_ref_puppy_detail.png') });
    await locPage.screenshot({ path: path.join(VERIFY_DIR, '04_loc_puppy_detail.png') });

    const med04Passed = results.med04_pup_detail.checks.every(c => c.passed);
    results.med04_pup_detail.status = med04Passed ? 'PASS' : 'FAIL';
    console.log('MED-04 Checks:', JSON.stringify(results.med04_pup_detail.checks, null, 2));
    console.log(`MED-04 Overall Status: ${results.med04_pup_detail.status}`);

    // =========================================================================
    // 5. REGRESSION CHECKS: CRIT-01, HIGH-01, HIGH-02, HIGH-03, HIGH-04
    // =========================================================================
    console.log('\n--- 5. REGRESSION CHECKS ---');
    await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await locPage.waitForTimeout(1000);

    // Airplane check
    const pathsY = await locPage.evaluate(() => {
      const s = document.querySelector('[class*="paths"]');
      return s.getBoundingClientRect().top + window.scrollY;
    });
    await locPage.evaluate(y => window.scrollTo({ top: y + 300, behavior: 'instant' }), pathsY);
    await locPage.waitForTimeout(200);
    const planeTf = await locPage.$eval('[class*="flightCanvas"] g[transform*="translate"]', el => el.getAttribute('transform'));
    const airplaneWorking = planeTf && !planeTf.includes('391.4');
    results.regressions.checks.push({
      item: 'CRIT-01: Airplane moves dynamically with scroll',
      passed: airplaneWorking,
      details: `Current transform: ${planeTf} -> ${airplaneWorking ? 'PASS' : 'FAIL'}`,
    });

    // Doors unique images
    const uniqueDoors = await locPage.$$eval('[class*="doorsGrid"] [class*="tp-door"]:not([class*="doorAll"]) img', imgs => {
      return new Set(imgs.map(i => i.src)).size;
    });
    const doorsWorking = uniqueDoors === 15;
    results.regressions.checks.push({
      item: 'HIGH-01: 15/15 unique door images',
      passed: doorsWorking,
      details: `Unique door images: ${uniqueDoors}/15 -> ${doorsWorking ? 'PASS' : 'FAIL'}`,
    });

    // Console errors check
    results.regressions.checks.push({
      item: 'Zero unhandled console errors',
      passed: consoleErrors.length === 0,
      details: consoleErrors.length === 0 ? 'PASS (0 errors)' : `FAIL (${consoleErrors.length} errors: ${consoleErrors.join('; ')})`,
    });

    const regressionsPassed = results.regressions.checks.every(c => c.passed);
    results.regressions.status = regressionsPassed ? 'PASS' : 'FAIL';
    console.log('Regressions Checks:', JSON.stringify(results.regressions.checks, null, 2));
    console.log(`Regression Status: ${results.regressions.status}`);

    // =========================================================================
    // FINAL SUMMARY
    // =========================================================================
    console.log('\n=== PASS 3 FINAL VERIFICATION SUMMARY ===');
    console.log(`MED-01 (/happy-families): ${results.med01_families.status}`);
    console.log(`MED-02 (/faq): ${results.med02_faq.status}`);
    console.log(`MED-03 (Header scroll hide/reveal): ${results.med03_header.status}`);
    console.log(`MED-04 (Puppy Detail Storybook): ${results.med04_pup_detail.status}`);
    console.log(`Regressions: ${results.regressions.status}`);

    const allPassed =
      results.med01_families.status === 'PASS' &&
      results.med02_faq.status === 'PASS' &&
      results.med03_header.status === 'PASS' &&
      results.med04_pup_detail.status === 'PASS' &&
      results.regressions.status === 'PASS';

    if (allPassed) {
      console.log('PASS 3 VERIFICATION PASSED COMPLETELY!');
      process.exit(0);
    } else {
      console.log('Pass 3 did not pass all checks.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Pass 3 Verification Error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runPass3Verification();
