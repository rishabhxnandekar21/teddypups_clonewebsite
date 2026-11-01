const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. REF
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const refPage = await refContext.newPage();
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await refPage.waitForTimeout(2000);

  // 2. LOC (5173 or 5174)
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locPage = await locContext.newPage();
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await locPage.waitForTimeout(2000);

  const outDir = path.join(__dirname, 'comparison_3');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // -------------------------------------------------------------
  // ISSUE 1: Hero Mascot Positioning
  // -------------------------------------------------------------
  console.log('--- ISSUE 1: HERO ---');
  await refPage.evaluate(() => window.scrollTo(0, 0));
  await locPage.evaluate(() => window.scrollTo(0, 0));
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(outDir, '01_ref_hero.png') });
  await locPage.screenshot({ path: path.join(outDir, '01_loc_hero.png') });

  const heroRefData = await refPage.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const teddyRect = teddy ? teddy.getBoundingClientRect() : null;
    const pups = Array.from(document.querySelectorAll('.tp-lineup__pup')).map(p => {
      const r = p.getBoundingClientRect();
      return { href: p.getAttribute('href'), rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
    });
    const archesContainer = document.querySelector('.tp-lineup') || document.querySelector('.tp-hero__lineup');
    return {
      viewportWidth: window.innerWidth,
      teddyRect,
      pups,
      teddyOuterHtml: teddy ? teddy.outerHTML : null,
      lineupOuterHtml: archesContainer ? archesContainer.outerHTML.slice(0, 500) : null
    };
  });

  const heroLocData = await locPage.evaluate(() => {
    // find hero teddy
    const teddy = document.querySelector('[class*="heroTeddy"]') || document.querySelector('[class*="hero"] [class*="mascot"]') || document.querySelector('[class*="pup-actor"]');
    const teddyRect = teddy ? teddy.getBoundingClientRect() : null;
    const arches = Array.from(document.querySelectorAll('[class*="arch"]')).map(a => {
      const r = a.getBoundingClientRect();
      return { rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
    });
    return {
      viewportWidth: window.innerWidth,
      teddyRect,
      arches,
      teddyHtml: teddy ? teddy.outerHTML : null
    };
  });

  console.log('Hero Ref Data:', JSON.stringify(heroRefData, null, 2));
  console.log('Hero Loc Data:', JSON.stringify(heroLocData, null, 2));

  // -------------------------------------------------------------
  // ISSUE 2: Meet the Pups (Doors Section) - Mascot Feet Clearance
  // -------------------------------------------------------------
  console.log('--- ISSUE 2: MEET THE PUPS ---');
  // Scroll to doors section
  const refDoorsScrollY = await refPage.evaluate(() => {
    const el = document.querySelector('#meet') || document.querySelector('.tp-scene--doors') || Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (el) {
      const r = el.getBoundingClientRect();
      return window.scrollY + r.top;
    }
    return 800;
  });

  const locDoorsScrollY = await locPage.evaluate(() => {
    const el = document.querySelector('#puppies') || document.querySelector('#meet') || Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Meet the pups'));
    if (el) {
      const r = el.getBoundingClientRect();
      return window.scrollY + r.top;
    }
    return 800;
  });

  // Let's scroll both to show the doors section with the mascot standing on the floor
  await refPage.evaluate((y) => window.scrollTo(0, y), refDoorsScrollY);
  await locPage.evaluate((y) => window.scrollTo(0, y), locDoorsScrollY);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(outDir, '02_ref_doors_initial.png') });
  await locPage.screenshot({ path: path.join(outDir, '02_loc_doors_initial.png') });

  // On ref, let's see how the mascot moves as we scroll through doors
  // Let's test a scroll position where the mascot is stationary on the wooden floor
  const refDoorsInfo = await refPage.evaluate(() => {
    const runner = document.querySelector('.pup-actor') || document.querySelector('.tp-curtain__runner');
    const floor = document.querySelector('.tp-doors__floor') || document.querySelector('.tp-floor') || document.querySelector('[class*="floor"]');
    const runnerRect = runner ? runner.getBoundingClientRect() : null;
    const runnerBody = document.querySelector('.pup-actor__body');
    const bodyRect = runnerBody ? runnerBody.getBoundingClientRect() : null;
    const floorRect = floor ? floor.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      runnerRect,
      bodyRect,
      floorRect,
      windowHeight: window.innerHeight,
      bottomGapActor: runnerRect ? window.innerHeight - runnerRect.bottom : null,
      bottomGapBody: bodyRect ? window.innerHeight - bodyRect.bottom : null,
      bottomGapFloor: floorRect ? window.innerHeight - floorRect.bottom : null,
    };
  });

  const locDoorsInfo = await locPage.evaluate(() => {
    const runner = document.querySelector('.pup-actor') || document.querySelector('[class*="meetTeddy"]');
    const floor = document.querySelector('[class*="floor"]');
    const runnerRect = runner ? runner.getBoundingClientRect() : null;
    const floorRect = floor ? floor.getBoundingClientRect() : null;
    return {
      scrollY: window.scrollY,
      runnerRect,
      floorRect,
      windowHeight: window.innerHeight,
      bottomGap: runnerRect ? window.innerHeight - runnerRect.bottom : null,
      runnerStyle: runner ? window.getComputedStyle(runner).cssText : null
    };
  });

  console.log('Doors Ref Info:', JSON.stringify(refDoorsInfo, null, 2));
  console.log('Doors Loc Info:', JSON.stringify(locDoorsInfo, null, 2));

  // -------------------------------------------------------------
  // ISSUE 3: FAQ Section ("Questions, answered")
  // -------------------------------------------------------------
  console.log('--- ISSUE 3: FAQ ---');
  await refPage.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => /Questions.*answered/i.test(h.innerText));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await locPage.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(h => /Questions.*answered/i.test(h.innerText));
    if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(outDir, '03_ref_faq.png') });
  await locPage.screenshot({ path: path.join(outDir, '03_loc_faq.png') });

  const refFaqDetailed = await refPage.evaluate(() => {
    const section = document.querySelector('.tp-night') || document.querySelector('#faq');
    if (!section) return null;
    const h = section.querySelector('h2, h3');
    const btn = section.querySelector('a, button');
    const mascot = section.querySelector('.tp-night__mascot') || section.querySelector('.pup-stop') || section.querySelector('.pup-buddy');
    const items = Array.from(section.querySelectorAll('.tp-faq-item, [class*="faq"], li, details')).map(el => {
      const q = el.querySelector('button, summary, h3, h4, [class*="question"]') || el;
      const a = el.querySelector('p, [class*="answer"]') || el;
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        questionText: q ? q.innerText : '',
        answerText: a ? a.innerText.slice(0, 100) : '',
        padding: style.padding,
        margin: style.margin,
        border: style.border,
        background: style.backgroundColor
      };
    });

    const grid = section.querySelector('.tp-night__grid') || section.children[1] || section;
    const gridStyle = window.getComputedStyle(grid);

    return {
      sectionClass: section.className,
      sectionStyle: {
        background: window.getComputedStyle(section).backgroundColor,
        padding: window.getComputedStyle(section).padding,
      },
      gridStyle: {
        display: gridStyle.display,
        gridTemplateColumns: gridStyle.gridTemplateColumns,
        gap: gridStyle.gap,
        padding: gridStyle.padding,
        maxWidth: gridStyle.maxWidth,
        margin: gridStyle.margin
      },
      heading: h ? { text: h.innerText, rect: h.getBoundingClientRect(), style: window.getComputedStyle(h).cssText } : null,
      btn: btn ? { text: btn.innerText, href: btn.getAttribute('href'), rect: btn.getBoundingClientRect(), style: window.getComputedStyle(btn).cssText } : null,
      mascot: mascot ? { className: mascot.className, rect: mascot.getBoundingClientRect() } : null,
      items: items.slice(0, 5),
      fullHtml: section.outerHTML
    };
  });

  const locFaqDetailed = await locPage.evaluate(() => {
    const section = document.querySelector('[class*="night"]') || document.querySelector('#faq');
    if (!section) return null;
    const h = section.querySelector('h2, h3');
    const btn = section.querySelector('a, button');
    const mascot = section.querySelector('[class*="mascot"]') || section.querySelector('[class*="nightPup"]');
    const items = Array.from(section.querySelectorAll('li, details, [class*="faqItem"]')).map(el => {
      const q = el.querySelector('button, summary, h3, h4, [class*="question"]') || el;
      const r = el.getBoundingClientRect();
      return {
        className: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        questionText: q ? q.innerText : ''
      };
    });
    const grid = section.querySelector('[class*="nightGrid"]') || section;
    const gridStyle = window.getComputedStyle(grid);
    return {
      sectionClass: section.className,
      gridStyle: {
        display: gridStyle.display,
        gridTemplateColumns: gridStyle.gridTemplateColumns,
        gap: gridStyle.gap,
        padding: gridStyle.padding
      },
      heading: h ? { text: h.innerText, rect: h.getBoundingClientRect() } : null,
      btn: btn ? { text: btn.innerText, rect: btn.getBoundingClientRect() } : null,
      mascot: mascot ? { className: mascot.className, rect: mascot.getBoundingClientRect() } : null,
      items: items.slice(0, 5),
      fullHtml: section.outerHTML
    };
  });

  fs.writeFileSync(path.join(outDir, 'ref_faq.html'), refFaqDetailed ? refFaqDetailed.fullHtml : '');
  fs.writeFileSync(path.join(outDir, 'loc_faq.html'), locFaqDetailed ? locFaqDetailed.fullHtml : '');

  delete refFaqDetailed.fullHtml;
  delete locFaqDetailed.fullHtml;

  console.log('FAQ Ref Info:', JSON.stringify(refFaqDetailed, null, 2));
  console.log('FAQ Loc Info:', JSON.stringify(locFaqDetailed, null, 2));

  await browser.close();
  console.log('Done deep inspection!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
