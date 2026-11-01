const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VERIFY_DIR = 'audit_screenshots/visual_fidelity/pass1_verify_mode/doors';
if (!fs.existsSync(VERIFY_DIR)) {
  fs.mkdirSync(VERIFY_DIR, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const refContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const refPage = await refContext.newPage();
  const locPage = await locContext.newPage();

  await refPage.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await locPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll to doors pinned section
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 100, behavior: 'instant' });
  });
  await locPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 100, behavior: 'instant' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  // Capture initial view
  await refPage.screenshot({ path: path.join(VERIFY_DIR, 'ref_doors_scroll_start.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, 'loc_doors_scroll_start.png') });

  // Test hovering door 1 and door 2 by moving mouse to bounding box
  const testIndices = [1, 2];
  for (const idx of testIndices) {
    const refDoor = await refPage.$(`.tp-meet .tp-door:nth-child(${idx})`);
    const locDoor = await locPage.$(`[class*="doorsGrid"] > *:nth-child(${idx})`);

    if (refDoor) {
      const box = await refDoor.boundingBox();
      if (box) {
        await refPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await refPage.waitForTimeout(400);
        await refPage.screenshot({ path: path.join(VERIFY_DIR, `ref_door_${idx}_hover.png`) });
      }
    }

    if (locDoor) {
      const box = await locDoor.boundingBox();
      if (box) {
        await locPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await locPage.waitForTimeout(400);
        await locPage.screenshot({ path: path.join(VERIFY_DIR, `loc_door_${idx}_hover.png`) });
      }
    }
  }

  // Also scroll 50% through the doors horizontal track to inspect mid doors (doors 6-10)
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 1200, behavior: 'instant' });
  });
  await locPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 1200, behavior: 'instant' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(VERIFY_DIR, 'ref_doors_scroll_mid.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, 'loc_doors_scroll_mid.png') });

  // And scroll to end of doors (doors 11-16)
  await refPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 2500, behavior: 'instant' });
  });
  await locPage.evaluate(() => {
    const el = document.querySelector('.tp-meet');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 2500, behavior: 'instant' });
  });
  await refPage.waitForTimeout(500);
  await locPage.waitForTimeout(500);

  await refPage.screenshot({ path: path.join(VERIFY_DIR, 'ref_doors_scroll_end.png') });
  await locPage.screenshot({ path: path.join(VERIFY_DIR, 'loc_doors_scroll_end.png') });

  console.log('Door screenshots completed successfully.');
  await browser.close();
})();
