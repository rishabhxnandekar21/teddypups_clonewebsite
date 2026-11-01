const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 10007));
  await page.waitForTimeout(300);

  const actors = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[class*="actor"]')).map(el => ({
      className: el.className,
      rect: el.getBoundingClientRect(),
      style: {
        transform: window.getComputedStyle(el).transform,
        opacity: window.getComputedStyle(el).opacity
      }
    }));
  });
  console.log('ALL MATCHED ACTORS:', JSON.stringify(actors, null, 2));
  await browser.close();
})();
