const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/faq');
  const html = await res.text();
  console.log('FAQ HTML length:', html.length);
  const matches = [...html.matchAll(/class="[^"]*twinkle[^"]*"/g)].map(m => m[0]);
  console.log('Matches for twinkle in SSR HTML:', matches.length);

  // Search for any star SVG
  const starSvgs = [...html.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
  console.log('Total SVGs in /faq HTML:', starSvgs.length);
  starSvgs.forEach((s, i) => {
    if (s.includes('twinkle') || s.includes('star') || s.includes('polygon') || s.includes('path')) {
      console.log(`SVG ${i}:`, s.slice(0, 150));
    }
  });
}

main().catch(err => console.error(err));
