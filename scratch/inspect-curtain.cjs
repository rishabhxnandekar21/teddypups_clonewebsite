const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'commit' });
  
  const states = [];
  for (let i = 0; i < 12; i++) {
    const s = await page.evaluate(() => {
      const curtain = document.querySelector('.tp-curtain, [class*="curtain"]');
      if (!curtain) return null;
      return {
        className: curtain.className,
        state: curtain.getAttribute('data-state'),
        visibility: getComputedStyle(curtain).visibility,
        pointerEvents: getComputedStyle(curtain).pointerEvents,
        transform: getComputedStyle(curtain).transform
      };
    });
    states.push({ ms: i * 200, s });
    await page.waitForTimeout(200);
  }
  console.log('Curtain progression on load:\n', JSON.stringify(states, null, 2));

  // Now click on a nav link to 'Puppies' and see if curtain triggers
  console.log('\nClicking Puppies nav link...');
  const navPuppies = await page.$('nav a[href*="/puppies"]');
  if (navPuppies) {
    await navPuppies.click();
    for (let i = 0; i < 6; i++) {
      const s = await page.evaluate(() => {
        const curtain = document.querySelector('.tp-curtain, [class*="curtain"]');
        return curtain ? curtain.getAttribute('data-state') : null;
      });
      console.log(`+${i * 150}ms after route click, curtain state:`, s);
      await page.waitForTimeout(150);
    }
  }

  await browser.close();
})();
