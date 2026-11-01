const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const stage = document.querySelector('[class*="meetStage"]');
    const pinRange = document.querySelector('[class*="pinRange"]');
    let el = stage ? stage.parentElement : null;
    const overflowAncestors = [];
    while (el && el !== document.documentElement) {
      const style = window.getComputedStyle(el);
      overflowAncestors.push({ tag: el.tagName, class: el.className, overflow: style.overflow, overflowX: style.overflowX, overflowY: style.overflowY });
      el = el.parentElement;
    }
    return {
      meetPinned: meet ? meet.getAttribute('data-pinned') : null,
      stageSticky: stage ? window.getComputedStyle(stage).position : null,
      pinRangeHeight: pinRange ? window.getComputedStyle(pinRange).height : null,
      overflowAncestors,
    };
  });
  console.log('Sticky check:', JSON.stringify(data, null, 2));
  await browser.close();
})();
