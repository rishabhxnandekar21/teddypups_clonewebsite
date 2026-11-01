const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const html = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    return main.innerHTML;
  });

  fs.writeFileSync('scratch/ref_hiw_full.html', html);
  console.log('Saved ref_hiw_full.html, size:', html.length);

  await browser.close();
})();
