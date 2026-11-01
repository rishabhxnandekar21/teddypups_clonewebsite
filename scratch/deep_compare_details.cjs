const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('=== 1. HERO MASCOT & ARCHES ===');
  const heroRef = await refPage.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const head = teddy ? teddy.querySelector('[data-p="head"]') : null;
    const arches = Array.from(document.querySelectorAll('.tp-lineup__pup')).map(a => a.getBoundingClientRect());
    return {
      windowWidth: window.innerWidth,
      teddy: teddy ? teddy.getBoundingClientRect() : null,
      head: head ? head.getBoundingClientRect() : null,
      arch3: arches[2],
      arch4: arches[3],
      gapCenter: arches[2] && arches[3] ? (arches[2].right + arches[3].left) / 2 : null
    };
  });

  const heroLoc = await locPage.evaluate(() => {
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const head = teddy ? teddy.querySelector('[data-p="head"]') : null;
    const arches = Array.from(document.querySelectorAll('[class*="lineupSeat"]')).map(a => a.getBoundingClientRect());
    return {
      windowWidth: window.innerWidth,
      teddy: teddy ? teddy.getBoundingClientRect() : null,
      head: head ? head.getBoundingClientRect() : null,
      arch3: arches[2],
      arch4: arches[3],
      gapCenter: arches[2] && arches[3] ? (arches[2].right + arches[3].left) / 2 : null
    };
  });
  console.log('Hero Ref:', JSON.stringify(heroRef, null, 2));
  console.log('Hero Loc:', JSON.stringify(heroLoc, null, 2));

  console.log('=== 2. DOORS MASCOT & FEET GAP ===');
  // Scroll to Meet the pups
  await refPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) window.scrollTo(0, window.scrollY + h2.getBoundingClientRect().top);
  });
  await locPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) window.scrollTo(0, window.scrollY + h2.getBoundingClientRect().top);
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const doorsRef = await refPage.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const body = document.querySelector('.pup-actor__body');
    const floor = document.querySelector('.tp-doors__floor') || document.querySelector('[class*="floor"]');
    return {
      actor: actor ? actor.getBoundingClientRect() : null,
      body: body ? body.getBoundingClientRect() : null,
      floor: floor ? floor.getBoundingClientRect() : null,
      screenBottomGapBody: body ? window.innerHeight - body.getBoundingClientRect().bottom : null
    };
  });

  const doorsLoc = await locPage.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const meetTeddy = document.querySelector('[class*="meetTeddy"]');
    const floor = document.querySelector('[class*="floor"]');
    return {
      actor: actor ? actor.getBoundingClientRect() : null,
      meetTeddy: meetTeddy ? meetTeddy.getBoundingClientRect() : null,
      floor: floor ? floor.getBoundingClientRect() : null,
      screenBottomGapTeddy: meetTeddy ? window.innerHeight - meetTeddy.getBoundingClientRect().bottom : null,
      screenBottomGapActor: actor ? window.innerHeight - actor.getBoundingClientRect().bottom : null
    };
  });
  console.log('Doors Ref:', JSON.stringify(doorsRef, null, 2));
  console.log('Doors Loc:', JSON.stringify(doorsLoc, null, 2));

  console.log('=== 3. FAQ SECTION ===');
  await refPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => /Questions.*answered/i.test(h.innerText));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await locPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => /Questions.*answered/i.test(h.innerText));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const faqRef = await refPage.evaluate(() => {
    const sec = document.querySelector('.tp-night');
    const heading = document.querySelector('#questions-title');
    const cta = document.querySelector('.tp-night__cta');
    const wonder = document.querySelector('.tp-night__wonder');
    const teddy = document.querySelector('.tp-night__teddy');
    const list = document.querySelector('.tp-night__list');
    const items = Array.from(document.querySelectorAll('.tp-qa')).map(el => {
      const q = el.querySelector('.tp-qa__q');
      const a = el.querySelector('.tp-qa__a');
      return { q: q ? q.innerText : '', a: a ? a.innerText : '', r: el.getBoundingClientRect() };
    });
    return {
      sec: sec ? sec.getBoundingClientRect() : null,
      heading: heading ? heading.getBoundingClientRect() : null,
      cta: cta ? cta.getBoundingClientRect() : null,
      wonder: wonder ? wonder.getBoundingClientRect() : null,
      teddy: teddy ? teddy.getBoundingClientRect() : null,
      list: list ? list.getBoundingClientRect() : null,
      items
    };
  });

  const faqLoc = await locPage.evaluate(() => {
    const sec = document.querySelector('[class*="nightSection"]');
    const heading = document.querySelector('#questions-title');
    const cta = document.querySelector('[class*="nightCta"]');
    const wonder = document.querySelector('[class*="nightWonder"]');
    const teddy = document.querySelector('[class*="nightTeddy"]');
    const list = document.querySelector('[class*="nightList"]');
    const items = Array.from(document.querySelectorAll('[class*="qaItem"]')).map(el => {
      const q = el.querySelector('[class*="qaQ"]');
      const a = el.querySelector('[class*="qaA"]');
      return { q: q ? q.innerText : '', a: a ? a.innerText : '', r: el.getBoundingClientRect() };
    });
    return {
      sec: sec ? sec.getBoundingClientRect() : null,
      heading: heading ? heading.getBoundingClientRect() : null,
      cta: cta ? cta.getBoundingClientRect() : null,
      wonder: wonder ? wonder.getBoundingClientRect() : null,
      teddy: teddy ? teddy.getBoundingClientRect() : null,
      list: list ? list.getBoundingClientRect() : null,
      items
    };
  });
  console.log('FAQ Ref:', JSON.stringify(faqRef, null, 2));
  console.log('FAQ Loc:', JSON.stringify(faqLoc, null, 2));

  await browser.close();
})();
