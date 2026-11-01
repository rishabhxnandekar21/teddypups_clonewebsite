const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });

  const paths = await page.evaluate(() => {
    const card = document.querySelector('.tp-sketch');
    if (!card) return null;
    const wash = card.querySelector('.tp-sketch__wash path')?.getAttribute('d');
    const lines = Array.from(card.querySelectorAll('.tp-sketch__line')).map(p => p.getAttribute('d'));
    const doodles = Array.from(card.querySelectorAll('.tp-sketch__doodle')).map(d => d.outerHTML);
    return { wash, lines, doodles };
  });

  console.log('REF CARD PATHS:', JSON.stringify(paths, null, 2));
  fs.writeFileSync('scratch/ref_card_paths.json', JSON.stringify(paths, null, 2));
  await browser.close();
})();
