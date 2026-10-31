const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const match = html.match(/<section[^>]*class="[^"]*tp-paths[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (match) {
  console.log('tp-paths found, length:', match[0].length);
  // print structure
  const clean = match[0].replace(/<path d="[^"]+"/g, '<path d="..."');
  console.log(clean.slice(0, 3000));
} else {
  console.log('tp-paths not found');
}
