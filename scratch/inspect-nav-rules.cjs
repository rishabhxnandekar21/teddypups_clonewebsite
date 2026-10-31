const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const rules = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    let allCss = '';
    for (const href of links) {
      try {
        const res = await fetch(href);
        allCss += await res.text() + '\n';
      } catch (e) {}
    }
    
    const regex = /[^{}]*tp-nav-link[^{}]*\{[^}]*\}/g;
    return allCss.match(regex) || [];
  });
  
  console.log('tp-nav-link rules:');
  for (const r of rules) {
    console.log(r);
  }
  await browser.close();
})();
