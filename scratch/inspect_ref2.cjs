/**
 * Inspect reference: mascot positions + closing scene screenshot
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREEN_DIR = path.join(__dirname, '../scratch/screenshots');
if (!fs.existsSync(SCREEN_DIR)) fs.mkdirSync(SCREEN_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // ──────────────────────────────────────────────────────────────
  // 1. Reference /happy-families closing scene
  // ──────────────────────────────────────────────────────────────
  const refCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const refPage = await refCtx.newPage();

  await refPage.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle', timeout: 30000 });
  await refPage.waitForTimeout(2000);

  // Scroll to bottom to reveal closing scene
  await refPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await refPage.waitForTimeout(1200);
  await refPage.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_bottom.png'), fullPage: false });

  // Get the foot area DOM
  const footDom = await refPage.evaluate(() => {
    const foot = document.querySelector('.tp-memories__foot');
    if (!foot) return 'no .tp-memories__foot found';
    const style = window.getComputedStyle(foot);
    return {
      html: foot.outerHTML.substring(0, 600),
      cssText: `position:${style.position}, display:${style.display}, bg:${style.backgroundColor}, height:${style.height}`,
    };
  });
  console.log('Foot DOM:', JSON.stringify(footDom, null, 2));

  // Get background/visual of foot section
  const footBg = await refPage.evaluate(() => {
    const foot = document.querySelector('.tp-memories__foot');
    if (!foot) return {};
    const s = window.getComputedStyle(foot);
    return {
      bg: s.backgroundColor,
      bgImage: s.backgroundImage,
      padding: s.padding,
      display: s.display,
      alignItems: s.alignItems,
      justifyContent: s.justifyContent,
      height: s.height,
      minHeight: s.minHeight,
    };
  });
  console.log('Foot computed style:', footBg);

  // Scroll up slightly to show context
  await refPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 600));
  await refPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_nearend.png'), fullPage: false });

  // ──────────────────────────────────────────────────────────────
  // 2. Reference homepage mascot at various scroll positions
  // ──────────────────────────────────────────────────────────────
  const homeCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const homeRef = await homeCtx.newPage();
  await homeRef.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await homeRef.waitForTimeout(2000);

  const docHeight = await homeRef.evaluate(() => document.documentElement.scrollHeight);
  console.log('Reference doc height:', docHeight);

  const mascotData = [];
  for (const scrollY of [0, 800, 1600, 2400, 3200, 4000, 4800, 5600, 6000]) {
    await homeRef.evaluate(y => window.scrollTo(0, y), scrollY);
    await homeRef.waitForTimeout(200);

    const info = await homeRef.evaluate(y => {
      const buddy = document.querySelector('.pup-buddy, .pup-actor, [class*="pup-actor"]');
      if (!buddy) return { scroll: y, found: false };
      const rect = buddy.getBoundingClientRect();
      const style = window.getComputedStyle(buddy);
      return {
        scroll: y,
        found: true,
        tag: buddy.tagName,
        classes: (buddy.className || '').toString().substring(0, 80),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        transform: style.transform,
        position: style.position,
      };
    }, scrollY);
    mascotData.push(info);
  }
  console.log('Reference mascot positions:', JSON.stringify(mascotData, null, 2));

  // Screenshot at key positions
  await homeRef.evaluate(() => window.scrollTo(0, 2000));
  await homeRef.waitForTimeout(300);
  await homeRef.screenshot({ path: path.join(SCREEN_DIR, 'ref_home_scroll2000.png') });

  await homeRef.evaluate(() => window.scrollTo(0, 4000));
  await homeRef.waitForTimeout(300);
  await homeRef.screenshot({ path: path.join(SCREEN_DIR, 'ref_home_scroll4000.png') });

  // Full page screenshot for reference
  await homeRef.evaluate(() => window.scrollTo(0, 0));
  await homeRef.waitForTimeout(300);

  await browser.close();
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
