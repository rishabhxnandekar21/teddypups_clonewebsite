const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });

  const faqData = await page.evaluate(() => {
    const main = document.querySelector('main');
    const scene = document.querySelector('.tp-faqroom, [class*="faq"]');
    const notes = Array.from(document.querySelectorAll('.tp-note, [class*="note"], details, .faq-item')).map(el => ({
      tag: el.tagName,
      className: el.className,
      text: (el.innerText || '').slice(0, 100),
      html: el.outerHTML.slice(0, 250)
    }));
    return {
      title: document.title,
      mainHTML: main ? main.outerHTML.slice(0, 4000) : '',
      notesCount: notes.length,
      sampleNotes: notes.slice(0, 5)
    };
  });

  fs.writeFileSync('scratch/ref_faq_info.json', JSON.stringify(faqData, null, 2));
  if (faqData.mainHTML) {
    fs.writeFileSync('scratch/ref_faq_main.html', faqData.mainHTML);
  }
  console.log('FAQ title:', faqData.title);
  console.log('Notes count:', faqData.notesCount);
  console.log('Sample notes:', faqData.sampleNotes);
  await browser.close();
})();
