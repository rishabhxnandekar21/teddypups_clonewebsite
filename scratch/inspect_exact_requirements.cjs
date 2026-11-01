const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspect() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refCtx.newPage();
  const locPage = await locCtx.newPage();

  console.log('Navigating Reference...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await refPage.waitForTimeout(2000);

  console.log('Navigating Local...');
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });
  await locPage.waitForTimeout(2000);

  // 1. HERO TITLE & MASCOT
  console.log('\n--- 1. HERO ---');
  const refHero = await refPage.evaluate(() => {
    const h1 = document.querySelector('.tp-hero h1, h1');
    const lines = h1 ? Array.from(h1.querySelectorAll('span, .tp-hero__line')) : [];
    const teddy = document.querySelector('.tp-hero__teddy, [class*="heroTeddy"], [class*="teddy"]');
    const seats = Array.from(document.querySelectorAll('.tp-lineup__seat, [class*="lineupSeat"]'));
    return {
      h1Html: h1 ? h1.innerHTML : null,
      h1Lines: lines.map(l => ({
        text: l.innerText,
        color: getComputedStyle(l).color,
      })),
      h1Color: h1 ? getComputedStyle(h1).color : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      seatsRects: seats.map(s => s.getBoundingClientRect()),
    };
  });

  const locHero = await locPage.evaluate(() => {
    const h1 = document.querySelector('[class*="heroTitle"], .tp-hero h1, h1');
    const lines = h1 ? Array.from(h1.querySelectorAll('span')) : [];
    const teddy = document.querySelector('[class*="heroTeddy"], .tp-hero__teddy');
    const seats = Array.from(document.querySelectorAll('[class*="lineupSeat"]'));
    return {
      h1Html: h1 ? h1.innerHTML : null,
      h1Lines: lines.map(l => ({
        text: l.innerText,
        color: getComputedStyle(l).color,
      })),
      h1Color: h1 ? getComputedStyle(h1).color : null,
      teddyRect: teddy ? teddy.getBoundingClientRect() : null,
      seatsRects: seats.map(s => s.getBoundingClientRect()),
    };
  });

  console.log('Hero Ref:', JSON.stringify(refHero, null, 2));
  console.log('Hero Loc:', JSON.stringify(locHero, null, 2));

  // 2. MEET THE PUPS (Section Height & Mascot Feet)
  console.log('\n--- 2. MEET THE PUPS ---');
  const refMeet = await refPage.evaluate(() => {
    const meet = document.querySelector('.tp-meet, [class*="meet"]');
    const track = document.querySelector('.tp-meet__track, [class*="track"]');
    return {
      height: meet?.offsetHeight,
      style: meet?.getAttribute('style'),
      computedHeight: meet ? getComputedStyle(meet).height : null,
      trackHeight: track?.offsetHeight,
    };
  });

  const locMeet = await locPage.evaluate(() => {
    const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
    const track = document.querySelector('[class*="doorsTrack"]');
    return {
      height: meet?.offsetHeight,
      style: meet?.getAttribute('style'),
      computedHeight: meet ? getComputedStyle(meet).height : null,
      trackHeight: track?.offsetHeight,
    };
  });

  console.log('Meet Ref:', JSON.stringify(refMeet, null, 2));
  console.log('Meet Loc:', JSON.stringify(locMeet, null, 2));

  // 3. JOURNEY & TRANSITION
  console.log('\n--- 3. JOURNEY & TRANSITION ---');
  const refJourney = await refPage.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="tp-"]')).map(s => ({
      className: s.className,
      id: s.id,
      tag: s.tagName,
      top: s.getBoundingClientRect().top + window.scrollY,
      height: s.offsetHeight,
    }));
    return sections.filter(s => s.className.includes('chat') || s.className.includes('journey') || s.className.includes('trust') || s.className.includes('passport') || s.className.includes('story') || s.className.includes('why'));
  });

  const locJourney = await locPage.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="tp-"]')).map(s => ({
      className: s.className,
      id: s.id,
      tag: s.tagName,
      top: s.getBoundingClientRect().top + window.scrollY,
      height: s.offsetHeight,
    }));
    return sections.filter(s => s.className.includes('chat') || s.className.includes('journey') || s.className.includes('trust') || s.className.includes('passport') || s.className.includes('story') || s.className.includes('why'));
  });

  console.log('Journey Ref sections:', JSON.stringify(refJourney, null, 2));
  console.log('Journey Loc sections:', JSON.stringify(locJourney, null, 2));

  // 4. HOMEPAGE FAQ
  console.log('\n--- 4. HOMEPAGE FAQ ---');
  const refFaq = await refPage.evaluate(() => {
    const faq = document.querySelector('.tp-faq, [class*="faq"], #faq, [class*="curious"]');
    const allSections = Array.from(document.querySelectorAll('section')).map(s => ({
      className: s.className,
      id: s.id,
      h2: s.querySelector('h2, h3')?.innerText,
      bg: getComputedStyle(s).backgroundColor,
    }));
    return {
      faqFound: !!faq,
      faqClass: faq?.className,
      faqBg: faq ? getComputedStyle(faq).backgroundColor : null,
      sections: allSections,
    };
  });

  const locFaq = await locPage.evaluate(() => {
    const faq = document.querySelector('.tp-faq, [class*="faq"], #faq, [class*="curious"]');
    const allSections = Array.from(document.querySelectorAll('section')).map(s => ({
      className: s.className,
      id: s.id,
      h2: s.querySelector('h2, h3')?.innerText,
      bg: getComputedStyle(s).backgroundColor,
    }));
    return {
      faqFound: !!faq,
      faqClass: faq?.className,
      faqBg: faq ? getComputedStyle(faq).backgroundColor : null,
      sections: allSections,
    };
  });

  console.log('FAQ Ref:', JSON.stringify(refFaq, null, 2));
  console.log('FAQ Loc:', JSON.stringify(locFaq, null, 2));

  // 5. READY TO MEET CTA & BASKET
  console.log('\n--- 5. READY TO MEET & BASKET ---');
  const refFooter = await refPage.evaluate(() => {
    const cta = document.querySelector('.tp-ready, [class*="ready"], [class*="booking"], [class*="ctaCard"]');
    const basket = document.querySelector('.tp-basket, [class*="basket"]');
    const footer = document.querySelector('footer, .tp-footer');
    return {
      ctaFound: !!cta,
      ctaClass: cta?.className,
      ctaBg: cta ? getComputedStyle(cta).backgroundColor : null,
      ctaRect: cta ? cta.getBoundingClientRect() : null,
      basketRect: basket ? basket.getBoundingClientRect() : null,
      footerRect: footer ? footer.getBoundingClientRect() : null,
    };
  });

  const locFooter = await locPage.evaluate(() => {
    const cta = document.querySelector('[class*="ctaCard"], .tp-ready, [class*="ready"], [class*="booking"]');
    const basket = document.querySelector('[class*="basket"]');
    const footer = document.querySelector('footer, [class*="footer"]');
    return {
      ctaFound: !!cta,
      ctaClass: cta?.className,
      ctaBg: cta ? getComputedStyle(cta).backgroundColor : null,
      ctaRect: cta ? cta.getBoundingClientRect() : null,
      basketRect: basket ? basket.getBoundingClientRect() : null,
      footerRect: footer ? footer.getBoundingClientRect() : null,
    };
  });

  console.log('Footer Ref:', JSON.stringify(refFooter, null, 2));
  console.log('Footer Loc:', JSON.stringify(locFooter, null, 2));

  await browser.close();
}

inspect().catch(console.error);
