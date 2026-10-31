const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/gone-home')).text();
  console.log('Gone Home HTML size:', html.length);
  // Look for cards
  const matches = [...html.matchAll(/class="([^"]*pass[^"]*|[^"]*alumni[^"]*|[^"]*tag[^"]*|[^"]*card[^"]*)"/g)].map(m => m[1]);
  console.log('Matching classes:', [...new Set(matches)]);

  // Look for links to puppies
  const pupLinks = [...html.matchAll(/href="(\/puppies\/[^"]+)"/g)].map(m => m[1]);
  console.log('Puppy links count:', pupLinks.length, pupLinks.slice(0, 5));

  // Let's print snippet around first puppy link
  if (pupLinks.length > 0) {
    const idx = html.indexOf(pupLinks[0]);
    console.log('\nSnippet around puppy link:\n', html.slice(idx - 200, idx + 800));
  }
}

main().catch(console.error);
