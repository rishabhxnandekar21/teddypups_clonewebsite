async function main() {
  const res = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js');
  const js = await res.text();
  const idx = js.indexOf('scrollYProgress');
  console.log(js.slice(idx, idx + 1600));
}

main().catch(console.error);
