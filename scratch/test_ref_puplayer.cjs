const { chromium } = require('playwright');

async function testPupLayer() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  // Check pup-layer and all pup-stop on reference
  const info = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const layer = document.querySelector('.pup-layer');
    const stops = Array.from(document.querySelectorAll('.pup-stop')).map(s => {
      const r = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      const buddy = s.querySelector('.pup-buddy');
      const bStyle = buddy ? window.getComputedStyle(buddy) : null;
      return {
        className: s.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        opacity: style.opacity,
        visibility: style.visibility,
        buddyOpacity: bStyle ? bStyle.opacity : null,
        buddyVisibility: bStyle ? bStyle.visibility : null,
      };
    });

    const actorStyle = actor ? window.getComputedStyle(actor) : null;
    return {
      actorExists: !!actor,
      actorStyle: actorStyle ? {
        display: actorStyle.display,
        opacity: actorStyle.opacity,
        visibility: actorStyle.visibility,
        transform: actorStyle.transform,
        position: actorStyle.position
      } : null,
      stops
    };
  });

  console.log('INITIAL (scrollY=0):', JSON.stringify(info, null, 2));

  // Now scroll to FAQ
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => /Questions.*answered/i.test(h.innerText));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(500);

  const faqInfo = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const actorStyle = actor ? window.getComputedStyle(actor) : null;
    const actorRect = actor ? actor.getBoundingClientRect() : null;
    const nightTeddy = document.querySelector('.tp-night__teddy');
    const nightTeddyRect = nightTeddy ? nightTeddy.getBoundingClientRect() : null;
    const nightTeddyStyle = nightTeddy ? window.getComputedStyle(nightTeddy) : null;
    const nightTeddyBuddy = nightTeddy ? nightTeddy.querySelector('.pup-buddy') : null;
    return {
      scrollY: window.scrollY,
      actorRect,
      actorOpacity: actorStyle ? actorStyle.opacity : null,
      nightTeddyRect,
      nightTeddyOpacity: nightTeddyStyle ? nightTeddyStyle.opacity : null,
      nightTeddyBuddyOpacity: nightTeddyBuddy ? window.getComputedStyle(nightTeddyBuddy).opacity : null,
    };
  });

  console.log('AT FAQ SCROLL:', JSON.stringify(faqInfo, null, 2));

  await browser.close();
}

testPupLayer().catch(console.error);
