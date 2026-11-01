const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const localArches = await page.evaluate(() => {
    const seats = Array.from(document.querySelectorAll('[class*="lineupSeat"]')).map(el => {
      const r = el.getBoundingClientRect();
      const img = el.querySelector('img');
      return {
        x: r.x,
        right: r.right,
        width: r.width,
        styleX: el.style.getPropertyValue('--x'),
        src: img ? img.src.split('/').pop() : ''
      };
    });
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const teddyR = teddy ? teddy.getBoundingClientRect() : null;
    const actor = document.querySelector('.pup-actor');
    const actorR = actor ? actor.getBoundingClientRect() : null;
    const actorStyle = actor ? window.getComputedStyle(actor) : null;
    return {
      windowWidth: window.innerWidth,
      seats,
      teddyR,
      actorR,
      actorOpacity: actorStyle ? actorStyle.opacity : null
    };
  });
  console.log(JSON.stringify(localArches, null, 2));
  await browser.close();
})();
