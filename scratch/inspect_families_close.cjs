/**
 * Capture full /happy-families page for inspection
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

  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Doc height:', docHeight);

  // Scroll to find the foot mascot + wall end
  // tp-memories__foot is near the end of the masonry wall
  const footInfo = await page.evaluate(() => {
    const foot = document.querySelector('.tp-memories__foot');
    if (!foot) return { found: false };
    const rect = foot.getBoundingClientRect();
    const sRect = foot.parentElement ? foot.parentElement.getBoundingClientRect() : {};
    return {
      found: true,
      top: rect.top + window.scrollY,
      height: rect.height,
      parentTop: sRect.top ? sRect.top + window.scrollY : 0,
      parentHeight: sRect.height || 0,
      fullHtml: foot.outerHTML.substring(0, 400),
    };
  });
  console.log('Foot info:', JSON.stringify(footInfo, null, 2));

  // Scroll to foot area
  if (footInfo.found) {
    await page.evaluate(top => window.scrollTo(0, top - 200), footInfo.top);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_foot_area.png') });
    console.log('Captured foot area');
  }

  // Also check if there's a gate/closing scene element
  const gateInfo = await page.evaluate(() => {
    const els = document.querySelectorAll('[class*="gate"], [class*="door"], [class*="fence"], [class*="house"]');
    const results = [];
    els.forEach(el => {
      results.push({ class: el.className.toString().substring(0, 80), html: el.outerHTML.substring(0, 200) });
    });
    return results;
  });
  console.log('Gate/door/fence elements:', JSON.stringify(gateInfo, null, 2));

  // Get the full HTML of tp-memories section footer area
  const memFoot = await page.evaluate(() => {
    const mem = document.querySelector('.tp-memories');
    if (!mem) return 'no .tp-memories';
    // Last 3 children
    const children = Array.from(mem.children);
    return children.slice(-2).map(c => ({
      tag: c.tagName,
      classes: c.className.toString().substring(0, 80),
      html: c.outerHTML.substring(0, 500),
    }));
  });
  console.log('Last children of .tp-memories:', JSON.stringify(memFoot, null, 2));

  // Capture the last part of the families page (before footer)
  await page.evaluate(h => window.scrollTo(0, h - 500), docHeight);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_lastsection.png') });

  await page.evaluate(h => window.scrollTo(0, h - 1000), docHeight);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREEN_DIR, 'ref_families_beforefoot.png') });

  await browser.close();
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
