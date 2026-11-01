const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const vis = await page.evaluate(() => {
    const meetTeddy = document.querySelector('[class*="meetTeddy"]');
    const child = meetTeddy ? meetTeddy.firstElementChild : null;
    return {
      meetTeddyVis: meetTeddy ? window.getComputedStyle(meetTeddy).visibility : null,
      meetTeddyDisplay: meetTeddy ? window.getComputedStyle(meetTeddy).display : null,
      childVis: child ? window.getComputedStyle(child).visibility : null,
      childDisplay: child ? window.getComputedStyle(child).display : null,
    };
  });
  console.log(vis);
  await browser.close();
})();
