const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Navigate to puppies page
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });
  
  // Find links
  const links = await page.$$eval('a', els => els.map(e => e.href).filter(h => h.includes('/puppies/') || h.includes('/puppy/')));
  console.log('Sample detail links:', links.slice(0, 5));
  
  if (links.length > 0) {
    await page.goto(links[0], { waitUntil: 'networkidle' });
    console.log('Detail page URL:', page.url());
    const info = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText;
      const breadcrumbs = Array.from(document.querySelectorAll('nav, [class*="breadcrumb"], [class*="Breadcrumb"]')).map(n => n.innerText);
      const galleryButtons = Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.innerText,
        ariaLabel: b.getAttribute('aria-label'),
        className: b.className
      }));
      const images = Array.from(document.querySelectorAll('img')).map(i => ({
        src: i.src,
        alt: i.alt,
        className: i.className,
        width: i.width,
        height: i.height
      }));
      return { h1, breadcrumbs, galleryButtons, imagesCount: images.length, sampleImages: images.slice(0, 8) };
    });
    console.log('Page info:', JSON.stringify(info, null, 2));
  }
  
  // Also check an alumni link if there is one
  const goneHomeLink = links.find(l => l.includes('ace') || l.includes('leo') || l.includes('mia') || l.includes('sadie') || l.includes('marle'));
  if (goneHomeLink) {
    await page.goto(goneHomeLink, { waitUntil: 'networkidle' });
    console.log('Alumni page URL:', page.url());
    const alumniInfo = await page.evaluate(() => {
      return {
        h1: document.querySelector('h1')?.innerText,
        breadcrumbs: Array.from(document.querySelectorAll('nav, [class*="breadcrumb"], [class*="Breadcrumb"]')).map(n => n.innerText),
        bodySnippet: document.body.innerText.slice(0, 500)
      };
    });
    console.log('Alumni page info:', JSON.stringify(alumniInfo, null, 2));
  }

  await browser.close();
})();
