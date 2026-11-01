const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const faqData = await page.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    if (!faq) return null;
    const r = faq.getBoundingClientRect();
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const faqTop = r.top + window.scrollY;
    return {
      scrollY: window.scrollY,
      faqTop,
      docH,
      faqProgress: faqTop / docH,
      faqHeight: faq.offsetHeight
    };
  });
  console.log('FAQ MEASUREMENTS:', faqData);

  // Scroll to FAQ top
  await page.evaluate(y => window.scrollTo(0, y), faqData.faqTop);
  await page.waitForTimeout(300);

  const actorAtFaq = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      actorRect: r ? { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } : null,
      transform: actor ? window.getComputedStyle(actor).transform : null
    };
  });
  console.log('ACTOR AT FAQ TOP:', actorAtFaq);
  await page.screenshot({ path: 'scratch/verified_faq_at_top.png' });

  await browser.close();
})();
