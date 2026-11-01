const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Capturing homepage screenshots...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Task 1A: Mascot walking on wooden floor (doors section)
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'task1_mascot_wooden_floor.png') });

  // 2. Task 1B: Mascot moving diagonally down signpost
  await page.evaluate(() => window.scrollTo(0, 5800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'task1_mascot_signpost_diagonal.png') });

  // 3. Task 1C: Mascot snug in footer basket
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'task1_mascot_footer_basket.png') });

  // 4. Task 2: Journey Step 1
  const journeyTop = await page.evaluate(() => {
    return document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY;
  });
  await page.evaluate(t => window.scrollTo(0, t + 100), journeyTop);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, 'task2_journey_step1_pinned.png') });

  // 5. Task 2: Journey Step 2
  await page.evaluate(t => window.scrollTo(0, t + 500), journeyTop);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, 'task2_journey_step2_pinned.png') });

  // 6. Task 2: Journey Step 3
  await page.evaluate(t => window.scrollTo(0, t + 800), journeyTop);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, 'task2_journey_step3_pinned.png') });

  // 7. Task 3A: Homepage Happy Families (8 photos preview)
  await page.evaluate(() => {
    document.querySelector('.tp-dusk, [class*="familiesSection"]').scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'task3_homepage_8_families_preview.png') });

  // 8. Task 3B & 4: Dedicated Happy Families page with 64 moments & closing scene
  console.log('Capturing /happy-families screenshots...');
  await page.goto('http://localhost:5173/happy-families', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Gallery top
  await page.screenshot({ path: path.join(OUT_DIR, 'task3_dedicated_families_top.png') });

  // Closing scene at bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'task4_closing_scene_bottom.png') });

  await browser.close();
  console.log('All screenshots captured successfully.');
}
main().catch(console.error);
