const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const heroMatch = html.match(/<section[^>]*class="[^"]*tp-hero[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (heroMatch) {
  console.log('Hero section outer length:', heroMatch[0].length);
  // Remove long SVG paths to inspect DOM tree
  const clean = heroMatch[0].replace(/<path d="[^"]+"/g, '<path d="..."');
  console.log('\n--- HERO DOM TREE ---\n', clean.slice(0, 3500));
}

console.log('\n--- LINEUP RULES ---');
const lineupRules = css.match(/[^{}]*tp-lineup[^{}]*\{[^{}]*\}/g) || [];
lineupRules.forEach(r => console.log(r.trim()));
