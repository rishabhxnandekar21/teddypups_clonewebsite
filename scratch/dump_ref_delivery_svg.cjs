const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const svgFull = await page.evaluate(() => {
    const delivery = document.querySelector('#delivery');
    const svg = delivery ? delivery.querySelector('svg[viewBox="0 0 660 300"]') : null;
    return svg ? svg.outerHTML : null;
  });

  console.log('SVG FULL:');
  console.log(svgFull);
  fs.writeFileSync('scratch/ref_delivery_plane_svg.html', svgFull || '');
  await browser.close();
})();
