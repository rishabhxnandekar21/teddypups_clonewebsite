const { chromium } = require('playwright');

async function inspectHero() {
  const browser = await chromium.launch({ headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refHero = await refPage.evaluate(() => {
    const hero = document.querySelector('.tp-hero') || document.querySelector('section');
    const teddy = document.querySelector('.tp-hero__teddy');
    const teddyStyle = teddy ? window.getComputedStyle(teddy) : null;
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');
    const actorStyle = actor ? window.getComputedStyle(actor) : null;
    const actorBodyStyle = actorBody ? window.getComputedStyle(actorBody) : null;
    
    const arches = Array.from(document.querySelectorAll('.tp-lineup__pup')).map(el => {
      const r = el.getBoundingClientRect();
      return { href: el.getAttribute('href'), rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
    });

    return {
      windowWidth: window.innerWidth,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      teddyStyle: teddyStyle ? {
        position: teddyStyle.position,
        left: teddyStyle.left,
        top: teddyStyle.top,
        bottom: teddyStyle.bottom,
        transform: teddyStyle.transform,
        width: teddyStyle.width,
        height: teddyStyle.height
      } : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorStyle: actorStyle ? {
        position: actorStyle.position,
        transform: actorStyle.transform,
        opacity: actorStyle.opacity
      } : null,
      actorBodyRect: actorBody ? actorBody.getBoundingClientRect() : null,
      actorBodyStyle: actorBodyStyle ? {
        transform: actorBodyStyle.transform
      } : null,
      arches
    };
  });

  console.log('REF HERO:');
  console.log(JSON.stringify(refHero, null, 2));

  await browser.close();
}

inspectHero().catch(console.error);
