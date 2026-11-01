const { chromium } = require('playwright');
const fs = require('fs');

async function dump3Pages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. HOW IT WORKS
  console.log('Dumping /how-it-works...');
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });
  const howData = await page.evaluate(() => {
    return {
      mainHtml: document.querySelector('main')?.innerHTML || document.body.innerHTML,
      sections: Array.from(document.querySelectorAll('section')).map(s => ({
        id: s.id,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText,
        htmlSnippet: s.outerHTML.slice(0, 500)
      }))
    };
  });
  fs.writeFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\ref_how_it_works.json', JSON.stringify(howData, null, 2));

  // 2. FAQ
  console.log('Dumping /faq...');
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  const faqData = await page.evaluate(() => {
    return {
      mainHtml: document.querySelector('main')?.innerHTML || document.body.innerHTML,
      faqs: Array.from(document.querySelectorAll('details, [class*="faq-item"], [class*="note"], [class*="card"]')).map(el => ({
        className: el.className,
        q: el.querySelector('summary, h3, h4, button')?.innerText,
        a: el.querySelector('p, dd, [class*="answer"]')?.innerText
      })),
      sections: Array.from(document.querySelectorAll('section')).map(s => ({
        id: s.id,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText,
        htmlSnippet: s.outerHTML.slice(0, 500)
      }))
    };
  });
  fs.writeFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\ref_faq_page.json', JSON.stringify(faqData, null, 2));

  // 3. CONTACT
  console.log('Dumping /contact...');
  await page.goto('https://puppy.instabizweb.com/contact', { waitUntil: 'networkidle' });
  const contactData = await page.evaluate(() => {
    return {
      mainHtml: document.querySelector('main')?.innerHTML || document.body.innerHTML,
      sections: Array.from(document.querySelectorAll('section')).map(s => ({
        id: s.id,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText,
        htmlSnippet: s.outerHTML.slice(0, 500)
      }))
    };
  });
  fs.writeFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\ref_contact_page.json', JSON.stringify(contactData, null, 2));

  await browser.close();
  console.log('Done dumping 3 pages!');
}

dump3Pages().catch(console.error);
