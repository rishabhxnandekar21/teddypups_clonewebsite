const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });

  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const dir = path.join(__dirname, 'current_eval');
  const fs = require('fs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. HERO
  await refPage.evaluate(() => window.scrollTo(0, 0));
  await locPage.evaluate(() => window.scrollTo(0, 0));
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(dir, '01_hero_ref.png') });
  await locPage.screenshot({ path: path.join(dir, '01_hero_loc.png') });

  // 2. DOORS (Meet the pups)
  // Let's scroll so Meet the pups heading is at top (scrollY ~ 860 on ref, ~ 860 on loc)
  await refPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) window.scrollTo(0, window.scrollY + h2.getBoundingClientRect().top - 40);
  });
  await locPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (h2) window.scrollTo(0, window.scrollY + h2.getBoundingClientRect().top - 40);
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(dir, '02_doors_ref.png') });
  await locPage.screenshot({ path: path.join(dir, '02_doors_loc.png') });

  // 3. FAQ
  await refPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => /Questions.*answered/i.test(h.innerText));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await locPage.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('h2')).find(h => /Questions.*answered/i.test(h.innerText));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);
  await refPage.screenshot({ path: path.join(dir, '03_faq_ref.png') });
  await locPage.screenshot({ path: path.join(dir, '03_faq_loc.png') });

  await browser.close();
  console.log('Comparison screenshots saved in current_eval!');
})();
