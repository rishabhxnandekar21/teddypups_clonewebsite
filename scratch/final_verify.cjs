/**
 * Final comprehensive verification of all 4 targeted tasks
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREEN_DIR = path.join(__dirname, '../scratch/screenshots');
if (!fs.existsSync(SCREEN_DIR)) fs.mkdirSync(SCREEN_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // ── TASK 3: Homepage — 8 families preview ─────────────────────────────────
  const home = await ctx.newPage();
  await home.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 20000 });
  await home.waitForTimeout(1500);

  // Scroll to dusk/families section
  await home.evaluate(() => {
    const el = document.querySelector('.tp-dusk, [class*="familiesSection"]');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await home.waitForTimeout(800);
  await home.screenshot({ path: path.join(SCREEN_DIR, 'task3_homepage_8families.png') });

  const familiesCount = await home.evaluate(() => {
    const grid = document.querySelector('[class*="familiesGrid"]');
    return grid ? grid.children.length : -1;
  });
  console.log('Task 3 - Homepage families count:', familiesCount, familiesCount === 8 ? '✅ PASS' : '❌ FAIL');

  // CTA check
  const ctaHref = await home.evaluate(() => {
    const cta = document.querySelector('[class*="seeAllRow"] a');
    return cta ? cta.getAttribute('href') : null;
  });
  console.log('Task 3 - CTA href:', ctaHref, ctaHref === '/happy-families' ? '✅' : '⚠️');

  // ── TASK 2: Journey steps ─────────────────────────────────────────────────
  await home.evaluate(() => window.scrollTo(0, 0));
  await home.waitForTimeout(300);

  const journeyTop = await home.evaluate(() => {
    const s = document.querySelector('.tp-chat');
    return s ? s.getBoundingClientRect().top + window.scrollY : 0;
  });

  // Step 1
  await home.evaluate(t => window.scrollTo(0, t), journeyTop);
  await home.waitForTimeout(500);
  await home.screenshot({ path: path.join(SCREEN_DIR, 'task2_step1.png') });
  const s1 = await home.evaluate(() => {
    const active = document.querySelector('li[class*="chatStep"][data-active="true"]');
    return active ? active.querySelector('[class*="chatNum"]')?.textContent : null;
  });
  console.log('Task 2 - Step 1 active:', s1, s1 === '1' ? '✅' : '❌');

  // Step 2
  await home.evaluate(t => window.scrollTo(0, t + 500), journeyTop);
  await home.waitForTimeout(500);
  await home.screenshot({ path: path.join(SCREEN_DIR, 'task2_step2.png') });
  const s2 = await home.evaluate(() => {
    const active = document.querySelector('li[class*="chatStep"][data-active="true"]');
    return active ? active.querySelector('[class*="chatNum"]')?.textContent : null;
  });
  console.log('Task 2 - Step 2 active:', s2, s2 === '2' ? '✅' : '⚠️ (check threshold)');

  // Step 3
  await home.evaluate(t => window.scrollTo(0, t + 1100), journeyTop);
  await home.waitForTimeout(500);
  await home.screenshot({ path: path.join(SCREEN_DIR, 'task2_step3.png') });
  const s3 = await home.evaluate(() => {
    const active = document.querySelector('li[class*="chatStep"][data-active="true"]');
    return active ? active.querySelector('[class*="chatNum"]')?.textContent : null;
  });
  console.log('Task 2 - Step 3 active:', s3, s3 === '3' ? '✅' : '⚠️');

  // Sticky check — section should still be in viewport at step 3
  const stickyPhone = await home.evaluate(() => {
    const phone = document.querySelector('[class*="chatSide"], [class*="phoneWrapper"]');
    if (!phone) return null;
    const r = phone.getBoundingClientRect();
    return { top: Math.round(r.top), inViewport: r.top >= 0 && r.bottom <= window.innerHeight + 10 };
  });
  console.log('Task 2 - Phone sticky at step 3:', stickyPhone);

  // ── TASK 1: Mascot positions ──────────────────────────────────────────────
  await home.evaluate(() => window.scrollTo(0, 0));
  await home.waitForTimeout(500);

  const mascotChecks = [];
  for (const scrollY of [0, 1500, 3000, 5000, 7000]) {
    await home.evaluate(y => window.scrollTo(0, y), scrollY);
    await home.waitForTimeout(200);
    const info = await home.evaluate(y => {
      const actor = document.querySelector('[class*="actor"]');
      if (!actor) return { scroll: y, found: false };
      const t = actor.style.transform;
      // Parse y from transform
      const match = t.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
      const vpY = match ? parseFloat(match[2]) : -1;
      const vpX = match ? parseFloat(match[1]) : -1;
      const inViewport = vpY >= 0 && vpY <= window.innerHeight - 200 && vpX >= 0 && vpX <= window.innerWidth - 100;
      return { scroll: y, found: true, vpX: Math.round(vpX), vpY: Math.round(vpY), inViewport, transform: t.substring(0, 80) };
    }, scrollY);
    mascotChecks.push(info);
  }
  console.log('Task 1 - Mascot positions:');
  mascotChecks.forEach(c => {
    const status = c.inViewport ? '✅' : '❌';
    console.log(`  scroll=${c.scroll}: x=${c.vpX}, y=${c.vpY} ${status}`);
  });

  // Screenshot mascot at mid-scroll
  await home.evaluate(() => window.scrollTo(0, 3000));
  await home.waitForTimeout(500);
  await home.screenshot({ path: path.join(SCREEN_DIR, 'task1_mascot_mid.png') });

  // ── TASK 4: Happy Families closing scene ─────────────────────────────────
  const famPage = await ctx.newPage();
  await famPage.goto('http://localhost:5173/happy-families', { waitUntil: 'networkidle', timeout: 20000 });
  await famPage.waitForTimeout(1000);

  // Count polaroids
  const polaroidCount = await famPage.evaluate(() => {
    const wall = document.querySelector('[class*="wall"]:not([class*="wallWrapper"]):not([class*="wallItem"]):not([class*="wallPrint"])');
    if (wall) return { selector: wall.className.substring(0, 60), count: wall.children.length };
    // Try ul directly
    const ul = document.querySelector('ul[class*="wall"]');
    if (ul) return { selector: 'ul.wall', count: ul.children.length };
    const allWall = Array.from(document.querySelectorAll('[class*="wall"]'));
    return allWall.map(w => ({ class: w.tagName + '.' + w.className.substring(0, 40), count: w.children.length }));
  });
  console.log('Task 4 - Polaroid count:', JSON.stringify(polaroidCount));

  // Screenshot full galleries
  await famPage.evaluate(() => window.scrollTo(0, 800));
  await famPage.waitForTimeout(500);
  await famPage.screenshot({ path: path.join(SCREEN_DIR, 'task4_gallery_top.png') });

  // Closing scene
  await famPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
  await famPage.waitForTimeout(500);
  await famPage.screenshot({ path: path.join(SCREEN_DIR, 'task4_closing_scene.png') });

  const closingScene = await famPage.evaluate(() => {
    const foot = document.querySelector('[class*="foot"]');
    if (!foot) return { found: false };
    const mascot = foot.querySelector('svg, [class*="mascot"], [class*="pup"]');
    const tagline = foot.querySelector('[class*="Tagline"], [class*="tagline"], p');
    return {
      found: true,
      hasMascot: !!mascot,
      taglineText: tagline ? tagline.textContent.trim() : null,
    };
  });
  console.log('Task 4 - Closing scene:', closingScene);

  await browser.close();
  console.log('\nAll checks done!');
}

main().catch(err => { console.error(err); process.exit(1); });
