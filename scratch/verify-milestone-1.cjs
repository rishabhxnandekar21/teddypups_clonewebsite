const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('audit_screenshots/milestone1_verification');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runVerification() {
  console.log('--- STARTING MILESTONE 1 VERIFICATION ---');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => {
    errors.push(`Page crash/uncaught error: ${err.message}`);
  });

  let testPassed = true;

  // 1. Check /puppies
  console.log('\n[TEST 1] Verifying /puppies inventory layout...');
  await page.goto(`${BASE_URL}/puppies`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const puppiesData = await page.evaluate(() => {
    const availableHeading = document.querySelector('h2')?.innerText || '';
    
    // Find the available grid container (first .grid inside main)
    const grids = document.querySelectorAll('main div[class*="grid"]');
    const availableCards = grids[0] ? grids[0].querySelectorAll('article') : [];

    // Find the gone home section
    const goneHomeSection = document.querySelector('section[aria-labelledby="already-gone-home-heading"]');
    const goneHomeHeading = goneHomeSection?.querySelector('h2')?.innerText || '';
    const goneHomeCards = goneHomeSection ? goneHomeSection.querySelectorAll('article') : [];

    return {
      availableHeading,
      availableCount: availableCards.length,
      goneHomeHeading,
      goneHomeCount: goneHomeCards.length,
      goneHomeNames: Array.from(goneHomeCards).map(c => c.querySelector('h3, [class*="pupName"], [class*="name"]')?.innerText)
    };
  });

  console.log('Puppies page inventory:', puppiesData);
  if (puppiesData.availableCount !== 15) {
    console.error(`FAIL: Expected 15 available puppies, found ${puppiesData.availableCount}`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Exactly 15 available puppies in main grid');
  }

  if (puppiesData.goneHomeCount !== 5) {
    console.error(`FAIL: Expected 5 gone home puppies, found ${puppiesData.goneHomeCount}`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Exactly 5 recently adopted puppies in "Already gone home" section');
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'puppies_1440x900.png'), fullPage: true });

  // 2. Check /gone-home alumni count
  console.log('\n[TEST 2] Verifying /gone-home 27 boarding passes...');
  await page.goto(`${BASE_URL}/gone-home`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const alumniCount = await page.evaluate(() => {
    // Boarding passes or cards
    const passes = document.querySelectorAll('article, div[class*="boardingPass"], div[class*="card"], div[class*="Card"]');
    // Let's count by specific selector or flight cards
    const cards = document.querySelectorAll('[class*="boardingPass"], [class*="alumniCard"], article');
    return cards.length;
  });
  console.log(`Alumni cards detected: ${alumniCount}`);
  if (alumniCount < 27) {
    console.error(`FAIL: Expected at least 27 alumni boarding passes, found ${alumniCount}`);
    testPassed = false;
  } else {
    console.log(`✓ PASS: ${alumniCount} alumni boarding passes present`);
  }

  // 3. Check Multi-Image Gallery on Available Puppy (korean-teacup-maltipoo-female)
  console.log('\n[TEST 3] Verifying Multi-Image Gallery on /puppies/korean-teacup-maltipoo-female...');
  await page.goto(`${BASE_URL}/puppies/korean-teacup-maltipoo-female`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const galleryState1 = await page.evaluate(() => {
    const breadcrumb = document.querySelector('nav[aria-label="Breadcrumbs"]')?.innerText;
    const counter = document.querySelector('span[class*="counterBadge"]')?.innerText;
    const thumbs = document.querySelectorAll('ul[class*="thumbnailStrip"] button');
    const mainImg = document.querySelector('img[class*="mainImage"]')?.src;
    const askBtn = document.querySelector('div[class*="ctaActions"] a[class*="btn-whatsapp"]')?.innerText;
    const stepTag = document.querySelector('[class*="stepTag"]')?.innerText;
    return {
      breadcrumb,
      counter,
      thumbsCount: thumbs.length,
      mainImg,
      askBtn,
      stepTag
    };
  });
  console.log('Gallery state initially:', galleryState1);

  if (galleryState1.thumbsCount !== 13) {
    console.error(`FAIL: Expected 13 thumbnails, found ${galleryState1.thumbsCount}`);
    testPassed = false;
  } else {
    console.log(`✓ PASS: All 13 gallery thumbnails loaded`);
  }

  if (!galleryState1.counter.includes('1 / 13')) {
    console.error(`FAIL: Expected counter '1 / 13', found ${galleryState1.counter}`);
    testPassed = false;
  } else {
    console.log(`✓ PASS: Counter shows 1 / 13`);
  }

  // Click Next button
  await page.click('button[aria-label="Next photo"]');
  await page.waitForTimeout(300);

  const galleryState2 = await page.evaluate(() => {
    const counter = document.querySelector('span[class*="counterBadge"]')?.innerText;
    const mainImg = document.querySelector('img[class*="mainImage"]')?.src;
    return { counter, mainImg };
  });
  console.log('Gallery state after next click:', galleryState2);

  if (!galleryState2.counter.includes('2 / 13')) {
    console.error(`FAIL: Expected counter '2 / 13' after clicking next, found ${galleryState2.counter}`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Next photo button advances photo & counter to 2 / 13');
  }

  // Click thumbnail 5
  await page.click('button[aria-label*="photo 5"]');
  await page.waitForTimeout(300);

  const galleryState3 = await page.evaluate(() => {
    return document.querySelector('span[class*="counterBadge"]')?.innerText;
  });
  if (!galleryState3.includes('5 / 13')) {
    console.error(`FAIL: Expected counter '5 / 13' after clicking thumb 5, found ${galleryState3}`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Thumbnail click selects photo 5');
  }

  // Keyboard navigation
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
  const galleryState4 = await page.evaluate(() => {
    return document.querySelector('span[class*="counterBadge"]')?.innerText;
  });
  if (!galleryState4.includes('6 / 13')) {
    console.error(`FAIL: Expected counter '6 / 13' after ArrowRight, found ${galleryState4}`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Keyboard ArrowRight navigation advances gallery');
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'available_detail_1440x900.png') });

  // 4. Check Alumni Puppy Page (/puppies/pomeranian-ace-boy)
  console.log('\n[TEST 4] Verifying Alumni Puppy Page /puppies/pomeranian-ace-boy...');
  await page.goto(`${BASE_URL}/puppies/pomeranian-ace-boy`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const alumniPuppyState = await page.evaluate(() => {
    const breadcrumb = document.querySelector('nav[aria-label="Breadcrumbs"]')?.innerText;
    const badge = document.querySelector('[class*="statusBadgeGoneHome"]')?.innerText;
    const stepTag = document.querySelector('[class*="stepTag"]')?.innerText;
    const askBtn = document.querySelector('div[class*="ctaActions"] a[class*="btn-whatsapp"]')?.innerText;
    return { breadcrumb, badge, stepTag, askBtn };
  });
  console.log('Alumni puppy page state:', alumniPuppyState);

  if (!alumniPuppyState.breadcrumb.includes('Gone home')) {
    console.error(`FAIL: Expected breadcrumb to include 'Gone home', got '${alumniPuppyState.breadcrumb}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Alumni breadcrumb points to Gone home');
  }

  if (!alumniPuppyState.badge.includes('GONE HOME')) {
    console.error(`FAIL: Expected badge 'GONE HOME ♥', got '${alumniPuppyState.badge}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: GONE HOME ♥ badge visible');
  }

  if (!alumniPuppyState.askBtn.includes('Ask about a puppy like this')) {
    console.error(`FAIL: Expected button 'Ask about a puppy like this', got '${alumniPuppyState.askBtn}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Inquire button updated for alumni');
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'alumni_detail_1440x900.png') });

  // 5. Check /contact
  console.log('\n[TEST 5] Verifying /contact copy...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const contactData = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.innerText;
    const submitBtn = document.querySelector('button[type="submit"]')?.innerText;
    return { h1, submitBtn };
  });
  console.log('Contact page data:', contactData);

  if (contactData.h1 !== 'Get in touch with us') {
    console.error(`FAIL: Expected H1 'Get in touch with us', got '${contactData.h1}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Contact H1 is "Get in touch with us"');
  }

  if (!contactData.submitBtn.includes('Post my letter')) {
    console.error(`FAIL: Expected submit button 'Post my letter', got '${contactData.submitBtn}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: Submit button says "Post my letter"');
  }

  // 6. Check /faq
  console.log('\n[TEST 6] Verifying /faq copy...');
  await page.goto(`${BASE_URL}/faq`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const faqData = await page.evaluate(() => {
    return { h1: document.querySelector('h1')?.innerText };
  });
  console.log('FAQ page data:', faqData);

  if (faqData.h1 !== 'Questions & answers') {
    console.error(`FAIL: Expected H1 'Questions & answers', got '${faqData.h1}'`);
    testPassed = false;
  } else {
    console.log('✓ PASS: FAQ H1 is "Questions & answers"');
  }

  // 7. Check 1366x768 viewport
  console.log('\n[TEST 7] Verifying 1366x768 viewport rendering...');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(`${BASE_URL}/puppies`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'puppies_1366x768.png'), fullPage: false });

  // Summary
  console.log('\n--- VERIFICATION SUMMARY ---');
  if (errors.length > 0) {
    console.error('Console/Page Errors detected:', errors);
    testPassed = false;
  } else {
    console.log('✓ PASS: 0 console or page runtime errors detected across all tested routes');
  }

  await browser.close();

  if (!testPassed) {
    console.error('\n❌ ONE OR MORE MILESTONE 1 VERIFICATIONS FAILED.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL MILESTONE 1 VERIFICATION TESTS PASSED SUCCESSFULLY!');
  }
}

runVerification().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
