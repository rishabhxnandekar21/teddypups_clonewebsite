const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const headerNavInfo = await page.evaluate(async () => {
    const nav = document.querySelector('header nav');
    const links = Array.from(nav.querySelectorAll('a')).map(a => ({
      text: a.innerText,
      className: a.className,
      outerHTML: a.outerHTML
    }));
    
    // Check styles in CSS
    const res = await fetch('https://puppy.instabizweb.com/_next/static/chunks/2gh-2btcjgkih.css');
    const css = await res.text();
    const navRules = css.match(/[^{}]*header[^{}]*\{[^}]*\}/g) || [];
    
    return { links, navRules: navRules.slice(0, 10) };
  });
  
  console.log('Nav links HTML:', headerNavInfo.links);
  console.log('\nNav CSS rules:', headerNavInfo.navRules);
  await browser.close();
})();
