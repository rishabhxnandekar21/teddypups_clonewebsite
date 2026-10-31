const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const stageStart = html.indexOf('<div class="tp-hero__stage">');
const stageEnd = html.indexOf('</section>', stageStart);
const stageHtml = html.substring(stageStart, stageEnd);

// Let's list the children of stage
console.log('--- DIRECT CHILDREN OR CLASSES INSIDE tp-hero__stage ---');
const regex = /<([a-z0-9]+)\s+[^>]*class="([^"]*)"/gi;
let m;
const classes = [];
while ((m = regex.exec(stageHtml)) !== null) {
  classes.push(`${m[1]}.${m[2]}`);
}
console.log([...new Set(classes)].join('\n'));

// Let's check the mascot or quilt
console.log('\n--- AFTER UL IN STAGE ---');
const ulEnd = stageHtml.indexOf('</ul>');
console.log(stageHtml.substring(ulEnd + 5, ulEnd + 2500));
