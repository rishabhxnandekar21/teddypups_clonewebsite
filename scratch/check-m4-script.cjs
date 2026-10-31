const fs = require('fs');

const code = fs.readFileSync('scratch/inspect-milestone-4-scenes.cjs', 'utf8');
const faqSection = code.indexOf('Scene 4');
console.log(code.slice(faqSection, faqSection + 1500));
