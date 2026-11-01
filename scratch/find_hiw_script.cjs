const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const scripts = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.endsWith('.js') || url.includes('/assets/')) {
      try {
        const text = await res.text();
        if (text.includes('tp-flight') || text.includes('M40 250')) {
          console.log('MATCHED SCRIPT:', url, text.length);
          fs.writeFileSync('scratch/ref_how_it_works_chunk.js', text);
        }
      } catch (e) {}
    }
  });

  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });
  await browser.close();
})();
