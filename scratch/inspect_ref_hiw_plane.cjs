const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const planeInfo = await page.evaluate(() => {
    const delivery = document.querySelector('#delivery') || document.querySelector('[class*="delivery"]');
    const svg = delivery ? delivery.querySelector('svg[viewBox="0 0 660 300"]') : null;
    const path = svg ? svg.querySelector('path') : null;
    const g = svg ? svg.querySelector('g') : null;

    return {
      deliveryRect: delivery ? delivery.getBoundingClientRect() : null,
      svgHtml: svg ? svg.outerHTML.slice(0, 300) : null,
      gTransform: g ? g.getAttribute('transform') : null,
      gStyle: g ? g.style.cssText : null
    };
  });
  console.log('REF /how-it-works PLANE INITIAL:', planeInfo);

  // Scroll through delivery section
  const deliveryY = await page.evaluate(() => {
    const d = document.querySelector('#delivery');
    return d ? d.getBoundingClientRect().top + window.scrollY : 2000;
  });

  for (const offset of [-400, -200, 0, 200, 400]) {
    await page.evaluate(y => window.scrollTo(0, y), deliveryY + offset);
    await page.waitForTimeout(200);
    const tf = await page.evaluate(() => {
      const delivery = document.querySelector('#delivery');
      const g = delivery ? delivery.querySelector('svg[viewBox="0 0 660 300"] > g') : null;
      return {
        scrollY: window.scrollY,
        transform: g ? g.getAttribute('transform') : null,
        style: g ? g.style.cssText : null
      };
    });
    console.log(`Scroll at offset ${offset}:`, tf);
  }

  await browser.close();
})();
