const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const footerStart = html.indexOf('<footer');
if (footerStart !== -1) {
  const footerEnd = html.indexOf('</footer>', footerStart);
  console.log('Footer length:', footerEnd - footerStart);
  const footerHtml = html.substring(footerStart, footerEnd + 9);
  console.log(footerHtml.replace(/<path d="[^"]+"/g, '<path d="..."').slice(0, 3000));
}
