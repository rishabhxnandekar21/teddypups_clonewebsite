const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  // Scroll through the chat section and observe step changes
  const chatTop = await page.evaluate(() => {
    return document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY;
  });

  console.log('chatTop:', chatTop);

  for (const offset of [0, 200, 400, 600, 800, 1000, 1200, 1400]) {
    await page.evaluate(([t, o]) => window.scrollTo(0, t + o), [chatTop, offset]);
    await page.waitForTimeout(300);

    const stepState = await page.evaluate(() => {
      const chat = document.querySelector('.tp-chat');
      const steps = Array.from(chat.querySelectorAll('.tp-chat__step'));
      const phone = chat.querySelector('.tp-phone, [class*="phone"]');
      const side = chat.querySelector('.tp-chat__side');
      const sideRect = side.getBoundingClientRect();
      return {
        sideTop: Math.round(sideRect.top),
        steps: steps.map((s, i) => ({
          idx: i + 1,
          classes: s.className,
          active: s.getAttribute('data-active'),
          done: s.getAttribute('data-done'),
          ariaSelected: s.getAttribute('aria-selected'),
          rectTop: Math.round(s.getBoundingClientRect().top),
        })),
        phoneText: phone?.innerText.substring(0, 50),
      };
    });
    console.log(`offset +${offset}: sideTop=${stepState.sideTop}`, JSON.stringify(stepState.steps));
  }

  await browser.close();
}
main().catch(console.error);
