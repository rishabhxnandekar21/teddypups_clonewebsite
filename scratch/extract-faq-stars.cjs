const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/faq');
  const html = await res.text();
  const starRegex = /<svg viewBox="0 0 40 40" class="tp-twinkle[^"]*"[^>]*>[\s\S]*?<\/svg>/g;
  const stars = [...html.matchAll(starRegex)].map(m => m[0]);
  console.log('Total stars found:', stars.length);
  stars.forEach((s, i) => console.log(`Star ${i}: ${s}`));
}

main().catch(console.error);
