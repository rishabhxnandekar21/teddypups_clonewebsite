const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const info = await page.evaluate(async () => {
    const bodyFont = getComputedStyle(document.body).fontFamily;
    
    // Fetch external CSS files
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    let allCss = '';
    for (const href of links) {
      try {
        const res = await fetch(href);
        const text = await res.text();
        allCss += text + '\n';
      } catch (e) {}
    }
    
    // Find variables
    const vars = {};
    const matches = allCss.matchAll(/(--[a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g);
    for (const m of matches) {
      vars[m[1]] = m[2].trim();
    }
    
    // Find font-face declarations
    const fontFaces = [];
    const ffMatches = allCss.matchAll(/@font-face\s*{([^}]+)}/g);
    for (const m of ffMatches) {
      fontFaces.push(m[1].replace(/\s+/g, ' ').trim());
    }

    return { bodyFont, links, vars, fontFacesCount: fontFaces.length, sampleVars: Object.entries(vars).slice(0, 40) };
  });
  
  console.log('Body font:', info.bodyFont);
  console.log('CSS Links:', info.links);
  console.log('Variables found:', Object.keys(info.vars).length);
  
  // Specific lookups
  for (const k of [
    '--color-cocoa', '--color-cocoa-soft', '--color-milk', '--color-toffee',
    '--color-toffee-deep', '--color-toffee-ink', '--color-honey', '--color-honey-soft',
    '--color-cream', '--color-sand', '--color-night', '--color-whatsapp',
    '--color-sky', '--color-blush', '--ease-pounce', '--ease-snap', '--header-h'
  ]) {
    console.log(`${k}: ${info.vars[k]}`);
  }

  // Look for any ease vars
  console.log('\n--- Ease vars ---');
  for (const [k, v] of Object.entries(info.vars)) {
    if (k.includes('ease') || k.includes('color') || k.includes('font')) {
      console.log(`${k}: ${v}`);
    }
  }

  await browser.close();
})();
