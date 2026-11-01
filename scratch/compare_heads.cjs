const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const refHead = await refPage.evaluate(() => {
    const head = document.querySelector('.tp-hero__teddy [data-p="head"]') || document.querySelector('.pup-actor [data-p="head"]');
    const teddy = document.querySelector('.tp-hero__teddy');
    const hr = head ? head.getBoundingClientRect() : null;
    const tr = teddy ? teddy.getBoundingClientRect() : null;
    return { head: hr, teddy: tr };
  });

  const locHead = await locPage.evaluate(() => {
    const head = document.querySelector('[class*="heroTeddy"] [data-p="head"]');
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const hr = head ? head.getBoundingClientRect() : null;
    const tr = teddy ? teddy.getBoundingClientRect() : null;
    return { head: hr, teddy: tr };
  });

  console.log('REF:', JSON.stringify(refHead, null, 2));
  console.log('LOC:', JSON.stringify(locHead, null, 2));

  await browser.close();
})();
