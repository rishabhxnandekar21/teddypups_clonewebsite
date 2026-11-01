const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Find a valid puppy link from /puppies
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });
  const puppyLink = await page.evaluate(() => {
    const a = document.querySelector('a[href^="/puppies/"]');
    return a ? a.href : null;
  });
  console.log('Puppy link:', puppyLink);

  if (puppyLink) {
    await page.goto(puppyLink, { waitUntil: 'networkidle' });
    const detail = await page.evaluate(() => {
      const main = document.querySelector('main');
      const ribbon = document.querySelector('.tp-ribbon, [class*="ribbon"]');
      const hero = document.querySelector('.tp-pup-hero, [class*="hero"]');
      return {
        title: document.title,
        ribbonHTML: ribbon ? ribbon.outerHTML : null,
        heroHTML: hero ? hero.outerHTML.slice(0, 1000) : null,
        heroStyle: hero ? hero.getAttribute('style') : null
      };
    });
    console.log('Puppy detail info:', JSON.stringify(detail, null, 2));

    const mainHTML = await page.evaluate(() => document.querySelector('main')?.outerHTML || '');
    fs.writeFileSync('scratch/ref_puppy_detail.html', mainHTML);
  }

  await browser.close();
})();
