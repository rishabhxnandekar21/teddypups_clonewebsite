const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  const duskHTML = await page.evaluate(() => document.querySelector('.tp-dusk').outerHTML);
  fs.writeFileSync('scratch/ref_dusk_full.html', duskHTML);
  console.log('Saved scratch/ref_dusk_full.html, size:', duskHTML.length);
  await browser.close();
})();
