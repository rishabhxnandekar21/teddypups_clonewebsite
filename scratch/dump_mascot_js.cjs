const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js';
https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find where pup-actor or data-pup-stop is
    const idx = data.indexOf('pup-layer');
    if (idx !== -1) {
      const slice = data.substring(Math.max(0, idx - 1000), idx + 4000);
      fs.writeFileSync(path.join(__dirname, 'mascot_logic.js'), slice);
      console.log('Saved mascot_logic.js');
    }
  });
});
