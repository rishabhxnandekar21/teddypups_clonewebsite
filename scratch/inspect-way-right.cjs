const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const rightStart = html.indexOf('tp-way--right');
if (rightStart !== -1) {
  console.log(html.substring(rightStart - 30, rightStart + 2500));
}
