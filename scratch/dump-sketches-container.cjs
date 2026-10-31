async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const idx = html.indexOf('tp-sketches');
  if (idx !== -1) {
    console.log('tp-sketches found:');
    console.log(html.slice(idx - 100, idx + 1000));
  }
}

main().catch(console.error);
