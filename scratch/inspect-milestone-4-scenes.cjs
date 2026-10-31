const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const REF_DIR = path.resolve('audit_screenshots/reference_milestone4');
fs.mkdirSync(REF_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- Inspecting Homepage Scenes 1, 2, 3 on Live Reference ---');
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // wait for curtain lift

  // 1. Scene 1: Meet the pups (Doors)
  const doorsInfo = await page.evaluate(() => {
    const section = document.querySelector('section[aria-labelledby="pups-title"], section:has(.tp-door), [class*="door"]')?.closest('section');
    if (!section) return null;
    const door = section.querySelector('.tp-door, [class*="door"]');
    return {
      sectionHtml: section.outerHTML.slice(0, 3000),
      doorHtml: door ? door.outerHTML.slice(0, 2000) : null,
      sectionHeading: section.querySelector('h2')?.innerText
    };
  });
  console.log('Scene 1 Doors heading:', doorsInfo?.sectionHeading);

  // Scroll to Scene 1 and capture screenshot
  const doorsEl = await page.$('section:has(.tp-door), [class*="door"]');
  if (doorsEl) {
    await doorsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(REF_DIR, 'scene1_doors_ref.png') });
  }

  // 2. Scene 2: Your puppy journey (Phone)
  const phoneInfo = await page.evaluate(() => {
    const section = document.querySelector('section:has([class*="phone"]), section:has([class*="journey"]), section:has([class*="msg"])');
    if (!section) return null;
    const phone = section.querySelector('[class*="phone"], [class*="mockup"], [class*="screen"]');
    return {
      sectionHtml: section.outerHTML.slice(0, 4000),
      phoneHtml: phone ? phone.outerHTML.slice(0, 2500) : null,
      sectionHeading: section.querySelector('h2')?.innerText
    };
  });
  console.log('Scene 2 Phone heading:', phoneInfo?.sectionHeading);

  const phoneEl = await page.$('section:has([class*="phone"]), section:has([class*="journey"])');
  if (phoneEl) {
    await phoneEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(REF_DIR, 'scene2_phone_ref.png') });
  }

  // 3. Scene 3: Passport trust book
  const passportInfo = await page.evaluate(() => {
    const section = document.querySelector('section:has([class*="passport"]), section:has([class*="trust"]), section:has([class*="stamp"])');
    if (!section) return null;
    const book = section.querySelector('[class*="passport"], [class*="book"]');
    return {
      sectionHtml: section.outerHTML.slice(0, 4000),
      bookHtml: book ? book.outerHTML.slice(0, 2500) : null,
      sectionHeading: section.querySelector('h2')?.innerText
    };
  });
  console.log('Scene 3 Passport heading:', passportInfo?.sectionHeading);

  const passportEl = await page.$('section:has([class*="passport"]), section:has([class*="trust"])');
  if (passportEl) {
    await passportEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(REF_DIR, 'scene3_passport_ref.png') });
  }

  // 4. Scene 4: FAQ Night Scene
  console.log('\n--- Inspecting FAQ Scene 4 on Live Reference ---');
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const faqInfo = await page.evaluate(() => {
    const scene = document.querySelector('.tp-scene, [class*="faqroom"], [class*="night"]');
    const stars = Array.from(document.querySelectorAll('[class*="twinkle"], [class*="star"]')).map(s => s.outerHTML.slice(0, 200));
    const mascot = document.querySelector('[class*="mascot"], [class*="wonder"], [class*="float"]');
    return {
      sceneClass: scene?.className,
      sceneStyle: scene?.getAttribute('style'),
      starsCount: stars.length,
      sampleStars: stars.slice(0, 4),
      mascotHtml: mascot ? mascot.outerHTML.slice(0, 1000) : null
    };
  });
  console.log('Scene 4 FAQ stars count:', faqInfo?.starsCount);
  await page.screenshot({ path: path.join(REF_DIR, 'scene4_faq_ref.png') });

  // 5. Scene 5: Contact Airmail / Postbox
  console.log('\n--- Inspecting Contact Scene 5 on Live Reference ---');
  await page.goto('https://puppy.instabizweb.com/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const contactInfo = await page.evaluate(() => {
    const postSection = document.querySelector('[class*="post"], form, [class*="letter"]');
    return {
      postHtml: postSection ? postSection.outerHTML.slice(0, 3000) : null
    };
  });
  console.log('Scene 5 Contact HTML snippet available:', !!contactInfo?.postHtml);
  await page.screenshot({ path: path.join(REF_DIR, 'scene5_contact_ref.png') });

  // Save the full inspection JSON
  fs.writeFileSync(
    path.resolve('scratch/reference-m4-scenes.json'),
    JSON.stringify({ doorsInfo, phoneInfo, passportInfo, faqInfo, contactInfo }, null, 2)
  );
  console.log('\nSaved full inspection to scratch/reference-m4-scenes.json');

  await browser.close();
})();
