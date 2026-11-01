const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const kfs = await page.evaluate(() => {
    const list = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.KEYFRAMES_RULE && (rule.name.includes('paw') || rule.name.includes('print'))) {
            list.push(rule.cssText);
          }
        }
      } catch (e) {}
    }
    return list;
  });

  console.log(JSON.stringify(kfs, null, 2));
  await browser.close();
})();
