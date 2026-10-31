const fs = require('fs');
const html = fs.readFileSync('scratch/live-curtain.html', 'utf8');

const simplified = html.replace(/<path d="[^"]+"/g, '<path d="..."');
console.log(simplified.slice(3000));
