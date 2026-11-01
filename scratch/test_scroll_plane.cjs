const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/how-it-works', { waitUntil: 'networkidle' });

  for (const sy of [1000, 1400, 1600, 1800, 2000, 2200]) {
    await page.evaluate((y) => window.scrollTo(0, y), sy);
    await page.waitForTimeout(100);
    const data = await page.evaluate(() => {
      const flight = document.querySelector('[class*="flightScene"]');
      const g = flight ? flight.querySelector('svg > g[transform]') : null;
      const rect = flight ? flight.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        top: rect ? Math.round(rect.top) : null,
        transform: g ? g.getAttribute('transform') : null,
        opacity: g ? g.style.opacity : null
      };
    });
    console.log(`Scroll ${sy}:`, data);
  }

  await browser.close();
})();
