const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const meetTeddy = document.querySelector('[class*="meetTeddy"]');
    const forkTeddy = document.querySelector('[class*="forkTeddy"]');
    const pupLayer = document.querySelector('.pup-layer');
    const actor = document.querySelector('.pup-actor');
    return {
      hasDataPup: document.documentElement.hasAttribute('data-pup'),
      meetTeddyDisplay: meetTeddy ? getComputedStyle(meetTeddy).display : null,
      meetTeddyVisibility: meetTeddy ? getComputedStyle(meetTeddy).visibility : null,
      forkTeddyDisplay: forkTeddy ? getComputedStyle(forkTeddy).display : null,
      actorTransform: actor?.style.transform,
      actorDisplay: actor ? getComputedStyle(actor).display : null,
    };
  });
  console.log('Local mascots visibility:', info);
  await browser.close();
}
main().catch(console.error);
