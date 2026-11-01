const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });

  const ribbonHTML = await page.evaluate(() => {
    const el = document.querySelector('.tp-ribbon');
    return el ? el.outerHTML : null;
  });
  console.log('Ribbon HTML:', ribbonHTML);

  const ribbonRules = await page.evaluate(() => {
    const band = document.querySelector('.tp-ribbon__band');
    if (!band) return null;
    const styles = window.getComputedStyle(band, '::after');
    return {
      bandBg: window.getComputedStyle(band).background,
      bandBefore: window.getComputedStyle(band, '::before').content,
      bandAfter: styles.content,
      bandAfterBorder: styles.borderBottom
    };
  });
  console.log('Ribbon rules:', ribbonRules);

  await browser.close();
})();
