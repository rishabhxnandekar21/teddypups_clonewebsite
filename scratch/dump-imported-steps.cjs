const fs = require('fs');
const html = fs.readFileSync('scratch/live-how-it-works.html', 'utf8');

const impMatch = html.match(/id="panel-imported"[\s\S]*?<\/ol>/);
if (impMatch) {
  console.log(impMatch[0].replace(/<svg[\s\S]*?<\/svg>/g, '<svg>...</svg>'));
}
