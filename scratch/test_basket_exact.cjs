const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(200);

  // Measure basketPup position in viewport
  const basketRect = await page.evaluate(() => {
    const el = document.querySelector('[class*="basketPup"]');
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  });

  console.log('basketPup at bottom:', basketRect);
  await browser.close();
}
main().catch(console.error);
