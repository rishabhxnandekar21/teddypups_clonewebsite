const fs = require('fs');
const html = fs.readFileSync('scratch/live-happy-families.html', 'utf8');

// find all buttons that have tp-polaroid or list items
const btns = [...html.matchAll(/<button[^>]*aria-label="View photo[^"]*"[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[0]);
console.log('Button matches count:', btns.length);

if (btns.length === 0) {
  // try finding all button tags in the gallery
  const allBtns = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[0]);
  console.log('All buttons in html:', allBtns.length);
  const polaroidBtns = allBtns.filter(b => b.includes('tp-polaroid'));
  console.log('Buttons with tp-polaroid:', polaroidBtns.length);
  if (polaroidBtns.length > 0) {
    console.log('Sample button:\n', polaroidBtns[0].slice(0, 500));
  }
} else {
  console.log('Sample button:\n', btns[0].slice(0, 500));
}
