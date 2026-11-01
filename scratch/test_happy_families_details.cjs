const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173/happy-families', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const wall = document.querySelector('.tp-wall');
    const items = wall ? wall.querySelectorAll('li') : [];
    const foot = document.querySelector('.tp-memories__foot');
    const mascot = foot ? foot.querySelector('svg') : null;
    const tagline = foot ? foot.querySelector('p') : null;

    return {
      polaroidCount: items.length,
      footFound: !!foot,
      mascotFound: !!mascot,
      taglineText: tagline?.textContent.trim(),
    };
  });

  console.log('Happy Families Page Verification:', data);
  console.log('Console errors:', errors);

  await browser.close();
}
main().catch(console.error);
