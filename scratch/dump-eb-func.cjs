const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js');
  const js = await res.text();
  const idx = js.indexOf('function eb(');
  if (idx !== -1) {
    console.log(js.slice(idx, idx + 1500));
  } else {
    const idx2 = js.indexOf('eb=');
    console.log(js.slice(idx2, idx2 + 1500));
  }
}

main().catch(console.error);
