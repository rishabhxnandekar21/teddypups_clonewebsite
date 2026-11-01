const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);

  const pos = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const r = actor ? actor.getBoundingClientRect() : null;
    const body = document.querySelector('.pup-actor__body');
    return {
      actorRect: r,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
      actorBodyTransform: body ? window.getComputedStyle(body).transform : null,
    };
  });
  console.log('REF ACTOR AT 1500:', pos);

  await page.screenshot({ path: 'scratch/ref_meet_1500.png' });
  await browser.close();
})();
