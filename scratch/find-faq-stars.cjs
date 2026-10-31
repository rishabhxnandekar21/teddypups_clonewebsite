const fs = require('fs');

const s4 = fs.readFileSync('scratch/scene4-faq.html', 'utf8');

// Search for any twinkle or star elements
const matches = [...s4.matchAll(/class="[^"]*twinkle[^"]*"/g)].map(m => m[0]);
console.log('Twinkle matches:', matches.length, matches);

// Check if stars are in the header or section background
const starMatches = [...s4.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log('Total SVGs in FAQ:', starMatches.length);
starMatches.forEach((s, i) => console.log(`SVG ${i}:`, s.slice(0, 100)));
