const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  // Let's inspect Reference .pup-layer, .pup-actor, and all .pup-stop elements
  const data = await page.evaluate(() => {
    const layer = document.querySelector('.pup-layer');
    const actor = document.querySelector('.pup-actor');
    const stops = Array.from(document.querySelectorAll('.pup-stop'));

    const stopsInfo = stops.map((s, idx) => {
      const rect = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      return {
        idx,
        tag: s.tagName,
        className: s.className,
        rect: { top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height },
        dataAttrs: Array.from(s.attributes).map(a => `${a.name}=${a.value}`).join(', '),
      };
    });

    return {
      layerStyle: layer ? layer.getAttribute('style') || window.getComputedStyle(layer).cssText.substring(0, 200) : null,
      layerClass: layer ? layer.className : null,
      actorClass: actor ? actor.className : null,
      actorHTML: actor ? actor.outerHTML.substring(0, 400) : null,
      stopsCount: stops.length,
      stopsInfo,
    };
  });

  console.log('Reference Pup Setup:', JSON.stringify(data, null, 2));

  // Let's sample scroll positions and see actor rect and transforms
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log('Max Scroll:', maxScroll);

  for (let pct = 0; pct <= 100; pct += 10) {
    const scrollY = (pct / 100) * maxScroll;
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await page.waitForTimeout(200);

    const state = await page.evaluate(() => {
      const a = document.querySelector('.pup-actor');
      if (!a) return null;
      const r = a.getBoundingClientRect();
      const b = document.querySelector('.tp-basket, [class*="basket"]');
      const br = b ? b.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        transform: a.style.transform,
        viewportY: r.top,
        viewportX: r.left,
        inViewport: r.top >= -50 && r.bottom <= window.innerHeight + 50,
      };
    });
    console.log(`Scroll ${pct}% (Y=${scrollY.toFixed(0)}):`, state);
  }

  await browser.close();
})();
