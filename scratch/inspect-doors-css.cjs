const fs = require('fs');

const html = fs.readFileSync('scratch/scene1-doors.html', 'utf8');

// Let's inspect the CSS classes on tp-meet and tp-meet__track
const meetClasses = html.match(/class="tp-meet[^"]*"/);
console.log('Meet classes:', meetClasses ? meetClasses[0] : null);

// Look for overflow, scroll, or flex in track
const trackMatch = html.match(/class="tp-meet__track[^"]*"/);
console.log('Track classes:', trackMatch ? trackMatch[0] : null);

// Check CSS rules for tp-meet in scratch/m4-css-rules.json
const css = JSON.parse(fs.readFileSync('scratch/m4-css-rules.json', 'utf8'));
const meetRules = css.doorRules.filter(r => r.includes('tp-meet') || r.includes('tp-door'));
console.log('\nRelevant CSS Rules count:', meetRules.length);
meetRules.forEach(r => console.log(r));
