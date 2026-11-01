const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const duskStructure = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    if (!dusk) return null;

    const findLists = Array.from(dusk.querySelectorAll('ul, ol, [class*="prints"], [class*="wall"]'));
    return findLists.map(l => ({
      tag: l.tagName,
      className: l.className,
      childrenCount: l.children.length,
      firstChildren: Array.from(l.children).slice(0, 3).map(c => c.outerHTML.substring(0, 100))
    }));
  });

  console.log('Dusk Structure:', JSON.stringify(duskStructure, null, 2));

  // Also count all <img> elements inside tp-dusk
  const imgsInDusk = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    const imgs = Array.from(dusk.querySelectorAll('img'));
    return imgs.map((img, i) => ({
      i,
      parentClass: img.parentElement.className,
      src: img.src.substring(0, 80)
    }));
  });
  console.log(`Total images in tp-dusk: ${imgsInDusk.length}`);
  console.log('Sample images:', imgsInDusk.slice(0, 12));

  await browser.close();
})();
