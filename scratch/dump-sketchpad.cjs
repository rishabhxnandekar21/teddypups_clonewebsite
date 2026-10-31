async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const idx = html.indexOf('tp-sketchpad');
  if (idx !== -1) {
    console.log('tp-sketchpad found:');
    console.log(html.slice(idx - 100, idx + 1200));
  }
}

main().catch(console.error);
