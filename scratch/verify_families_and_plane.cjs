const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("=== 1. VERIFYING HAPPY FAMILIES ===");
  await page.goto('http://localhost:5174/happy-families', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Check how many images exist and are loaded
  const familyData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('.tp-polaroid img'));
    const paws = Array.from(document.querySelectorAll('svg[class*="wallPaw"]'));
    const items = Array.from(document.querySelectorAll('li[class*="wallItem"]'));

    const samplePaw = paws[0] ? window.getComputedStyle(paws[0]) : null;
    const samplePrint = items[0] ? items[0].querySelector('button') : null;
    const samplePrintStyle = samplePrint ? window.getComputedStyle(samplePrint) : null;

    return {
      imageCount: images.length,
      imagesNaturalWidthOk: images.filter(img => img.naturalWidth > 0).length,
      pawsCount: paws.length,
      itemsCount: items.length,
      samplePawComputed: samplePaw ? {
        position: samplePaw.position,
        top: samplePaw.top,
        left: samplePaw.left,
        width: samplePaw.width,
        height: samplePaw.height,
        color: samplePaw.color,
        opacity: samplePaw.opacity,
        zIndex: samplePaw.zIndex
      } : null,
      samplePrintComputed: samplePrintStyle ? {
        position: samplePrintStyle.position,
        background: samplePrintStyle.background,
        border: samplePrintStyle.border
      } : null
    };
  });
  console.log("Happy Families Data:", JSON.stringify(familyData, null, 2));

  // Take screenshot of the top section and middle gallery of happy families
  await page.screenshot({ path: path.join(__dirname, 'families_top.png') });
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'families_gallery.png') });
  console.log("Happy Families screenshots captured.");

  console.log("\n=== 2. VERIFYING HOW IT WORKS AIRPLANE SCROLL ANIMATION ===");
  await page.goto('http://localhost:5174/how-it-works', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll through the delivery section and track the plane transform and opacity
  const planeData = await page.evaluate(async () => {
    const flightScene = document.querySelector('[class*="flightScene"]');
    const svgG = flightScene ? flightScene.querySelector('svg > g[transform]') : null;
    const section = document.querySelector('#delivery');

    if (!flightScene || !svgG) {
      return { error: 'flightScene or svgG not found' };
    }

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;

    const scrollSteps = [
      sectionTop - 800,
      sectionTop - 400,
      sectionTop - 100,
      sectionTop + 100,
      sectionTop + 300,
      sectionTop + 600
    ];

    const records = [];
    for (const sy of scrollSteps) {
      window.scrollTo(0, sy);
      await new Promise(r => setTimeout(r, 40));
      const fRect = flightScene.getBoundingClientRect();
      records.push({
        scrollY: sy,
        flightSceneTop: Math.round(fRect.top),
        transform: svgG.getAttribute('transform'),
        opacity: svgG.style.opacity
      });
    }

    return records;
  });

  console.log("Airplane Scroll Progress:", JSON.stringify(planeData, null, 2));

  // Capture screenshot of airplane midway along the flight path
  const deliverySection = await page.$('#delivery');
  if (deliverySection) {
    await deliverySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, 'hiw_airplane_flight.png') });
    console.log("Airplane flight screenshot captured.");
  }

  await browser.close();
})();
