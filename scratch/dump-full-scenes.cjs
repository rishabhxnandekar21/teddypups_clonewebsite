const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home page
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const homeScenes = await page.evaluate(() => {
    const meet = document.querySelector('section.tp-meet, section[aria-labelledby="meet-title"]');
    const chat = document.querySelector('section.tp-chat, section[aria-labelledby="journey-title"]');
    const passport = document.querySelector('section.tp-passport, section[aria-labelledby="trust-title"]');
    return {
      meetHtml: meet ? meet.outerHTML : null,
      chatHtml: chat ? chat.outerHTML : null,
      passportHtml: passport ? passport.outerHTML : null
    };
  });

  if (homeScenes.meetHtml) fs.writeFileSync('scratch/scene1-doors.html', homeScenes.meetHtml);
  if (homeScenes.chatHtml) fs.writeFileSync('scratch/scene2-phone.html', homeScenes.chatHtml);
  if (homeScenes.passportHtml) fs.writeFileSync('scratch/scene3-passport.html', homeScenes.passportHtml);
  console.log('Saved scenes 1, 2, 3 HTML files');

  // 2. FAQ page
  await page.goto('https://puppy.instabizweb.com/faq', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const faqHtml = await page.evaluate(() => {
    const faq = document.querySelector('.tp-faqroom');
    return faq ? faq.outerHTML : null;
  });
  if (faqHtml) fs.writeFileSync('scratch/scene4-faq.html', faqHtml);
  console.log('Saved scene 4 FAQ HTML file');

  // 3. Contact page
  await page.goto('https://puppy.instabizweb.com/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const contactHtml = await page.evaluate(() => {
    const post = document.querySelector('.tp-post') || document.querySelector('form');
    return post ? post.outerHTML : null;
  });
  if (contactHtml) fs.writeFileSync('scratch/scene5-contact.html', contactHtml);
  console.log('Saved scene 5 Contact HTML file');

  await browser.close();
})();
