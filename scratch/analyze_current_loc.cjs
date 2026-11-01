const { chromium } = require('playwright');
const fs = require('fs');

const b1 = fs.readFileSync('d:/Rish/Projects/TeddyPupsUAE/scratch/current_eval/01_hero_loc.png').toString('base64');
const b2 = fs.readFileSync('d:/Rish/Projects/TeddyPupsUAE/scratch/current_eval/02_doors_loc.png').toString('base64');
const b3 = fs.readFileSync('d:/Rish/Projects/TeddyPupsUAE/scratch/current_eval/03_faq_loc.png').toString('base64');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent('<html><body><canvas id="c"></canvas></body></html>');

  for (const [name, b64] of [['Current Loc Hero', b1], ['Current Loc Doors', b2], ['Current Loc FAQ', b3]]) {
    const data = await page.evaluate(async (dataUrl) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = dataUrl; });
      const c = document.getElementById('c');
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      const d = imgData.data;

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      let count = 0;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          const r = d[i], g = d[i+1], b = d[i+2];
          // Mascot golden fur color
          if (r > 230 && r < 250 && g > 180 && g < 205 && b > 95 && b < 120) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            count++;
          }
        }
      }
      return {
        width: c.width,
        height: c.height,
        minX,
        maxX,
        minY,
        maxY,
        count,
        center: (minX + maxX)/2,
        bottomDist: c.height - maxY
      };
    }, 'data:image/png;base64,' + b64);
    console.log(name, data);
  }

  await browser.close();
})();
