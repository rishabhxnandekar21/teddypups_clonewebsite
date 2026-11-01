const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const meetInfo = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    if (!meet) return 'tp-meet not found';

    // Find all door cards
    const doorCards = Array.from(meet.querySelectorAll('.tp-door, [class*="door"]'));
    
    // Also look at the direct children of the doors track
    const track = meet.querySelector('.tp-doors, [class*="track"], [class*="grid"], [class*="doors"]');
    const trackChildren = track ? Array.from(track.children) : [];

    return {
      meetClass: meet.className,
      trackClass: track ? track.className : null,
      trackChildrenCount: trackChildren.length,
      trackChildren: trackChildren.map((c, i) => {
        const h3 = c.querySelector('h3, .tp-door__name');
        const breed = c.querySelector('p, .tp-door__breed');
        const num = c.querySelector('.tp-door__num');
        const img = c.querySelector('img');
        const links = Array.from(c.querySelectorAll('a')).map(a => a.href);
        return {
          idx: i + 1,
          tag: c.tagName,
          className: c.className,
          num: num ? num.textContent.trim() : null,
          name: h3 ? h3.textContent.trim() : null,
          breed: breed ? breed.textContent.trim() : null,
          imgSrc: img ? img.getAttribute('src') || img.src : null,
          links,
        };
      })
    };
  });

  console.log('Reference Meet Doors Info:', JSON.stringify(meetInfo, null, 2));

  await browser.close();
})();
