const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  // Look for mascot script or window variables
  const data = await page.evaluate(() => {
    // Check if there are scripts with pup-actor or pup-layer
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src || s.innerText.substring(0, 200));
    return { scripts };
  });

  console.log('Scripts:', data);
  await browser.close();
}
main().catch(console.error);
