const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  const stops = await page.evaluate(() => {
    // Let's get the stop elements directly
    const dusk = document.querySelector('.tp-dusk, [class*="familiesSection"]');
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    const cta = document.querySelector('.tp-home, [class*="homeSection"]');
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    return {
      docH,
      duskTop: dusk ? dusk.getBoundingClientRect().top + window.scrollY : null,
      faqTop: faq ? faq.getBoundingClientRect().top + window.scrollY : null,
      ctaTop: cta ? cta.getBoundingClientRect().top + window.scrollY : null,
      fDusk: (dusk.getBoundingClientRect().top + window.scrollY) / docH,
      fFaq: (faq.getBoundingClientRect().top + window.scrollY) / docH,
      fCta: (cta.getBoundingClientRect().top + window.scrollY) / docH,
    };
  });

  console.log('MEASURED SECTION FRACTIONS:', stops);
  await browser.close();
})();
