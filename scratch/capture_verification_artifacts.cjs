const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const artifactDir = 'C:\\Users\\risha\\.gemini\\antigravity\\brain\\962ecb7c-22a5-4f7b-8efd-16ca45d0d993';

  // 1. HAPPY FAMILIES - LOCAL vs REF
  console.log("Capturing Happy Families...");
  const pageLoc = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLoc.goto('http://localhost:5174/happy-families', { waitUntil: 'networkidle' });
  await pageLoc.evaluate(() => window.scrollTo(0, 480));
  await pageLoc.waitForTimeout(400);
  const locFamPath = path.join(artifactDir, 'fix_happy_families_loc.png');
  await pageLoc.screenshot({ path: locFamPath });

  const pageRef = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageRef.goto('https://puppy.instabizweb.com/happy-families', { waitUntil: 'networkidle' });
  await pageRef.evaluate(() => window.scrollTo(0, 480));
  await pageRef.waitForTimeout(400);
  const refFamPath = path.join(artifactDir, 'fix_happy_families_ref.png');
  await pageRef.screenshot({ path: refFamPath });

  // 2. HOW IT WORKS AIRPLANE - LOCAL vs REF
  console.log("Capturing How It Works Airplane...");
  const pageHiwLoc = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHiwLoc.goto('http://localhost:5174/how-it-works#delivery', { waitUntil: 'networkidle' });
  // Scroll so delivery section is centered in viewport
  await pageHiwLoc.evaluate(() => {
    const sec = document.querySelector('#delivery');
    sec.scrollIntoView({ block: 'center' });
  });
  await pageHiwLoc.waitForTimeout(400);
  const locPlanePath = path.join(artifactDir, 'fix_hiw_airplane_loc.png');
  await pageHiwLoc.screenshot({ path: locPlanePath });

  const pageHiwRef = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHiwRef.goto('https://puppy.instabizweb.com/how-it-works#delivery', { waitUntil: 'networkidle' });
  await pageHiwRef.evaluate(() => {
    const sec = document.querySelector('#delivery');
    sec.scrollIntoView({ block: 'center' });
  });
  await pageHiwRef.waitForTimeout(400);
  const refPlanePath = path.join(artifactDir, 'fix_hiw_airplane_ref.png');
  await pageHiwRef.screenshot({ path: refPlanePath });

  console.log("All paired screenshots captured successfully.");
  await browser.close();
})();
