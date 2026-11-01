const fs = require('fs');
const src = fs.readFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\ref_puplayer_chunk.js', 'utf8');

const pos = src.indexOf('querySelectorAll("[data-pup-stop]")');
console.log(src.slice(pos - 300, pos + 1000));
