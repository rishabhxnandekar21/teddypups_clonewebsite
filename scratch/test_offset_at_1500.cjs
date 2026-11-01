const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(200);

  const data = await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    return {
      offsetTop: faq ? faq.offsetTop : null,
      parent: faq ? faq.offsetParent?.tagName : null,
      rectTop: faq ? faq.getBoundingClientRect().top : null,
      scrollY: window.scrollY
    };
  });
  console.log('DATA AT 1500:', data);
  await browser.close();
})();
