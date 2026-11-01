/**
 * Verify journey steps progression + homepage families count
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREEN_DIR = path.join(__dirname, '../scratch/screenshots');
if (!fs.existsSync(SCREEN_DIR)) fs.mkdirSync(SCREEN_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  // ── Check homepage families count ────────────────────────────────────────
  const familiesCount = await page.evaluate(() => {
    const grid = document.querySelector('[class*="familiesGrid"]');
    if (!grid) return { found: false };
    return { found: true, count: grid.children.length };
  });
  console.log('Homepage families count:', familiesCount);

  // ── Scroll to journey section and check steps ─────────────────────────────
  const journeyInfo = await page.evaluate(() => {
    const section = document.querySelector('.tp-chat');
    if (!section) return { found: false };
    const rect = section.getBoundingClientRect();
    return { found: true, top: rect.top, height: rect.height, docTop: rect.top + window.scrollY };
  });
  console.log('Journey section:', journeyInfo);

  // Scroll to journey section
  await page.evaluate(top => window.scrollTo(0, top - 100), journeyInfo.docTop);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREEN_DIR, 'local_journey_step0.png') });

  // Check step 0
  const step0 = await page.evaluate(() => {
    const steps = document.querySelectorAll('[class*="chatStep"]');
    return Array.from(steps).map(s => ({
      active: s.getAttribute('data-active'),
      done: s.getAttribute('data-done'),
    }));
  });
  console.log('Journey steps at scroll 0:', step0);

  // Scroll 500px into section
  await page.evaluate(top => window.scrollTo(0, top + 450), journeyInfo.docTop);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREEN_DIR, 'local_journey_step1.png') });
  const step1 = await page.evaluate(() => {
    const steps = document.querySelectorAll('[class*="chatStep"]');
    return Array.from(steps).map(s => ({
      active: s.getAttribute('data-active'),
      done: s.getAttribute('data-done'),
    }));
  });
  console.log('Journey steps at +450px:', step1);

  // Scroll 1100px into section
  await page.evaluate(top => window.scrollTo(0, top + 1100), journeyInfo.docTop);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREEN_DIR, 'local_journey_step2.png') });
  const step2 = await page.evaluate(() => {
    const steps = document.querySelectorAll('[class*="chatStep"]');
    return Array.from(steps).map(s => ({
      active: s.getAttribute('data-active'),
      done: s.getAttribute('data-done'),
    }));
  });
  console.log('Journey steps at +1100px:', step2);

  // ── Check mascot is in viewport ───────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const mascotAt0 = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor, [class*="actor"]');
    if (!actor) return { found: false };
    const t = actor.style.transform;
    return { found: true, transform: t };
  });
  console.log('Mascot at scroll 0:', mascotAt0);

  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(300);
  const mascotAt2000 = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor, [class*="actor"]');
    if (!actor) return { found: false };
    const t = actor.style.transform;
    return { found: true, transform: t };
  });
  console.log('Mascot at scroll 2000:', mascotAt2000);

  // ── Check families page has 64 items ─────────────────────────────────────
  const famPage = await ctx.newPage();
  await famPage.goto('http://localhost:5173/happy-families', { waitUntil: 'networkidle', timeout: 20000 });
  await famPage.waitForTimeout(1000);

  const wallCount = await famPage.evaluate(() => {
    const wall = document.querySelector('.tp-wall, [class*="wall"]');
    if (!wall) return { found: false };
    return { found: true, count: wall.children.length };
  });
  console.log('Families page wall count:', wallCount);

  // Screenshot closing scene
  await famPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 600));
  await famPage.waitForTimeout(500);
  await famPage.screenshot({ path: path.join(SCREEN_DIR, 'local_families_closing.png') });

  await browser.close();
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
