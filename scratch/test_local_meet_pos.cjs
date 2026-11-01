const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // Scroll to Meet section
  await page.evaluate(() => {
    const meet = document.querySelector('[class*="meetSection"]');
    if (meet) meet.scrollIntoView();
  });
  await page.waitForTimeout(400);

  // Scroll a bit inside Meet section
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(400);

  const localMeet = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const teddy = document.querySelector('[class*="meetTeddy"]');
    const floor = document.querySelector('[class*="meetFloor"]');
    return {
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorStyle: actor ? {
        transform: window.getComputedStyle(actor).transform,
        transformOrigin: window.getComputedStyle(actor).transformOrigin,
      } : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      floorRect: floor ? floor.getBoundingClientRect() : null,
      windowScrollY: window.scrollY,
      vh: window.innerHeight,
    };
  });

  console.log('LOCAL MEET DATA:', JSON.stringify(localMeet, null, 2));
  await page.screenshot({ path: 'scratch/local_meet_current.png' });
  await browser.close();
})();
