const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/reference-m4-scenes.json', 'utf8'));

console.log('================== SCENE 1: DOORS ==================');
console.log('Section HTML snippet:');
console.log(data.doorsInfo.sectionHtml.slice(0, 1500));

console.log('\n================== SCENE 2: PHONE JOURNEY ==================');
console.log('Section HTML snippet:');
console.log(data.phoneInfo.sectionHtml.slice(0, 1500));

console.log('\n================== SCENE 3: PASSPORT BOOK ==================');
console.log('Section HTML snippet:');
console.log(data.passportInfo.sectionHtml.slice(0, 1500));

console.log('\n================== SCENE 4: FAQ NIGHT SCENE ==================');
console.log('Scene class:', data.faqInfo.sceneClass);
console.log('Scene style:', data.faqInfo.sceneStyle);
console.log('Mascot HTML:', data.faqInfo.mascotHtml);
console.log('Sample Stars:', data.faqInfo.sampleStars);

console.log('\n================== SCENE 5: CONTACT POSTBOX ==================');
console.log('Post HTML:');
console.log(data.contactInfo.postHtml.slice(0, 1500));
