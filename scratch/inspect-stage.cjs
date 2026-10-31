const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const stageStart = html.indexOf('<div class="tp-hero__stage">');
if (stageStart !== -1) {
  const stageEnd = html.indexOf('</section>', stageStart);
  const stageHtml = html.substring(stageStart, stageEnd);
  // remove huge base64 data URIs
  const clean = stageHtml.replace(/data:image\/[^"]+/g, 'data:image/...');
  console.log(clean.slice(0, 4000));
}
