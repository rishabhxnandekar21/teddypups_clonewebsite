const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const cssMatches = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    let allCss = '';
    for (const href of links) {
      try {
        const res = await fetch(href);
        allCss += await res.text() + '\n';
      } catch (e) {}
    }
    
    // Find all rules mentioning curtain
    const regex = /[^{}]*curtain[^{}]*\{[^}]*\}/g;
    const matches = allCss.match(regex) || [];
    
    // Also find keyframes mentioning curtain
    const kfRegex = /@keyframes\s+[^{}]*curtain[^{}]*\{(?:[^{}]*\{[^{}]*\})*\}/g;
    const kfMatches = allCss.match(kfRegex) || [];
    
    return { matches: matches.slice(0, 15), kfMatches };
  });
  
  console.log('Keyframes:', cssMatches.kfMatches);
  console.log('\nCurtain rules:');
  for (const m of cssMatches.matches) {
    console.log(m);
  }
  
  await browser.close();
})();
