const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. FAQ Star Count & exact markup
  const faqData = await page.evaluate(() => {
    const stars = Array.from(document.querySelectorAll('.tp-twinkle, [class*="twinkle"], [class*="star"]'));
    return {
      starCount: stars.length,
      stars: stars.map(s => ({
        tag: s.tagName,
        className: s.className.baseVal || s.className,
        style: s.getAttribute('style'),
        outerHTML: s.outerHTML.slice(0, 300)
      }))
    };
  });
  console.log('=== LIVE REFERENCE FAQ STARS ===');
  console.log('Total stars:', faqData.starCount);
  faqData.stars.forEach((s, i) => console.log(`Star ${i}: style="${s.style}" class="${s.className}"`));

  // 2. Passport Trust Claims on Homepage
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const passportData = await page.evaluate(() => {
    const section = document.querySelector('.tp-passport, [class*="passport"]');
    if (!section) return null;
    const kicker = section.querySelector('.tp-book__kicker, [class*="kicker"]')?.textContent;
    const title = section.querySelector('.tp-book__title, h2')?.textContent;
    const body = section.querySelector('.tp-book__body, p')?.textContent;
    const stamps = Array.from(section.querySelectorAll('.tp-stamp, [class*="stamp"]')).map(st => ({
      className: st.className,
      style: st.getAttribute('style'),
      text: st.textContent.trim(),
      html: st.innerHTML.slice(0, 300)
    }));
    return { kicker, title, body, stampsCount: stamps.length, stamps };
  });
  console.log('\n=== LIVE REFERENCE PASSPORT CLAIMS ===');
  console.log('Kicker:', passportData?.kicker);
  console.log('Title:', passportData?.title);
  console.log('Body:', passportData?.body);
  console.log('Stamps count:', passportData?.stampsCount);
  passportData?.stamps.forEach((st, i) => console.log(`Stamp ${i}: text="${st.text}" style="${st.style}" class="${st.className}"`));

  // 3. Contact Form & WhatsApp Submission on /contact
  await page.goto('https://puppy.instabizweb.com/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const contactData = await page.evaluate(() => {
    const form = document.querySelector('.tp-letterform, form');
    const inputs = Array.from(form ? form.querySelectorAll('input, select, textarea') : []).map(inp => ({
      name: inp.getAttribute('name'),
      type: inp.getAttribute('type'),
      placeholder: inp.getAttribute('placeholder'),
      required: inp.hasAttribute('required')
    }));
    const button = form?.querySelector('button[type="submit"]')?.textContent.trim();
    const stamp = form?.querySelector('.tp-letter__stamp')?.outerHTML.slice(0, 150);
    return { inputs, button, stamp };
  });
  console.log('\n=== LIVE REFERENCE CONTACT FORM ===');
  console.log('Inputs:', contactData?.inputs);
  console.log('Button:', contactData?.button);

  await browser.close();
})();
