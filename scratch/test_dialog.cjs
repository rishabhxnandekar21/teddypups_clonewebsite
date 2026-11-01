const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const printBtn = await page.$('.tp-wall__print');
  if (printBtn) {
    await printBtn.click();
    await page.waitForTimeout(300);
    const dialog = await page.evaluate(() => {
      const d = document.querySelector('dialog, [role="dialog"]');
      return d ? { tag: d.tagName, open: d.open, html: d.outerHTML.slice(0, 300) } : null;
    });
    console.log("Dialog on click:", dialog);
  }
  await browser.close();
})();
