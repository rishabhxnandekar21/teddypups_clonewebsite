const fs = require('fs');

const text = fs.readFileSync('scratch/exact-rules.txt', 'utf8');
const lines = text.split('\n');
const s1Lines = [];
let inS1 = false;
for (const line of lines) {
  if (line.includes('SEARCH: tp-meet, tp-door')) inS1 = true;
  else if (line.includes('SEARCH: tp-chat')) break;
  if (inS1) s1Lines.push(line);
}
console.log(s1Lines.join('\n'));
