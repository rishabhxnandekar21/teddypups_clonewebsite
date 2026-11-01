const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const el = document.querySelector('.tp-sketch');
    const matched = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.selectorText && (rule.selectorText.includes('tp-sketch') || rule.selectorText.includes('sketch'))) {
            matched.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
          if (rule.name && rule.name.includes('sketch')) {
            matched.push({ keyframes: rule.name, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }
    return {
      html: el ? el.outerHTML : null,
      matched
    };
  });

  fs.writeFileSync('scratch/ref_sketch_rules.json', JSON.stringify(data, null, 2));
  console.log('Saved scratch/ref_sketch_rules.json');
  await browser.close();
})();
