const { chromium } = require('playwright');

async function testLoc() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });

  const data = await page.evaluate(() => {
    // 1. Hero Colors
    const h1 = document.querySelector('[class*="heroTitle"]');
    const spans = h1 ? Array.from(h1.querySelectorAll('span')) : [];
    
    // 2. Meet Height
    const meet = document.querySelector('.tp-meet');

    // 3. Journey Height
    const journey = document.querySelector('.tp-chat, [class*="journeySection"]');

    // 4. Night FAQ
    const night = document.querySelector('.tp-night');
    const nightIntro = night ? night.querySelector('[class*="nightIntro"]') : null;
    const nightMascot = night ? night.querySelector('[class*="nightPup"]') : null;
    const nightList = night ? night.querySelector('dl') : null;

    // 5. Home Doorway
    const home = document.querySelector('.tp-home');
    const house = home ? home.querySelector('[class*="house"]') : null;
    const houseImg = home ? home.querySelector('[class*="houseDoorwayImg"]') : null;
    const whatsappBtn = home ? home.querySelector('a[href*="wa.me"]') : null;
    const contactBtn = home ? home.querySelector('a[href*="contact"]') : null;

    return {
      heroLine1Color: spans[0] ? getComputedStyle(spans[0]).color : null,
      heroLine2Color: spans[1] ? getComputedStyle(spans[1]).color : null,
      meetHeight: meet?.offsetHeight,
      journeyHeight: journey?.offsetHeight,
      nightFound: !!night,
      nightBg: night ? getComputedStyle(night).background : null,
      nightColor: night ? getComputedStyle(night).color : null,
      nightIntroFound: !!nightIntro,
      nightMascotFound: !!nightMascot,
      nightListItemsCount: nightList ? nightList.children.length : 0,
      homeFound: !!home,
      homeBg: home ? getComputedStyle(home).background : null,
      houseFound: !!house,
      houseImgSrc: houseImg?.getAttribute('src'),
      hasWhatsapp: !!whatsappBtn,
      hasContact: !!contactBtn,
    };
  });

  console.log('Updated Local Inspection:', JSON.stringify(data, null, 2));

  // Scroll to absolute bottom and check basket & actor
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(600);

  const footerData = await page.evaluate(() => {
    const basket = document.querySelector('[class*="basket"]');
    const pupActor = document.querySelector('.pup-actor');
    const bR = basket?.getBoundingClientRect();
    const aR = pupActor?.getBoundingClientRect();

    return {
      basketRect: bR ? { x: bR.x, y: bR.y, w: bR.width, h: bR.height } : null,
      actorRect: aR ? { x: aR.x, y: aR.y, w: aR.width, h: aR.height } : null,
      actorTransform: pupActor?.style.transform,
      overlapY: (bR && aR) ? aR.bottom - bR.bottom : null,
    };
  });
  console.log('Footer Data at Bottom:', JSON.stringify(footerData, null, 2));

  await browser.close();
}

testLoc().catch(console.error);
