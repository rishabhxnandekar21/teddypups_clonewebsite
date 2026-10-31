const fs = require('fs');

async function main() {
  const s = 'https://puppy.instabizweb.com/_next/static/chunks/1r-q3nrxl-xzq.js';
  const js = await (await fetch(s)).text();
  const idx = js.indexOf('function({puppies:');
  if (idx !== -1) {
    console.log(js.slice(idx, idx + 1000));
  } else {
    const postIdx = js.indexOf('className:"tp-post"');
    console.log(js.slice(postIdx - 1500, postIdx));
  }
}

main().catch(console.error);
