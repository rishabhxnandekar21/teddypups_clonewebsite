const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const duskData = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    if (!dusk) return 'tp-dusk not found';

    const cs = window.getComputedStyle(dusk);
    const wall = dusk.querySelector('.tp-photowall');
    const wallCS = wall ? window.getComputedStyle(wall) : null;
    const prints = dusk.querySelector('.tp-photowall__prints');
    const printsCS = prints ? window.getComputedStyle(prints) : null;

    const items = Array.from(dusk.querySelectorAll('.tp-photowall__prints > li'));
    return {
      duskHeight: dusk.offsetHeight,
      duskStyles: {
        background: cs.background,
        padding: cs.padding,
        position: cs.position
      },
      wallStyles: wallCS ? {
        display: wallCS.display,
        position: wallCS.position,
        padding: wallCS.padding,
        height: wallCS.height
      } : null,
      printsStyles: printsCS ? {
        display: printsCS.display,
        gridTemplateColumns: printsCS.gridTemplateColumns,
        flexWrap: printsCS.flexWrap,
        gap: printsCS.gap,
        padding: printsCS.padding,
        justifyContent: printsCS.justifyContent
      } : null,
      itemCount: items.length,
      items: items.map((li, idx) => {
        const polaroid = li.querySelector('.tp-polaroid');
        const img = li.querySelector('img');
        const caption = li.querySelector('.tp-polaroid__caption');
        const tape = li.querySelector('.tp-tape');
        return {
          idx: idx + 1,
          style: li.getAttribute('style'),
          polaroidStyle: polaroid ? polaroid.getAttribute('style') : null,
          tapeClass: tape ? tape.className : null,
          caption: caption ? caption.textContent.trim() : null,
          imgSrc: img ? img.getAttribute('src') || img.src : null,
          imgAlt: img ? img.getAttribute('alt') : null,
        };
      })
    };
  });

  console.log(`Reference Dusk Items: ${duskData.itemCount}`);
  fs.writeFileSync('scratch/ref_dusk_data.json', JSON.stringify(duskData, null, 2));
  console.log('Saved scratch/ref_dusk_data.json');

  await browser.close();
})();
