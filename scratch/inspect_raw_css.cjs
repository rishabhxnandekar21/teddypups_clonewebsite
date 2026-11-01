const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  const rawCss = await page.evaluate(() => {
    const el = document.querySelector('.tp-chat__step');
    const steps = document.querySelector('.tp-chat__steps');
    const grid = document.querySelector('.tp-chat__grid');
    const side = document.querySelector('.tp-chat__side');
    
    // Check classes or inline styles
    return {
      stepClasses: el?.className,
      stepsClasses: steps?.className,
      gridClasses: grid?.className,
      sideClasses: side?.className,
      // matched CSS rules if possible
      stepStyles: {
        minHeight: getComputedStyle(el).minHeight,
        height: getComputedStyle(el).height,
        paddingBottom: getComputedStyle(el).paddingBottom,
        display: getComputedStyle(el).display,
        gridTemplateColumns: getComputedStyle(el).gridTemplateColumns,
      },
      gridStyles: {
        gridTemplateColumns: getComputedStyle(grid).gridTemplateColumns,
        gap: getComputedStyle(grid).gap,
      }
    };
  });

  console.log('Raw CSS:', JSON.stringify(rawCss, null, 2));
  await browser.close();
}
main().catch(console.error);
