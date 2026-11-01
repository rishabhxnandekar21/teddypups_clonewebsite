const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);

  const rects = await page.evaluate(() => {
    const basket = document.querySelector('[class*="basket"]');
    const basketPup = document.querySelector('[class*="basketPup"]');
    const basketBack = document.querySelector('[class*="basketBack"]');
    const basketFront = document.querySelector('[class*="basketFront"]');
    const actor = document.querySelector('.pup-actor');

    const getR = el => el ? {
      top: Math.round(el.getBoundingClientRect().top),
      left: Math.round(el.getBoundingClientRect().left),
      width: Math.round(el.getBoundingClientRect().width),
      height: Math.round(el.getBoundingClientRect().height),
    } : null;

    return {
      basket: getR(basket),
      basketPup: getR(basketPup),
      basketBack: getR(basketBack),
      basketFront: getR(basketFront),
      actor: getR(actor),
      actorTransform: actor?.style.transform,
      actorOpacity: actor?.style.opacity,
    };
  });

  console.log('Basket & Actor rects at bottom:', rects);
  await browser.close();
}
main().catch(console.error);
