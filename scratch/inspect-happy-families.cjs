const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const polaroids = Array.from(document.querySelectorAll('.tp-polaroid, figure, [class*="polaroid"]'));
    const firstP = polaroids[0];
    const tapes = Array.from(document.querySelectorAll('[class*="tape"]')).map(t => ({
      class: t.className,
      style: t.getAttribute('style')
    }));

    return {
      totalPolaroids: polaroids.length,
      sampleHtml: firstP ? firstP.outerHTML.slice(0, 800) : null,
      tapeCount: tapes.length,
      sampleTapes: tapes.slice(0, 10)
    };
  });
  console.log('=== LIVE REFERENCE HAPPY FAMILIES ===');
  console.log('Total Polaroids:', info.totalPolaroids);
  console.log('Sample Polaroid HTML:\n', info.sampleHtml);
  console.log('Sample Tapes:\n', info.sampleTapes);

  // Click on first polaroid to see lightbox
  const firstCard = await page.$('.tp-polaroid, figure, [class*="polaroid"]');
  if (firstCard) {
    await firstCard.click();
    await page.waitForTimeout(600);
    const lightboxHtml = await page.evaluate(() => {
      const dialog = document.querySelector('dialog, [role="dialog"], .tp-lightbox, [class*="lightbox"], [class*="modal"]');
      return dialog ? dialog.outerHTML.slice(0, 1500) : null;
    });
    console.log('\n=== LIGHTBOX HTML ===\n', lightboxHtml);
  }

  await browser.close();
})();
