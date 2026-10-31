async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const idx = html.indexOf('tp-gone-strip');
  if (idx !== -1) {
    console.log(html.slice(idx - 100, idx + 1200));
  } else {
    console.log('tp-gone-strip not found in /puppies');
    const idx2 = html.indexOf('Already gone home');
    if (idx2 !== -1) console.log(html.slice(idx2 - 100, idx2 + 800));
  }
}

main().catch(console.error);
