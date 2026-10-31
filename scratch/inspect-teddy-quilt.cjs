const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const teddyStart = html.indexOf('tp-hero__teddy');
if (teddyStart !== -1) {
  const stageEnd = html.indexOf('</section>', teddyStart);
  console.log(html.substring(teddyStart - 30, stageEnd));
}
