const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const paw = document.querySelector('.tp-wall__paw');
    const item = document.querySelector('.tp-wall__item');
    const print = document.querySelector('.tp-wall__print');
    const polaroid = document.querySelector('.tp-polaroid');

    function getCss(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        display: s.display,
        position: s.position,
        top: s.top,
        left: s.left,
        transform: s.transform,
        translate: s.translate,
        width: s.width,
        height: s.height,
        color: s.color,
        fill: s.fill,
        opacity: s.opacity,
        zIndex: s.zIndex,
        pointerEvents: s.pointerEvents
      };
    }

    // find stylesheet rules matching tp-wall
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && (rule.selectorText.includes('tp-wall') || rule.selectorText.includes('paw'))) {
            rules.push(rule.cssText);
          }
        }
      } catch (e) {}
    }

    return {
      paw: getCss(paw),
      pawOuterHTML: paw ? paw.outerHTML : null,
      print: getCss(print),
      item: getCss(item),
      polaroid: getCss(polaroid),
      rules
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
