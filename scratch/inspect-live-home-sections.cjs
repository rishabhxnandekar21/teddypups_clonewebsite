const fs = require('fs');

async function inspectLiveReference() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  fs.writeFileSync('scratch/live-homepage.html', html);
  console.log('Saved live-homepage.html, length:', html.length);

  // Let's inspect sections on the homepage
  const sectionClasses = [...html.matchAll(/<section[^>]*class="([^"]*)"[^>]*>/g)].map(m => m[1]);
  console.log('\nHomepage Section classes:\n', sectionClasses);
}

inspectLiveReference().catch(console.error);
