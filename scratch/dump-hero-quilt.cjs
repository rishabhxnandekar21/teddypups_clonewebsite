const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const heroIdx = html.indexOf('class="tp-scene tp-hero"');
const heroEnd = html.indexOf('</section>', heroIdx);
const heroHtml = html.slice(heroIdx, heroEnd);
const ulIdx = heroHtml.lastIndexOf('</ul>');
console.log('After last </ul> in hero:\n', heroHtml.slice(ulIdx));
