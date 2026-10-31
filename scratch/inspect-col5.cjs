const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://puppy.instabizweb.com/puppies/maltipoo-max-male', { waitUntil: 'networkidle' });
  const col5Available = await page.evaluate(() => {
    const col5 = document.querySelector('.lg\\:col-span-5');
    return col5 ? col5.innerHTML : '';
  });
  
  await page.goto('https://puppy.instabizweb.com/puppies/pomeranian-ace-boy', { waitUntil: 'networkidle' });
  const col5Alumni = await page.evaluate(() => {
    const col5 = document.querySelector('.lg\\:col-span-5');
    return col5 ? col5.innerHTML : '';
  });
  
  console.log('--- Col 5 Available ---\n', col5Available.slice(0, 1500));
  console.log('\n--- Col 5 Alumni ---\n', col5Alumni.slice(0, 1500));
  
  await browser.close();
})();
