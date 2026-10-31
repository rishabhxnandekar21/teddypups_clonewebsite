const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('Your letter is on its way');
  if (idx !== -1) {
    console.log(js.slice(idx - 50, idx + 200));
  } else {
    // search for heading:
    const matches = [...js.matchAll(/heading:([^,]+),body:([^,}]+)/g)];
    console.log('Matches:', matches.map(m => m[0]));
  }
}

main().catch(console.error);
