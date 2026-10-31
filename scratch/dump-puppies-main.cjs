async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const mainIdx = html.indexOf('<main');
  console.log(html.slice(mainIdx, mainIdx + 2500));
}

main().catch(console.error);
