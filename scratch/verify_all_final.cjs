const { chromium } = require('playwright');
const fs = require('fs');

async function verifyAll() {
  const browser = await chromium.launch();
  const pageRef = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageLoc = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pageRef.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await pageLoc.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // 1. HERO CHECK
  const heroRef = await pageRef.evaluate(() => {
    const teddy = document.querySelector('.tp-hero__teddy');
    const r = teddy ? teddy.getBoundingClientRect() : null;
    return {
      x: r ? Math.round(r.x) : null,
      w: r ? Math.round(r.width) : null,
      headCenterX: r ? Math.round(r.x + 212 * (r.width / 300)) : null,
    };
  });

  const heroLoc = await pageLoc.evaluate(() => {
    const teddy = document.querySelector('[class*="heroTeddy"]');
    const r = teddy ? teddy.getBoundingClientRect() : null;
    const child = teddy ? teddy.firstElementChild : null;
    return {
      x: r ? Math.round(r.x) : null,
      w: r ? Math.round(r.width) : null,
      headCenterX: r ? Math.round(r.x + 212 * (r.width / 300)) : null,
      childVis: child ? window.getComputedStyle(child).visibility : null,
    };
  });

  console.log('1. HERO:');
  console.log('  Ref head center X:', heroRef.headCenterX, '(viewport 50% = 712.5)');
  console.log('  Loc head center X:', heroLoc.headCenterX, '(viewport 50% = 720)');
  console.log('  Loc child vis:', heroLoc.childVis);

  await pageRef.screenshot({ path: 'scratch/final_ref_hero.png' });
  await pageLoc.screenshot({ path: 'scratch/final_loc_hero.png' });

  // 2. MEET SECTION CHECK (scrollY = 1500)
  await pageRef.evaluate(() => window.scrollTo(0, 1500));
  await pageLoc.evaluate(() => window.scrollTo(0, 1500));
  await pageRef.waitForTimeout(300);
  await pageLoc.waitForTimeout(300);

  const meetRef = await pageRef.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const r = actor ? actor.getBoundingClientRect() : null;
    return {
      x: r ? Math.round(r.x) : null,
      y: r ? Math.round(r.y) : null,
      bottom: r ? Math.round(r.bottom) : null,
      feetY: r ? Math.round(r.y + 228 * 0.747) : null,
      feetClearance: r ? Math.round(900 - (r.y + 228 * 0.747)) : null,
    };
  });

  const meetLoc = await pageLoc.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    return {
      x: r ? Math.round(r.x) : null,
      y: r ? Math.round(r.y) : null,
      bottom: r ? Math.round(r.bottom) : null,
      feetY: r ? Math.round(r.y + 228 * 0.747) : null,
      feetClearance: r ? Math.round(900 - (r.y + 228 * 0.747)) : null,
    };
  });

  console.log('\n2. MEET THE PUPS:');
  console.log('  Ref actor x:', meetRef.x, 'feetY:', meetRef.feetY, 'clearance:', meetRef.feetClearance);
  console.log('  Loc actor x:', meetLoc.x, 'feetY:', meetLoc.feetY, 'clearance:', meetLoc.feetClearance);

  await pageRef.screenshot({ path: 'scratch/final_ref_meet.png' });
  await pageLoc.screenshot({ path: 'scratch/final_loc_meet.png' });

  // 3. FAQ SECTION CHECK
  await pageRef.evaluate(() => {
    const faq = document.querySelector('.tp-night');
    if (faq) window.scrollTo({ top: faq.offsetTop, behavior: 'instant' });
  });
  await pageLoc.evaluate(() => {
    const faq = document.querySelector('.tp-night, [class*="nightSection"]');
    if (faq) window.scrollTo({ top: faq.offsetTop, behavior: 'instant' });
  });
  await pageRef.waitForTimeout(500);
  await pageLoc.waitForTimeout(500);

  const faqRefData = await pageRef.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const r = actor ? actor.getBoundingClientRect() : null;
    return { x: r ? Math.round(r.x) : null, y: r ? Math.round(r.y) : null };
  });

  const faqLocData = await pageLoc.evaluate(() => {
    const actor = document.querySelector('.pup-actor') || document.querySelector('[class*="actor"]');
    const r = actor ? actor.getBoundingClientRect() : null;
    return { x: r ? Math.round(r.x) : null, y: r ? Math.round(r.y) : null };
  });

  console.log('\n3. FAQ SECTION:');
  console.log('  Ref actor docked x:', faqRefData.x, 'y:', faqRefData.y);
  console.log('  Loc actor docked x:', faqLocData.x, 'y:', faqLocData.y);

  await pageRef.screenshot({ path: 'scratch/final_ref_faq.png' });
  await pageLoc.screenshot({ path: 'scratch/final_loc_faq.png' });

  // 4. FOOTER BASKET CHECK
  await pageRef.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageLoc.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await pageRef.waitForTimeout(300);
  await pageLoc.waitForTimeout(300);

  const basketRef = await pageRef.evaluate(() => {
    const pup = document.querySelector('.tp-basket__pup');
    const back = document.querySelector('.tp-basket__back');
    const front = document.querySelector('.tp-basket__front');
    return {
      pupZ: pup ? window.getComputedStyle(pup).zIndex : null,
      backZ: back ? window.getComputedStyle(back).zIndex : null,
      frontZ: front ? window.getComputedStyle(front).zIndex : null,
    };
  });

  const basketLoc = await pageLoc.evaluate(() => {
    const pup = document.querySelector('[class*="basketPup"]');
    const back = document.querySelector('[class*="basketBack"]');
    const front = document.querySelector('[class*="basketFront"]');
    const child = pup ? pup.firstElementChild : null;
    return {
      pupZ: pup ? window.getComputedStyle(pup).zIndex : null,
      backZ: back ? window.getComputedStyle(back).zIndex : null,
      frontZ: front ? window.getComputedStyle(front).zIndex : null,
      childVis: child ? window.getComputedStyle(child).visibility : null,
    };
  });

  console.log('\n4. FOOTER BASKET:');
  console.log('  Ref layering:', basketRef);
  console.log('  Loc layering & vis:', basketLoc);

  await pageRef.screenshot({ path: 'scratch/final_ref_footer.png' });
  await pageLoc.screenshot({ path: 'scratch/final_loc_footer.png' });

  // 5. PUPPIES PAGE ANIMATION CHECK
  await pageLoc.goto('http://localhost:5174/puppies', { waitUntil: 'networkidle' });
  await pageLoc.waitForTimeout(350);

  const pupAnim = await pageLoc.evaluate(() => {
    const card = document.querySelector('a[data-reveal="true"]');
    const line = card ? card.querySelector('[class*="sketchLine"]') : null;
    const photo = card ? card.querySelector('[class*="photo"]') : null;
    return {
      revealed: card ? card.getAttribute('data-revealed') : null,
      lineDashoffset: line ? window.getComputedStyle(line).strokeDashoffset : null,
      photoClipPath: photo ? window.getComputedStyle(photo).clipPath : null,
    };
  });
  console.log('\n5. PUPPIES CIRCULAR ANIMATION:');
  console.log('  Card revealed:', pupAnim.revealed, 'dashoffset:', pupAnim.lineDashoffset, 'clipPath:', pupAnim.photoClipPath);

  await browser.close();
}

verifyAll().catch(console.error);
