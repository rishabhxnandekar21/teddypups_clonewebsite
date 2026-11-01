const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const stops = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-pup-stop]')).map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        index: i,
        className: el.className,
        tagName: el.tagName,
        dataset: { ...el.dataset },
        rect: { x: r.x, y: r.y, w: r.width, h: r.height, top: r.top, left: r.left }
      };
    });
  });

  console.log('ALL REFERENCE DATA-PUP-STOP ELEMENTS:');
  console.log(JSON.stringify(stops, null, 2));
  await browser.close();
})();
