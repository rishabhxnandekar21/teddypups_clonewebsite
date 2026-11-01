const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  for (const scrollY of [0, 300, 700, 1200, 1600, 2500, 3500, 5000, 5900, 6500]) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);

    const state = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const body = actor?.querySelector('.pup-actor__body');
      const gBody = actor?.querySelector('[data-p="body"]');
      const activeStop = document.querySelector('.pup-stop[data-active="true"], .pup-stop[data-holding="true"], .pup-stop[data-live=""]');
      return {
        actorTransform: actor?.getAttribute('style'),
        actorHolding: actor?.getAttribute('data-holding'),
        actorBodyScale: body?.getAttribute('style'),
        gBodyOpacity: gBody?.getAttribute('opacity'),
        actorRect: actor ? {
          top: Math.round(actor.getBoundingClientRect().top),
          left: Math.round(actor.getBoundingClientRect().left),
        } : null,
      };
    });

    console.log(`scroll ${scrollY}:`, JSON.stringify(state));
  }

  await browser.close();
}
main().catch(console.error);
