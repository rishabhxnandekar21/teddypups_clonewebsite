const fs = require('fs');
const content = fs.readFileSync('src/data/families.js', 'utf8');

const ids = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total moments in families.js:', ids.length);
console.log('Sample ids:', ids.slice(0, 5), '...', ids.slice(-5));
