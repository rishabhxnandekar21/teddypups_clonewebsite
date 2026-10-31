const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/how-it-works');
  const html = await res.text();
  fs.writeFileSync('scratch/live-how-it-works.html', html);
  console.log('Saved live-how-it-works.html, length:', html.length);
}

main().catch(console.error);
