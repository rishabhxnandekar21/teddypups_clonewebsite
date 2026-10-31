const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/gone-home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.tp-pass, [class*="boarding"], [class*="pass"], [class*="alumni"]'));
    const firstCard = cards[0];
    const tags = Array.from(document.querySelectorAll('[class*="tag"]'));

    return {
      cardCount: cards.length,
      firstCardHtml: firstCard ? firstCard.outerHTML.slice(0, 1500) : null,
      tagCount: tags.length,
      sampleTagHtml: tags[0] ? tags[0].outerHTML.slice(0, 600) : null
    };
  });

  console.log('=== LIVE REFERENCE GONE HOME ===');
  console.log('Cards count:', data.cardCount);
  console.log('First card HTML:\n', data.firstCardHtml);
  console.log('Sample Tag HTML:\n', data.sampleTagHtml);

  await browser.close();
})();
