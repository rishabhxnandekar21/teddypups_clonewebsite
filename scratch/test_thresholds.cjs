const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  await page.addStyleTag({
    content: `
      [class*="chatStep"] {
        min-height: 360px !important;
      }
      [class*="chatStep"]:last-child {
        min-height: 440px !important;
        margin-bottom: 2rem !important;
      }
      [class*="journeySection"] {
        min-height: 1900px !important;
      }
    `
  });

  const journeyTop = await page.evaluate(() => {
    return document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY;
  });

  // Test active step with thresholds 320, 680
  for (const offset of [100, 300, 500, 700, 850, 1000]) {
    await page.evaluate(([t, o]) => window.scrollTo(0, t + o), [journeyTop, offset]);
    await page.waitForTimeout(50);

    const stepIdx = offset < 320 ? 0 : offset < 680 ? 1 : 2;

    const info = await page.evaluate((idx) => {
      const side = document.querySelector('[class*="chatSide"]');
      const r = side.getBoundingClientRect();
      const inView = r.top >= 0 && r.bottom <= window.innerHeight;
      return {
        sideTop: Math.round(r.top),
        sideBottom: Math.round(r.bottom),
        inView,
      };
    }, stepIdx);

    console.log(`offset +${offset}: Step ${stepIdx + 1} | phone top=${info.sideTop}, bottom=${info.sideBottom}, inViewport=${info.inView}`);
  }

  await browser.close();
}
main().catch(console.error);
