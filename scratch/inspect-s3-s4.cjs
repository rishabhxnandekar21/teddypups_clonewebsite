const fs = require('fs');

const s3 = fs.readFileSync('scratch/scene3-passport.html', 'utf8');
console.log('Scene 3 snippet:\n', s3.slice(0, 2000));

const s4 = fs.readFileSync('scratch/scene4-faq.html', 'utf8');
console.log('Scene 4 snippet:\n', s4.slice(0, 2000));
