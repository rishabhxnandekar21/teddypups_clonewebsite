const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  const css = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat');
    const steps = chat.querySelector('ol');
    const step = steps.querySelector('li');
    const side = chat.querySelector('.tp-chat__side');
    const grid = chat.querySelector('.tp-chat__grid');

    const getRules = (el) => {
      const s = getComputedStyle(el);
      return {
        display: s.display,
        minHeight: s.minHeight,
        height: s.height,
        gap: s.gap,
        padding: s.padding,
        margin: s.margin,
        position: s.position,
        alignSelf: s.alignSelf,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
      };
    };

    return {
      gridClass: grid.className,
      grid: getRules(grid),
      stepsClass: steps.className,
      steps: getRules(steps),
      stepClass: step.className,
      step: getRules(step),
      sideClass: side.className,
      side: getRules(side),
      stepHtml: step.outerHTML.substring(0, 300),
      stepsHtml: steps.outerHTML.substring(0, 500)
    };
  });

  console.log('Ref CSS Details:', JSON.stringify(css, null, 2));
  await browser.close();
}
main().catch(console.error);
