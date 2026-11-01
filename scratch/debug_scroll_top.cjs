const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const before = await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    const top = faq ? faq.getBoundingClientRect().top + window.scrollY : null;
    return { top, scrollY: window.scrollY };
  });
  console.log('Before scroll:', before);

  await page.evaluate((top) => {
    window.scrollTo(0, top);
  }, before.top);
  await page.waitForTimeout(400);

  const after = await page.evaluate(() => {
    const actor = document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y) } : null,
      docH: document.documentElement.scrollHeight - window.innerHeight
    };
  });
  console.log('After scroll:', after);

  await browser.close();
})();
