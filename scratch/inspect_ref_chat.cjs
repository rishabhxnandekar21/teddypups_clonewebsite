const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });

  const refInfo = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat');
    if (!chat) return 'No .tp-chat found';
    
    // Find grid, story, phone, steps
    const children = Array.from(chat.children);
    const story = chat.querySelector('[class*="story"], [class*="chatStory"], ol, ul');
    const phone = chat.querySelector('[class*="phone"]');
    const phoneParent = phone?.parentElement;
    
    // Check computed styles and structure
    return {
      chatTag: chat.tagName,
      chatClass: chat.className,
      chatHeight: chat.offsetHeight,
      chatStyle: {
        display: getComputedStyle(chat).display,
        position: getComputedStyle(chat).position,
        padding: getComputedStyle(chat).padding,
      },
      children: children.map(c => ({
        tag: c.tagName,
        class: c.className,
        height: c.offsetHeight,
        style: {
          display: getComputedStyle(c).display,
          position: getComputedStyle(c).position,
          height: getComputedStyle(c).height,
          alignItems: getComputedStyle(c).alignItems,
        }
      })),
      phoneParent: phoneParent ? {
        tag: phoneParent.tagName,
        class: phoneParent.className,
        height: phoneParent.offsetHeight,
        style: {
          position: getComputedStyle(phoneParent).position,
          top: getComputedStyle(phoneParent).top,
        }
      } : null,
      steps: Array.from(chat.querySelectorAll('li')).map(li => ({
        text: li.innerText.substring(0, 40),
        height: li.offsetHeight,
        margin: getComputedStyle(li).margin,
        padding: getComputedStyle(li).padding,
      })),
      olStyle: {
        display: getComputedStyle(chat.querySelector('ol') || chat).display,
        gap: getComputedStyle(chat.querySelector('ol') || chat).gap,
      }
    };
  });

  console.log('Ref Chat Info:', JSON.stringify(refInfo, null, 2));
  await browser.close();
}
main().catch(console.error);
