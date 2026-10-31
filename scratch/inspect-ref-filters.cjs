async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const formMatch = html.match(/<form[^>]*>[\s\S]*?<\/form>/) || html.match(/role="group"[\s\S]*?<\/div>/);
  if (formMatch) {
    console.log(formMatch[0].slice(0, 1000));
  } else {
    // search for 'Where' or 'Breed'
    const idx = html.indexOf('Where');
    if (idx !== -1) console.log(html.slice(idx - 100, idx + 800));
  }
}

main().catch(console.error);
