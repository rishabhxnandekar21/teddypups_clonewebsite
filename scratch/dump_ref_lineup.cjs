const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const lineupData = await page.evaluate(() => {
    const seats = Array.from(document.querySelectorAll('.tp-lineup__seat')).map(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        inlineStyle: el.getAttribute('style'),
        left: style.left,
        width: style.width,
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height }
      };
    });
    const lineup = document.querySelector('.tp-lineup');
    return {
      lineupRect: lineup ? lineup.getBoundingClientRect() : null,
      lineupStyle: lineup ? {
        position: window.getComputedStyle(lineup).position,
        width: window.getComputedStyle(lineup).width,
        left: window.getComputedStyle(lineup).left,
      } : null,
      seats
    };
  });

  console.log('REF LINEUP DATA:', JSON.stringify(lineupData, null, 2));
  await browser.close();
})();
