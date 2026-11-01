const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const docH = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  console.log('Testing forward scroll:');
  const scrollPositions = [0, 500, 1500, 2500, 3500, 5300, 5800, 6400, 8000, 10000, docH];

  for (const y of scrollPositions) {
    await page.evaluate(val => window.scrollTo(0, val), y);
    await page.waitForTimeout(150);

    const info = await page.evaluate(val => {
      const actor = document.querySelector('.pup-actor');
      const r = actor?.getBoundingClientRect();
      const t = actor?.style.transform;
      return {
        scrollY: val,
        x: r ? Math.round(r.left) : null,
        y: r ? Math.round(r.top) : null,
        transform: t,
        inViewport: r ? r.top >= 0 && r.bottom <= window.innerHeight && r.left >= -60 && r.right <= window.innerWidth + 60 : false,
      };
    }, y);
    console.log(`Scroll ${info.scrollY}: x=${info.x}, y=${info.y}, inViewport=${info.inViewport}`);
  }

  console.log('\nTesting reverse scroll (scrolling up):');
  for (const y of [8000, 5800, 2500, 0]) {
    await page.evaluate(val => window.scrollTo(0, val), y);
    await page.waitForTimeout(150);

    const info = await page.evaluate(val => {
      const actor = document.querySelector('.pup-actor');
      const r = actor?.getBoundingClientRect();
      return {
        scrollY: val,
        x: r ? Math.round(r.left) : null,
        y: r ? Math.round(r.top) : null,
        inViewport: r ? r.top >= 0 && r.bottom <= window.innerHeight : false,
      };
    }, y);
    console.log(`Reverse Scroll ${info.scrollY}: x=${info.x}, y=${info.y}, inViewport=${info.inViewport}`);
  }

  await browser.close();
}
main().catch(console.error);
