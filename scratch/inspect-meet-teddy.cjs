const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const meetStart = html.indexOf('tp-meet');
const meetEnd = html.indexOf('</section>', meetStart);
const meetHtml = html.substring(meetStart, meetEnd);

const teddyIdx = meetHtml.indexOf('tp-meet__teddy');
console.log('tp-meet__teddy found?', teddyIdx);
if (teddyIdx !== -1) {
  console.log(meetHtml.substring(teddyIdx - 30, teddyIdx + 1200));
}
