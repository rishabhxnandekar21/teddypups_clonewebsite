const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  const dusk = await page.$('.tp-dusk');
  await dusk.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/ref_dusk_full_view.png' });
  console.log('Captured scratch/ref_dusk_full_view.png');
  await browser.close();
})();
