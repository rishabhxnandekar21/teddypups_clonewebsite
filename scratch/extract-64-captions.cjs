const fs = require('fs');
const html = fs.readFileSync('scratch/live-happy-families.html', 'utf8');

const allBtns = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[0]);
const polaroidBtns = allBtns.filter(b => b.includes('tp-polaroid'));

console.log('Total polaroids extracted:', polaroidBtns.length);

const moments = [];
polaroidBtns.forEach((btn, i) => {
  const captionMatch = btn.match(/class="tp-polaroid__caption[^"]*"[^>]*>([\s\S]*?)<\/span>/);
  const caption = captionMatch ? captionMatch[1].trim() : '';
  const altMatch = btn.match(/alt="([^"]*)"/);
  const alt = altMatch ? altMatch[1] : '';
  moments.push({
    id: `f-${i + 1}`,
    image: `/media/families/family-${i + 1}.jpg`,
    caption: caption,
    alt: alt || 'Happy puppy family',
  });
});

console.log('Sample moments with captions:');
moments.slice(0, 15).forEach(m => console.log(m.id, '->', JSON.stringify(m.caption)));
const withCaptions = moments.filter(m => m.caption.length > 0);
console.log(`Moments with non-empty captions: ${withCaptions.length} / ${moments.length}`);

fs.writeFileSync('scratch/all-64-moments.json', JSON.stringify(moments, null, 2));
