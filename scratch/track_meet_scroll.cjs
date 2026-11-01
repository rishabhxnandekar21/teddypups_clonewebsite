const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const meetEl = await page.$('[class*="meetSection"]');
  const meetTop = await page.evaluate(el => el.getBoundingClientRect().top + window.scrollY, meetEl);
  console.log('meetTop:', meetTop);

  for (let s = meetTop; s <= meetTop + 3500; s += 300) {
    await page.evaluate(y => window.scrollTo(0, y), s);
    await page.waitForTimeout(100);
    const data = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
      const r = actor ? actor.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y), bottom: Math.round(r.bottom) } : null,
      };
    });
    console.log(`Scroll ${s}: actor bottom = ${data.actorRect ? data.actorRect.bottom : 'null'}`);
  }

  await browser.close();
})();
