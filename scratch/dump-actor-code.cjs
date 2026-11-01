const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js');
  const js = await res.text();
  const idx = js.indexOf('pup-actor');
  console.log(js.slice(Math.max(0, idx - 1800), idx + 200));
}

main().catch(console.error);
