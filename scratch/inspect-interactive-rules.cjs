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
    
    function find(pat) {
      const r = new RegExp('[^{}]*' + pat + '[^{}]*\\{[^}]*\\}', 'g');
      return (allCss.match(r) || []).slice(0, 10);
    }
    
    return {
      btn: find('\\.btn'),
      accordion: find('accordion|details|summary|faq'),
      pill: find('pill|filter'),
      brand: find('brand|logo')
    };
  });
  
  console.log('--- BTN Rules ---');
  console.log(rules.btn);
  console.log('--- Accordion Rules ---');
  console.log(rules.accordion);
  console.log('--- Pill Rules ---');
  console.log(rules.pill);
  console.log('--- Brand Rules ---');
  console.log(rules.brand);

  await browser.close();
})();
