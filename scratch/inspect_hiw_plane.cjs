const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works#delivery', { waitUntil: 'networkidle' });

  const planeInfo = await page.evaluate(async () => {
    const section = document.querySelector('#delivery') || document.querySelector('[class*="delivery"]');
    const svg = section ? section.querySelector('svg') : null;
    const plane = document.querySelector('[class*="flight"] [class*="plane"], [class*="plane"], [class*="aeroplane"], g[transform*="translate"]');
    
    // Check scroll progress behavior
    const samples = [];
    const scrollTops = [0, 500, 1000, 1500, 2000, 2500];
    
    // Find all paths and transforms in the flight SVG
    const flightEl = document.querySelector('.tp-flight, [class*="flight"]');
    
    return {
      sectionHTML: section ? section.outerHTML.slice(0, 1000) : null,
      flightHTML: flightEl ? flightEl.outerHTML : null
    };
  });

  console.log(JSON.stringify(planeInfo, null, 2));
  await browser.close();
})();
