async function main() {
  const jsRes = await fetch('https://puppy.instabizweb.com/_next/static/chunks/177ya708_1zuj.js');
  const js = await jsRes.text();
  const idx = js.indexOf('RouteCurtain');
  console.log(js.slice(Math.max(0, idx - 400), idx + 2000));
}

main().catch(console.error);
