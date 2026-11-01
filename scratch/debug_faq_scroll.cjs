const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    if (faq) faq.scrollIntoView();
  });
  await page.waitForTimeout(300);

  const scrollInfo = await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    const r = faq ? faq.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      faqRect: r,
      actorRect: document.querySelector('[class*="actor"]')?.getBoundingClientRect(),
      docH: document.documentElement.scrollHeight - window.innerHeight
    };
  });

  console.log('SCROLL INFO ON LOCAL:', scrollInfo);
  await browser.close();
})();
