/**
 * Debug journey sticky behavior
 */
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  const journeyTop = await page.evaluate(() => {
    const s = document.querySelector('.tp-chat');
    return s ? s.getBoundingClientRect().top + window.scrollY : 0;
  });
  console.log('Journey section docTop:', journeyTop);

  // Scroll to different positions and log phone position
  for (const offset of [0, 200, 450, 700, 1000, 1200, 1500]) {
    await page.evaluate(([t, o]) => window.scrollTo(0, t + o), [journeyTop, offset]);
    await page.waitForTimeout(200);
    
    const info = await page.evaluate(() => {
      const section = document.querySelector('.tp-chat');
      const side = document.querySelector('[class*="chatSide"]');
      const phone = document.querySelector('[class*="phoneWrapper"]');
      
      const sRect = section ? section.getBoundingClientRect() : {};
      const sdRect = side ? side.getBoundingClientRect() : {};
      const pRect = phone ? phone.getBoundingClientRect() : {};
      const sdStyle = side ? window.getComputedStyle(side) : {};
      
      return {
        sectionTop: Math.round(sRect.top),
        sideTop: Math.round(sdRect.top),
        sidePos: sdStyle.position,
        phoneTop: Math.round(pRect.top),
        activeStep: document.querySelector('li[class*="chatStep"][data-active="true"]')?.querySelector('[class*="chatNum"]')?.textContent,
      };
    });
    console.log(`offset+${offset}: section.top=${info.sectionTop}, side.top=${info.sideTop} (${info.sidePos}), phone.top=${info.phoneTop}, step=${info.activeStep}`);
  }

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
