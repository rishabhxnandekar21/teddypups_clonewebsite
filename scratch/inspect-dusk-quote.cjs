const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const duskIdx = html.indexOf('tp-dusk');
if (duskIdx !== -1) {
  const duskSlice = html.substring(duskIdx, duskIdx + 3000);
  console.log(duskSlice.replace(/<path d="[^"]+"/g, '<path d="..."'));
}
