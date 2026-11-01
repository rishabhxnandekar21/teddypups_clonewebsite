const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectAllIssues() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. FOOTER BASKET ON REFERENCE ---');
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  // Scroll to absolute bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1000);
  
  const footerBasketData = await page.evaluate(() => {
    const basket = document.querySelector('.tp-basket') || document.querySelector('[class*="basket"]');
    const basketPup = document.querySelector('.tp-basket__pup') || document.querySelector('[class*="basket__pup"]');
    const actor = document.querySelector('.pup-actor');
    const actorBody = document.querySelector('.pup-actor__body');
    const footer = document.querySelector('footer');

    const bRect = basket ? basket.getBoundingClientRect() : null;
    const bpRect = basketPup ? basketPup.getBoundingClientRect() : null;
    const aRect = actor ? actor.getBoundingClientRect() : null;
    const abRect = actorBody ? actorBody.getBoundingClientRect() : null;

    return {
      basketHtml: basket ? basket.outerHTML.slice(0, 1000) : null,
      basketRect: bRect,
      basketPupRect: bpRect,
      actorRect: aRect,
      actorBodyRect: abRect,
      actorTransform: actor ? window.getComputedStyle(actor).transform : null,
      actorBodyTransform: actorBody ? window.getComputedStyle(actorBody).transform : null,
      pose: actor ? actor.dataset.pose : null
    };
  });
  console.log('Ref Footer Basket Data:', JSON.stringify(footerBasketData, null, 2));

  console.log('--- 2. PUPPIES PAGE CIRCULAR ANIMATION ---');
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const puppiesAnimationData = await page.evaluate(() => {
    // Look for circular frames or svg circles or animations on puppy cards
    const cards = Array.from(document.querySelectorAll('article, a[href^="/puppies/"], [class*="card"]'));
    const circles = Array.from(document.querySelectorAll('svg circle, [class*="circle"], [class*="ring"], [class*="frame"], [class*="badge"], [class*="orbit"]'));
    
    // Check animations and keyframes
    const animatedElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const s = window.getComputedStyle(el);
      return s.animationName && s.animationName !== 'none';
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      animationName: window.getComputedStyle(el).animationName,
      animationDuration: window.getComputedStyle(el).animationDuration
    }));

    // Check first card's structure and styles
    const firstCard = document.querySelector('article, a[href^="/puppies/"]');

    return {
      title: document.title,
      firstCardHtml: firstCard ? firstCard.outerHTML : null,
      circlesCount: circles.length,
      animatedElements: animatedElements.slice(0, 20),
      keyframes: (() => {
        const kfs = [];
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.type === CSSRule.KEYFRAMES_RULE) {
                if (/circle|spin|rotate|orbit|ring|frame|pulse|draw|dash/i.test(rule.name)) {
                  kfs.push({ name: rule.name, css: rule.cssText });
                }
              }
            }
          } catch(e) {}
        }
        return kfs;
      })()
    };
  });
  console.log('Puppies Animation Data:', JSON.stringify(puppiesAnimationData, null, 2));

  console.log('--- 3. /how-it-works ---');
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const howItWorksData = await page.evaluate(() => {
    return {
      title: document.title,
      sections: Array.from(document.querySelectorAll('section, header, main > *')).map(s => ({
        tag: s.tagName,
        className: s.className,
        id: s.id,
        heading: s.querySelector('h1, h2, h3')?.innerText
      }))
    };
  });
  console.log('How it works Data:', JSON.stringify(howItWorksData, null, 2));

  console.log('--- 4. /faq ---');
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const faqPageData = await page.evaluate(() => {
    return {
      title: document.title,
      sections: Array.from(document.querySelectorAll('section, header, main > *')).map(s => ({
        tag: s.tagName,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText
      })),
      faqsCount: document.querySelectorAll('details, [class*="faq"], [class*="accordion"]').length
    };
  });
  console.log('FAQ Page Data:', JSON.stringify(faqPageData, null, 2));

  console.log('--- 5. /contact ---');
  await page.goto('https://puppy.instabizweb.com/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const contactData = await page.evaluate(() => {
    return {
      title: document.title,
      sections: Array.from(document.querySelectorAll('section, header, main > *')).map(s => ({
        tag: s.tagName,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText
      }))
    };
  });
  console.log('Contact Data:', JSON.stringify(contactData, null, 2));

  await browser.close();
}

inspectAllIssues().catch(console.error);
