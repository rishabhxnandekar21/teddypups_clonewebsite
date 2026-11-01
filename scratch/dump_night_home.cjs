const { chromium } = require('playwright');
const fs = require('fs');

async function dumpSections() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const refData = await refPage.evaluate(() => {
    const night = document.querySelector('.tp-night');
    const home = document.querySelector('.tp-home');
    return {
      nightHtml: night ? night.innerHTML : null,
      nightStyle: night ? getComputedStyle(night).cssText : null,
      homeHtml: home ? home.innerHTML : null,
    };
  });

  fs.writeFileSync('scratch/ref_night_html.html', refData.nightHtml || '');
  fs.writeFileSync('scratch/ref_home_html.html', refData.homeHtml || '');
  console.log('Saved ref_night_html.html and ref_home_html.html');

  await browser.close();
}

dumpSections().catch(console.error);
