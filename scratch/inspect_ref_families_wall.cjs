const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const wall = document.querySelector('.tp-wall');
    const firstItem = wall ? wall.firstElementChild : null;
    const itemsCount = wall ? wall.children.length : 0;
    const svgsInFirst = firstItem ? Array.from(firstItem.querySelectorAll('svg')).map(s => ({
      className: s.className.baseVal || s.className,
      viewBox: s.getAttribute('viewBox'),
      html: s.outerHTML
    })) : [];

    // Find all CSS rules matching .tp-wall, .tp-polaroid, or paw
    const matched = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.selectorText && (rule.selectorText.includes('tp-wall') || rule.selectorText.includes('polaroid') || rule.selectorText.includes('paw'))) {
            matched.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch (e) {}
    }

    return {
      itemsCount,
      firstItemHtml: firstItem ? firstItem.outerHTML : null,
      svgsInFirst,
      matched
    };
  });

  console.log('REF WALL DATA:');
  console.log('Items count:', data.itemsCount);
  console.log('SVGs in first item:', data.svgsInFirst.length);
  data.svgsInFirst.forEach(s => console.log('SVG:', s.className, s.viewBox));
  console.log('Matched CSS rules count:', data.matched.length);
  data.matched.forEach(r => console.log(r.selector, '==>', r.cssText));

  fs.writeFileSync('scratch/ref_happy_families_wall.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
