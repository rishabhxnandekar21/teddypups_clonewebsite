const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const mainHTML = await page.evaluate(() => {
    const main = document.querySelector('main');
    return main ? main.outerHTML : '';
  });

  fs.writeFileSync('scratch/ref_families_full.html', mainHTML);
  console.log('Saved scratch/ref_families_full.html, size:', mainHTML.length);
  await browser.close();
})();
