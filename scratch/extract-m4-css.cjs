const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  
  const rules = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    let allCss = '';
    for (const href of links) {
      try {
        const res = await fetch(href);
        allCss += await res.text() + '\n';
      } catch (e) {}
    }
    
    function extract(pattern) {
      const regex = new RegExp('[^{}]*' + pattern + '[^{}]*\\{[^}]*\\}', 'g');
      return (allCss.match(regex) || []);
    }
    
    function extractKeyframes(namePattern) {
      const regex = new RegExp('@keyframes\\s+[^{}]*' + namePattern + '[^{}]*\\{(?:[^{}]*\\{[^{}]*\\})*\\}', 'g');
      return (allCss.match(regex) || []);
    }

    return {
      doorRules: extract('tp-door'),
      doorKeyframes: extractKeyframes('door'),
      phoneRules: extract('tp-chat|tp-phone|tp-screen|tp-msg'),
      phoneKeyframes: extractKeyframes('msg|typing|dot'),
      passportRules: extract('tp-book|tp-passport|tp-stamp'),
      passportKeyframes: extractKeyframes('stamp|book'),
      faqRules: extract('tp-faqroom|tp-twinkle'),
      faqKeyframes: extractKeyframes('twinkle|float'),
      postRules: extract('tp-post|tp-letter|tp-env'),
      postKeyframes: extractKeyframes('letter|env|flap|flag|fold')
    };
  });
  
  fs.writeFileSync(path.resolve('scratch/m4-css-rules.json'), JSON.stringify(rules, null, 2));
  console.log('Saved m4-css-rules.json');
  console.log('Door rules count:', rules.doorRules.length);
  console.log('Phone rules count:', rules.phoneRules.length);
  console.log('Passport rules count:', rules.passportRules.length);
  console.log('FAQ rules count:', rules.faqRules.length);
  console.log('Post rules count:', rules.postRules.length);

  await browser.close();
})();
