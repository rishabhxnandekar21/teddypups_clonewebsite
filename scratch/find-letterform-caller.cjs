const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/contact')).text();
  const scriptUrls = [...html.matchAll(/src="([^"]*\/_next\/static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]);

  for (let s of scriptUrls) {
    if (s.startsWith('/')) s = 'https://puppy.instabizweb.com' + s;
    const js = await (await fetch(s)).text();
    if (js.includes('LetterForm') && !s.includes('1r-q3nrxl-xzq.js')) {
      console.log('Found in', s);
      const idx = js.indexOf('LetterForm');
      console.log(js.slice(idx, idx + 600));
    }
  }
}

main().catch(console.error);
