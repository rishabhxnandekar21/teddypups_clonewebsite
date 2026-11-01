const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  for (let y = 0; y <= 2000; y += 200) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(100);

    const posInfo = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const meetTeddy = document.querySelector('[class*="meetTeddy"]');
      const floor = document.querySelector('[class*="meetFloor"]') || document.querySelector('[class*="floor"]');
      const meet = document.querySelector('.tp-meet') || document.querySelector('[class*="meetSection"]');
      
      const actorR = actor ? actor.getBoundingClientRect() : null;
      const meetTeddyR = meetTeddy ? meetTeddy.getBoundingClientRect() : null;
      const floorR = floor ? floor.getBoundingClientRect() : null;
      const meetR = meet ? meet.getBoundingClientRect() : null;

      return {
        scrollY: window.scrollY,
        meetTop: meetR ? meetR.top : null,
        actorRect: actorR ? { x: Math.round(actorR.x), y: Math.round(actorR.y), bottom: Math.round(actorR.bottom) } : null,
        meetTeddyRect: meetTeddyR ? { x: Math.round(meetTeddyR.x), y: Math.round(meetTeddyR.y), bottom: Math.round(meetTeddyR.bottom) } : null,
        floorBottom: floorR ? Math.round(floorR.bottom) : null,
        floorTop: floorR ? Math.round(floorR.top) : null,
      };
    });
    console.log(JSON.stringify(posInfo));
  }

  await browser.close();
})();
