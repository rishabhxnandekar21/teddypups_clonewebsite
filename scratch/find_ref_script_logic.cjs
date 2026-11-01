const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  let scriptContent = '';
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('.js') && !url.includes('google') && !url.includes('clarity')) {
      try {
        const text = await res.text();
        if (text.includes('pup-actor') || text.includes('pup-stop') || text.includes('tp-basket')) {
          console.log('Found mascot logic in:', url);
          // extract relevant snippet
          const idx = text.indexOf('pup-stop');
          console.log('Snippet around pup-stop:');
          console.log(text.substring(Math.max(0, idx - 200), idx + 600));
        }
      } catch (e) {}
    }
  });

  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await browser.close();
}
main().catch(console.error);
