const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });
  
  const galleryInfo = await page.evaluate(() => {
    const col7 = document.querySelector('.min-w-0.lg\\:col-span-7');
    return col7 ? col7.innerHTML : '';
  });
  
  console.log('--- Col 7 Gallery HTML ---\n', galleryInfo);
  
  await browser.close();
})();
