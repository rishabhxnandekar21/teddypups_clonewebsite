const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const getHeader = async () => page.evaluate(() => {
    const header = document.querySelector('header, .tp-header');
    if (!header) return null;
    const s = window.getComputedStyle(header);
    return {
      tagName: header.tagName,
      className: header.className,
      position: s.position,
      top: s.top,
      transform: s.transform,
      transition: s.transition,
      dataHidden: header.getAttribute('data-hidden') || header.getAttribute('data-scrolled')
    };
  });

  const atTop = await getHeader();
  console.log('At top:', atTop);

  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(300);
  const afterScrollDown = await getHeader();
  console.log('After scroll down 400px:', afterScrollDown);

  await page.evaluate(() => window.scrollBy(0, -150));
  await page.waitForTimeout(300);
  const afterScrollUp = await getHeader();
  console.log('After scroll up 150px:', afterScrollUp);

  await browser.close();
})();
