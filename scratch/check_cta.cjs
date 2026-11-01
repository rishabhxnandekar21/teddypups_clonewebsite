const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const cta = await page.evaluate(() => {
    // Find link with text "See every happy family"
    const links = Array.from(document.querySelectorAll('a'));
    const link = links.find(a => a.textContent.includes('See every happy family'));
    return {
      found: !!link,
      href: link?.getAttribute('href'),
      text: link?.textContent.trim(),
      parentClass: link?.parentElement.className,
      className: link?.className,
    };
  });

  console.log('CTA Link Details:', cta);
  await browser.close();
}
main().catch(console.error);
