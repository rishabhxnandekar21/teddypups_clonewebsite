const fs = require('fs');

const css = JSON.parse(fs.readFileSync('scratch/m4-css-rules.json', 'utf8'));

console.log('--- ALL DOOR RULES ---');
css.doorRules.forEach((r, i) => console.log(`${i}: ${r}`));
