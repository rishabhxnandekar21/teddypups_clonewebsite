/**
 * Inspect reference website:
 * 1. Closing scene on /happy-families
 * 2. Mascot behavior at different scroll positions on homepage
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
  await refPage.waitForTimeout(1000);

  // Screenshot bottom of page
  await refPage.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_bottom.png'), fullPage: false });
  console.log('Captured ref_families_bottom.png');

  // Scroll up 600px to see gate area
  await refPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
  await refPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_nearend.png'), fullPage: false });

  // Capture DOM of foot area
  const footHtml = await refPage.evaluate(() => {
    const foot = document.querySelector('.tp-memories__foot, [class*="foot"], [class*="gate"], [class*="door"]');
    if (foot) return foot.outerHTML.substring(0, 3000);
    // Also check last 2 sections
    const sections = document.querySelectorAll('section, .tp-memories, .tp-house, .tp-basket');
    let out = '';
    sections.forEach(s => { out += s.className + '\n'; });
    return 'sections: ' + out;
  });
  console.log('Foot HTML:', footHtml);

  // Get all sections near bottom
  const sectionsInfo = await refPage.evaluate(() => {
    const els = document.querySelectorAll('[class*="tp-"], section');
    const results = [];
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight + 500) {
        results.push({
          tag: el.tagName,
          classes: el.className.substring(0, 80),
          top: Math.round(rect.top),
          height: Math.round(rect.height),
          html: el.innerHTML.substring(0, 200),
        });
      }
    });
    return results;
  });
  console.log('Visible sections near bottom:', JSON.stringify(sectionsInfo, null, 2));

  // Get DOM structure of bottom
  const bottomDom = await refPage.evaluate(() => {
    const body = document.body;
    // Find the memories section
    const mem = document.querySelector('.tp-memories') || document.querySelector('[class*="memories"]');
    if (!mem) return 'no .tp-memories found';
    // Get foot area
    const foot = mem.querySelector('.tp-memories__foot, [class*="foot"]');
    if (foot) {
      return {
        footHtml: foot.outerHTML.substring(0, 4000),
        footStyles: window.getComputedStyle(foot).cssText.substring(0, 1000),
      };
    }
    return { memClasses: mem.className, memChildCount: mem.children.length };
  });
  console.log('Bottom DOM:', JSON.stringify(bottomDom, null, 2));

  // ──────────────────────────────────────────────────────────────
  // 2. Reference mascot pup-buddy behavior at various scrolls
  // ──────────────────────────────────────────────────────────────
  const homeRef = await refCtx.newPage();
  await homeRef.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await homeRef.waitForTimeout(2000);

  const docHeight = await homeRef.evaluate(() => document.documentElement.scrollHeight);
  console.log('Reference doc height:', docHeight);

  const mascotData = [];
  for (const scrollY of [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500]) {
    await homeRef.evaluate(y => window.scrollTo(0, y), scrollY);
    await homeRef.waitForTimeout(200);

    const info = await homeRef.evaluate(y => {
      const buddy = document.querySelector('.pup-buddy, [class*="pup-buddy"], [class*="mascot"], [class*="pup-actor"]');
      if (!buddy) return { scroll: y, found: false };
      const rect = buddy.getBoundingClientRect();
      const style = window.getComputedStyle(buddy);
      return {
        scroll: y,
        found: true,
        tag: buddy.tagName,
        classes: buddy.className.substring(0, 80),
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

  // Screenshot mascot at middle scroll
  await homeRef.evaluate(() => window.scrollTo(0, 2000));
  await homeRef.waitForTimeout(500);
  await homeRef.screenshot({ path: path.join(SCREEN_DIR, 'ref_home_mascot_mid.png') });

  // Screenshot mascot at dusk section
  await homeRef.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk, [class*="dusk"]');
    if (dusk) dusk.scrollIntoView();
  });
  await homeRef.waitForTimeout(500);
  await homeRef.screenshot({ path: path.join(SCREEN_DIR, 'ref_home_mascot_dusk.png') });

  await browser.close();
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
