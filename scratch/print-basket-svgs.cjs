const fs = require('fs');
const html = fs.readFileSync('scratch/live-basket.html', 'utf8');

// print the svgs in live-basket.html
const svgs = [...html.matchAll(/<svg[^>]*class="tp-basket[^"]*"[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log('Basket SVGs count:', svgs.length);
svgs.forEach((s, i) => {
  console.log(`\n--- SVG ${i} ---`);
  console.log(s);
});
