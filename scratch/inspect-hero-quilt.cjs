const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const idx = html.indexOf('class="tp-hero__teddy"');
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 2500).replace(/<path d="[^"]+"/g, '<path d="..."'));
}
