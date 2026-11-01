const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });

  const faqCss = await page.evaluate(() => {
    const scene = document.querySelector('.tp-faqroom');
    const notes = document.querySelector('.tp-notes');
    const side = document.querySelector('.tp-notes__side');
    const note = document.querySelector('.tp-note');
    const pin = document.querySelector('.tp-note__pin');
    const q = document.querySelector('.tp-note__q button');
    const flap = document.querySelector('.tp-note__flap');

    const get = (el, props) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const res = {};
      props.forEach(p => res[p] = s.getPropertyValue(p));
      return res;
    };

    return {
      scene: get(scene, ['background', 'background-color', 'color', 'padding']),
      notes: get(notes, ['display', 'grid-template-columns', 'gap']),
      note: get(note, ['background-color', 'border-radius', 'box-shadow', 'padding', 'margin', 'position', 'transform']),
      pin: get(pin, ['position', 'top', 'left', 'width', 'height', 'border-radius', 'background-color', 'box-shadow']),
      q: get(q, ['display', 'font-family', 'font-size', 'color', 'padding', 'border']),
      flap: get(flap, ['background-color', 'padding', 'border-radius'])
    };
  });

  console.log('FAQ CSS:', JSON.stringify(faqCss, null, 2));
  await browser.close();
})();
