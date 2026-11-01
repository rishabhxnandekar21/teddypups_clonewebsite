const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHOT_DIR = path.join(__dirname, 'screenshots_exact');
if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

async function deepDive() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });

  // 1. REQ 2: SECTION HEIGHT DEEP DIVE
  console.log('\n=== 1. MEET SECTION HEIGHT DEEP DIVE ===');
  const meetCode = {
    ref: await refPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet');
      const track = document.querySelector('.tp-meet__track');
      const doors = Array.from(document.querySelectorAll('.tp-door'));
      return {
        offsetHeight: meet.offsetHeight,
        computedHeight: getComputedStyle(meet).height,
        doorCount: doors.length,
        doorWidth: doors[0]?.offsetWidth,
        trackScrollWidth: track?.scrollWidth,
        trackWidth: track?.offsetWidth,
        // Check inline style or CSS rule
        cssRuleHeight: Array.from(document.styleSheets).flatMap(s => {
          try { return Array.from(s.cssRules || []); } catch(e) { return []; }
        }).filter(r => r.selectorText && r.selectorText.includes('.tp-meet')).map(r => r.cssText),
      };
    }),
    loc: await locPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
      const pinRange = document.querySelector('[class*="pinRange"]');
      const track = document.querySelector('[class*="doorsTrack"]');
      const doors = Array.from(document.querySelectorAll('[class*="DoorCard"], [class*="doorCard"]'));
      return {
        offsetHeight: meet?.offsetHeight,
        computedHeight: meet ? getComputedStyle(meet).height : null,
        pinRangeHeight: pinRange?.offsetHeight,
        pinRangeStyle: pinRange?.getAttribute('style'),
        doorCount: doors.length,
        doorWidth: doors[0]?.offsetWidth,
        trackScrollWidth: track?.scrollWidth,
      };
    }),
  };
  console.log('Meet Code:', JSON.stringify(meetCode, null, 2));

  // 2. REQ 3: JOURNEY PHONE & CTA
  console.log('\n=== 2. JOURNEY PHONE & CTA DEEP DIVE ===');
  // Scroll to step 3 in Ref & Loc
  const refJTop = await refPage.evaluate(() => document.querySelector('.tp-chat').getBoundingClientRect().top + window.scrollY);
  const locJTop = await locPage.evaluate(() => document.querySelector('[class*="journeySection"]').getBoundingClientRect().top + window.scrollY);

  // Scroll to step 3
  await refPage.evaluate(t => window.scrollTo(0, t + 1200), refJTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 1400), locJTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const jComparison = {
    ref: await refPage.evaluate(() => {
      const chat = document.querySelector('.tp-chat');
      const phone = document.querySelector('.tp-phone');
      const steps = Array.from(document.querySelectorAll('.tp-chat__step'));
      const lastStep = steps[steps.length - 1];
      const cta = lastStep?.querySelector('a, button');

      const phoneR = phone?.getBoundingClientRect();
      const ctaR = cta?.getBoundingClientRect();
      const lastStepR = lastStep?.getBoundingClientRect();
      const chatR = chat?.getBoundingClientRect();

      return {
        phoneTop: phoneR?.top,
        phoneBottom: phoneR?.bottom,
        phoneHeight: phoneR?.height,
        ctaText: cta?.innerText?.trim(),
        ctaTop: ctaR?.top,
        ctaBottom: ctaR?.bottom,
        ctaBottomVsPhoneBottom: (ctaR && phoneR) ? (phoneR.bottom - ctaR.bottom) : null,
        lastStepBottom: lastStepR?.bottom,
        chatBottom: chatR?.bottom,
        gapBelowLastStep: (lastStepR && chatR) ? (chatR.bottom - lastStepR.bottom) : null,
      };
    }),
    loc: await locPage.evaluate(() => {
      const chat = document.querySelector('[class*="journeySection"]');
      const phone = document.querySelector('[class*="phoneWrap"]');
      const steps = Array.from(document.querySelectorAll('[class*="chatStep"]'));
      const lastStep = steps[steps.length - 1];
      const cta = lastStep?.querySelector('a, button');

      const phoneR = phone?.getBoundingClientRect();
      const ctaR = cta?.getBoundingClientRect();
      const lastStepR = lastStep?.getBoundingClientRect();
      const chatR = chat?.getBoundingClientRect();

      return {
        phoneTop: phoneR?.top,
        phoneBottom: phoneR?.bottom,
        phoneHeight: phoneR?.height,
        ctaText: cta?.innerText?.trim(),
        ctaTop: ctaR?.top,
        ctaBottom: ctaR?.bottom,
        ctaBottomVsPhoneBottom: (ctaR && phoneR) ? (phoneR.bottom - ctaR.bottom) : null,
        lastStepBottom: lastStepR?.bottom,
        chatBottom: chatR?.bottom,
        gapBelowLastStep: (lastStepR && chatR) ? (chatR.bottom - lastStepR.bottom) : null,
      };
    })
  };
  console.log('Journey Comparison:', JSON.stringify(jComparison, null, 2));

  // 3. REQ 4: HOMEPAGE FAQ
  console.log('\n=== 3. HOMEPAGE FAQ DEEP DIVE ===');
  const refFaqHtml = await refPage.evaluate(() => {
    const s = document.querySelector('.tp-night');
    if (!s) return null;
    return {
      outerHtml: s.outerHTML.substring(0, 500),
      bg: getComputedStyle(s).background,
      color: getComputedStyle(s).color,
      h2: s.querySelector('h2')?.innerText,
      h2Color: getComputedStyle(s.querySelector('h2')).color,
      h2Font: getComputedStyle(s.querySelector('h2')).fontFamily,
      cols: Array.from(s.children).map(c => ({
        tag: c.tagName,
        cls: c.className,
        w: c.offsetWidth,
        h: c.offsetHeight,
        style: getComputedStyle(c).display,
      })),
      innerContainer: s.firstElementChild ? {
        cls: s.firstElementChild.className,
        display: getComputedStyle(s.firstElementChild).display,
        gridTemplateColumns: getComputedStyle(s.firstElementChild).gridTemplateColumns,
        flexDirection: getComputedStyle(s.firstElementChild).flexDirection,
        children: Array.from(s.firstElementChild.children).map(cc => ({
          cls: cc.className,
          w: cc.offsetWidth,
          text: cc.innerText?.substring(0, 100),
        }))
      } : null,
    };
  });

  const locFaqHtml = await locPage.evaluate(() => {
    const s = document.querySelector('[class*="faqSection"]');
    if (!s) return null;
    return {
      outerHtml: s.outerHTML.substring(0, 500),
      bg: getComputedStyle(s).background,
      color: getComputedStyle(s).color,
      h2: s.querySelector('h2')?.innerText,
      h2Color: getComputedStyle(s.querySelector('h2')).color,
      h2Font: getComputedStyle(s.querySelector('h2')).fontFamily,
      innerContainer: s.firstElementChild ? {
        cls: s.firstElementChild.className,
        display: getComputedStyle(s.firstElementChild).display,
        gridTemplateColumns: getComputedStyle(s.firstElementChild).gridTemplateColumns,
        flexDirection: getComputedStyle(s.firstElementChild).flexDirection,
        children: Array.from(s.firstElementChild.children).map(cc => ({
          cls: cc.className,
          w: cc.offsetWidth,
          text: cc.innerText?.substring(0, 100),
        }))
      } : null,
    };
  });

  console.log('Ref FAQ HTML/CSS:', JSON.stringify(refFaqHtml, null, 2));
  console.log('Loc FAQ HTML/CSS:', JSON.stringify(locFaqHtml, null, 2));

  // Screenshot FAQ
  const refFaqY = await refPage.evaluate(() => document.querySelector('.tp-night')?.getBoundingClientRect().top + window.scrollY);
  const locFaqY = await locPage.evaluate(() => document.querySelector('[class*="faqSection"]')?.getBoundingClientRect().top + window.scrollY);
  if (refFaqY) {
    await refPage.evaluate(y => window.scrollTo(0, y), refFaqY);
    await refPage.waitForTimeout(400);
    await refPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_ref.png') });
  }
  if (locFaqY) {
    await locPage.evaluate(y => window.scrollTo(0, y), locFaqY);
    await locPage.waitForTimeout(400);
    await locPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_loc.png') });
  }

  // 4. REQ 5: READY CTA CARD & FOOTER BASKET
  console.log('\n=== 4. READY CTA CARD & FOOTER BASKET DEEP DIVE ===');
  const refReady = await refPage.evaluate(() => {
    const home = document.querySelector('.tp-home');
    const card = home?.querySelector('.tp-card, [class*="card"], .tp-home__body');
    const basket = document.querySelector('.tp-basket');
    const basketPup = document.querySelector('.tp-basket__pup');
    const pupActor = document.querySelector('.pup-actor');

    return {
      homeBg: home ? getComputedStyle(home).background : null,
      cardHtml: card ? card.outerHTML.substring(0, 300) : null,
      cardRect: card?.getBoundingClientRect(),
      cardStyle: card ? {
        bg: getComputedStyle(card).backgroundColor,
        border: getComputedStyle(card).border,
        radius: getComputedStyle(card).borderRadius,
        shadow: getComputedStyle(card).boxShadow,
        width: card.offsetWidth,
        height: card.offsetHeight,
      } : null,
      basketRect: basket?.getBoundingClientRect(),
      basketPupRect: basketPup?.getBoundingClientRect(),
      pupActorRect: pupActor?.getBoundingClientRect(),
      pupActorTransform: pupActor?.style.transform,
    };
  });

  const locReady = await locPage.evaluate(() => {
    const section = document.querySelector('[class*="ctaSection"]');
    const card = section?.querySelector('[class*="ctaCard"]');
    const basket = document.querySelector('[class*="basket"]');
    const basketPup = document.querySelector('[class*="basketPup"]');
    const pupActor = document.querySelector('.pup-actor');

    return {
      sectionBg: section ? getComputedStyle(section).background : null,
      cardHtml: card ? card.outerHTML.substring(0, 300) : null,
      cardRect: card?.getBoundingClientRect(),
      cardStyle: card ? {
        bg: getComputedStyle(card).backgroundColor,
        border: getComputedStyle(card).border,
        radius: getComputedStyle(card).borderRadius,
        shadow: getComputedStyle(card).boxShadow,
        width: card.offsetWidth,
        height: card.offsetHeight,
      } : null,
      basketRect: basket?.getBoundingClientRect(),
      basketPupRect: basketPup?.getBoundingClientRect(),
      pupActorRect: pupActor?.getBoundingClientRect(),
      pupActorTransform: pupActor?.style.transform,
    };
  });

  console.log('Ref Ready/Footer:', JSON.stringify(refReady, null, 2));
  console.log('Loc Ready/Footer:', JSON.stringify(locReady, null, 2));

  await browser.close();
}

deepDive().catch(console.error);
