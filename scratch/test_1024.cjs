const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(__dirname, 'screenshots', 'loc_1024.png') });

  const data = await page.evaluate(() => {
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const tr = teddy ? teddy.getBoundingClientRect() : null;
    const arches = Array.from(document.querySelectorAll('[class*="lineupSeat"]')).map(a => a.getBoundingClientRect());
    return {
      windowWidth: window.innerWidth,
      tr,
      arches
    };
  });
  console.log(JSON.stringify(data, null, 2));

  // Also check reference at 1024
  const refPage = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await refPage.screenshot({ path: path.join(__dirname, 'screenshots', 'ref_1024.png') });

  const refData = await refPage.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const tr = teddy ? teddy.getBoundingClientRect() : null;
    const arches = Array.from(document.querySelectorAll('.tp-lineup__pup')).map(a => a.getBoundingClientRect());
    return {
      windowWidth: window.innerWidth,
      tr,
      arches
    };
  });
  console.log('REF 1024:', JSON.stringify(refData, null, 2));

  await browser.close();
})();
