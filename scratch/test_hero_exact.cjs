const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Measure heroTeddy at scroll 0
  const heroRect = await page.evaluate(() => {
    const el = document.querySelector('[class*="heroTeddy"]');
    const r = el?.getBoundingClientRect();
    return r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
  });

  console.log('heroTeddy at scroll 0:', heroRect);
  await browser.close();
}
main().catch(console.error);
