const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'commit' });
  const html = await page.evaluate(() => {
    const el = document.querySelector('.tp-curtain');
    return el ? el.outerHTML : 'none';
  });
  fs.writeFileSync('scratch/live-curtain.html', html);
  console.log('Saved live-curtain.html, length:', html.length);
  await browser.close();
})();
