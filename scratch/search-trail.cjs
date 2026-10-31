const fs = require('fs');

const files = fs.readdirSync('scratch').filter(f => f.endsWith('.html'));
for (const f of files) {
  const content = fs.readFileSync('scratch/' + f, 'utf8');
  if (content.includes('tp-trail')) {
    console.log(`Found tp-trail in ${f}`);
    const matches = [...content.matchAll(/<[^>]*class="[^"]*tp-trail[^"]*"[^>]*>/g)].map(m => m[0]);
    console.log(matches);
  }
}
