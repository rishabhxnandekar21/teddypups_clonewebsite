const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  for (let y = 0; y <= 2000; y += 200) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(100);

    const posInfo = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const body = document.querySelector('.pup-actor__body');
      const floor = document.querySelector('.tp-doors__floor') || document.querySelector('[class*="floor"]');
      const actorR = actor ? actor.getBoundingClientRect() : null;
      const bodyR = body ? body.getBoundingClientRect() : null;
      const floorR = floor ? floor.getBoundingClientRect() : null;
      const meet = document.querySelector('.tp-meet');
      const meetR = meet ? meet.getBoundingClientRect() : null;

      return {
        scrollY: window.scrollY,
        meetTop: meetR ? meetR.top : null,
        actorRect: actorR ? { x: Math.round(actorR.x), y: Math.round(actorR.y), w: Math.round(actorR.w), h: Math.round(actorR.h), bottom: Math.round(actorR.bottom) } : null,
        bodyRect: bodyR ? { x: Math.round(bodyR.x), y: Math.round(bodyR.y), w: Math.round(bodyR.w), h: Math.round(bodyR.h), bottom: Math.round(bodyR.bottom) } : null,
        floorBottom: floorR ? Math.round(floorR.bottom) : null,
        floorTop: floorR ? Math.round(floorR.top) : null,
        gapFromScreenBottom: bodyR ? Math.round(900 - bodyR.bottom) : null,
      };
    });
    console.log(JSON.stringify(posInfo));
  }

  await browser.close();
})();
