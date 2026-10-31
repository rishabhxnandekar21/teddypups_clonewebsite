const fs = require('fs');

const html = fs.readFileSync('scratch/scene3-passport.html', 'utf8');

// Find all elements with class tp-stamp
const stampMatches = [...html.matchAll(/<div class="tp-stamp [^"]*"[^>]*>[\s\S]*?<\/div>/g)].map(m => m[0]);
console.log('Stamp matches count:', stampMatches.length);
stampMatches.forEach((s, i) => console.log(`\n--- STAMP ${i} ---\n`, s));
