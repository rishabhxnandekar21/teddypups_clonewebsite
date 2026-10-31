const fs = require('fs');

async function main() {
  const css = fs.readFileSync('scratch/reference-full.css', 'utf8');
  const planeRules = css.match(/[^{}]*(?:plane|flight|skyline|postcard|tp-paths)[^{}]*\{[^{}]*\}/gi) || [];
  console.log('--- CSS RULES FOR PLANE/PATHS ---');
  planeRules.forEach(r => console.log(r.trim()));

  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  for (const s of scriptMatches) {
    const url = s.startsWith('http') ? s : 'https://puppy.instabizweb.com' + s;
    const jsRes = await fetch(url);
    const js = await jsRes.text();
    if (js.includes('plane') && js.includes('paths') || js.includes('tp-plane')) {
      console.log('\nFound plane in script:', s);
      let idx = 0;
      while ((idx = js.indexOf('tp-plane', idx)) !== -1) {
        console.log('\n--- MATCH at ' + idx + ' ---');
        console.log(js.slice(Math.max(0, idx - 150), idx + 600));
        idx += 8;
      }
    }
  }
}

main().catch(console.error);
