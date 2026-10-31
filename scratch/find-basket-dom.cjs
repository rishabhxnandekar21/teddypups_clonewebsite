const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const idx = html.indexOf('tp-basket');
if (idx !== -1) {
  console.log('tp-basket found:\n', html.slice(idx - 100, idx + 2000).replace(/<path d="[^"]+"/g, '<path d="..."'));
} else {
  console.log('tp-basket not found in live-homepage.html');
}
