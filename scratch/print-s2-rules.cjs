const fs = require('fs');

const text = fs.readFileSync('scratch/exact-rules.txt', 'utf8');
const lines = text.split('\n');
const s2Lines = [];
let inS2 = false;
for (const line of lines) {
  if (line.includes('SEARCH: tp-chat')) inS2 = true;
  else if (line.includes('SEARCH: tp-passport')) break;
  if (inS2) s2Lines.push(line);
}
console.log(s2Lines.slice(0, 50).join('\n'));
