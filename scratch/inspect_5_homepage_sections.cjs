const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'screenshots_h5');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const refCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refCtx.newPage();
  const locPage = await locCtx.newPage();

  console.log('Navigating to Reference...');
  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle', timeout: 35000 });
  await refPage.waitForTimeout(2000);

  console.log('Navigating to Local (5174)...');
  await locPage.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 20000 });
  await locPage.waitForTimeout(2000);

  // ─────────────────────────────────────────────────────────────
  // 1. SECTION 1: HERO (tp-hero)
  // ─────────────────────────────────────────────────────────────
  console.log('\n=== SECTION 1: HERO INSPECTION ===');
  const refHero = await refPage.evaluate(() => {
    const hero = document.querySelector('.tp-hero');
    const sun = document.querySelector('.tp-hero__sun, [class*="heroSun"], [class*="sun"]');
    const lineup = document.querySelector('.tp-lineup, [class*="lineup"], [class*="arches"]');
    const tiles = lineup ? Array.from(lineup.querySelectorAll('[class*="tile"], [class*="arch"], a, li, figure')).slice(0, 8) : [];
    const mascot = document.querySelector('.tp-hero__teddy, [class*="heroTeddy"]');
    const quilt = document.querySelector('.tp-quilt, [class*="quilt"], [class*="scallop"]');

    return {
      heroBg: hero ? getComputedStyle(hero).background : null,
      heroHeight: hero?.offsetHeight,
      sunFound: !!sun,
      tilesCount: tiles.length,
      tilesDetails: tiles.map(t => ({
        tag: t.tagName,
        class: t.className.substring(0, 50),
        width: t.offsetWidth,
        height: t.offsetHeight,
      })),
      mascotFound: !!mascot,
      quiltFound: !!quilt,
      quiltBg: quilt ? getComputedStyle(quilt).backgroundImage?.substring(0, 60) : null,
    };
  });

  const locHero = await locPage.evaluate(() => {
    const hero = document.querySelector('[class*="hero"], .tp-hero');
    const sun = document.querySelector('[class*="heroSun"], .tp-hero__sun');
    const lineup = document.querySelector('[class*="lineup"], [class*="archesGallery"]');
    const tiles = lineup ? Array.from(lineup.children) : [];
    const mascot = document.querySelector('[class*="heroTeddy"], .tp-hero__teddy');
    const quilt = document.querySelector('[class*="quilt"], [class*="scallop"]');

    return {
      heroBg: hero ? getComputedStyle(hero).background : null,
      heroHeight: hero?.offsetHeight,
      sunFound: !!sun,
      tilesCount: tiles.length,
      tilesDetails: tiles.map(t => ({
        tag: t.tagName,
        class: t.className.substring(0, 50),
        width: t.offsetWidth,
        height: t.offsetHeight,
      })),
      mascotFound: !!mascot,
      quiltFound: !!quilt,
    };
  });

  console.log('Hero Reference:', JSON.stringify(refHero, null, 2));
  console.log('Hero Local:', JSON.stringify(locHero, null, 2));

  // Test hover on first tile in local
  const firstTileLoc = await locPage.$('[class*="archCard"], [class*="lineup"] a, [class*="tile"]');
  if (firstTileLoc) {
    await firstTileLoc.hover();
    await locPage.waitForTimeout(400);
  }
  await refPage.screenshot({ path: path.join(OUT_DIR, '01_ref_hero.png') });
  await locPage.screenshot({ path: path.join(OUT_DIR, '01_loc_hero.png') });

  // ─────────────────────────────────────────────────────────────
  // 2. SECTION 2: DOORS (tp-meet)
  // ─────────────────────────────────────────────────────────────
  console.log('\n=== SECTION 2: DOORS INSPECTION ===');
  const refMeetTop = await refPage.evaluate(() => document.querySelector('.tp-meet')?.getBoundingClientRect().top + window.scrollY);
  const locMeetTop = await locPage.evaluate(() => (document.querySelector('.tp-meet, [class*="meetSection"]')?.getBoundingClientRect().top || 0) + window.scrollY);

  // Scroll to doors start
  await refPage.evaluate(t => window.scrollTo(0, t), refMeetTop);
  await locPage.evaluate(t => window.scrollTo(0, t), locMeetTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const refDoors = await refPage.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const doors = Array.from(document.querySelectorAll('.tp-door, [class*="DoorCard"], [class*="doorCard"]'));
    return {
      meetHeight: meet?.offsetHeight,
      pinned: meet?.getAttribute('data-pinned'),
      doorCount: doors.length,
      firstDoorOpen: doors[0]?.getAttribute('data-open'),
    };
  });

  const locDoors = await locPage.evaluate(() => {
    const meet = document.querySelector('.tp-meet, [class*="meetSection"]');
    const doors = Array.from(document.querySelectorAll('.tp-door, [class*="DoorCard"], [class*="doorCard"]'));
    return {
      meetHeight: meet?.offsetHeight,
      pinned: meet?.getAttribute('data-pinned'),
      doorCount: doors.length,
      firstDoorOpen: doors[0]?.getAttribute('data-open'),
    };
  });
  console.log('Doors Reference:', JSON.stringify(refDoors, null, 2));
  console.log('Doors Local:', JSON.stringify(locDoors, null, 2));

  // Scroll into doors mid-scroll (e.g. +1500px)
  await refPage.evaluate(t => window.scrollTo(0, t + 1500), refMeetTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 1500), locMeetTop);
  await refPage.waitForTimeout(600);
  await locPage.waitForTimeout(600);

  await refPage.screenshot({ path: path.join(OUT_DIR, '02_ref_doors_mid.png') });
  await locPage.screenshot({ path: path.join(OUT_DIR, '02_loc_doors_mid.png') });

  // ─────────────────────────────────────────────────────────────
  // 3. SECTION 3: TWO WAYS & AIRPLANE (tp-paths)
  // ─────────────────────────────────────────────────────────────
  console.log('\n=== SECTION 3: TWO WAYS AIRPLANE INSPECTION ===');
  const refPathsTop = await refPage.evaluate(() => document.querySelector('.tp-paths, .tp-fork')?.getBoundingClientRect().top + window.scrollY);
  const locPathsTop = await locPage.evaluate(() => (document.querySelector('.tp-paths, [class*="paths"]')?.getBoundingClientRect().top || 0) + window.scrollY);

  await refPage.evaluate(t => window.scrollTo(0, t + 200), refPathsTop);
  await locPage.evaluate(t => window.scrollTo(0, t + 200), locPathsTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const refPaths = await refPage.evaluate(() => {
    const plane = document.querySelector('.tp-flight, [class*="flight"], [class*="plane"]');
    const post = document.querySelector('.tp-fork__post, [class*="forkPost"]');
    const signLeft = document.querySelector('[class*="signLeft"], .tp-sign--dubai');
    const signRight = document.querySelector('[class*="signRight"], .tp-sign--import');
    return {
      planeFound: !!plane,
      postFound: !!post,
      signLeftFound: !!signLeft,
      signRightFound: !!signRight,
      planeTransform: plane?.getAttribute('transform') || plane?.style.transform,
    };
  });

  const locPaths = await locPage.evaluate(() => {
    const plane = document.querySelector('[class*="flightCanvas"] g[transform*="translate"]');
    const post = document.querySelector('[class*="forkPost"]');
    const signLeft = document.querySelector('[class*="signLeft"]');
    const signRight = document.querySelector('[class*="signRight"]');
    return {
      planeFound: !!plane,
      postFound: !!post,
      signLeftFound: !!signLeft,
      signRightFound: !!signRight,
      planeTransform: plane?.getAttribute('transform'),
    };
  });
  console.log('Two Ways Reference:', JSON.stringify(refPaths, null, 2));
  console.log('Two Ways Local:', JSON.stringify(locPaths, null, 2));

  await refPage.screenshot({ path: path.join(OUT_DIR, '03_ref_twoways.png') });
  await locPage.screenshot({ path: path.join(OUT_DIR, '03_loc_twoways.png') });

  // ─────────────────────────────────────────────────────────────
  // 4. SECTION 4: HAPPY FAMILIES DUSK TRANSITION (tp-dusk)
  // ─────────────────────────────────────────────────────────────
  console.log('\n=== SECTION 4: DUSK TRANSITION INSPECTION ===');
  const refDuskTop = await refPage.evaluate(() => document.querySelector('.tp-dusk')?.getBoundingClientRect().top + window.scrollY);
  const locDuskTop = await locPage.evaluate(() => (document.querySelector('.tp-dusk, [class*="familiesSection"]')?.getBoundingClientRect().top || 0) + window.scrollY);

  await refPage.evaluate(t => window.scrollTo(0, t), refDuskTop);
  await locPage.evaluate(t => window.scrollTo(0, t), locDuskTop);
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  const refDusk = await refPage.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk');
    const note = document.querySelector('.tp-dusk__note, blockquote');
    const polaroids = document.querySelectorAll('.tp-dusk .tp-polaroid, .tp-dusk [class*="polaroid"]');
    const horizon = document.querySelector('.tp-horizon, [class*="horizon"]');
    return {
      duskBg: dusk ? getComputedStyle(dusk).background : null,
      duskHeight: dusk?.offsetHeight,
      noteFound: !!note,
      polaroidsCount: polaroids.length,
      horizonFound: !!horizon,
    };
  });

  const locDusk = await locPage.evaluate(() => {
    const dusk = document.querySelector('.tp-dusk, [class*="familiesSection"]');
    const note = document.querySelector('[class*="duskNote"]');
    const grid = document.querySelector('[class*="familiesGrid"]');
    const horizon = document.querySelector('[class*="horizon"]');
    return {
      duskBg: dusk ? getComputedStyle(dusk).background : null,
      duskHeight: dusk?.offsetHeight,
      noteFound: !!note,
      polaroidsCount: grid ? grid.children.length : 0,
      horizonFound: !!horizon,
    };
  });
  console.log('Dusk Reference:', JSON.stringify(refDusk, null, 2));
  console.log('Dusk Local:', JSON.stringify(locDusk, null, 2));

  await refPage.screenshot({ path: path.join(OUT_DIR, '04_ref_dusk.png') });
  await locPage.screenshot({ path: path.join(OUT_DIR, '04_loc_dusk.png') });

  // ─────────────────────────────────────────────────────────────
  // 5. SECTION 5: FOOTER BASKET (tp-basket)
  // ─────────────────────────────────────────────────────────────
  console.log('\n=== SECTION 5: FOOTER BASKET INSPECTION ===');
  await refPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await locPage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await refPage.waitForTimeout(600);
  await locPage.waitForTimeout(600);

  const refFooter = await refPage.evaluate(() => {
    const footer = document.querySelector('footer, .tp-footer');
    const basket = document.querySelector('.tp-basket, [class*="basket"]');
    const stars = document.querySelectorAll('.tp-star, [class*="star"]');
    const moon = document.querySelector('.tp-moon, [class*="moon"]');
    const hill = document.querySelector('.tp-footer__hill, [class*="footerHill"]');
    return {
      footerBg: footer ? getComputedStyle(footer).backgroundColor : null,
      basketFound: !!basket,
      starsCount: stars.length,
      moonFound: !!moon,
      hillFound: !!hill,
    };
  });

  const locFooter = await locPage.evaluate(() => {
    const footer = document.querySelector('footer, [class*="footer"]');
    const basket = document.querySelector('[class*="basket"]');
    const stars = document.querySelectorAll('[class*="star"]');
    const moon = document.querySelector('[class*="moon"]');
    const hill = document.querySelector('[class*="footerHill"]');
    return {
      footerBg: footer ? getComputedStyle(footer).backgroundColor : null,
      basketFound: !!basket,
      starsCount: stars.length,
      moonFound: !!moon,
      hillFound: !!hill,
    };
  });
  console.log('Footer Reference:', JSON.stringify(refFooter, null, 2));
  console.log('Footer Local:', JSON.stringify(locFooter, null, 2));

  await refPage.screenshot({ path: path.join(OUT_DIR, '05_ref_footer.png') });
  await locPage.screenshot({ path: path.join(OUT_DIR, '05_loc_footer.png') });

  await browser.close();
  console.log('\nAll 5 sections inspected and screenshots saved to scratch/screenshots_h5/');
}

main().catch(console.error);
