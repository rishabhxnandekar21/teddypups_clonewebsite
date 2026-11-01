const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const polaroids = Array.from(document.querySelectorAll('.tp-polaroid, [class*="polaroid"]')).map(el => ({
      tagName: el.tagName,
      className: el.className,
      style: el.getAttribute('style'),
      hasClick: el.onclick !== null || el.getAttribute('role') === 'button' || el.tagName === 'BUTTON',
      caption: el.querySelector('figcaption, [class*="caption"], p')?.innerText
    }));

    const dialogs = document.querySelectorAll('dialog, [role="dialog"], [class*="lightbox"], [class*="modal"]');

    return {
      title: document.title,
      mainClasses: main ? main.className : null,
      polaroidCount: polaroids.length,
      samplePolaroids: polaroids.slice(0, 5),
      dialogCount: dialogs.length
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
