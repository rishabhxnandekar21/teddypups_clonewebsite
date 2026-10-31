const fs = require('fs');

function inspectScene5() {
  const html = fs.readFileSync('scratch/scene5-contact.html', 'utf8');
  console.log('--- SCENE 5 SVGs ---');
  const svgs = [...html.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
  console.log('Scene 5 SVG count:', svgs.length);
  svgs.forEach((s, i) => console.log(`SVG ${i}:`, s.slice(0, 150), '... length:', s.length));
}

function inspectScene4() {
  const html = fs.readFileSync('scratch/scene4-faq.html', 'utf8');
  console.log('\n--- SCENE 4 STARS & WONDER ---');
  const stars = [...html.matchAll(/<svg[^>]*class="[^"]*tp-twinkle[^"]*"[^>]*>[\s\S]*?<\/svg>/g)].map(m => m[0]);
  console.log('Scene 4 Stars count:', stars.length);
  if (stars[0]) console.log('Star sample:', stars[0]);
}

function inspectScene3() {
  const html = fs.readFileSync('scratch/scene3-passport.html', 'utf8');
  console.log('\n--- SCENE 3 STAMPS & PUPPY ---');
  const stamps = [...html.matchAll(/<div class="tp-stamp[^"]*"[^>]*>[\s\S]*?<\/div>/g)].map(m => m[0]);
  console.log('Scene 3 stamps count:', stamps.length);
  stamps.forEach((st, i) => console.log(`Stamp ${i}:`, st.slice(0, 150)));
}

inspectScene5();
inspectScene4();
inspectScene3();
