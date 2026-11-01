const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const night = document.querySelector('.tp-night');
    if (!night) return null;

    const children = Array.from(night.children).map(c => ({
      tagName: c.tagName,
      className: c.className,
      rect: c.getBoundingClientRect(),
      style: {
        position: window.getComputedStyle(c).position,
        display: window.getComputedStyle(c).display,
        width: window.getComputedStyle(c).width,
        gridTemplateColumns: window.getComputedStyle(c).gridTemplateColumns,
        padding: window.getComputedStyle(c).padding,
      },
      html: c.outerHTML.slice(0, 1000)
    }));

    return {
      outerHtml: night.outerHTML,
      computed: {
        background: window.getComputedStyle(night).background,
        backgroundImage: window.getComputedStyle(night).backgroundImage,
        backgroundColor: window.getComputedStyle(night).backgroundColor,
        padding: window.getComputedStyle(night).padding,
        display: window.getComputedStyle(night).display,
      },
      rect: night.getBoundingClientRect(),
      children
    };
  });

  fs.writeFileSync('scratch/ref_night_full.json', JSON.stringify(data, null, 2));
  console.log('Saved scratch/ref_night_full.json');
  await browser.close();
})();
