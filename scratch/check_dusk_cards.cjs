const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const section = document.querySelector('[class*="familiesSection"]');
    const cards = document.querySelectorAll('[class*="familiesSection"] [class*="polaroid"], [class*="familiesSection"] [class*="Card"], [class*="familiesGrid"] > *');
    return {
      sectionFound: !!section,
      sectionClass: section ? section.className : null,
      cardsCount: cards.length,
      sampleCard: cards[0] ? cards[0].className : null
    };
  });
  console.log('Dusk check:', info);
  await browser.close();
})();
