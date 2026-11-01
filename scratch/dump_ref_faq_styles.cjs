const { chromium } = require('playwright');

async function checkFaqStyles() {
  const browser = await chromium.launch({ headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refStyles = await refPage.evaluate(() => {
    function getStyles(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        position: s.position,
        top: s.top,
        left: s.left,
        bottom: s.bottom,
        right: s.right,
        margin: s.margin,
        padding: s.padding,
        display: s.display,
        flexDirection: s.flexDirection,
        alignItems: s.alignItems,
        justifyContent: s.justifyContent,
        gap: s.gap,
        width: s.width,
        height: s.height,
        fontSize: s.fontSize,
        fontFamily: s.fontFamily,
        color: s.color,
        background: s.backgroundColor,
        transform: s.transform
      };
    }

    return {
      section: getStyles('.tp-night'),
      grid: getStyles('.tp-night__grid'),
      intro: getStyles('.tp-night__intro'),
      heading: getStyles('#questions-title'),
      cta: getStyles('.tp-night__cta'),
      pupContainer: getStyles('.tp-night__pup'),
      wonder: getStyles('.tp-night__wonder'),
      teddy: getStyles('.tp-night__teddy'),
      list: getStyles('.tp-night__list'),
      qa: getStyles('.tp-qa'),
      qaQ: getStyles('.tp-qa__q'),
      qaA: getStyles('.tp-qa__a'),
      star: getStyles('.tp-qa__star')
    };
  });

  console.log('REF FAQ STYLES:');
  console.log(JSON.stringify(refStyles, null, 2));

  await browser.close();
}

checkFaqStyles().catch(console.error);
