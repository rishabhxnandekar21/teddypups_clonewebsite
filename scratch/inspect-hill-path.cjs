const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const hillIdx = html.indexOf('tp-footer__hill');
if (hillIdx !== -1) {
  const hillSlice = html.substring(hillIdx - 30, hillIdx + 400);
  console.log(hillSlice);
}
