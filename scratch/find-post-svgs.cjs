const fs = require('fs');

// Search chunks for tp-post__envelope or postbox svg
const files = ['scratch/reference-full.css'];
// Also search Next.js chunk JS files if any
async function checkChunks() {
  const html = await (await fetch('https://puppy.instabizweb.com/contact')).text();
  const scriptUrls = [...html.matchAll(/src="([^"]*\/_next\/static\/chunks\/[^"]+\.js)"/g)].map(m => m[1]);
  console.log('Script URLs count:', scriptUrls.length);

  for (let s of scriptUrls) {
    if (s.startsWith('/')) s = 'https://puppy.instabizweb.com' + s;
    const js = await (await fetch(s)).text();
    if (js.includes('tp-post__envelope') || js.includes('tp-post__box')) {
      console.log('Found in script:', s);
      const idx = js.indexOf('tp-post__envelope');
      console.log(js.slice(Math.max(0, idx - 200), idx + 800));
    }
  }
}

checkChunks().catch(console.error);
