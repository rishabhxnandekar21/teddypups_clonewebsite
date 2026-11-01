const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  const localHero = await page.evaluate(() => {
    const teddy = document.querySelector('[class*="heroTeddy"]') || document.querySelector('.tp-hero__teddy');
    const teddyStyle = teddy ? window.getComputedStyle(teddy) : null;
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="pupActor"]');
    const actorBody = document.querySelector('[class*="pupActorBody"]');
    const arches = Array.from(document.querySelectorAll('[class*="arch"], [class*="pupCard"], [class*="lineupPup"]')).map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, className: el.className, rect: { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right } };
    });
    return {
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      teddyStyle: teddyStyle ? { position: teddyStyle.position, left: teddyStyle.left, top: teddyStyle.top, transform: teddyStyle.transform, width: teddyStyle.width, height: teddyStyle.height } : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorStyle: actor ? { transform: window.getComputedStyle(actor).transform, opacity: window.getComputedStyle(actor).opacity } : null,
      actorBodyStyle: actorBody ? { transform: window.getComputedStyle(actorBody).transform } : null,
      arches
    };
  });
  console.log('LOCAL HERO:', JSON.stringify(localHero, null, 2));
  await browser.close();
})();
