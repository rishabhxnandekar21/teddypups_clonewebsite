const { chromium } = require('playwright');

async function testDoorsMascot() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const locPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });

  const refMeetTop = await refPage.evaluate(() => document.querySelector('.tp-meet').getBoundingClientRect().top + window.scrollY);
  const locMeetTop = await locPage.evaluate(() => document.querySelector('.tp-meet, [class*="meetSection"]').getBoundingClientRect().top + window.scrollY);

  console.log('refMeetTop:', refMeetTop, 'locMeetTop:', locMeetTop);

  // Scroll so doors are in the middle of pinning
  // In Reference, meet section starts at refMeetTop. Sticky container sticks at top:0
  await refPage.evaluate(t => window.scrollTo(0, t + 800), refMeetTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 800), locMeetTop);
  await refPage.waitForTimeout(600);
  await locPage.waitForTimeout(600);

  const refInfo = await refPage.evaluate(() => {
    // Find all elements containing 'teddy', 'runner', 'actor', 'pup'
    const els = Array.from(document.querySelectorAll('*')).filter(el => {
      const cls = String(el.className);
      return cls.includes('runner') || cls.includes('actor') || cls.includes('teddy') || cls.includes('pup-');
    }).map(el => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        style: el.getAttribute('style'),
      };
    });
    const meet = document.querySelector('.tp-meet');
    return { els, meetHeight: meet.offsetHeight, meetStyle: getComputedStyle(meet).height };
  });

  const locInfo = await locPage.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*')).filter(el => {
      const cls = String(el.className);
      return cls.includes('runner') || cls.includes('actor') || cls.includes('teddy') || cls.includes('pup') || cls.includes('Pup');
    }).map(el => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        style: el.getAttribute('style'),
      };
    });
    const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
    return { els, meetHeight: meet.offsetHeight, meetStyle: getComputedStyle(meet).height };
  });

  console.log('REF Info:', JSON.stringify(refInfo, null, 2));
  console.log('LOC Info:', JSON.stringify(locInfo, null, 2));

  await browser.close();
}

testDoorsMascot().catch(console.error);
