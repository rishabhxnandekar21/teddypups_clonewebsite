const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // 1. Check Scroll 0
  const heroData = await page.evaluate(() => {
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const teddyChild = teddy ? teddy.firstElementChild : null;
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    return {
      teddyChildVis: teddyChild ? window.getComputedStyle(teddyChild).visibility : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      actorVis: actor ? window.getComputedStyle(actor).visibility : null,
      actorOpacity: actor ? window.getComputedStyle(actor).opacity : null,
    };
  });
  console.log('HERO AT 0:', heroData);
  await page.screenshot({ path: 'scratch/verified_hero_0.png' });

  // 2. Scroll to Meet section (scrollY = 1500)
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(300);

  const meetData = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    const floor = document.querySelector('[class*="meetFloor"]');
    const floorRect = floor ? floor.getBoundingClientRect() : null;
    return {
      actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) } : null,
      floorRect: floorRect ? { y: Math.round(floorRect.y), h: Math.round(floorRect.height), bottom: Math.round(floorRect.bottom) } : null,
      feetY: r ? Math.round(r.y + 228 * 0.747) : null,
      feetClearanceFromBottom: r ? Math.round(900 - (r.y + 228 * 0.747)) : null,
    };
  });
  console.log('MEET AT 1500:', meetData);
  await page.screenshot({ path: 'scratch/verified_meet_1500.png' });

  // 3. Scroll to FAQ section
  await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    if (faq) faq.scrollIntoView();
  });
  await page.waitForTimeout(300);

  const faqData = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    return {
      actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } : null,
    };
  });
  console.log('FAQ SECTION:', faqData);
  await page.screenshot({ path: 'scratch/verified_faq.png' });

  // 4. Scroll to Footer Basket
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(300);

  const footerData = await page.evaluate(() => {
    const basket = document.querySelector('[class*="basket"]');
    const basketPup = document.querySelector('[class*="basketPup"]');
    const pupChild = basketPup ? basketPup.firstElementChild : null;
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    return {
      basketPupChildVis: pupChild ? window.getComputedStyle(pupChild).visibility : null,
      basketPupZ: basketPup ? window.getComputedStyle(basketPup).zIndex : null,
      actorOpacity: actor ? window.getComputedStyle(actor).opacity : null,
    };
  });
  console.log('FOOTER BASKET:', footerData);
  await page.screenshot({ path: 'scratch/verified_footer.png' });

  await browser.close();
})();
