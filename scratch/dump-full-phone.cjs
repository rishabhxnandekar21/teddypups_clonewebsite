const fs = require('fs');

const html = fs.readFileSync('scratch/scene2-phone.html', 'utf8');
const phoneIdx = html.indexOf('<div class="tp-phone"');
const endPhone = html.indexOf('</section>', phoneIdx);
console.log(html.slice(phoneIdx, endPhone));
