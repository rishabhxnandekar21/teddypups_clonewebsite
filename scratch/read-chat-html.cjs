const fs = require('fs');
const html = fs.readFileSync('scratch/ref_chat_full.html', 'utf8');

// Print first 2000 chars of ref_chat_full.html
console.log(html.substring(0, 2500));
