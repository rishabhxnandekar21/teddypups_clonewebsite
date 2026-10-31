const fs = require('fs');
const moments = JSON.parse(fs.readFileSync('scratch/all-64-moments.json', 'utf8'));

moments.forEach((m, idx) => {
  if (m.caption) {
    console.log(`Index ${idx} (${m.id}): "${m.caption}"`);
  }
});
