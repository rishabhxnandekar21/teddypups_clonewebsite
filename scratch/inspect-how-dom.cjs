const fs = require('fs');
const html = fs.readFileSync('scratch/live-how-it-works.html', 'utf8');

const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
if (mainMatch) {
  const mainContent = mainMatch[1];
  console.log('Main length:', mainContent.length);
  const sections = [...mainContent.matchAll(/<section[^>]*class="([^"]*)"[^>]*>/g)].map(m => m[1]);
  console.log('Sections:\n', sections);
  const trails = [...mainContent.matchAll(/<[^>]*class="[^"]*tp-trail[^"]*"[^>]*>/g)].map(m => m[0]);
  console.log('Trails:\n', trails);
}
