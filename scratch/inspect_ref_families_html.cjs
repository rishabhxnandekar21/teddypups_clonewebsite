const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const html = await page.evaluate(() => {
    const section = document.querySelector('section, main');
    const firstP = document.querySelector('.tp-polaroid');
    return {
      firstPolaroidOuterHTML: firstP ? firstP.outerHTML : null,
      parentOuterHTML: firstP && firstP.parentElement ? firstP.parentElement.outerHTML.slice(0, 500) : null
    };
  });

  console.log(JSON.stringify(html, null, 2));
  await browser.close();
})();
