const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  
  const faqDom = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('details, [class*="faq"], [class*="accordion"], summary')).slice(0, 5);
    return items.map(el => ({
      tagName: el.tagName,
      className: el.className,
      outerHTML: el.outerHTML.slice(0, 400)
    }));
  });
  
  console.log('FAQ elements:', faqDom);
  await browser.close();
})();
