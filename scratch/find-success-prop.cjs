const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('success:');
  console.log(js.slice(idx - 100, idx + 400));
}

main().catch(console.error);
