const fs = require('fs');
const html = fs.readFileSync('scratch/ref_dusk_full.html', 'utf8');

// Print from char 1000 to 4000
console.log(html.substring(1000, 3500));
