const fs = require('fs');

const text = fs.readFileSync('scratch/clean-rules.txt', 'utf8');
const lines = text.split('\n');
const s3Lines = [];
let inS3 = false;
for (const line of lines) {
  if (line.includes('=== SCENE 3: PASSPORT RULES ===')) inS3 = true;
  else if (line.includes('=== SCENE 4: FAQ RULES ===')) break;
  if (inS3) s3Lines.push(line);
}
console.log(s3Lines.join('\n'));
