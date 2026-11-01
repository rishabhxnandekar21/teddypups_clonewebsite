const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SHOT_DIR = path.join(__dirname, 'screenshots_exact');
if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

async function capturePairs() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating Reference & Local...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });

  // 1. Hero
  console.log('Capturing Hero...');
  await refPage.screenshot({ path: path.join(SHOT_DIR, '01_hero_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '01_hero_loc.png') });

  // 2. Doors Mascot
  console.log('Capturing Doors Mascot...');
  const refMeetTop = await refPage.evaluate(() => document.querySelector('.tp-meet').getBoundingClientRect().top + window.scrollY);
  const locMeetTop = await locPage.evaluate(() => document.querySelector('.tp-meet').getBoundingClientRect().top + window.scrollY);
  await refPage.evaluate(t => window.scrollTo(0, t + 1000), refMeetTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 1000), locMeetTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(SHOT_DIR, '02_doors_mascot_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '02_doors_mascot_loc.png') });

  // 3. Journey Step 3
  console.log('Capturing Journey Step 3...');
  const refJTop = await refPage.evaluate(() => document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY);
  const locJTop = await locPage.evaluate(() => document.querySelector('.tp-chat, [class*="journeySection"]').getBoundingClientRect().top + window.scrollY);
  await refPage.evaluate(t => window.scrollTo(0, t + 1200), refJTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 1200), locJTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_loc.png') });

  // 4. FAQ (tp-night)
  console.log('Capturing FAQ (tp-night)...');
  const refFaqTop = await refPage.evaluate(() => document.querySelector('.tp-night').getBoundingClientRect().top + window.scrollY);
  const locFaqTop = await locPage.evaluate(() => document.querySelector('.tp-night').getBoundingClientRect().top + window.scrollY);
  await refPage.evaluate(t => window.scrollTo(0, t), refFaqTop);
  await locPage.evaluate(t => window.scrollTo(0, t), locFaqTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_loc.png') });

  // 5. Final CTA & Footer Basket
  console.log('Capturing Final CTA & Footer Basket...');
  await refPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await locPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await refPage.waitForTimeout(700);
  await locPage.waitForTimeout(700);
  await refPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_loc.png') });

  await browser.close();
  console.log('All 5 screenshot pairs captured in scratch/screenshots_exact/');
}

capturePairs().catch(console.error);
