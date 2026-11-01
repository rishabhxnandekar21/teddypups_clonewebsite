const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const imgs = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    return Array.from(dusk.querySelectorAll('img')).map(img => img.src);
  });
  console.log('Images in tp-dusk:', imgs.length);

  // Let's also check if there are polaroids or items that load on scroll or if there are 32 items in the DOM
  await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    dusk.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  const imgsAfterScroll = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    return Array.from(dusk.querySelectorAll('img')).map(img => img.src);
  });
  console.log('Images in tp-dusk after scroll:', imgsAfterScroll.length);

  await browser.close();
})();
