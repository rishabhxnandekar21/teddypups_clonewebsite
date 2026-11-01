const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(__dirname, 'screenshots', 'current_5173_hero.png') });
  
  // also check 5174
  const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page2.screenshot({ path: path.join(__dirname, 'screenshots', 'current_5174_hero.png') });

  await browser.close();
  console.log('Screenshots saved!');
})();
