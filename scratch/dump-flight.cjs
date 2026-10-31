const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const match = html.match(/<div class="tp-flight">([\s\S]*?)<\/div>/);
if (match) {
  fs.writeFileSync('scratch/live-flight.html', match[0]);
  console.log('Saved live-flight.html, length:', match[0].length);
  // print structure without long image src
  const simplified = match[0].replace(/srcSet="[^"]+"/g, '').replace(/src="data:[^"]+"/g, 'src="data:..."');
  console.log(simplified.slice(0, 3000));
}
