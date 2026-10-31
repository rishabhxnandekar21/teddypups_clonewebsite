const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('.heading');
  console.log(js.slice(idx - 600, idx + 400));
}

main().catch(console.error);
