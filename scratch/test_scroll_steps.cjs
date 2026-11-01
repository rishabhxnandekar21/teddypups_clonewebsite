const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  console.log('ScrollHeight at start:', await page.evaluate(() => document.documentElement.scrollHeight));
  
  // Try scrolling to 5000
  await page.evaluate(() => window.scrollTo(0, 5000));
  await page.waitForTimeout(200);
  console.log('ScrollHeight at 5000:', await page.evaluate(() => ({ scrollY: window.scrollY, scrollHeight: document.documentElement.scrollHeight })));

  // Try scrolling to 10000
  await page.evaluate(() => window.scrollTo(0, 10000));
  await page.waitForTimeout(200);
  console.log('ScrollHeight at 10000:', await page.evaluate(() => ({ scrollY: window.scrollY, scrollHeight: document.documentElement.scrollHeight })));

  await browser.close();
})();
