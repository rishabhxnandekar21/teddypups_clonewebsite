const fs = require('fs');
const html = fs.readFileSync('scratch/ref_families_full.html', 'utf8');
const footStart = html.indexOf('tp-memories__foot');
console.log('footStart:', footStart);
if (footStart !== -1) {
  console.log(html.slice(footStart - 10, footStart + 1200));
}
