const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  await page.click('.tp-wall__print');
  await page.waitForTimeout(500);

  const dialogState = await page.evaluate(() => {
    const dialog = document.querySelector('dialog');
    return {
      open: dialog ? dialog.open : false,
      innerHTML: dialog ? dialog.innerHTML.slice(0, 1000) : null
    };
  });

  console.log('Dialog on click:', dialogState);
  await browser.close();
})();
