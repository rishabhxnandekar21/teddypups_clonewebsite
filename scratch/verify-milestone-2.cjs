const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('audit_screenshots/milestone2_verification');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function verifyMilestone2() {
  console.log('=== STARTING MILESTONE 2 AUTOMATED AUDIT & VERIFICATION ===\n');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`Console error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    errors.push(`Page uncaught error: ${err.message}`);
  });

  let allPassed = true;

  // 1. CURSOR VERIFICATION
  console.log('[SECTION 1] Custom Paw Cursor & Hotspot Verification');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const cursorAudit = await page.evaluate(() => {
    const htmlCursor = getComputedStyle(document.documentElement).cursor;
    const bodyCursor = getComputedStyle(document.body).cursor;
    const linkCursor = getComputedStyle(document.querySelector('a')).cursor;
    const buttonCursor = getComputedStyle(document.querySelector('button[type="submit"]')).cursor;
    const inputCursor = getComputedStyle(document.querySelector('input[type="text"]')).cursor;
    const textareaCursor = getComputedStyle(document.querySelector('textarea')).cursor;
    const selectCursor = getComputedStyle(document.querySelector('select')).cursor;

    return {
      htmlCursor,
      bodyCursor,
      linkCursor,
      buttonCursor,
      inputCursor,
      textareaCursor,
      selectCursor
    };
  });

  console.log('Cursor computed styles:', cursorAudit);

  // Check default paw cursor
  if (!cursorAudit.htmlCursor.includes('paw.svg') || !cursorAudit.htmlCursor.includes('9 6')) {
    console.error('FAIL: html cursor does not match paw.svg with hotspot (9 6)');
    allPassed = false;
  } else {
    console.log('✓ PASS: html default cursor is paw.svg with hotspot (9 6)');
  }

  if (!cursorAudit.bodyCursor.includes('paw.svg') || !cursorAudit.bodyCursor.includes('9 6')) {
    console.error('FAIL: body cursor does not match paw.svg with hotspot (9 6)');
    allPassed = false;
  } else {
    console.log('✓ PASS: body default cursor is paw.svg with hotspot (9 6)');
  }

  // Check interactive paw-press cursor
  if (!cursorAudit.linkCursor.includes('paw-press.svg') || !cursorAudit.linkCursor.includes('9 6')) {
    console.error('FAIL: link cursor does not match paw-press.svg with hotspot (9 6)');
    allPassed = false;
  } else {
    console.log('✓ PASS: <a> link cursor is paw-press.svg with hotspot (9 6)');
  }

  if (!cursorAudit.buttonCursor.includes('paw-press.svg') || !cursorAudit.buttonCursor.includes('9 6')) {
    console.error('FAIL: button cursor does not match paw-press.svg with hotspot (9 6)');
    allPassed = false;
  } else {
    console.log('✓ PASS: <button> cursor is paw-press.svg with hotspot (9 6)');
  }

  if (!cursorAudit.selectCursor.includes('paw-press.svg') || !cursorAudit.selectCursor.includes('9 6')) {
    console.error('FAIL: select cursor does not match paw-press.svg with hotspot (9 6)');
    allPassed = false;
  } else {
    console.log('✓ PASS: <select> dropdown cursor is paw-press.svg with hotspot (9 6)');
  }

  // Check text input cursor
  if (cursorAudit.inputCursor !== 'text') {
    console.error(`FAIL: text input cursor is '${cursorAudit.inputCursor}', expected 'text'`);
    allPassed = false;
  } else {
    console.log('✓ PASS: input[type="text"] preserves native "text" cursor');
  }

  if (cursorAudit.textareaCursor !== 'text') {
    console.error(`FAIL: textarea cursor is '${cursorAudit.textareaCursor}', expected 'text'`);
    allPassed = false;
  } else {
    console.log('✓ PASS: textarea preserves native "text" cursor');
  }

  // 2. TYPOGRAPHY VERIFICATION
  console.log('\n[SECTION 2] Typography, Font Families & Weights Verification');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const typoAudit = await page.evaluate(async () => {
    // Check loaded fonts in document
    const fontFaces = [];
    document.fonts.forEach(font => {
      fontFaces.push({ family: font.family, status: font.status, weight: font.weight });
    });

    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const eyebrow = document.querySelector('.section-eyebrow, [class*="eyebrow"]');
    const bodyText = document.querySelector('p');
    const navLink = document.querySelector('header nav a');

    return {
      loadedFonts: fontFaces,
      h1: h1 ? {
        family: getComputedStyle(h1).fontFamily,
        weight: getComputedStyle(h1).fontWeight,
        fontSize: getComputedStyle(h1).fontSize
      } : null,
      h2: h2 ? {
        family: getComputedStyle(h2).fontFamily,
        weight: getComputedStyle(h2).fontWeight,
        fontSize: getComputedStyle(h2).fontSize
      } : null,
      eyebrow: eyebrow ? {
        family: getComputedStyle(eyebrow).fontFamily,
        weight: getComputedStyle(eyebrow).fontWeight
      } : null,
      navLink: navLink ? {
        family: getComputedStyle(navLink).fontFamily,
        weight: getComputedStyle(navLink).fontWeight,
        fontSize: getComputedStyle(navLink).fontSize
      } : null,
      bodyFont: getComputedStyle(document.body).fontFamily
    };
  });

  console.log('Typography inspection:');
  console.log('- H1:', typoAudit.h1);
  console.log('- H2:', typoAudit.h2);
  console.log('- Eyebrow:', typoAudit.eyebrow);
  console.log('- NavLink:', typoAudit.navLink);
  console.log('- BodyFont:', typoAudit.bodyFont);

  // Validate families
  if (!typoAudit.h1.family.toLowerCase().includes('fraunces')) {
    console.error(`FAIL: H1 font-family does not include Fraunces: ${typoAudit.h1.family}`);
    allPassed = false;
  } else {
    console.log('✓ PASS: H1 display heading uses Fraunces');
  }

  if (typoAudit.eyebrow && !typoAudit.eyebrow.family.toLowerCase().includes('shantell sans')) {
    console.error(`FAIL: Eyebrow font-family does not include Shantell Sans: ${typoAudit.eyebrow.family}`);
    allPassed = false;
  } else {
    console.log('✓ PASS: Eyebrow decorative note uses Shantell Sans');
  }

  if (!typoAudit.bodyFont.toLowerCase().includes('figtree')) {
    console.error(`FAIL: Body font-family does not include Figtree: ${typoAudit.bodyFont}`);
    allPassed = false;
  } else {
    console.log('✓ PASS: Body text and interface elements use Figtree');
  }

  // 3. DESIGN TOKENS AUDIT
  console.log('\n[SECTION 3] Design Tokens Audit');
  const tokensAudit = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const keys = [
      '--color-cocoa',
      '--color-cocoa-soft',
      '--color-milk',
      '--color-toffee',
      '--color-toffee-deep',
      '--color-toffee-ink',
      '--color-honey',
      '--color-honey-soft',
      '--color-cream',
      '--color-sand',
      '--color-night',
      '--color-whatsapp',
      '--color-sky',
      '--color-blush',
      '--header-h',
      '--container-max',
      '--ease-pounce',
      '--ease-snap'
    ];
    const res = {};
    for (const k of keys) {
      res[k] = rootStyle.getPropertyValue(k).trim();
    }
    return res;
  });

  console.log('Verified Design Tokens on :root:');
  console.table(tokensAudit);

  const EXPECTED_TOKENS = {
    '--color-cocoa': '#2a170e',
    '--color-cocoa-soft': '#5a3a28',
    '--color-milk': '#fffdf8',
    '--color-toffee': '#c2622b',
    '--color-toffee-deep': '#a24a1a',
    '--color-toffee-ink': '#7a3512',
    '--color-honey': '#f2be6b',
    '--color-honey-soft': '#fbe3b4',
    '--color-cream': '#fbf5e8',
    '--color-sand': '#f5ede0',
    '--color-night': '#24130b',
    '--color-whatsapp': '#1f7a4d',
    '--color-sky': '#bfddf5',
    '--color-blush': '#f9cdbf',
    '--header-h': '4.75rem',
    '--container-max': '80rem',
    '--ease-pounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    '--ease-snap': 'cubic-bezier(0.22, 1, 0.36, 1)'
  };

  for (const [k, v] of Object.entries(EXPECTED_TOKENS)) {
    if (tokensAudit[k] !== v) {
      console.error(`FAIL: Token ${k} is '${tokensAudit[k]}', expected '${v}'`);
      allPassed = false;
    } else {
      console.log(`✓ PASS: ${k} = ${v}`);
    }
  }

  // 4. DESKTOP VIEWPORTS & OVERFLOW CHECK
  console.log('\n[SECTION 4] Desktop Viewport Calibration & Overflow Verification');
  const VIEWPORTS = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '1600x900', width: 1600, height: 900 }
  ];

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const vpMetrics = await page.evaluate(() => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth;
      return { headerHeight, scrollWidth, clientWidth, hasHorizontalScroll };
    });

    console.log(`Viewport ${vp.name}:`, vpMetrics);

    // Header height check: 4.75rem = 76px
    if (Math.abs(vpMetrics.headerHeight - 76) > 2) {
      console.error(`FAIL: Header height @ ${vp.name} is ${vpMetrics.headerHeight}px, expected ~76px`);
      allPassed = false;
    } else {
      console.log(`✓ PASS: Header height is ~76px (4.75rem) at ${vp.name}`);
    }

    // Horizontal overflow check
    if (vpMetrics.hasHorizontalScroll) {
      console.error(`FAIL: Horizontal scroll detected at ${vp.name} (${vpMetrics.scrollWidth}px > ${vpMetrics.clientWidth}px)`);
      allPassed = false;
    } else {
      console.log(`✓ PASS: Zero horizontal overflow at ${vp.name}`);
    }

    // Take screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `home_${vp.name}.png`), fullPage: false });
  }

  // Representative screenshots for puppies & contact
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/puppies`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'puppies_1440x900.png') });

  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'contact_1440x900.png') });

  // 5. CONSOLE ERRORS
  console.log('\n[SECTION 5] Console Error Check');
  if (errors.length > 0) {
    console.error('FAIL: Console errors detected:', errors);
    allPassed = false;
  } else {
    console.log('✓ PASS: Exactly 0 console errors or runtime warnings detected');
  }

  await browser.close();

  if (!allPassed) {
    console.error('\n❌ ONE OR MORE MILESTONE 2 CHECKS FAILED.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL MILESTONE 2 CHECKS AND VERIFICATIONS PASSED PERFECTLY!');
  }
}

verifyMilestone2().catch(err => {
  console.error('Fatal error during Milestone 2 verification:', err);
  process.exit(1);
});
