const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/contact')).text();
  const idx = html.indexOf('tp-letterform');
  console.log(html.slice(idx - 200, idx + 200));

  // Search for RSC flight payload strings
  const matches = [...html.matchAll(/"heading":"([^"]+)","body":"([^"]+)"/g)];
  console.log('Matches:', matches.map(m => ({ heading: m[1], body: m[2] })));
}

main().catch(console.error);
