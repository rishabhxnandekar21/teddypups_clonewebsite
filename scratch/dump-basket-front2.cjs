const fs = require('fs');
const html = fs.readFileSync('scratch/live-basket.html', 'utf8');

const lastSvgIdx = html.lastIndexOf('<svg');
console.log('Last SVG in basket:\n', html.slice(lastSvgIdx));
