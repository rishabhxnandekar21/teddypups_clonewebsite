const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/contact');
  const html = await res.text();
  console.log('Contact HTML length:', html.length);
  
  // Find everything inside tp-post
  const postIdx = html.indexOf('class="tp-post"');
  if (postIdx !== -1) {
    console.log('--- FOUND tp-post ---');
    console.log(html.slice(postIdx, postIdx + 4000));
  } else {
    console.log('tp-post not found directly, looking for form');
    const formIdx = html.indexOf('class="tp-letterform"');
    if (formIdx !== -1) {
      console.log(html.slice(formIdx - 100, formIdx + 3000));
    }
  }

  // Look for envelope or postbox SVGs
  const svgs = [...html.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
  console.log('Total SVGs on /contact:', svgs.length);
  svgs.forEach((s, i) => {
    if (s.includes('envelope') || s.includes('box') || s.includes('flag') || s.includes('post') || s.includes('stamp')) {
      console.log(`Matching SVG ${i}:`, s.slice(0, 150));
    }
  });
}

main().catch(console.error);
