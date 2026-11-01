const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const sections = await page.evaluate(() => {
    const list = [
      { id: 'hero', sel: '[class*="hero"], .tp-hero' },
      { id: 'meet', sel: '.tp-meet, [class*="meetSection"]' },
      { id: 'paths', sel: '.tp-paths, [class*="paths"]' },
      { id: 'chat', sel: '.tp-chat, [class*="journeySection"]' },
      { id: 'trust', sel: '[class*="trustSection"]' },
      { id: 'dusk', sel: '.tp-dusk, [class*="familiesSection"]' },
      { id: 'faq', sel: '[class*="faqSection"]' },
      { id: 'cta', sel: '[class*="ctaSection"]' },
      { id: 'footer', sel: 'footer' },
    ];

    const scrollH = document.documentElement.scrollHeight - window.innerHeight;

    return list.map(item => {
      const el = document.querySelector(item.sel);
      if (!el) return { id: item.id, found: false };
      const r = el.getBoundingClientRect();
      const docTop = r.top + window.scrollY;
      const docBottom = docTop + r.height;
      return {
        id: item.id,
        found: true,
        docTop: Math.round(docTop),
        docBottom: Math.round(docBottom),
        height: Math.round(r.height),
        startFrac: +(docTop / scrollH).toFixed(3),
        endFrac: +(docBottom / scrollH).toFixed(3),
      };
    });
  });

  console.log('Document sections:', JSON.stringify(sections, null, 2));
  await browser.close();
}
main().catch(console.error);
