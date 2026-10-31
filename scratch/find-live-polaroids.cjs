const fs = require('fs');
const html = fs.readFileSync('scratch/live-happy-families.html', 'utf8');

const matches = [...html.matchAll(/class="[^"]*polaroid[^"]*"/g)].map(m => m[0]);
console.log('Polaroid class matches count:', matches.length);
if (matches.length > 0) console.log('Sample:', matches.slice(0, 5));

const tpMatches = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(m => m[0]);
console.log('li count:', tpMatches.length);
const sampleLi = tpMatches.find(l => l.includes('family-') || l.includes('families'));
if (sampleLi) console.log('Sample li:\n', sampleLi.slice(0, 500));
