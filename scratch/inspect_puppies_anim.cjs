const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.tp-card, [class*="card"]'));
    const firstCard = cards[0];
    const svgs = firstCard ? Array.from(firstCard.querySelectorAll('svg')).map(s => ({
      className: s.className.baseVal || s.className,
      viewBox: s.getAttribute('viewBox'),
      html: s.outerHTML
    })) : [];

    const sketch = firstCard ? firstCard.querySelector('[class*="sketch"]') : null;

    return {
      cardCount: cards.length,
      firstCardHtml: firstCard ? firstCard.outerHTML : null,
      svgs,
      sketchHtml: sketch ? sketch.outerHTML : null
    };
  });

  fs.writeFileSync('scratch/ref_puppies_animation.json', JSON.stringify(data, null, 2));
  console.log('Saved scratch/ref_puppies_animation.json');
  await browser.close();
})();
