const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const scriptCode = await page.evaluate(() => {
    // Check all script elements
    const scripts = Array.from(document.querySelectorAll('script'));
    for (const s of scripts) {
      if (s.textContent && (s.textContent.includes('tp-flight') || s.textContent.includes('M40 250') || s.textContent.includes('getPointAtLength'))) {
        return s.textContent;
      }
    }
    return null;
  });

  if (scriptCode) {
    console.log("Found in inline script:", scriptCode.slice(0, 500));
  } else {
    // Check external scripts
    const external = await page.evaluate(async () => {
      const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
      const matches = [];
      for (const src of scripts) {
        try {
          const res = await fetch(src);
          const txt = await res.text();
          if (txt.includes('tp-flight') || txt.includes('getPointAtLength') || txt.includes('M40 250')) {
            matches.push({ src, snippet: txt.slice(txt.indexOf('tp-flight') - 100, txt.indexOf('tp-flight') + 500) });
          }
        } catch (e) {}
      }
      return matches;
    });
    console.log("External matches:", JSON.stringify(external, null, 2));
  }

  await browser.close();
})();
