const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const skylineIdx = html.indexOf('tp-way__skyline');
if (skylineIdx !== -1) {
  const svgSlice = html.substring(skylineIdx - 30, skylineIdx + 600);
  console.log(svgSlice);
}
