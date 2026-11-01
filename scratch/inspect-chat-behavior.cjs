const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const styles = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat');
    const grid = chat.querySelector('.tp-chat__grid');
    const story = chat.querySelector('.tp-chat__story');
    const phone = chat.querySelector('.tp-phone');
    const screen = chat.querySelector('.tp-phone__screen');
    const steps = chat.querySelector('.tp-chat__steps');
    const step = chat.querySelector('.tp-chat__step');

    const getStyles = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        position: cs.position,
        top: cs.top,
        height: cs.height,
        width: cs.width,
        display: cs.display,
        flexDirection: cs.flexDirection,
        gridTemplateColumns: cs.gridTemplateColumns,
        gap: cs.gap,
        padding: cs.padding,
        margin: cs.margin,
        transform: cs.transform
      };
    };

    return {
      chat: getStyles(chat),
      grid: getStyles(grid),
      story: getStyles(story),
      phone: getStyles(phone),
      screen: getStyles(screen),
      steps: getStyles(steps),
      step: getStyles(step)
    };
  });

  console.log('Reference Chat Computed Styles:', JSON.stringify(styles, null, 2));

  // Let's also inspect how the phone messages become visible
  // When scrolling, how does data-show or visibility change on tp-msg-group?
  const chatY = await page.evaluate(() => document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY);
  
  for (const offset of [100, 400, 800, 1200, 1500]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), chatY + offset);
    await page.waitForTimeout(200);

    const msgState = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('.tp-msg-group'));
      const activeStep = document.querySelector('.tp-chat__step[data-active="true"]');
      return {
        offset: window.scrollY,
        groups: groups.map(g => ({
          step: g.getAttribute('data-step'),
          show: g.getAttribute('data-show'),
          style: g.getAttribute('style')
        })),
        activeStepText: activeStep ? activeStep.querySelector('h3')?.textContent : null
      };
    });
    console.log(`Scroll offset ${offset}:`, msgState);
  }

  await browser.close();
})();
