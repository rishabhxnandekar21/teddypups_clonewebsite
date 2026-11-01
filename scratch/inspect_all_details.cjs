const { chromium } = require('playwright');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Inspect Meet section on reference
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  // Scroll to Meet the pups pinned position
  await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    if (meet) meet.scrollIntoView();
  });
  await page.waitForTimeout(500);

  const refMeet = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const teddy = document.querySelector('.tp-meet__teddy');
    const stage = document.querySelector('.tp-meet__stage');
    const floor = document.querySelector('.tp-meet__floor') || document.querySelector('[class*="floor"]');
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');

    return {
      meetRect: meet ? meet.getBoundingClientRect() : null,
      meetHeight: meet ? meet.offsetHeight : null,
      stageRect: stage ? stage.getBoundingClientRect() : null,
      floorRect: floor ? floor.getBoundingClientRect() : null,
      floorComputed: floor ? {
        position: window.getComputedStyle(floor).position,
        height: window.getComputedStyle(floor).height,
        bottom: window.getComputedStyle(floor).bottom,
        top: window.getComputedStyle(floor).top,
      } : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      teddyComputed: teddy ? {
        position: window.getComputedStyle(teddy).position,
        left: window.getComputedStyle(teddy).left,
        bottom: window.getComputedStyle(teddy).bottom,
        top: window.getComputedStyle(teddy).top,
        width: window.getComputedStyle(teddy).width,
        height: window.getComputedStyle(teddy).height,
      } : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
      actorBodyTransform: actorBody ? window.getComputedStyle(actorBody).transform : null,
      windowScrollY: window.scrollY
    };
  });

  // 2. Inspect FAQ section on reference
  await page.evaluate(() => {
    const faq = document.querySelector('.tp-night');
    if (faq) faq.scrollIntoView();
  });
  await page.waitForTimeout(500);

  const refFaq = await page.evaluate(() => {
    const faq = document.querySelector('.tp-night');
    const teddy = document.querySelector('.tp-night__teddy');
    const actor = document.querySelector('.pup-actor');
    const inner = faq ? faq.querySelector('.tp-night__inner') || faq.firstElementChild : null;
    const colLeft = faq ? faq.querySelector('[class*="lead"], [class*="left"], [class*="intro"]') : null;
    const colRight = faq ? faq.querySelector('[class*="list"], [class*="questions"], [class*="accordion"]') : null;

    return {
      faqRect: faq ? faq.getBoundingClientRect() : null,
      faqHtml: faq ? faq.outerHTML.slice(0, 1500) : null,
      faqComputed: faq ? {
        backgroundColor: window.getComputedStyle(faq).backgroundColor,
        padding: window.getComputedStyle(faq).padding,
        display: window.getComputedStyle(faq).display,
        gridTemplateColumns: window.getComputedStyle(faq).gridTemplateColumns,
      } : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      teddyComputed: teddy ? {
        position: window.getComputedStyle(teddy).position,
        left: window.getComputedStyle(teddy).left,
        top: window.getComputedStyle(teddy).top,
        bottom: window.getComputedStyle(teddy).bottom,
      } : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
    };
  });

  // 3. Inspect Footer Basket on reference
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(500);

  const refBasket = await page.evaluate(() => {
    const basket = document.querySelector('.tp-basket');
    const basketPup = document.querySelector('.tp-basket__pup');
    const basketBack = document.querySelector('.tp-basket__back');
    const basketFront = document.querySelector('.tp-basket__front');
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');

    return {
      basketHtml: basket ? basket.outerHTML : null,
      basketRect: basket ? basket.getBoundingClientRect() : null,
      basketPupRect: basketPup ? basketPup.getBoundingClientRect() : null,
      basketPupComputed: basketPup ? {
        position: window.getComputedStyle(basketPup).position,
        left: window.getComputedStyle(basketPup).left,
        top: window.getComputedStyle(basketPup).top,
        bottom: window.getComputedStyle(basketPup).bottom,
        width: window.getComputedStyle(basketPup).width,
        height: window.getComputedStyle(basketPup).height,
        zIndex: window.getComputedStyle(basketPup).zIndex,
      } : null,
      basketBackZ: basketBack ? window.getComputedStyle(basketBack).zIndex : null,
      basketFrontZ: basketFront ? window.getComputedStyle(basketFront).zIndex : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
      actorBodyTransform: actorBody ? window.getComputedStyle(actorBody).transform : null,
      actorZ: actor ? window.getComputedStyle(actor).zIndex : null,
    };
  });

  fs.writeFileSync('scratch/ref_3_issues.json', JSON.stringify({ refMeet, refFaq, refBasket }, null, 2));
  console.log('Saved scratch/ref_3_issues.json successfully!');
  await browser.close();
}

run().catch(console.error);
