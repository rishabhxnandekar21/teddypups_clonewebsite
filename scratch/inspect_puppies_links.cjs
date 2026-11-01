const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const links = Array.from(document.querySelectorAll('a[href*="/puppies/"]')).map(a => ({
      href: a.getAttribute('href'),
      className: a.className,
      html: a.outerHTML.slice(0, 500)
    }));
    return {
      title: document.title,
      linksCount: links.length,
      links: links.slice(0, 5)
    };
  });

  console.log('REF PUPPIES PAGE LINKS:', JSON.stringify(data, null, 2));
  await browser.close();
})();
