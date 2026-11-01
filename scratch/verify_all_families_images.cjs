const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/happy-families', { waitUntil: 'networkidle' });

  // Scroll all the way down slowly to trigger lazy loading of all polaroids
  for (let y = 0; y <= 12000; y += 1500) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(100);
  }

  // Wait for all network requests to finish
  await page.waitForLoadState('networkidle');

  const check = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.tp-polaroid img'));
    const failed = imgs.filter(img => img.naturalWidth === 0).map(img => img.src);
    const loaded = imgs.filter(img => img.naturalWidth > 0).length;

    // Also check if any black paw SVGs are visible/blocking
    const paws = Array.from(document.querySelectorAll('svg[class*="wallPaw"]'));
    const inFlowPaws = paws.filter(p => {
      const s = window.getComputedStyle(p);
      return s.position !== 'absolute';
    }).length;

    return {
      total: imgs.length,
      loaded,
      failedCount: failed.length,
      failedList: failed,
      inFlowPaws
    };
  });

  console.log("Image Load Results:", JSON.stringify(check, null, 2));

  // Capture screenshot of the gallery grid looking clean
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'families_clean_gallery.png') });

  await browser.close();
})();
