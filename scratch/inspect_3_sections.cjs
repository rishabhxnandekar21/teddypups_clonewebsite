const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspect() {
  const browser = await chromium.launch({ headless: true });
  
  const refContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const refPage = await refContext.newPage();

  console.log('Navigating to reference...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await refPage.waitForTimeout(2000);

  // 1. Hero Mascot inspection on Reference
  const refHeroInfo = await refPage.evaluate(() => {
    // find mascot in hero or runner
    const allImgs = Array.from(document.querySelectorAll('img, svg'));
    const arches = Array.from(document.querySelectorAll('*')).filter(el => {
      const cl = el.className && typeof el.className === 'string' ? el.className : '';
      return cl.includes('arch') || cl.includes('scallop') || cl.includes('hero');
    });
    
    // Look for teddy / mascot in hero
    const heroEl = document.querySelector('section, header, div[class*="hero"]');
    // Let's find elements with puppy or mascot
    const mascots = Array.from(document.querySelectorAll('*')).filter(el => {
      const cl = (el.className && typeof el.className === 'string' ? el.className : '') + ' ' + (el.id || '');
      return /mascot|teddy|runner|pup/i.test(cl);
    }).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right }
      };
    });

    // Also get all images / svgs inside hero
    return {
      title: document.title,
      heroHtml: heroEl ? heroEl.outerHTML.slice(0, 1000) : null,
      mascots: mascots.slice(0, 10)
    };
  });
  console.log('Ref Hero Info:', JSON.stringify(refHeroInfo, null, 2));

  // Take screenshot of hero
  await refPage.screenshot({ path: path.join(__dirname, 'screenshots', 'ref_hero.png') });

  // Scroll to Meet the pups
  console.log('Scrolling to Meet the pups...');
  await refPage.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => h.innerText.includes('Meet the pups'));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await refPage.waitForTimeout(1000);
  await refPage.screenshot({ path: path.join(__dirname, 'screenshots', 'ref_meet_pups.png') });

  const refMeetInfo = await refPage.evaluate(() => {
    // Find mascot visible in meet the pups
    const mascots = Array.from(document.querySelectorAll('*')).filter(el => {
      const cl = (el.className && typeof el.className === 'string' ? el.className : '') + ' ' + (el.id || '');
      const rect = el.getBoundingClientRect();
      return /mascot|teddy|runner|pup/i.test(cl) && rect.width > 30 && rect.height > 30;
    }).map(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        className: el.className,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom },
        viewportHeight: window.innerHeight,
        gapFromBottom: window.innerHeight - rect.bottom,
        style: {
          position: style.position,
          bottom: style.bottom,
          top: style.top,
          transform: style.transform
        }
      };
    });
    return mascots;
  });
  console.log('Ref Meet Info:', JSON.stringify(refMeetInfo, null, 2));

  // Scroll to FAQ
  console.log('Scrolling to FAQ...');
  await refPage.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => /Questions.*answered/i.test(h.innerText));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await refPage.waitForTimeout(1000);
  await refPage.screenshot({ path: path.join(__dirname, 'screenshots', 'ref_faq.png') });

  const refFaqInfo = await refPage.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => /Questions.*answered/i.test(h.innerText));
    const section = heading ? heading.closest('section') || heading.parentElement.parentElement : null;
    if (!section) return { error: 'No section found' };
    const style = window.getComputedStyle(section);
    return {
      sectionClass: section.className,
      background: style.backgroundColor,
      padding: style.padding,
      rect: section.getBoundingClientRect(),
      innerHtmlSnippet: section.innerHTML.slice(0, 1500)
    };
  });
  console.log('Ref FAQ Info:', JSON.stringify(refFaqInfo, null, 2));

  await browser.close();
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});
