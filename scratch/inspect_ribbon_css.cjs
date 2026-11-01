const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });

  const ribbonCss = await page.evaluate(() => {
    const ribbon = document.querySelector('.tp-ribbon');
    const track = document.querySelector('.tp-ribbon__track');
    const band = document.querySelector('.tp-ribbon__band');
    const chapter = document.querySelector('.tp-chapter');

    const get = (el, props) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const res = {};
      props.forEach(p => res[p] = s.getPropertyValue(p));
      return res;
    };

    return {
      ribbon: get(ribbon, ['position', 'top', 'right', 'left', 'height', 'width', 'z-index']),
      track: get(track, ['position', 'height', 'width', 'background-color']),
      band: get(band, ['position', 'height', 'width', 'background-color', 'transform-origin', 'transform']),
      chapter: get(chapter, ['display', 'align-items', 'gap', 'margin', 'font-size'])
    };
  });

  console.log('Ribbon and chapter CSS:', JSON.stringify(ribbonCss, null, 2));
  await browser.close();
})();
