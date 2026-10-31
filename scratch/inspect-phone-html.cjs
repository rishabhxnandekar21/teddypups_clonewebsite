const fs = require('fs');

const html = fs.readFileSync('scratch/scene2-phone.html', 'utf8');

// Find the phone element in scene 2
const phoneMatch = html.match(/<div class="tp-phone"[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
console.log('--- PHONE HTML ---');
console.log(phoneMatch ? phoneMatch[0].slice(0, 4000) : 'not found');
