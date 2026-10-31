const fs = require('fs');

const css = JSON.parse(fs.readFileSync('scratch/m4-css-rules.json', 'utf8'));

console.log('=== SCENE 2: PHONE CSS RULES ===');
css.phoneRules.forEach((r, i) => console.log(`${i}: ${r}`));
console.log('Phone Keyframes:');
css.phoneKeyframes.forEach((k, i) => console.log(`${i}: ${k}`));

console.log('\n=== SCENE 3: PASSPORT CSS RULES ===');
css.passportRules.forEach((r, i) => console.log(`${i}: ${r}`));
console.log('Passport Keyframes:');
css.passportKeyframes.forEach((k, i) => console.log(`${i}: ${k}`));

console.log('\n=== SCENE 4: FAQ CSS RULES ===');
css.faqRules.forEach((r, i) => console.log(`${i}: ${r}`));
console.log('FAQ Keyframes:');
css.faqKeyframes.forEach((k, i) => console.log(`${i}: ${k}`));

console.log('\n=== SCENE 5: POST/CONTACT CSS RULES ===');
css.postRules.forEach((r, i) => console.log(`${i}: ${r}`));
console.log('Post Keyframes:');
css.postKeyframes.forEach((k, i) => console.log(`${i}: ${k}`));
