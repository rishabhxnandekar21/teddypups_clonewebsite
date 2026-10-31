const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const matches = [...js.matchAll(/heading:"([^"]+)",body:"([^"]+)"/g)];
  matches.forEach(m => console.log('Heading:', m[1], 'Body:', m[2]));
}

main().catch(console.error);
