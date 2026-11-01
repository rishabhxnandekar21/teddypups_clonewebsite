const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });

  const styles = await page.evaluate(() => {
    const wall = document.querySelector('.tp-wall');
    const wallItem = document.querySelector('.tp-wall__item');
    const polaroid = document.querySelector('.tp-polaroid');
    const photo = document.querySelector('.tp-polaroid__photo');
    const tape = document.querySelector('.tp-tape');
    const note = document.querySelector('.tp-memories__note');

    const get = (el, props) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const res = {};
      props.forEach(p => res[p] = s.getPropertyValue(p));
      return res;
    };

    return {
      wall: get(wall, ['display', 'grid-template-columns', 'gap', 'margin', 'padding']),
      wallItem: get(wallItem, ['display', 'list-style', 'margin', 'padding']),
      polaroid: get(polaroid, ['display', 'background-color', 'padding', 'border-radius', 'box-shadow', 'transform']),
      photo: get(photo, ['display', 'border-radius', 'overflow', 'aspect-ratio', 'width']),
      note: get(note, ['display', 'background-color', 'padding', 'border-radius', 'box-shadow', 'transform'])
    };
  });

  console.log(JSON.stringify(styles, null, 2));
  await browser.close();
})();
