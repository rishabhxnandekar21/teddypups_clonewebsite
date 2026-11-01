const { chromium } = require('playwright');

async function verify() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Testing /puppies...');
  await page.goto('http://localhost:5174/puppies', { waitUntil: 'networkidle' });

  const pupsData = await page.evaluate(() => {
    const title = document.querySelector('h1')?.innerText;
    const cards = document.querySelectorAll('li [class*="sketch"]');
    const chips = document.querySelectorAll('button[class*="chip"]');
    const self = document.querySelector('[class*="self"]');

    return {
      title,
      cardsCount: cards.length,
      chipsCount: chips.length,
      selfMascotFound: !!self,
    };
  });
  console.log('Puppies Page Data:', JSON.stringify(pupsData, null, 2));

  await browser.close();
}

verify().catch(console.error);
