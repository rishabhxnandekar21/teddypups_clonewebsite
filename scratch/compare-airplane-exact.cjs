const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VERIFY_DIR = 'audit_screenshots/visual_fidelity/pass1_verify_mode/airplane';
if (!fs.existsSync(VERIFY_DIR)) {
  fs.mkdirSync(VERIFY_DIR, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refContext.newPage();
  const locPage = await locContext.newPage();

  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const refPathsY = await refPage.evaluate(() => {
    return document.querySelector('.tp-paths').getBoundingClientRect().top + window.scrollY;
  });
  const locPathsY = await locPage.evaluate(() => {
    return document.querySelector('[class*="paths"]').getBoundingClientRect().top + window.scrollY;
  });

  console.log(`Paths Y: Ref=${refPathsY}, Loc=${locPathsY}`);

  const offsets = [-300, -100, 100, 300, 500, 700, 300, -100];
  const results = [];

  for (let i = 0; i < offsets.length; i++) {
    const offset = offsets[i];
    const isReverse = i >= 6;
    const label = `${i + 1}_offset_${offset}${isReverse ? '_reverse' : ''}`;

    await refPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), refPathsY + offset);
    await locPage.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), locPathsY + offset);
    await refPage.waitForTimeout(300);
    await locPage.waitForTimeout(300);

    const refTf = await refPage.evaluate(() => {
      const g = document.querySelector('.tp-paths svg[viewBox="0 0 660 300"] > g');
      return g ? g.getAttribute('transform') : null;
    });

    const locTf = await locPage.evaluate(() => {
      const g = document.querySelector('[class*="flightCanvas"] svg g[transform*="translate"]');
      return g ? g.getAttribute('transform') : null;
    });

    console.log(`[${label}]:`);
    console.log(`  Ref: ${refTf}`);
    console.log(`  Loc: ${locTf}`);

    results.push({ label, offset, isReverse, refTf, locTf });

    // Capture screenshot of the airplane SVG container
    const refSvg = await refPage.$('.tp-paths svg[viewBox="0 0 660 300"]');
    const locSvg = await locPage.$('[class*="flightCanvas"]');
    if (refSvg) await refSvg.screenshot({ path: path.join(VERIFY_DIR, `ref_${label}.png`) });
    if (locSvg) await locSvg.screenshot({ path: path.join(VERIFY_DIR, `loc_${label}.png`) });
  }

  fs.writeFileSync(path.join(VERIFY_DIR, 'results.json'), JSON.stringify(results, null, 2));

  await browser.close();
})();
