const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refInfo = await page.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const teddyChild = teddy ? teddy.firstElementChild : null;
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');

    return {
      teddyVis: teddy ? window.getComputedStyle(teddy).visibility : null,
      teddyChildVis: teddyChild ? window.getComputedStyle(teddyChild).visibility : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      actorVis: actor ? window.getComputedStyle(actor).visibility : null,
      actorOpacity: actor ? window.getComputedStyle(actor).opacity : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
      actorBodyTransform: actorBody ? window.getComputedStyle(actorBody).transform : null,
    };
  });

  console.log('REF AT SCROLL 0:', JSON.stringify(refInfo, null, 2));
  await page.screenshot({ path: 'scratch/ref_hero_exact_shot.png' });
  await browser.close();
})();
