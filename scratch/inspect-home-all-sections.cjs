const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const homeSections = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const sections = Array.from(main.querySelectorAll('section, [class*="scene"]'));
    return sections.map((s, i) => ({
      i: i + 1,
      tag: s.tagName,
      className: s.className,
      id: s.id,
      height: s.offsetHeight,
      top: s.getBoundingClientRect().top + window.scrollY
    }));
  });

  console.log('Homepage Sections:', JSON.stringify(homeSections, null, 2));

  await browser.close();
})();
