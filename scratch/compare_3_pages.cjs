const { chromium } = require('playwright');
const fs = require('fs');

async function comparePage(path) {
  const browser = await chromium.launch();
  const pageRef = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageRef.goto(`https://puppy.instabizweb.com${path}`, { waitUntil: 'networkidle' });

  const refInfo = await pageRef.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const h1 = document.querySelector('h1')?.textContent.trim();
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
    const sections = Array.from(document.querySelectorAll('section, [class*="scene"], [class*="section"]')).map(s => ({
      className: s.className,
      id: s.id,
      h2: s.querySelector('h2')?.textContent.trim()
    }));
    return { title: document.title, h1, h2s, sections };
  });

  const pageLoc = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLoc.goto(`http://localhost:5174${path}`, { waitUntil: 'networkidle' });

  const locInfo = await pageLoc.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const h1 = document.querySelector('h1')?.textContent.trim();
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
    const sections = Array.from(document.querySelectorAll('section, [class*="scene"], [class*="section"]')).map(s => ({
      className: s.className,
      id: s.id,
      h2: s.querySelector('h2')?.textContent.trim()
    }));
    return { title: document.title, h1, h2s, sections };
  });

  console.log(`\n=== COMPARE ${path} ===`);
  console.log('REF:', JSON.stringify(refInfo, null, 2));
  console.log('LOC:', JSON.stringify(locInfo, null, 2));

  await browser.close();
}

async function run() {
  for (const p of ['/how-it-works', '/faq', '/contact']) {
    await comparePage(p);
  }
}

run().catch(console.error);
