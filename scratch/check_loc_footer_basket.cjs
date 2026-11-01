const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => {
    const basket = document.querySelector('[class*="basket"]');
    const basketPup = document.querySelector('[class*="basketPup"]');
    const actor = document.querySelector('.pup-actor');
    const basketChild = basketPup ? basketPup.firstElementChild : null;
    return {
      basketRect: basket ? basket.getBoundingClientRect() : null,
      basketPupRect: basketPup ? basketPup.getBoundingClientRect() : null,
      basketChildVis: basketChild ? window.getComputedStyle(basketChild).visibility : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorOpacity: actor ? window.getComputedStyle(actor).opacity : null,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
