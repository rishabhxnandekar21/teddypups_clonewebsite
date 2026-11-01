const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHOT_DIR = path.join(__dirname, 'screenshots_exact');
if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

async function runAudit() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const locCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  const refPage = await refCtx.newPage();
  const locPage = await locCtx.newPage();

  console.log('Navigating to Reference...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await refPage.waitForTimeout(2000);

  console.log('Navigating to Local (5174)...');
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 25000 });
  await locPage.waitForTimeout(2000);

  // =========================================================================
  // REQUIREMENT 1: HERO
  // =========================================================================
  console.log('\n=================== REQUIREMENT 1: HERO ===================');
  const heroData = {
    ref: await refPage.evaluate(() => {
      const h1 = document.querySelector('.tp-hero h1, h1');
      const spans = h1 ? Array.from(h1.querySelectorAll('span, .tp-hero__line')) : [];
      const teddy = document.querySelector('.tp-hero__teddy, [class*="heroTeddy"]');
      const seats = Array.from(document.querySelectorAll('.tp-lineup__seat, [class*="lineupSeat"]'));
      
      const s2 = seats[1]?.getBoundingClientRect();
      const s3 = seats[2]?.getBoundingClientRect();
      const s4 = seats[3]?.getBoundingClientRect();
      const teddyRect = teddy?.getBoundingClientRect();

      return {
        line1Text: spans[0]?.innerText?.trim(),
        line1Color: spans[0] ? getComputedStyle(spans[0]).color : null,
        line2Text: spans[1]?.innerText?.trim(),
        line2Color: spans[1] ? getComputedStyle(spans[1]).color : null,
        teddyRect: teddyRect ? { x: teddyRect.x, y: teddyRect.y, w: teddyRect.width, h: teddyRect.height } : null,
        seatLeftOfMascot: s3 ? { right: s3.right, x: s3.x, w: s3.width } : null,
        seatRightOfMascot: s4 ? { left: s4.left, x: s4.x, w: s4.width } : null,
        gapWidth: s3 && s4 ? (s4.left - s3.right) : null,
        gapCenter: s3 && s4 ? ((s3.right + s4.left) / 2) : null,
        mascotCenter: teddyRect ? (teddyRect.x + teddyRect.width / 2) : null,
      };
    }),
    loc: await locPage.evaluate(() => {
      const h1 = document.querySelector('[class*="heroTitle"], .tp-hero h1, h1');
      const spans = h1 ? Array.from(h1.querySelectorAll('span')) : [];
      const teddy = document.querySelector('[class*="heroTeddy"], .tp-hero__teddy');
      const seats = Array.from(document.querySelectorAll('[class*="lineupSeat"]'));
      
      const s3 = seats[2]?.getBoundingClientRect();
      const s4 = seats[3]?.getBoundingClientRect();
      const teddyRect = teddy?.getBoundingClientRect();

      return {
        line1Text: spans[0]?.innerText?.trim(),
        line1Color: spans[0] ? getComputedStyle(spans[0]).color : null,
        line2Text: spans[1]?.innerText?.trim(),
        line2Color: spans[1] ? getComputedStyle(spans[1]).color : null,
        teddyRect: teddyRect ? { x: teddyRect.x, y: teddyRect.y, w: teddyRect.width, h: teddyRect.height } : null,
        seatLeftOfMascot: s3 ? { right: s3.right, x: s3.x, w: s3.width } : null,
        seatRightOfMascot: s4 ? { left: s4.left, x: s4.x, w: s4.width } : null,
        gapWidth: s3 && s4 ? (s4.left - s3.right) : null,
        gapCenter: s3 && s4 ? ((s3.right + s4.left) / 2) : null,
        mascotCenter: teddyRect ? (teddyRect.x + teddyRect.width / 2) : null,
      };
    })
  };
  console.log('Hero Data:', JSON.stringify(heroData, null, 2));
  await refPage.screenshot({ path: path.join(SHOT_DIR, '01_hero_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '01_hero_loc.png') });

  // =========================================================================
  // REQUIREMENT 2: MEET THE PUPS (Mascot feet & Section height)
  // =========================================================================
  console.log('\n=================== REQUIREMENT 2: MEET THE PUPS ===================');
  const refMeetTop = await refPage.evaluate(() => document.querySelector('.tp-meet')?.getBoundingClientRect().top + window.scrollY);
  const locMeetTop = await locPage.evaluate(() => (document.querySelector('.tp-meet, [class*="meetSection"]')?.getBoundingClientRect().top || 0) + window.scrollY);

  // Scroll to pinned position
  await refPage.evaluate(t => window.scrollTo(0, t + 1200), refMeetTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 1200), locMeetTop);
  await refPage.waitForTimeout(600);
  await locPage.waitForTimeout(600);

  const meetData = {
    ref: await refPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet');
      const runner = document.querySelector('.tp-runner, [data-pup-actor], .tp-pup, [class*="runner"]');
      const track = document.querySelector('.tp-meet__track');
      const meetRect = meet?.getBoundingClientRect();
      const runnerRect = runner?.getBoundingClientRect();
      const trackRect = track?.getBoundingClientRect();

      return {
        sectionHeight: meet?.offsetHeight,
        computedHeight: meet ? getComputedStyle(meet).height : null,
        inlineStyle: meet?.getAttribute('style'),
        doorCount: document.querySelectorAll('.tp-door').length,
        runnerRect: runnerRect ? { x: runnerRect.x, y: runnerRect.y, w: runnerRect.width, h: runnerRect.height } : null,
        runnerBottomClearance: runnerRect ? (window.innerHeight - runnerRect.bottom) : null,
        trackBottom: trackRect ? trackRect.bottom : null,
        runnerVisible: runner ? (runnerRect.bottom <= window.innerHeight && runnerRect.top >= 0) : null,
      };
    }),
    loc: await locPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
      const runner = document.querySelector('[class*="runner"], [data-pup-actor]');
      const track = document.querySelector('[class*="doorsTrack"]');
      const meetRect = meet?.getBoundingClientRect();
      const runnerRect = runner?.getBoundingClientRect();
      const trackRect = track?.getBoundingClientRect();

      return {
        sectionHeight: meet?.offsetHeight,
        computedHeight: meet ? getComputedStyle(meet).height : null,
        inlineStyle: meet?.getAttribute('style'),
        doorCount: document.querySelectorAll('[class*="DoorCard"], [class*="doorCard"]').length,
        runnerRect: runnerRect ? { x: runnerRect.x, y: runnerRect.y, w: runnerRect.width, h: runnerRect.height } : null,
        runnerBottomClearance: runnerRect ? (window.innerHeight - runnerRect.bottom) : null,
        trackBottom: trackRect ? trackRect.bottom : null,
        runnerVisible: runner ? (runnerRect.bottom <= window.innerHeight && runnerRect.top >= 0) : null,
      };
    })
  };
  console.log('Meet Data:', JSON.stringify(meetData, null, 2));
  await refPage.screenshot({ path: path.join(SHOT_DIR, '02_doors_mascot_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '02_doors_mascot_loc.png') });

  // =========================================================================
  // REQUIREMENT 3: YOUR PUPPY JOURNEY → WHY FAMILIES TRUST US
  // =========================================================================
  console.log('\n=================== REQUIREMENT 3: JOURNEY & TRANSITION ===================');
  // Scroll to journey section
  const refJourneyTop = await refPage.evaluate(() => {
    const s = document.querySelector('.tp-chat, .tp-journey, section[id*="journey"], section[class*="chat"]');
    return s ? (s.getBoundingClientRect().top + window.scrollY) : null;
  });
  const locJourneyTop = await locPage.evaluate(() => {
    const s = document.querySelector('[class*="journeySection"], .tp-chat, section[id*="journey"]');
    return s ? (s.getBoundingClientRect().top + window.scrollY) : null;
  });

  // Test Step 1, Step 2, Step 3 pinning
  const journeyStickiness = {
    ref: [],
    loc: [],
  };

  for (const scrollDelta of [200, 700, 1400]) {
    await refPage.evaluate((top, d) => window.scrollTo(0, top + d), refJourneyTop, scrollDelta);
    await locPage.evaluate((top, d) => window.scrollTo(0, top + d), locJourneyTop, scrollDelta);
    await refPage.waitForTimeout(300);
    await locPage.waitForTimeout(300);

    const refP = await refPage.evaluate(() => {
      const phone = document.querySelector('.tp-phone, [class*="phone"]');
      const rect = phone?.getBoundingClientRect();
      return rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null;
    });
    const locP = await locPage.evaluate(() => {
      const phone = document.querySelector('[class*="phoneWrap"], [class*="phone"]');
      const rect = phone?.getBoundingClientRect();
      return rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null;
    });
    journeyStickiness.ref.push({ delta: scrollDelta, phone: refP });
    journeyStickiness.loc.push({ delta: scrollDelta, phone: locP });
  }

  // Measure final CTA bottom vs phone bottom and transition to next section
  // Scroll to step 3 final CTA
  await refPage.evaluate(top => window.scrollTo(0, top + 1400), refJourneyTop);
  await locPage.evaluate(top => window.scrollTo(0, top + 1400), locJourneyTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const transitionData = {
    ref: await refPage.evaluate(() => {
      const journey = document.querySelector('.tp-chat, .tp-journey, section[class*="chat"]');
      const phone = document.querySelector('.tp-phone, [class*="phone"]');
      const cta = journey ? Array.from(journey.querySelectorAll('a, button')).slice(-1)[0] : null;
      const nextSection = journey?.nextElementSibling;

      const phoneRect = phone?.getBoundingClientRect();
      const ctaRect = cta?.getBoundingClientRect();
      const jRect = journey?.getBoundingClientRect();
      const nextRect = nextSection?.getBoundingClientRect();

      return {
        journeyHeight: journey?.offsetHeight,
        ctaText: cta?.innerText?.trim(),
        ctaRect: ctaRect ? { top: ctaRect.top, bottom: ctaRect.bottom } : null,
        phoneRect: phoneRect ? { top: phoneRect.top, bottom: phoneRect.bottom } : null,
        ctaBottomVsPhoneBottom: (ctaRect && phoneRect) ? (phoneRect.bottom - ctaRect.bottom) : null,
        nextSectionClass: nextSection?.className,
        nextSectionTop: nextRect ? nextRect.top : null,
        gapBetweenJourneyAndNext: (jRect && nextRect) ? (nextRect.top - jRect.bottom) : null,
      };
    }),
    loc: await locPage.evaluate(() => {
      const journey = document.querySelector('[class*="journeySection"], .tp-chat');
      const phone = document.querySelector('[class*="phoneWrap"]');
      const cta = journey ? Array.from(journey.querySelectorAll('a, button')).slice(-1)[0] : null;
      const nextSection = journey?.nextElementSibling;

      const phoneRect = phone?.getBoundingClientRect();
      const ctaRect = cta?.getBoundingClientRect();
      const jRect = journey?.getBoundingClientRect();
      const nextRect = nextSection?.getBoundingClientRect();

      return {
        journeyHeight: journey?.offsetHeight,
        ctaText: cta?.innerText?.trim(),
        ctaRect: ctaRect ? { top: ctaRect.top, bottom: ctaRect.bottom } : null,
        phoneRect: phoneRect ? { top: phoneRect.top, bottom: phoneRect.bottom } : null,
        ctaBottomVsPhoneBottom: (ctaRect && phoneRect) ? (phoneRect.bottom - ctaRect.bottom) : null,
        nextSectionClass: nextSection?.className,
        nextSectionTop: nextRect ? nextRect.top : null,
        gapBetweenJourneyAndNext: (jRect && nextRect) ? (nextRect.top - jRect.bottom) : null,
      };
    })
  };

  console.log('Stickiness Data:', JSON.stringify(journeyStickiness, null, 2));
  console.log('Transition Data:', JSON.stringify(transitionData, null, 2));
  await refPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_loc.png') });

  // =========================================================================
  // REQUIREMENT 4: HOMEPAGE FAQ
  // =========================================================================
  console.log('\n=================== REQUIREMENT 4: HOMEPAGE FAQ ===================');
  const faqRef = await refPage.evaluate(() => {
    // Find any FAQ on reference homepage
    const faq = document.querySelector('.tp-faq, [class*="faq"], #faq, [id*="faq"]');
    if (!faq) {
      // Find all headings
      const h2s = Array.from(document.querySelectorAll('h2, h3')).map(h => h.innerText);
      return { found: false, h2s };
    }
    const rect = faq.getBoundingClientRect();
    const style = getComputedStyle(faq);
    const leftCol = faq.querySelector('.tp-faq__col--left, [class*="left"], [class*="intro"], [class*="head"]');
    const rightCol = faq.querySelector('.tp-faq__col--right, [class*="right"], [class*="list"], [class*="items"]');
    const questions = Array.from(faq.querySelectorAll('details, [class*="item"], [class*="question"], [class*="acc"]'));

    return {
      found: true,
      className: faq.className,
      bg: style.backgroundColor,
      color: style.color,
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      twoColumn: !!(leftCol && rightCol),
      leftHtml: leftCol?.innerText?.substring(0, 100),
      rightQuestionsCount: questions.length,
    };
  });

  const faqLoc = await locPage.evaluate(() => {
    const faq = document.querySelector('.tp-faq, [class*="faq"], #faq, [id*="faq"]');
    if (!faq) {
      const h2s = Array.from(document.querySelectorAll('h2, h3')).map(h => h.innerText);
      return { found: false, h2s };
    }
    const rect = faq.getBoundingClientRect();
    const style = getComputedStyle(faq);
    const leftCol = faq.querySelector('[class*="left"], [class*="intro"], [class*="head"]');
    const rightCol = faq.querySelector('[class*="right"], [class*="list"], [class*="items"], [class*="accordions"]');
    const questions = Array.from(faq.querySelectorAll('details, [class*="item"], [class*="question"], [class*="acc"]'));

    return {
      found: true,
      className: faq.className,
      bg: style.backgroundColor,
      color: style.color,
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      twoColumn: !!(leftCol && rightCol),
      leftHtml: leftCol?.innerText?.substring(0, 100),
      rightQuestionsCount: questions.length,
    };
  });

  console.log('FAQ Ref:', JSON.stringify(faqRef, null, 2));
  console.log('FAQ Loc:', JSON.stringify(faqLoc, null, 2));

  // If FAQ is present in either, scroll to it and screenshot
  const refFaqTop = await refPage.evaluate(() => {
    const f = document.querySelector('.tp-faq, [class*="faq"], #faq, [id*="faq"]');
    return f ? (f.getBoundingClientRect().top + window.scrollY) : null;
  });
  const locFaqTop = await locPage.evaluate(() => {
    const f = document.querySelector('.tp-faq, [class*="faq"], #faq, [id*="faq"]');
    return f ? (f.getBoundingClientRect().top + window.scrollY) : null;
  });

  if (refFaqTop) {
    await refPage.evaluate(t => window.scrollTo(0, t), refFaqTop);
    await refPage.waitForTimeout(500);
    await refPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_ref.png') });
  }
  if (locFaqTop) {
    await locPage.evaluate(t => window.scrollTo(0, t), locFaqTop);
    await locPage.waitForTimeout(500);
    await locPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_loc.png') });
  }

  // =========================================================================
  // REQUIREMENT 5: READY TO MEET CTA & FOOTER BASKET
  // =========================================================================
  console.log('\n=================== REQUIREMENT 5: READY CTA & FOOTER BASKET ===================');
  await refPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await locPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await refPage.waitForTimeout(800);
  await locPage.waitForTimeout(800);

  const footerData = {
    ref: await refPage.evaluate(() => {
      const cta = document.querySelector('.tp-ready, [class*="ready"], [class*="ctaCard"]');
      const basket = document.querySelector('.tp-basket, [class*="basket"]');
      const runner = document.querySelector('.tp-runner, [data-pup-actor], .tp-pup, [class*="runner"]');
      const footer = document.querySelector('footer, .tp-footer');

      const ctaStyle = cta ? getComputedStyle(cta) : null;
      const ctaRect = cta?.getBoundingClientRect();
      const basketRect = basket?.getBoundingClientRect();
      const runnerRect = runner?.getBoundingClientRect();

      return {
        ctaFound: !!cta,
        ctaRect: ctaRect ? { w: ctaRect.width, h: ctaRect.height, x: ctaRect.x, y: ctaRect.y } : null,
        ctaBg: ctaStyle?.backgroundColor,
        ctaBorder: ctaStyle?.border,
        ctaRadius: ctaStyle?.borderRadius,
        ctaShadow: ctaStyle?.boxShadow,
        basketRect: basketRect ? { w: basketRect.width, h: basketRect.height, x: basketRect.x, y: basketRect.y } : null,
        runnerRect: runnerRect ? { w: runnerRect.width, h: runnerRect.height, x: runnerRect.x, y: runnerRect.y } : null,
        mascotInsideBasket: (runnerRect && basketRect) ? {
          diffX: runnerRect.x - basketRect.x,
          diffY: runnerRect.y - basketRect.y,
          centerXDiff: (runnerRect.x + runnerRect.width / 2) - (basketRect.x + basketRect.width / 2),
          centerYDiff: (runnerRect.y + runnerRect.height / 2) - (basketRect.y + basketRect.height / 2),
        } : null,
        footerBg: footer ? getComputedStyle(footer).backgroundColor : null,
      };
    }),
    loc: await locPage.evaluate(() => {
      const cta = document.querySelector('[class*="ctaCard"], .tp-ready, [class*="ready"]');
      const basket = document.querySelector('[class*="basket"]');
      const runner = document.querySelector('[class*="runner"], [data-pup-actor]');
      const footer = document.querySelector('footer, [class*="footer"]');

      const ctaStyle = cta ? getComputedStyle(cta) : null;
      const ctaRect = cta?.getBoundingClientRect();
      const basketRect = basket?.getBoundingClientRect();
      const runnerRect = runner?.getBoundingClientRect();

      return {
        ctaFound: !!cta,
        ctaRect: ctaRect ? { w: ctaRect.width, h: ctaRect.height, x: ctaRect.x, y: ctaRect.y } : null,
        ctaBg: ctaStyle?.backgroundColor,
        ctaBorder: ctaStyle?.border,
        ctaRadius: ctaStyle?.borderRadius,
        ctaShadow: ctaStyle?.boxShadow,
        basketRect: basketRect ? { w: basketRect.width, h: basketRect.height, x: basketRect.x, y: basketRect.y } : null,
        runnerRect: runnerRect ? { w: runnerRect.width, h: runnerRect.height, x: runnerRect.x, y: runnerRect.y } : null,
        mascotInsideBasket: (runnerRect && basketRect) ? {
          diffX: runnerRect.x - basketRect.x,
          diffY: runnerRect.y - basketRect.y,
          centerXDiff: (runnerRect.x + runnerRect.width / 2) - (basketRect.x + basketRect.width / 2),
          centerYDiff: (runnerRect.y + runnerRect.height / 2) - (basketRect.y + basketRect.height / 2),
        } : null,
        footerBg: footer ? getComputedStyle(footer).backgroundColor : null,
      };
    })
  };

  console.log('Footer Data:', JSON.stringify(footerData, null, 2));
  await refPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_loc.png') });

  await browser.close();
  console.log('\nAudit complete! Screenshots in scratch/screenshots_exact/');
}

runAudit().catch(console.error);
