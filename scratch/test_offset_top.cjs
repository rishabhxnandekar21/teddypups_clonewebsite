const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const faqTop = await page.evaluate(() => {
    const el = document.querySelector('.tp-night, [class*="nightSection"]');
    return {
      offsetTop: el ? el.offsetTop : null,
      rectTop: el ? el.getBoundingClientRect().top : null
    };
  });
  console.log('FAQ TOP:', faqTop);

  await page.evaluate(y => window.scrollTo(0, y), faqTop.offsetTop || faqTop.rectTop);
  await page.waitForTimeout(300);

  const actor = await page.evaluate(() => {
    const a = document.querySelector('[class*="actor"]');
    const r = a ? a.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y) } : null
    };
  });
  console.log('ACTOR AT FAQ:', actor);

  await browser.close();
})();
