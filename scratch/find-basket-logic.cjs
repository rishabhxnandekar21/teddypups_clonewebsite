const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  for (const s of scriptMatches) {
    const url = s.startsWith('http') ? s : 'https://puppy.instabizweb.com' + s;
    const jsRes = await fetch(url);
    const js = await jsRes.text();
    if (js.includes('basket') || js.includes('tp-basket')) {
      console.log('Found basket in script:', s);
      let idx = 0;
      while ((idx = js.indexOf('basket', idx)) !== -1) {
        console.log('\n--- MATCH at ' + idx + ' ---');
        console.log(js.slice(Math.max(0, idx - 150), idx + 500));
        idx += 6;
      }
    }
  }
}

main().catch(console.error);
