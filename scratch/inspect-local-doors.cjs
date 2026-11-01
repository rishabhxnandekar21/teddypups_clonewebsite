const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const localMeetInfo = await page.evaluate(() => {
    // Find doors track
    const doors = Array.from(document.querySelectorAll('[class*="doorsGrid"] > *'));
    return doors.map((d, i) => {
      const h3 = d.querySelector('h3, [class*="name"]');
      const breed = d.querySelector('p, [class*="breed"]');
      const num = d.querySelector('[class*="num"], [class*="number"]');
      const img = d.querySelector('img');
      const links = Array.from(d.querySelectorAll('a')).map(a => a.href);
      return {
        idx: i + 1,
        tag: d.tagName,
        className: d.className,
        name: h3 ? h3.textContent.trim() : null,
        breed: breed ? breed.textContent.trim() : null,
        imgSrc: img ? img.getAttribute('src') : null,
        links,
      };
    });
  });

  console.log('Local Meet Doors Info:', JSON.stringify(localMeetInfo, null, 2));

  await browser.close();
})();
