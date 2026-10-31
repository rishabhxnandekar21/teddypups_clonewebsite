const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('tp-post__envelope');
  console.log(js.slice(idx - 3000, idx - 1000));
}

main().catch(console.error);
