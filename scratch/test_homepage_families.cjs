const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const grid = document.querySelector('[class*="familiesGrid"]');
    const items = grid ? grid.children : [];
    const cta = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('See every happy family'));

    return {
      homepagePhotosCount: items.length,
      ctaFound: !!cta,
      ctaHref: cta?.getAttribute('href'),
      ctaText: cta?.textContent.trim(),
    };
  });

  console.log('Homepage Families Verification:', data);
  console.log('Console errors:', errors);

  await browser.close();
}
main().catch(console.error);
