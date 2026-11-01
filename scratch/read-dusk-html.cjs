const fs = require('fs');
const html = fs.readFileSync('scratch/ref_dusk_full.html', 'utf8');

// Print first 1500 chars and find polaroid elements
console.log('Opening:', html.substring(0, 1000));
const polaroids = html.match(/<li[\s\S]*?<\/li>/g) || [];
console.log('Total <li> elements:', polaroids.length);
polaroids.forEach((p, i) => {
  const cap = p.match(/class="tp-polaroid__caption[^"]*">([\s\S]*?)<\/span>/);
  console.log(`- #${i+1}: ${cap ? cap[1].trim() : 'no caption'}`);
});
