const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const chatDetails = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat');
    if (!chat) return 'tp-chat not found';

    const grid = chat.querySelector('.tp-chat__grid');
    const phone = chat.querySelector('.tp-chat__phone, [class*="phone"], [class*="mockup"]');
    const steps = Array.from(chat.querySelectorAll('.tp-chat__step, [class*="step"]'));
    const msgs = Array.from(chat.querySelectorAll('[class*="msg"], [class*="bubble"]'));

    return {
      chatClass: chat.className,
      chatHeight: chat.offsetHeight,
      chatStyle: chat.getAttribute('style'),
      gridStyle: grid ? window.getComputedStyle(grid).position : null,
      gridHeight: grid ? grid.offsetHeight : null,
      phoneHTML: phone ? phone.outerHTML : null,
      stepsCount: steps.length,
      steps: steps.map(s => ({
        tag: s.tagName,
        className: s.className,
        text: s.textContent.trim().substring(0, 80)
      })),
      msgsCount: msgs.length,
      msgs: msgs.map(m => ({
        className: m.className,
        text: m.textContent.trim()
      }))
    };
  });

  console.log('Reference Chat Details:', JSON.stringify(chatDetails, null, 2));

  // Now scroll through the chat section and observe classes/data attributes/step changes
  const chatY = await page.evaluate(() => {
    const c = document.querySelector('.tp-chat');
    return c.getBoundingClientRect().top + window.scrollY;
  });

  console.log('Chat Y:', chatY);

  for (const offset of [0, 400, 800, 1200, 1600]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), chatY + offset);
    await page.waitForTimeout(200);

    const stepState = await page.evaluate(() => {
      const chat = document.querySelector('.tp-chat');
      const activeStep = chat.querySelector('[data-active="true"], [class*="active"]');
      const activeMsgs = Array.from(chat.querySelectorAll('[data-visible="true"], [class*="visible"]'));
      return {
        scrollY: window.scrollY,
        activeStepText: activeStep ? activeStep.textContent.substring(0, 40) : null,
        activeStepClass: activeStep ? activeStep.className : null,
        activeMsgsCount: activeMsgs.length
      };
    });
    console.log(`Scroll offset ${offset}:`, stepState);
  }

  // Dump full outerHTML of tp-chat
  const chatHTML = await page.evaluate(() => document.querySelector('.tp-chat').outerHTML);
  fs.writeFileSync('scratch/ref_chat_full.html', chatHTML);
  console.log('Saved ref_chat_full.html, size:', chatHTML.length);

  await browser.close();
})();
