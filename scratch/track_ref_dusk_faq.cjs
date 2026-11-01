const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  // Get scroll offset of dusk and faq
  const offsets = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    const faq = document.querySelector('.tp-night');
    return {
      duskTop: dusk ? dusk.getBoundingClientRect().top + window.scrollY : null,
      faqTop: faq ? faq.getBoundingClientRect().top + window.scrollY : null
    };
  });
  console.log('Offsets:', offsets);

  const startY = Math.round(offsets.duskTop);
  const endY = Math.round(offsets.faqTop + 200);

  for (let y = startY; y <= endY; y += 150) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(50);
    const data = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      const r = actor ? actor.getBoundingClientRect() : null;
      const s = actor ? window.getComputedStyle(actor) : null;
      return {
        scrollY: window.scrollY,
        actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y), bottom: Math.round(r.bottom) } : null,
        opacity: s ? s.opacity : null,
        transform: s ? s.transform : null
      };
    });
    console.log(JSON.stringify(data));
  }

  await browser.close();
})();
