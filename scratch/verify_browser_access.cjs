const { chromium } = require('playwright');

async function main() {
  console.log('Testing independent browser contexts on 1440x900...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // Context 1: Reference
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const refPage = await refContext.newPage();

  const refErrors = [];
  refPage.on('console', msg => { if (msg.type() === 'error') refErrors.push(msg.text()); });
  refPage.on('pageerror', err => refErrors.push(err.message));

  const refRes = await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  const refTitle = await refPage.title();
  const refScrollH = await refPage.evaluate(() => document.documentElement.scrollHeight);

  console.log('Reference status:', refRes?.status(), 'Title:', refTitle, 'ScrollHeight:', refScrollH, 'Console errors:', refErrors.length);

  // Context 2: Local on 5174
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locPage = await locContext.newPage();

  const locErrors = [];
  locPage.on('console', msg => { if (msg.type() === 'error') locErrors.push(msg.text()); });
  locPage.on('pageerror', err => locErrors.push(err.message));

  let locRes = null;
  let locPort = 5174;
  try {
    locRes = await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 10000 });
  } catch (e) {
    console.log('Failed to connect to 5174:', e.message);
  }

  const locTitle = await locPage.title();
  const locScrollH = await locPage.evaluate(() => document.documentElement.scrollHeight);

  console.log('Local (5174) status:', locRes?.status(), 'Title:', locTitle, 'ScrollHeight:', locScrollH, 'Console errors:', locErrors.length);

  await browser.close();
}

main().catch(err => {
  console.error('Browser access error:', err);
  process.exit(1);
});
