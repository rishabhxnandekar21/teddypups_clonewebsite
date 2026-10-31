const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/contact')).text();
  const idx = html.indexOf('tp-letterform__greeting');
  console.log(html.slice(idx - 400, idx + 400));
}

main().catch(console.error);
