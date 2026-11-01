const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  for (let i = 1; i <= 3; i++) {
    const el = await page.evaluate(idx => {
      const target = document.querySelector(`li[class*="chatStep"]:nth-child(${idx})`);
      return target ? { tag: target.tagName, text: target.innerText.replace(/\n/g, ' ').slice(0, 30) } : null;
    }, i);
    console.log(`li[class*="chatStep"]:nth-child(${i}):`, el);
  }

  await browser.close();
})();
