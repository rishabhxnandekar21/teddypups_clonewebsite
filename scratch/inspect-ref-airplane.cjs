const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const planeInfo = await page.evaluate(() => {
    const paths = document.querySelector('.tp-paths');
    if (!paths) return 'tp-paths not found';
    
    // Find all SVG elements in tp-paths
    const svgs = Array.from(paths.querySelectorAll('svg'));
    const svgDetails = svgs.map(s => {
      const gs = Array.from(s.querySelectorAll('g'));
      return {
        viewBox: s.getAttribute('viewBox'),
        className: s.className,
        gCount: gs.length,
        gTransforms: gs.map(g => ({
          transform: g.getAttribute('transform'),
          styleTransform: g.style.transform,
          classes: g.getAttribute('class'),
          innerHTML: g.innerHTML.substring(0, 100)
        }))
      };
    });

    return {
      pathsRect: paths.getBoundingClientRect(),
      svgs: svgDetails
    };
  });

  console.log('Plane Info:', JSON.stringify(planeInfo, null, 2));

  // Now scroll through paths and track all g transforms
  const pathsY = await page.evaluate(() => {
    const p = document.querySelector('.tp-paths');
    return p.getBoundingClientRect().top + window.scrollY;
  });

  for (const offset of [-200, 0, 200, 400, 600, 800]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), pathsY + offset);
    await page.waitForTimeout(200);
    const planeTransform = await page.evaluate(() => {
      // Find the moving airplane group
      const paths = document.querySelector('.tp-paths');
      const gs = Array.from(paths.querySelectorAll('g'));
      return gs.map(g => ({
        transform: g.getAttribute('transform'),
        styleTransform: g.style.transform,
        styleMotion: g.style.cssText
      }));
    });
    console.log(`Scroll offset ${offset}:`, planeTransform);
  }

  await browser.close();
})();
