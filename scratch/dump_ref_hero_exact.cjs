const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refDetails = await page.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const stage = document.querySelector('.tp-hero__stage');
    const hero = document.querySelector('.tp-hero');
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');
    const pupSvg = actor ? actor.querySelector('svg') : null;

    return {
      stageRect: stage ? stage.getBoundingClientRect() : null,
      stageStyle: stage ? {
        position: window.getComputedStyle(stage).position,
        width: window.getComputedStyle(stage).width,
        height: window.getComputedStyle(stage).height,
        left: window.getComputedStyle(stage).left,
      } : null,
      teddyHtml: teddy ? teddy.outerHTML : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      teddyComputed: teddy ? {
        left: window.getComputedStyle(teddy).left,
        top: window.getComputedStyle(teddy).top,
        bottom: window.getComputedStyle(teddy).bottom,
        right: window.getComputedStyle(teddy).right,
        width: window.getComputedStyle(teddy).width,
        height: window.getComputedStyle(teddy).height,
        transform: window.getComputedStyle(teddy).transform,
        zIndex: window.getComputedStyle(teddy).zIndex,
        visibility: window.getComputedStyle(teddy).visibility,
        opacity: window.getComputedStyle(teddy).opacity,
      } : null,
      actorHtml: actor ? actor.outerHTML.slice(0, 500) : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorStyle: actor ? {
        position: window.getComputedStyle(actor).position,
        left: window.getComputedStyle(actor).left,
        top: window.getComputedStyle(actor).top,
        transform: window.getComputedStyle(actor).transform,
        opacity: window.getComputedStyle(actor).opacity,
        zIndex: window.getComputedStyle(actor).zIndex,
        visibility: window.getComputedStyle(actor).visibility,
      } : null,
      actorBodyStyle: actorBody ? {
        transform: window.getComputedStyle(actorBody).transform,
        transformOrigin: window.getComputedStyle(actorBody).transformOrigin,
      } : null,
      pupSvgStyle: pupSvg ? {
        width: window.getComputedStyle(pupSvg).width,
        height: window.getComputedStyle(pupSvg).height,
      } : null
    };
  });

  console.log('REF DETAILS:', JSON.stringify(refDetails, null, 2));
  await browser.close();
})();
