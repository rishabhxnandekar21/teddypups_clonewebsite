const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await locPage.waitForTimeout(1000);

  const chatY = await locPage.evaluate(() => {
    const el = document.querySelector('.tp-chat, [class*="journeySection"]');
    return el.getBoundingClientRect().top + window.scrollY;
  });

  await locPage.evaluate(y => window.scrollTo({ top: y + 1300, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);

  const state = await locPage.evaluate(() => {
    const lis = Array.from(document.querySelectorAll('ol[role="tablist"] li'));
    return lis.map((li, i) => ({
      index: i,
      dataActive: li.getAttribute('data-active'),
      ariaSelected: li.getAttribute('aria-selected'),
      dataDone: li.getAttribute('data-done'),
      html: li.outerHTML.slice(0, 100)
    }));
  });
  console.log('Lis at +1300:', JSON.stringify(state, null, 2));
  await browser.close();
})();
