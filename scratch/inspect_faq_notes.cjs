const fs = require('fs');
const html = fs.readFileSync('scratch/ref_faq_full.html', 'utf8');

const match = html.match(/<ol[^>]*class="[^"]*notes[^"]*"[^>]*>[\s\S]*?<\/ol>/i) ||
              html.match(/<ul[^>]*class="[^"]*notes[^"]*"[^>]*>[\s\S]*?<\/ul>/i) ||
              html.match(/<div[^>]*class="[^"]*board[^"]*"[^>]*>[\s\S]*?<\/div>/i);

if (match) {
  console.log('Matched list tag:', match[0].slice(0, 1000));
} else {
  const idx = html.indexOf('tp-note');
  console.log('Around tp-note:', html.slice(idx - 200, idx + 800));
}
