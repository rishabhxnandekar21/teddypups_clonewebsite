const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);

  const basketRect = await page.evaluate(() => {
    const basket = document.querySelector('[class*="basketPup"]');
    if (!basket) return null;
    const r = basket.getBoundingClientRect();
    return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
  });
  console.log('Basket rect at bottom:', basketRect);

  await browser.close();
}
main().catch(console.error);
