const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const match = html.match(/<section[^>]*class="[^"]*tp-dusk[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (match) {
  console.log('tp-dusk outer section:\n', match[0].slice(0, 1500));
}
