const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('"sent"===');
  console.log(js.slice(idx, idx + 1200));
}

main().catch(console.error);
