const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const journeyTop = await page.evaluate(() => {
    return document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY;
  });

  console.log('Journey section docTop:', journeyTop);

  for (const offset of [0, 200, 400, 600, 800, 950, 1100, 1300]) {
    await page.evaluate(([t, o]) => window.scrollTo(0, t + o), [journeyTop, offset]);
    await page.waitForTimeout(100);

    const info = await page.evaluate(() => {
      const side = document.querySelector('[class*="chatSide"]');
      const step = document.querySelector('li[class*="chatStep"][data-active="true"]');
      const r = side.getBoundingClientRect();
      const inView = r.top >= 0 && r.bottom <= window.innerHeight;
      return {
        sideTop: Math.round(r.top),
        sideBottom: Math.round(r.bottom),
        inView,
        activeStep: step?.querySelector('[class*="chatNum"]')?.textContent,
      };
    });
    console.log(`offset +${offset}: Step ${info.activeStep} | phone top=${info.sideTop}, bottom=${info.sideBottom}, inViewport=${info.inView}`);
  }

  await browser.close();
}
main().catch(console.error);
