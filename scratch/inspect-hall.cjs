const fs = require('fs');

const html = fs.readFileSync('scratch/scene1-doors.html', 'utf8');

// Let's check classes around tp-meet
const match = html.match(/class="tp-meet[^"]*"/g);
console.log('Matches:', match);

// Let's inspect the entire head/hall part of scene 1
console.log('--- Scene 1 structure: ---');
console.log(html.slice(0, 2500));
