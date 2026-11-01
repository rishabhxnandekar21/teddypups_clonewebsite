const fs = require('fs');
const html = fs.readFileSync('scratch/ref_hiw_full.html', 'utf8');

const deliveryMatch = html.match(/<section id="delivery"[\s\S]*?<\/section>/);
if (deliveryMatch) {
  fs.writeFileSync('scratch/ref_delivery_section.html', deliveryMatch[0]);
  console.log('Saved ref_delivery_section.html, size:', deliveryMatch[0].length);
}

const promiseMatch = html.match(/<section id="promise"[\s\S]*?<\/section>/);
if (promiseMatch) {
  fs.writeFileSync('scratch/ref_promise_section.html', promiseMatch[0]);
  console.log('Saved ref_promise_section.html, size:', promiseMatch[0].length);
}

const whyMatch = html.match(/<section id="why"[\s\S]*?<\/section>/);
if (whyMatch) {
  fs.writeFileSync('scratch/ref_why_section.html', whyMatch[0]);
  console.log('Saved ref_why_section.html, size:', whyMatch[0].length);
}

const boardMatch = html.match(/<section aria-labelledby="care-title"[\s\S]*?<\/section>/);
if (boardMatch) {
  fs.writeFileSync('scratch/ref_board_section.html', boardMatch[0]);
  console.log('Saved ref_board_section.html, size:', boardMatch[0].length);
}
