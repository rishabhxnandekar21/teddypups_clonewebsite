const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'domcontentloaded' });

  const meetStyles = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && (rule.selectorText.includes('tp-meet') || rule.selectorText.includes('tp-scene') || rule.selectorText.includes('tp-door'))) {
            rules.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }
    return rules;
  });

  console.log('Total rules found:', meetStyles.length);
  meetStyles.forEach(r => console.log(r.cssText));

  await browser.close();
})();
