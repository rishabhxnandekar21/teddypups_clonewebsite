const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await locPage.waitForTimeout(1000);

  const chatY = await locPage.evaluate(() => {
    const el = document.querySelector('.tp-chat, [class*="journeySection"]');
    return el.getBoundingClientRect().top + window.scrollY;
  });
  console.log('chatY:', chatY);

  await locPage.evaluate(y => window.scrollTo({ top: y + 100, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const s0 = await locPage.evaluate(() => {
    const el = document.querySelector('[class*="chatStep"]:nth-child(1)');
    const g0 = document.querySelector('[data-step="0"]');
    const sec = document.querySelector('[class*="journeySection"]');
    return {
      rectTop: sec.getBoundingClientRect().top,
      active: el ? el.getAttribute('data-active') : null,
      g0Show: g0 ? g0.getAttribute('data-show') : null
    };
  });
  console.log('At +100:', s0);

  await locPage.evaluate(y => window.scrollTo({ top: y + 700, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const s1 = await locPage.evaluate(() => {
    const el = document.querySelector('[class*="chatStep"]:nth-child(2)');
    const g1 = document.querySelector('[data-step="1"]');
    const sec = document.querySelector('[class*="journeySection"]');
    return {
      rectTop: sec.getBoundingClientRect().top,
      active: el ? el.getAttribute('data-active') : null,
      g1Show: g1 ? g1.getAttribute('data-show') : null
    };
  });
  console.log('At +700:', s1);

  await locPage.evaluate(y => window.scrollTo({ top: y + 1300, behavior: 'instant' }), chatY);
  await locPage.waitForTimeout(300);
  const s2 = await locPage.evaluate(() => {
    const el = document.querySelector('[class*="chatStep"]:nth-child(3)');
    const g2 = document.querySelector('[data-step="2"]');
    const sec = document.querySelector('[class*="journeySection"]');
    return {
      rectTop: sec.getBoundingClientRect().top,
      active: el ? el.getAttribute('data-active') : null,
      g2Show: g2 ? g2.getAttribute('data-show') : null
    };
  });
  console.log('At +1300:', s2);

  await browser.close();
})();
