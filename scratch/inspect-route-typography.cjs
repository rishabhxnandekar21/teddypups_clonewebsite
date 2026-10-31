const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const routes = ['/', '/puppies', '/faq', '/contact'];
  for (const r of routes) {
    await page.goto(`https://puppy.instabizweb.com${r}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const navLinks = Array.from(document.querySelectorAll('header nav a')).map(a => ({
        text: a.innerText,
        fontFamily: getComputedStyle(a).fontFamily,
        fontSize: getComputedStyle(a).fontSize,
        fontWeight: getComputedStyle(a).fontWeight
      }));
      const eyebrow = document.querySelector('.section-eyebrow, [class*="eyebrow"], .font-scrawl, p[class*="note"]');
      
      return {
        h1: h1 ? {
          text: h1.innerText,
          fontFamily: getComputedStyle(h1).fontFamily,
          fontSize: getComputedStyle(h1).fontSize,
          fontWeight: getComputedStyle(h1).fontWeight,
          lineHeight: getComputedStyle(h1).lineHeight,
          letterSpacing: getComputedStyle(h1).letterSpacing
        } : null,
        h2: h2 ? {
          text: h2.innerText,
          fontFamily: getComputedStyle(h2).fontFamily,
          fontSize: getComputedStyle(h2).fontSize,
          fontWeight: getComputedStyle(h2).fontWeight
        } : null,
        eyebrow: eyebrow ? {
          text: eyebrow.innerText,
          fontFamily: getComputedStyle(eyebrow).fontFamily,
          fontSize: getComputedStyle(eyebrow).fontSize,
          fontWeight: getComputedStyle(eyebrow).fontWeight
        } : null,
        navLinks: navLinks.slice(0, 3)
      };
    });
    console.log(`\n=== Route: ${r} ===`);
    console.log(JSON.stringify(data, null, 2));
  }

  await browser.close();
})();
