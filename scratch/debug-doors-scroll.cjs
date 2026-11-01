const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const pinRangeTop = await page.evaluate(() => {
    const el = document.querySelector('[class*="pinRange"]');
    return el.getBoundingClientRect().top + window.scrollY;
  });

  console.log('PinRange Top:', pinRangeTop);

  // Scroll to pinRangeTop + 200 (within pinned range)
  await page.evaluate(y => window.scrollTo({ top: y + 200, behavior: 'instant' }), pinRangeTop);
  await page.waitForTimeout(400);

  const state1 = await page.evaluate(() => {
    const track = document.querySelector('[class*="doorsGrid"]');
    return {
      scrollY: window.scrollY,
      trackTransform: track ? track.style.transform : null,
      trackRect: track ? track.getBoundingClientRect() : null,
    };
  });
  console.log('State at +200:', state1);

  // Scroll to pinRangeTop + 1000
  await page.evaluate(y => window.scrollTo({ top: y + 1000, behavior: 'instant' }), pinRangeTop);
  await page.waitForTimeout(400);

  const state2 = await page.evaluate(() => {
    const track = document.querySelector('[class*="doorsGrid"]');
    return {
      scrollY: window.scrollY,
      trackTransform: track ? track.style.transform : null,
      trackRect: track ? track.getBoundingClientRect() : null,
    };
  });
  console.log('State at +1000:', state2);

  await page.screenshot({ path: 'audit_screenshots/visual_fidelity/pass1_verify_mode/doors/loc_doors_scroll_mid_fixed.png' });

  // Scroll to pinRangeTop + 2000
  await page.evaluate(y => window.scrollTo({ top: y + 2000, behavior: 'instant' }), pinRangeTop);
  await page.waitForTimeout(400);

  const state3 = await page.evaluate(() => {
    const track = document.querySelector('[class*="doorsGrid"]');
    return {
      scrollY: window.scrollY,
      trackTransform: track ? track.style.transform : null,
      trackRect: track ? track.getBoundingClientRect() : null,
    };
  });
  console.log('State at +2000:', state3);

  await page.screenshot({ path: 'audit_screenshots/visual_fidelity/pass1_verify_mode/doors/loc_doors_scroll_end_fixed.png' });

  await browser.close();
})();
