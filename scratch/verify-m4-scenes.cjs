const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve('audit_screenshots/local_milestone4');
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  console.log('=== STARTING MILESTONE 4 AUTOMATED VERIFICATION ===\n');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const viewports = [
    { name: '1440x900_primary', width: 1440, height: 900 },
    { name: '1366x768_secondary', width: 1366, height: 768 },
    { name: '1600x900_additional', width: 1600, height: 900 },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    // Track errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    // 1. Test Homepage Scenes 1, 2, 3
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1600); // Wait for splash curtain

    // Scene 1: Doors
    console.log('Checking Scene 1 (Doors)...');
    const doorsSection = page.locator('section[aria-labelledby="meet-title"]');
    await doorsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const doorCount = await page.locator('ol[aria-label="Puppies looking for a family"] > li').count();
    console.log(`- Scene 1 door count: ${doorCount} (Expected 16: 15 puppies + 1 meet all)`);
    
    // Test hover opening first door
    const firstDoorLeaf = page.locator('ol[aria-label="Puppies looking for a family"] > li:first-child a');
    await firstDoorLeaf.hover();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(OUT_DIR, `scene1_doors_hover_${vp.name}.png`),
    });

    // Scene 2: Phone Mockup & Steps
    console.log('Checking Scene 2 (Phone Journey)...');
    const journeySection = page.locator('section[aria-labelledby="journey-title"]');
    await journeySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const stepsCount = await page.locator('ol[role="tablist"] > li').count();
    console.log(`- Scene 2 steps count: ${stepsCount} (Expected 3)`);

    // Click step 2 (Photos & details)
    await page.locator('ol[role="tablist"] > li:nth-child(2)').click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(OUT_DIR, `scene2_phone_step2_${vp.name}.png`),
    });

    // Click step 3 (Secure & safe delivery)
    await page.locator('ol[role="tablist"] > li:nth-child(3)').click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(OUT_DIR, `scene2_phone_step3_${vp.name}.png`),
    });

    // Scene 3: Passport Book
    console.log('Checking Scene 3 (Passport Book)...');
    const passportBook = page.locator('[role="region"][aria-label*="Passport"]');
    await passportBook.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const stampCount = await page.locator('[class*="stamp"]').count();
    console.log(`- Scene 3 stamps count: ${stampCount} (Expected 4)`);

    await page.screenshot({
      path: path.join(OUT_DIR, `scene3_passport_${vp.name}.png`),
    });

    // 2. Test FAQ Scene 4
    console.log('Checking Scene 4 (Starry FAQ Night Scene)...');
    await page.goto('http://localhost:5173/faq', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const starCount = await page.locator('svg[class*="starburst"]').count();
    console.log(`- Scene 4 starbursts count: ${starCount} (Expected 13)`);

    const hasMascot = await page.locator('[class*="sidebarTeddy"]').count();
    console.log(`- Scene 4 sidebar mascot present: ${hasMascot > 0}`);

    // Test search filter
    await page.locator('input[type="search"]').fill('vaccin');
    await page.waitForTimeout(300);
    const filteredCount = await page.locator('button[aria-expanded]').count();
    console.log(`- FAQ search for "vaccin": ${filteredCount} items`);

    await page.screenshot({
      path: path.join(OUT_DIR, `scene4_faq_${vp.name}.png`),
    });

    // 3. Test Contact Scene 5 (Letterfold & Postbox)
    console.log('Checking Scene 5 (Contact Airmail Letterfold)...');
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Initial writing phase
    await page.screenshot({
      path: path.join(OUT_DIR, `scene5_contact_writing_${vp.name}.png`),
    });

    // Fill form and submit
    await page.locator('input[name="name"]').fill('Sara Al Marzouqi');
    await page.locator('input[name="phone"]').fill('+971 50 987 6543');
    await page.locator('input[name="area"]').fill('Dubai Hills');
    await page.locator('select[name="puppy"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill('Excited to meet the Maltipoo this Saturday!');

    // Intercept window.open
    let windowOpenedUrl = null;
    await page.evaluate(() => {
      window.open = (url) => { window.__openedUrl = url; return null; };
    });

    // Submit form
    console.log('Submitting letter form...');
    await page.locator('button[type="submit"]').click();

    // Check sealing phase
    await page.waitForTimeout(250);
    const phase1 = await page.locator('[class*="postContainer"]').getAttribute('data-phase');
    console.log(`- Submission Phase 1: ${phase1} (Expected "sealing")`);
    await page.screenshot({
      path: path.join(OUT_DIR, `scene5_contact_sealing_${vp.name}.png`),
    });

    // Check posting phase
    await page.waitForTimeout(650);
    const phase2 = await page.locator('[class*="postContainer"]').getAttribute('data-phase');
    console.log(`- Submission Phase 2: ${phase2} (Expected "posting")`);
    await page.screenshot({
      path: path.join(OUT_DIR, `scene5_contact_posting_${vp.name}.png`),
    });

    // Check sent phase
    await page.waitForTimeout(1100);
    const phase3 = await page.locator('[class*="postContainer"]').getAttribute('data-phase');
    console.log(`- Submission Phase 3: ${phase3} (Expected "sent")`);
    await page.screenshot({
      path: path.join(OUT_DIR, `scene5_contact_sent_${vp.name}.png`),
    });

    const openedUrl = await page.evaluate(() => window.__openedUrl);
    console.log(`- WhatsApp URL opened: ${openedUrl ? openedUrl.slice(0, 60) + '...' : 'null'}`);

    // Check horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`- Horizontal overflow check: scrollWidth=${scrollWidth}, clientWidth=${clientWidth} (Overflow: ${scrollWidth > clientWidth})`);

    // Check console errors
    console.log(`- Console errors: ${errors.length}`);
    if (errors.length > 0) console.log('  Errors:', errors);

    await page.close();
  }

  // 4. Test Reduced Motion
  console.log('\n--- Testing Prefers Reduced Motion ---');
  const reducedPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  await reducedPage.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await reducedPage.waitForTimeout(500);

  await reducedPage.locator('input[name="name"]').fill('Ali');
  await reducedPage.locator('input[name="phone"]').fill('+971 50 111 2222');
  await reducedPage.evaluate(() => { window.open = () => null; });
  await reducedPage.locator('button[type="submit"]').click();
  await reducedPage.waitForTimeout(100);

  const reducedPhase = await reducedPage.locator('[class*="postContainer"]').getAttribute('data-phase');
  console.log(`- Reduced motion instant phase: ${reducedPhase} (Expected "sent")`);
  await reducedPage.close();

  await browser.close();
  console.log('\n=== MILESTONE 4 VERIFICATION COMPLETE ===');
})();
