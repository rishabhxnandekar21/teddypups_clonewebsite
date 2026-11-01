const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Add custom style override to test
  await page.addStyleTag({
    content: `
      [class*="chatStep"]:last-child {
        min-height: 480px !important;
        margin-bottom: 2rem !important;
      }
      [class*="journeySection"] {
        min-height: 1900px !important;
        padding-bottom: 8rem !important;
      }
    `
  });

  const journeyTop = await page.evaluate(() => {
    return document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY;
  });

  for (const offset of [0, 200, 450, 700, 900, 1100, 1300]) {
    await page.evaluate(([t, o]) => window.scrollTo(0, t + o), [journeyTop, offset]);
    await page.waitForTimeout(100);

    const info = await page.evaluate(() => {
      const side = document.querySelector('[class*="chatSide"]');
      const step = document.querySelector('li[class*="chatStep"][data-active="true"]');
      return {
        sideTop: Math.round(side?.getBoundingClientRect().top),
        activeStep: step?.querySelector('[class*="chatNum"]')?.textContent,
      };
    });
    console.log(`offset +${offset}: sideTop=${info.sideTop}, activeStep=${info.activeStep}`);
  }

  await browser.close();
}
main().catch(console.error);
