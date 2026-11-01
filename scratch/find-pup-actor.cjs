const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  for (const s of scriptMatches) {
    const url = s.startsWith('http') ? s : 'https://puppy.instabizweb.com' + s;
    const jsRes = await fetch(url);
    const js = await jsRes.text();
    if (js.includes('pup-actor')) {
      console.log('Found pup-actor in:', s);
      const idx = js.indexOf('pup-actor');
      console.log(js.slice(Math.max(0, idx - 400), idx + 800));
    }
  }
}

main().catch(console.error);
