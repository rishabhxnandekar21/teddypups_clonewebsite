const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const polaroids = await page.evaluate(() => {
    // Find all images or figures that look like polaroids
    const cards = Array.from(document.querySelectorAll('figure:has(img), .tp-polaroid, [class*="polaroid"]'));
    return cards.slice(0, 5).map(c => ({
      class: c.className,
      style: c.getAttribute('style'),
      html: c.outerHTML.slice(0, 400)
    }));
  });

  console.log('Polaroids found:', polaroids.length);
  polaroids.forEach((p, i) => console.log(`Card ${i}:\n`, p.html));

  // Let's click on an image polaroid to see what happens
  const imgCard = await page.$('figure:has(img), .tp-polaroid');
  if (imgCard) {
    console.log('\nClicking card...');
    await imgCard.click();
    await page.waitForTimeout(600);
    const dialog = await page.$('dialog[open], [role="dialog"], .tp-modal');
    console.log('Dialog found:', dialog !== null);
    if (dialog) {
      const dHtml = await dialog.evaluate(el => el.outerHTML.slice(0, 1000));
      console.log('Dialog HTML:\n', dHtml);
    }
  }

  await browser.close();
})();
