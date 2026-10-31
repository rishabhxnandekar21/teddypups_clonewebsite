const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/happy-families');
  const html = await res.text();
  fs.writeFileSync('scratch/live-happy-families.html', html);
  console.log('Saved live-happy-families.html, length:', html.length);

  // Extract all figures or polaroid captions and images
  const regex = /<figure[^>]*class="[^"]*tp-polaroid[^"]*"[^>]*>([\s\S]*?)<\/figure>/g;
  const figures = [...html.matchAll(regex)].map(m => m[1]);
  console.log('Found figures count:', figures.length);

  const moments = [];
  figures.forEach((f, idx) => {
    const srcMatch = f.match(/src="([^"]+)"/);
    const captionMatch = f.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
    moments.push({
      id: `f-${idx + 1}`,
      image: `/media/families/family-${idx + 1}.jpg`,
      caption: captionMatch ? captionMatch[1].trim() : '',
    });
  });

  fs.writeFileSync('scratch/live-moments.json', JSON.stringify(moments, null, 2));
  console.log('Saved 64 moments into scratch/live-moments.json');
}

main().catch(console.error);
