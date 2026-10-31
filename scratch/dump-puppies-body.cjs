async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const idx = html.indexOf('tp-sketchbook__head');
  console.log(html.slice(idx + 1500, idx + 3500));
}

main().catch(console.error);
