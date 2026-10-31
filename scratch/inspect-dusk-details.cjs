const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*tp-dusk[^{}]*\{[^{}]*\}/g) || [];
console.log('--- TP-DUSK RULES ---');
matches.forEach(m => console.log(m.trim()));

// Let's also check in live-homepage.html
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');
const duskMatch = html.match(/<section[^>]*class="[^"]*tp-dusk[^"]*"[^>]*>/);
if (duskMatch) {
  console.log('tp-dusk tag:', duskMatch[0]);
}
