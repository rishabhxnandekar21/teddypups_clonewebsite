const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const pageRef = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageRef.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refData = await pageRef.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const range = document.querySelector('[data-pin-range]') || meet.firstElementChild;
    const doors = Array.from(document.querySelectorAll('.tp-door, [class*="door"]'));
    return {
      meetHeight: meet ? meet.offsetHeight : null,
      rangeHeight: range ? range.offsetHeight : null,
      doorCount: doors.length,
      doors: doors.slice(0, 10).map(d => ({
        w: d.offsetWidth,
        h: d.offsetHeight,
        margin: window.getComputedStyle(d).margin,
      }))
    };
  });

  const pageLoc = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLoc.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const locData = await pageLoc.evaluate(() => {
    const meet = document.querySelector('[class*="meetSection"]');
    const range = document.querySelector('[data-pin-range]') || meet?.firstElementChild;
    const doors = Array.from(document.querySelectorAll('[class*="doorCard"]'));
    return {
      meetHeight: meet ? meet.offsetHeight : null,
      rangeHeight: range ? range.offsetHeight : null,
      doorCount: doors.length,
      doors: doors.slice(0, 10).map(d => ({
        w: d.offsetWidth,
        h: d.offsetHeight,
      }))
    };
  });

  console.log('REF DOORS:', JSON.stringify(refData, null, 2));
  console.log('LOC DOORS:', JSON.stringify(locData, null, 2));
  await browser.close();
})();
