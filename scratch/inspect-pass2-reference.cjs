const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Inspect Reference How It Works
  console.log('Inspecting https://puppy.instabizweb.com/how-it-works ...');
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const hiwInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const sections = Array.from(main.querySelectorAll('section, [class*="section"], [class*="scene"]'));
    return {
      title: document.title,
      sectionCount: sections.length,
      sections: sections.map((s, i) => ({
        index: i,
        tag: s.tagName,
        className: s.className,
        id: s.id,
        height: s.offsetHeight,
        innerHTML: s.innerHTML.substring(0, 300)
      }))
    };
  });
  console.log('Reference HIW Sections:', JSON.stringify(hiwInfo, null, 2));

  // 2. Inspect Reference Homepage Journey (tp-chat)
  console.log('\nInspecting https://puppy.instabizweb.com/ (Home tp-chat & tp-dusk)...');
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const chatInfo = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat, [class*="chat"]');
    if (!chat) return 'Chat section not found';
    return {
      className: chat.className,
      offsetHeight: chat.offsetHeight,
      scrollHeight: chat.scrollHeight,
      rect: chat.getBoundingClientRect(),
      attrs: Array.from(chat.attributes).map(a => `${a.name}="${a.value}"`).join(' '),
      children: Array.from(chat.children).map(c => ({
        tag: c.tagName,
        className: c.className,
        style: c.getAttribute('style'),
        height: c.offsetHeight
      })),
      html: chat.outerHTML.substring(0, 1500)
    };
  });
  console.log('Reference Home Chat Info:', JSON.stringify(chatInfo, null, 2));

  // 3. Inspect Reference Homepage Dusk (tp-dusk)
  const duskInfo = await page.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk, [class*="dusk"]');
    if (!dusk) return 'Dusk section not found';
    const imgs = Array.from(dusk.querySelectorAll('img'));
    const polaroids = Array.from(dusk.querySelectorAll('[class*="polaroid"], .tp-polaroid, figure, li'));
    return {
      className: dusk.className,
      offsetHeight: dusk.offsetHeight,
      rect: dusk.getBoundingClientRect(),
      imgsCount: imgs.length,
      imgSrcs: imgs.map(img => img.getAttribute('src') || img.src),
      polaroidsCount: polaroids.length,
      polaroids: polaroids.slice(0, 10).map(p => ({
        tag: p.tagName,
        className: p.className,
        style: p.getAttribute('style'),
        innerHTML: p.innerHTML.substring(0, 150)
      })),
      html: dusk.outerHTML.substring(0, 1500)
    };
  });
  console.log('Reference Home Dusk Info:', JSON.stringify(duskInfo, null, 2));

  await browser.close();
})();
