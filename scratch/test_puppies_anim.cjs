const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/puppies', { waitUntil: 'networkidle' });

  // Check state at 300ms
  await page.waitForTimeout(300);

  const cardData = await page.evaluate(() => {
    const card = document.querySelector('a[data-reveal="true"]');
    const line = card ? card.querySelector('[class*="sketchLine"]') : null;
    const photo = card ? card.querySelector('[class*="photo"]') : null;
    const sticker = card ? card.querySelector('[class*="sticker"]') : null;

    return {
      cardRevealed: card ? card.getAttribute('data-revealed') : null,
      cardArmed: card ? card.getAttribute('data-armed') : null,
      lineDashoffset: line ? window.getComputedStyle(line).strokeDashoffset : null,
      photoClipPath: photo ? window.getComputedStyle(photo).clipPath : null,
      stickerScale: sticker ? window.getComputedStyle(sticker).scale : null,
    };
  });

  console.log('EXACT PUPPIES CARD DATA:', cardData);
  await browser.close();
})();
