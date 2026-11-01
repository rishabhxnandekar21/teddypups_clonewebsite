const { chromium } = require('playwright');
const fs = require('fs');

const b1 = fs.readFileSync('C:/Users/risha/.gemini/antigravity/brain/962ecb7c-22a5-4f7b-8efd-16ca45d0d993/.user_uploaded/media_1793499098527_e866a075.png').toString('base64');
const b2 = fs.readFileSync('C:/Users/risha/.gemini/antigravity/brain/962ecb7c-22a5-4f7b-8efd-16ca45d0d993/.user_uploaded/media_1793499127360_6db3a4f2.png').toString('base64');
const b3 = fs.readFileSync('C:/Users/risha/.gemini/antigravity/brain/962ecb7c-22a5-4f7b-8efd-16ca45d0d993/.user_uploaded/media_1793499207487_c2cf38b3.png').toString('base64');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent('<html><body><canvas id="c"></canvas></body></html>');

  for (const [name, b64] of [['Image 1', b1], ['Image 2', b2], ['Image 3', b3]]) {
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
