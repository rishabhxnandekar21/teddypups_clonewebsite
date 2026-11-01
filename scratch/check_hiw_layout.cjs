const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/how-it-works', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className,
      offsetTop: s.offsetTop,
      offsetHeight: s.offsetHeight
    }));

    const delivery = document.querySelector('#delivery');
    const flightScene = document.querySelector('[class*="flightScene"]');
    const flightRect = flightScene ? flightScene.getBoundingClientRect() : null;

    return {
      docHeight: document.documentElement.scrollHeight,
      sections,
      flightRect,
      flightOffsetTop: flightScene ? flightScene.offsetTop : null
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
