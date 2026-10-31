const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });
  
  const detailData = await page.evaluate(() => {
    const mainEl = document.querySelector('main');
    const mediaContainer = document.querySelector('main .grid') || mainEl;
    return {
      outerHTML: mainEl ? mainEl.innerHTML.slice(0, 5000) : '',
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({ tag: h.tagName, text: h.innerText })),
      galleryHtml: document.querySelector('[class*="gallery"], [class*="Gallery"], main div > div')?.outerHTML?.slice(0, 3000)
    };
  });
  
  console.log('Headings:', detailData.headings);
  console.log('\n--- Main snippet ---\n', detailData.outerHTML.slice(0, 2500));
  
  await browser.close();
})();
