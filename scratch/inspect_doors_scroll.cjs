const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. REF
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  // On ref, scroll so "Meet the pups" heading is near top of viewport, matching user Image 2
  await refPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) {
      // Image 2 shows "Meet the pups" with some space above it (~120px from top of viewport)
      const r = h2.getBoundingClientRect();
      window.scrollBy(0, r.top - 140);
    }
  });
  await refPage.waitForTimeout(1000);
  await refPage.screenshot({ path: path.join(__dirname, 'screenshots', 'ref_image2_match.png') });

  const refData = await refPage.evaluate(() => {
    // Find mascot visible in viewport
    const actors = Array.from(document.querySelectorAll('.pup-actor, .pup-stop, [class*="teddy"], [class*="mascot"], [class*="runner"]')).filter(el => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.width > 20 && r.height > 20;
    }).map(el => {
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height, top: r.top, bottom: r.bottom },
        bottomGap: window.innerHeight - r.bottom,
        style: {
          position: style.position,
          bottom: style.bottom,
          top: style.top,
          transform: style.transform,
          opacity: style.opacity,
          visibility: style.visibility
        }
      };
    });

    const floor = document.querySelector('.tp-doors__floor') || document.querySelector('.tp-floor') || document.querySelector('[class*="floor"]');
    const floorR = floor ? floor.getBoundingClientRect() : null;

    return {
      scrollY: window.scrollY,
      floorR,
      floorBottomGap: floorR ? window.innerHeight - floorR.bottom : null,
      floorHeight: floorR ? floorR.height : null,
      actors
    };
  });

  // 2. LOC
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  await locPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) {
      const r = h2.getBoundingClientRect();
      window.scrollBy(0, r.top - 140);
    }
  });
  await locPage.waitForTimeout(1000);
  await locPage.screenshot({ path: path.join(__dirname, 'screenshots', 'loc_image2_match.png') });

  const locData = await locPage.evaluate(() => {
    const actors = Array.from(document.querySelectorAll('.pup-actor, [class*="meetTeddy"], [class*="mascot"], [class*="runner"]')).filter(el => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.width > 20 && r.height > 20;
    }).map(el => {
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        className: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height, top: r.top, bottom: r.bottom },
        bottomGap: window.innerHeight - r.bottom,
        style: {
          position: style.position,
          bottom: style.bottom,
          top: style.top,
          transform: style.transform,
          opacity: style.opacity,
          visibility: style.visibility
        }
      };
    });

    const floor = document.querySelector('[class*="floor"]');
    const floorR = floor ? floor.getBoundingClientRect() : null;

    return {
      scrollY: window.scrollY,
      floorR,
      floorBottomGap: floorR ? window.innerHeight - floorR.bottom : null,
      floorHeight: floorR ? floorR.height : null,
      actors
    };
  });

  console.log('REF DOORS DATA:');
  console.log(JSON.stringify(refData, null, 2));

  console.log('LOC DOORS DATA:');
  console.log(JSON.stringify(locData, null, 2));

  await browser.close();
})();
