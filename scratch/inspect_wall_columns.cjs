const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const wallCss = await page.evaluate(() => {
    const wall = document.querySelector('.tp-wall');
    const s = window.getComputedStyle(wall);
    return {
      columnCount: s.getPropertyValue('column-count'),
      columnGap: s.getPropertyValue('column-gap'),
      columns: s.getPropertyValue('columns')
    };
  });

  console.log('wall columns:', wallCss);
  await browser.close();
})();
