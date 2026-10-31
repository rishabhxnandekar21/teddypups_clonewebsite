const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/contact')).text();
  const scripts = [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)].map(m => m[1]);
  for (let s of scripts) {
    if (s.includes('LetterForm') || s.includes('success')) {
      console.log('Found script chunk:');
      const unescaped = s.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      const idx = unescaped.indexOf('success');
      if (idx !== -1) {
        console.log(unescaped.slice(idx - 100, idx + 400));
      }
    }
  }
}

main().catch(console.error);
