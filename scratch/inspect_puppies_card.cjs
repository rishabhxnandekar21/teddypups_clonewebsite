const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });

  // Get the first puppy card HTML and CSS
  const cardData = await page.evaluate(() => {
    const card = document.querySelector('.tp-sketch') || document.querySelector('a[href^="/puppies/"]');
    if (!card) return 'no card';

    // Find all children and SVGs inside the card
    const frame = card.querySelector('.tp-sketch__frame') || card.querySelector('[class*="frame"]');
    const wash = card.querySelector('.tp-sketch__wash') || card.querySelector('[class*="wash"]');
    const photo = card.querySelector('.tp-sketch__photo') || card.querySelector('[class*="photo"]');
    const ink = card.querySelector('.tp-sketch__ink') || card.querySelector('[class*="ink"]');
    const sticker = card.querySelector('.tp-sketch__sticker') || card.querySelector('[class*="sticker"]');

    // Check all CSS rules related to tp-sketch
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes('sketch')) {
            rules.push({ selector: rule.selectorText, css: rule.cssText });
          }
        }
      } catch (e) {}
    }

    return {
      cardHtml: card.outerHTML,
      cardClasses: card.className,
      rules
    };
  });

  fs.writeFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\ref_puppies_card.json', JSON.stringify(cardData, null, 2));
  console.log('Saved card data, rules count:', cardData.rules ? cardData.rules.length : 0);

  await browser.close();
})();
