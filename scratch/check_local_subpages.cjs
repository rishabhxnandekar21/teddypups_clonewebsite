const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const path of ['/how-it-works', '/faq', '/visit-and-contact', '/contact']) {
    try {
      const res = await page.goto(`http://localhost:5174${path}`, { waitUntil: 'networkidle' });
      console.log(path, 'Status:', res.status(), 'Title:', await page.title());
    } catch (e) {
      console.log(path, 'Error:', e.message);
    }
  }

  await browser.close();
})();
