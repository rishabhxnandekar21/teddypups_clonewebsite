const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const stageMatch = html.match(/<div class="tp-hero__stage">([\s\S]*?)<\/section>/);
if (stageMatch) {
  console.log(stageMatch[0].replace(/<path d="[^"]+"/g, '<path d="..."').slice(0, 3000));
}
