const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/ref_dusk_data.json', 'utf8'));

console.log('duskHeight:', data.duskHeight);
console.log('wallStyles:', data.wallStyles);
console.log('printsStyles:', data.printsStyles);
console.log('itemCount:', data.itemCount);
console.log('items:');
data.items.forEach(it => {
  console.log(`- #${it.idx}: ${it.caption} | tape: ${it.tapeClass} | tilt: ${it.polaroidStyle}`);
});
