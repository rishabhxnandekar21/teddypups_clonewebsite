const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const match = html.match(/<div class="tp-basket">([\s\S]*?)<\/div>\s*<\/div>/);
if (match) {
  fs.writeFileSync('scratch/live-basket.html', match[0]);
  console.log('Saved live-basket.html, length:', match[0].length);
  // print paths
  const paths = [...match[0].matchAll(/<path d="([^"]+)"[^>]*class="([^"]+)"/g)].map(m => ({ cls: m[2], d: m[1] }));
  console.log('Paths found:', paths);
}
