async function main() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  for (const s of scriptMatches) {
    const url = s.startsWith('http') ? s : 'https://puppy.instabizweb.com' + s;
    const jsRes = await fetch(url);
    const js = await jsRes.text();
    if (js.includes('tp-trail')) {
      console.log('Found tp-trail in script:', s);
      const idx = js.indexOf('tp-trail');
      console.log(js.slice(Math.max(0, idx - 100), idx + 200));
    }
  }
}

main().catch(console.error);
