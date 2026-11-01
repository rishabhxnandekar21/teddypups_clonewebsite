const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const heroMascotStatus = await page.evaluate(() => {
    const heroTeddy = document.querySelector('[class*="heroTeddy"]');
    const child = heroTeddy ? heroTeddy.firstElementChild : null;
    const actor = document.querySelector('.pup-actor');
    return {
      heroTeddyRect: heroTeddy ? heroTeddy.getBoundingClientRect() : null,
      heroTeddyVis: heroTeddy ? window.getComputedStyle(heroTeddy).visibility : null,
      childVis: child ? window.getComputedStyle(child).visibility : null,
      childDisplay: child ? window.getComputedStyle(child).display : null,
      actorRect: actor ? actor.getBoundingClientRect() : null,
      actorOpacity: actor ? window.getComputedStyle(actor).opacity : null,
      actorVis: actor ? window.getComputedStyle(actor).visibility : null,
    };
  });
  console.log('Hero mascot status at scrollY=0:', heroMascotStatus);

  await browser.close();
})();
