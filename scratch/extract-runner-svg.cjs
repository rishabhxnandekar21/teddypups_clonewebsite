const fs = require('fs');
const html = fs.readFileSync('scratch/live-curtain.html', 'utf8');

const runnerMatch = html.match(/<div class="tp-curtain__runner">([\s\S]*?)<\/div>/);
if (runnerMatch) {
  fs.writeFileSync('scratch/runner-exact.svg', runnerMatch[1].trim());
  console.log('Saved runner-exact.svg, length:', runnerMatch[1].length);
}
