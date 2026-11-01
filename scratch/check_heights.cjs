const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const heights = await page.evaluate(() => {
    const section = document.querySelector('.tp-chat');
    const grid = document.querySelector('[class*="chatGrid"]');
    const story = document.querySelector('[class*="chatStory"]');
    const side = document.querySelector('[class*="chatSide"]');
    const phone = document.querySelector('[class*="phoneWrapper"]');
    return {
      sectionHeight: section?.offsetHeight,
      gridHeight: grid?.offsetHeight,
      storyHeight: story?.offsetHeight,
      sideHeight: side?.offsetHeight,
      phoneHeight: phone?.offsetHeight,
    };
  });
  console.log('Heights:', heights);
  await browser.close();
}
main().catch(console.error);
