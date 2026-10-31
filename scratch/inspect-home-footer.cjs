const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const match = html.match(/<section[^>]*class="[^"]*tp-home[^"]*"[^>]*>([\s\S]*?)<\/section>/);
if (match) {
  console.log('tp-home found, length:', match[0].length);
  const clean = match[0].replace(/<path d="[^"]+"/g, '<path d="..."');
  console.log(clean.slice(0, 3000));
}

// Also check the footer tag
const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/);
if (footerMatch) {
  console.log('\n--- FOOTER TAG ---\n', footerMatch[0].slice(0, 1500));
}
