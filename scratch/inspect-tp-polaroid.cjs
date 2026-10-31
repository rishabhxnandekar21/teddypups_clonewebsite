const fs = require('fs');
const html = fs.readFileSync('scratch/live-happy-families.html', 'utf8');

const regex = /<([a-z0-9]+)[^>]*class="[^"]*tp-polaroid[^"]*"[^>]*>([\s\S]*?)<\/\1>/g;
const items = [...html.matchAll(regex)].map(m => ({ tag: m[1], content: m[2], full: m[0] }));
console.log('Matches with tp-polaroid:', items.length);
if (items.length > 0) {
  console.log('Tag name:', items[0].tag);
  console.log('First 3 items:');
  items.slice(0, 3).forEach((item, i) => {
    console.log(`\n--- ITEM ${i} ---`);
    console.log(item.full.slice(0, 400));
  });
}
