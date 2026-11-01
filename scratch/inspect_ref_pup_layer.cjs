const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  const layer = await page.evaluate(() => {
    const el = document.querySelector('.pup-layer');
    if (!el) return 'No pup-layer';
    return {
      className: el.className,
      innerHTML: el.innerHTML.substring(0, 1500),
      children: Array.from(el.children).map(c => ({
        tag: c.tagName,
        class: c.className,
        style: c.getAttribute('style'),
      })),
      computedStyle: {
        position: getComputedStyle(el).position,
        inset: getComputedStyle(el).inset,
        zIndex: getComputedStyle(el).zIndex,
        pointerEvents: getComputedStyle(el).pointerEvents,
      }
    };
  });

  console.log('Ref PupLayer:', JSON.stringify(layer, null, 2));

  // Also check how pup-stops interact with pup-layer:
  // Is the actor in pup-layer? Or are pup-stops hidden/revealed?
  const stopsVisibility = await page.evaluate(() => {
    const stops = Array.from(document.querySelectorAll('.pup-stop'));
    return stops.map(s => ({
      class: s.className,
      opacity: getComputedStyle(s).opacity,
      visibility: getComputedStyle(s).visibility,
      display: getComputedStyle(s).display,
    }));
  });
  console.log('Stops visibility:', stopsVisibility);

  await browser.close();
}
main().catch(console.error);
