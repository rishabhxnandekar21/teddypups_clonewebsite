const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHOT_DIR = path.join(__dirname, 'screenshots_exact');
if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

async function checkReqs() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating Reference...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await refPage.waitForTimeout(2000);

  console.log('Navigating Local...');
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });
  await locPage.waitForTimeout(2000);

  // ==========================================
  // 2. WHY LOCAL HEIGHT IS 320px GREATER
  // ==========================================
  const meetAnalysis = {
    ref: await refPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet');
      const track = document.querySelector('.tp-meet__track');
      return {
        offsetHeight: meet?.offsetHeight,
        style: meet?.getAttribute('style'),
        dataset: meet ? Object.assign({}, meet.dataset) : {},
        trackScrollWidth: track?.scrollWidth,
        trackClientWidth: track?.clientWidth,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      };
    }),
    loc: await locPage.evaluate(() => {
      const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
      const track = document.querySelector('[class*="doorsTrack"]');
      return {
        offsetHeight: meet?.offsetHeight,
        style: meet?.getAttribute('style'),
        dataset: meet ? Object.assign({}, meet.dataset) : {},
        trackScrollWidth: track?.scrollWidth,
        trackClientWidth: track?.clientWidth,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      };
    }),
  };
  console.log('Meet Height Analysis:', JSON.stringify(meetAnalysis, null, 2));

  // ==========================================
  // 3. JOURNEY & TRANSITION
  // ==========================================
  const refJourneyTop = await refPage.evaluate(() => {
    const s = document.querySelector('.tp-chat, .tp-journey, section[id*="journey"], section[class*="chat"]');
    return s ? (s.getBoundingClientRect().top + window.scrollY) : null;
  });
  const locJourneyTop = await locPage.evaluate(() => {
    const s = document.querySelector('[class*="journeySection"], .tp-chat, section[id*="journey"]');
    return s ? (s.getBoundingClientRect().top + window.scrollY) : null;
  });

  console.log('Journey Tops:', { refJourneyTop, locJourneyTop });

  // Scroll through steps 1, 2, 3 and check phone rect
  const stickiness = { ref: [], loc: [] };
  for (const delta of [200, 600, 1200, 1600]) {
    await refPage.evaluate(({ top, d }) => window.scrollTo(0, top + d), { top: refJourneyTop, d: delta });
    await locPage.evaluate(({ top, d }) => window.scrollTo(0, top + d), { top: locJourneyTop, d: delta });
    await refPage.waitForTimeout(300);
    await locPage.waitForTimeout(300);

    const refP = await refPage.evaluate(() => {
      const phone = document.querySelector('.tp-phone, [class*="phone"]');
      const r = phone?.getBoundingClientRect();
      return r ? { top: r.top, bottom: r.bottom, h: r.height } : null;
    });
    const locP = await locPage.evaluate(() => {
      const phone = document.querySelector('[class*="phoneWrap"], [class*="phone"]');
      const r = phone?.getBoundingClientRect();
      return r ? { top: r.top, bottom: r.bottom, h: r.height } : null;
    });
    stickiness.ref.push({ delta, phone: refP });
    stickiness.loc.push({ delta, phone: locP });
  }

  // Check step 3 CTA vs phone bottom and next section
  await refPage.evaluate(({ top, d }) => window.scrollTo(0, top + d), { top: refJourneyTop, d: 1500 });
  await locPage.evaluate(({ top, d }) => window.scrollTo(0, top + d), { top: locJourneyTop, d: 1500 });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const journeyDetails = {
    ref: await refPage.evaluate(() => {
      const j = document.querySelector('.tp-chat, .tp-journey, section[class*="chat"]');
      const phone = document.querySelector('.tp-phone, [class*="phone"]');
      const ctas = j ? Array.from(j.querySelectorAll('a, button')) : [];
      const cta = ctas.find(c => c.innerText.includes('Adopt') || c.innerText.includes('Reserve') || c.innerText.includes('pup') || c.innerText.includes('Chat') || c.className.includes('btn')) || ctas[ctas.length - 1];
      const next = j?.nextElementSibling;

      const jR = j?.getBoundingClientRect();
      const pR = phone?.getBoundingClientRect();
      const cR = cta?.getBoundingClientRect();
      const nR = next?.getBoundingClientRect();

      return {
        jHeight: j?.offsetHeight,
        ctaText: cta?.innerText?.trim(),
        ctaRect: cR ? { top: cR.top, bottom: cR.bottom } : null,
        phoneRect: pR ? { top: pR.top, bottom: pR.bottom } : null,
        ctaBottomVsPhoneBottom: (cR && pR) ? (cR.bottom - pR.bottom) : null,
        phoneBottomVsNextTop: (pR && nR) ? (nR.top - pR.bottom) : null,
        gapJourneyToNext: (jR && nR) ? (nR.top - jR.bottom) : null,
        nextSectionClass: next?.className,
      };
    }),
    loc: await locPage.evaluate(() => {
      const j = document.querySelector('[class*="journeySection"], .tp-chat');
      const phone = document.querySelector('[class*="phoneWrap"]');
      const ctas = j ? Array.from(j.querySelectorAll('a, button')) : [];
      const cta = ctas.find(c => c.innerText.includes('Adopt') || c.innerText.includes('Reserve') || c.innerText.includes('pup') || c.innerText.includes('Chat') || c.className.includes('btn')) || ctas[ctas.length - 1];
      const next = j?.nextElementSibling;

      const jR = j?.getBoundingClientRect();
      const pR = phone?.getBoundingClientRect();
      const cR = cta?.getBoundingClientRect();
      const nR = next?.getBoundingClientRect();

      return {
        jHeight: j?.offsetHeight,
        ctaText: cta?.innerText?.trim(),
        ctaRect: cR ? { top: cR.top, bottom: cR.bottom } : null,
        phoneRect: pR ? { top: pR.top, bottom: pR.bottom } : null,
        ctaBottomVsPhoneBottom: (cR && pR) ? (cR.bottom - pR.bottom) : null,
        phoneBottomVsNextTop: (pR && nR) ? (nR.top - pR.bottom) : null,
        gapJourneyToNext: (jR && nR) ? (nR.top - jR.bottom) : null,
        nextSectionClass: next?.className,
      };
    })
  };
  console.log('Journey Stickiness:', JSON.stringify(stickiness, null, 2));
  console.log('Journey Details:', JSON.stringify(journeyDetails, null, 2));

  await refPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '03_journey_step3_loc.png') });

  // ==========================================
  // 4. HOMEPAGE FAQ
  // ==========================================
  console.log('\n--- 4. HOMEPAGE FAQ ---');
  const refAllSections = await refPage.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      cls: s.className,
      id: s.id,
      h2: s.querySelector('h2, h3')?.innerText?.trim(),
      bg: getComputedStyle(s).backgroundColor,
      bgImg: getComputedStyle(s).backgroundImage?.substring(0, 50),
      color: getComputedStyle(s).color,
      top: s.getBoundingClientRect().top + window.scrollY,
      h: s.offsetHeight,
    }));
  });
  console.log('Reference Sections on Homepage:', JSON.stringify(refAllSections, null, 2));

  const locAllSections = await locPage.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      cls: s.className,
      id: s.id,
      h2: s.querySelector('h2, h3')?.innerText?.trim(),
      bg: getComputedStyle(s).backgroundColor,
      bgImg: getComputedStyle(s).backgroundImage?.substring(0, 50),
      color: getComputedStyle(s).color,
      top: s.getBoundingClientRect().top + window.scrollY,
      h: s.offsetHeight,
    }));
  });
  console.log('Local Sections on Homepage:', JSON.stringify(locAllSections, null, 2));

  // Find the FAQ section in Ref and Loc
  const refFaqSection = refAllSections.find(s => s.h2?.toLowerCase().includes('curious') || s.h2?.toLowerCase().includes('faq') || s.h2?.toLowerCase().includes('question') || s.cls.includes('faq'));
  const locFaqSection = locAllSections.find(s => s.h2?.toLowerCase().includes('curious') || s.h2?.toLowerCase().includes('faq') || s.h2?.toLowerCase().includes('question') || s.cls.includes('faq'));

  console.log('Ref FAQ Section:', refFaqSection);
  console.log('Loc FAQ Section:', locFaqSection);

  // If found in Ref, inspect its two columns: left & right
  if (refFaqSection) {
    await refPage.evaluate(top => window.scrollTo(0, top), refFaqSection.top);
    await refPage.waitForTimeout(500);

    const refFaqInspection = await refPage.evaluate(() => {
      const s = Array.from(document.querySelectorAll('section')).find(sec => sec.querySelector('h2, h3')?.innerText?.toLowerCase().includes('curious') || sec.className.includes('faq'));
      if (!s) return null;
      const left = s.querySelector('[class*="left"], [class*="col"]:first-child, [class*="head"], [class*="intro"]');
      const right = s.querySelector('[class*="right"], [class*="col"]:last-child, [class*="list"], [class*="acc"]');
      const mascot = s.querySelector('[class*="teddy"], [class*="pup"], img, svg');
      const cta = s.querySelector('a, button');
      const items = Array.from(s.querySelectorAll('details, [class*="item"], [class*="question"]'));

      return {
        sectionClass: s.className,
        bg: getComputedStyle(s).backgroundColor,
        color: getComputedStyle(s).color,
        display: getComputedStyle(s).display,
        gridOrFlex: getComputedStyle(s.firstElementChild || s).display,
        leftTitle: left?.querySelector('h2, h3')?.innerText?.trim(),
        leftCta: cta?.innerText?.trim(),
        hasMascot: !!mascot,
        mascotTag: mascot?.tagName,
        itemsCount: items.length,
        item1Summary: items[0]?.querySelector('summary, [class*="title"], [class*="quest"]')?.innerText?.trim(),
      };
    });
    console.log('Ref FAQ Inspection:', JSON.stringify(refFaqInspection, null, 2));
    await refPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_ref.png') });
  }

  if (locFaqSection) {
    await locPage.evaluate(top => window.scrollTo(0, top), locFaqSection.top);
    await locPage.waitForTimeout(500);

    const locFaqInspection = await locPage.evaluate(() => {
      const s = Array.from(document.querySelectorAll('section')).find(sec => sec.querySelector('h2, h3')?.innerText?.toLowerCase().includes('curious') || sec.className.includes('faq'));
      if (!s) return null;
      const left = s.querySelector('[class*="left"], [class*="col"]:first-child, [class*="head"], [class*="intro"]');
      const right = s.querySelector('[class*="right"], [class*="col"]:last-child, [class*="list"], [class*="acc"]');
      const mascot = s.querySelector('[class*="teddy"], [class*="pup"], img, svg');
      const cta = s.querySelector('a, button');
      const items = Array.from(s.querySelectorAll('details, [class*="item"], [class*="question"]'));

      return {
        sectionClass: s.className,
        bg: getComputedStyle(s).backgroundColor,
        color: getComputedStyle(s).color,
        leftTitle: left?.querySelector('h2, h3')?.innerText?.trim(),
        leftCta: cta?.innerText?.trim(),
        hasMascot: !!mascot,
        itemsCount: items.length,
      };
    });
    console.log('Loc FAQ Inspection:', JSON.stringify(locFaqInspection, null, 2));
    await locPage.screenshot({ path: path.join(SHOT_DIR, '04_faq_loc.png') });
  }

  // ==========================================
  // 5. READY TO MEET CTA & BASKET
  // ==========================================
  console.log('\n--- 5. READY TO MEET CTA & BASKET ---');
  await refPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await locPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await refPage.waitForTimeout(800);
  await locPage.waitForTimeout(800);

  const refCardAndBasket = await refPage.evaluate(() => {
    // Find ready card
    const card = Array.from(document.querySelectorAll('div, section, article')).find(el => {
      const text = el.innerText || '';
      return (text.includes('Ready to meet') || text.includes('Meet your new')) && el.offsetWidth > 400 && el.offsetHeight < 600 && el.children.length > 0;
    });
    const cStyle = card ? getComputedStyle(card) : null;
    const cR = card?.getBoundingClientRect();

    const btn = card?.querySelector('a, button');
    const bStyle = btn ? getComputedStyle(btn) : null;
    const bR = btn?.getBoundingClientRect();

    const basket = document.querySelector('.tp-basket, [class*="basket"]');
    const bskR = basket?.getBoundingClientRect();

    const pup = document.querySelector('.tp-basket__pup, [class*="basketPup"], [data-pose="basket"], [class*="basket"] [class*="pup"], .pup-actor');
    const pupR = pup?.getBoundingClientRect();

    return {
      cardClass: card?.className,
      cardWidth: cR?.width,
      cardHeight: cR?.height,
      cardBg: cStyle?.backgroundColor,
      cardBorder: cStyle?.border,
      cardRadius: cStyle?.borderRadius,
      cardShadow: cStyle?.boxShadow,
      cardPadding: cStyle?.padding,
      btnText: btn?.innerText?.trim(),
      btnBg: bStyle?.backgroundColor,
      btnColor: bStyle?.color,
      btnRect: bR ? { w: bR.width, h: bR.height, x: bR.x, y: bR.y } : null,
      basketRect: bskR ? { w: bskR.width, h: bskR.height, x: bskR.x, y: bskR.y } : null,
      pupRect: pupR ? { w: pupR.width, h: pupR.height, x: pupR.x, y: pupR.y } : null,
      overlap: (bskR && pupR) ? {
        diffX: pupR.x - bskR.x,
        diffY: pupR.y - bskR.y,
        pupBottomVsBasketBottom: pupR.bottom - bskR.bottom,
      } : null,
    };
  });

  const locCardAndBasket = await locPage.evaluate(() => {
    const card = Array.from(document.querySelectorAll('div, section, article')).find(el => {
      const text = el.innerText || '';
      return (text.includes('Ready to meet') || text.includes('Meet your new')) && el.offsetWidth > 400 && el.offsetHeight < 600 && el.children.length > 0;
    });
    const cStyle = card ? getComputedStyle(card) : null;
    const cR = card?.getBoundingClientRect();

    const btn = card?.querySelector('a, button');
    const bStyle = btn ? getComputedStyle(btn) : null;
    const bR = btn?.getBoundingClientRect();

    const basket = document.querySelector('[class*="basket"]');
    const bskR = basket?.getBoundingClientRect();

    const pup = document.querySelector('[class*="basketPup"], [class*="runner"], .pup-actor');
    const pupR = pup?.getBoundingClientRect();

    return {
      cardClass: card?.className,
      cardWidth: cR?.width,
      cardHeight: cR?.height,
      cardBg: cStyle?.backgroundColor,
      cardBorder: cStyle?.border,
      cardRadius: cStyle?.borderRadius,
      cardShadow: cStyle?.boxShadow,
      cardPadding: cStyle?.padding,
      btnText: btn?.innerText?.trim(),
      btnBg: bStyle?.backgroundColor,
      btnColor: bStyle?.color,
      btnRect: bR ? { w: bR.width, h: bR.height, x: bR.x, y: bR.y } : null,
      basketRect: bskR ? { w: bskR.width, h: bskR.height, x: bskR.x, y: bskR.y } : null,
      pupRect: pupR ? { w: pupR.width, h: pupR.height, x: pupR.x, y: pupR.y } : null,
      overlap: (bskR && pupR) ? {
        diffX: pupR.x - bskR.x,
        diffY: pupR.y - bskR.y,
        pupBottomVsBasketBottom: pupR.bottom - bskR.bottom,
      } : null,
    };
  });

  console.log('Ref Card & Basket:', JSON.stringify(refCardAndBasket, null, 2));
  console.log('Loc Card & Basket:', JSON.stringify(locCardAndBasket, null, 2));

  await refPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_ref.png') });
  await locPage.screenshot({ path: path.join(SHOT_DIR, '05_footer_basket_loc.png') });

  await browser.close();
}

checkReqs().catch(console.error);
