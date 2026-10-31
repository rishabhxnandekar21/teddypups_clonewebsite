const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  console.log('Scripts:', scriptMatches);
  for (const s of scriptMatches) {
    const url = s.startsWith('http') ? s : 'https://puppy.instabizweb.com' + s;
    const jsRes = await fetch(url);
    const js = await jsRes.text();
    if (js.includes('curtain') || js.includes('tp-curtain')) {
      console.log('Found curtain in script:', s);
      const idx = js.indexOf('curtain');
      console.log(js.slice(Math.max(0, idx - 100), idx + 300));
    }
  }
}

main().catch(console.error);
