async function main() {
  const res = await fetch('https://puppy.instabizweb.com/puppies');
  const html = await res.text();
  const article = html.match(/<article[^>]*>[\s\S]*?<\/article>/);
  if (article) {
    console.log('Article found:\n', article[0].slice(0, 1500));
  } else {
    // maybe li or a
    const match = html.match(/href="\/puppies\/[^"]*"[^>]*>[\s\S]*?<\/(?:a|li|div)>/);
    if (match) console.log('Puppy link found:\n', match[0].slice(0, 1500));
  }
}

main().catch(console.error);
