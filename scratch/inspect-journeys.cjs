const fs = require('fs');
const html = fs.readFileSync('scratch/live-how-it-works.html', 'utf8');

const jMatch = html.match(/<section[^>]*class="[^"]*tp-journeys[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (jMatch) {
  // simplify by removing svgs
  console.log(jMatch[0].replace(/<svg[\s\S]*?<\/svg>/g, '<svg>...</svg>').slice(0, 4000));
}
