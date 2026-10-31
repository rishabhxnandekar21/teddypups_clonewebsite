async function main() {
  const res = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js');
  const js = await res.text();
  const idx = js.indexOf('tp-door');
  console.log(js.slice(Math.max(0, idx - 800), idx + 1200));
}

main().catch(console.error);
