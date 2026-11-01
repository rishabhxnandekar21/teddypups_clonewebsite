const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  // Find all mascots on the page
  const mascots = await page.evaluate(() => {
    const buddies = Array.from(document.querySelectorAll('.pup-buddy, [class*="pup-buddy"], [data-pup-stop], [class*="meetTeddy"], [class*="forkTeddy"]'));
    return buddies.map(b => {
      const rect = b.getBoundingClientRect();
      const parent = b.closest('section, div[class*="tp-"]');
      return {
        tag: b.tagName,
        class: b.className,
        rect: { top: Math.round(rect.top + window.scrollY), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
        parentClass: parent?.className,
        pose: b.getAttribute('data-pose'),
        facing: b.getAttribute('data-facing'),
      };
    });
  });
  console.log('Reference mascots on page:', JSON.stringify(mascots, null, 2));

  // Also check if reference has a fixed layer or if they are all section-local!
  const hasFixedLayer = await page.evaluate(() => {
    const fixed = Array.from(document.querySelectorAll('*')).filter(el => {
      const s = getComputedStyle(el);
      return s.position === 'fixed' && el.querySelector('svg');
    });
    return fixed.map(el => ({ tag: el.tagName, class: el.className, zIndex: getComputedStyle(el).zIndex }));
  });
  console.log('Fixed layers with SVGs:', hasFixedLayer);

  await browser.close();
}
main().catch(console.error);
