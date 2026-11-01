const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const scriptContent = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
    return scripts;
  });
  console.log('Scripts:', scriptContent);
  await browser.close();
})();
