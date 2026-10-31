const fs = require('fs');

const files = fs.readdirSync('public/media/families');
console.log('Total files in public/media/families:', files.length);
console.log('Sample file names:\n', files.slice(0, 10));

const dataContent = fs.readFileSync('src/data/families.js', 'utf8');
console.log('families.js preview:\n', dataContent.slice(0, 800));
