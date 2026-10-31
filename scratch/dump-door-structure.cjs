const fs = require('fs');

const html = fs.readFileSync('scratch/scene1-doors.html', 'utf8');

// Print section container
const secMatch = html.match(/<section[^>]*>/);
console.log('Section tag:', secMatch ? secMatch[0] : 'not found');

// Print header
const headerMatch = html.match(/<header[^>]*>[\s\S]*?<\/header>/);
console.log('Header tag:\n', headerMatch ? headerMatch[0] : 'not found');

// Print first door
const firstDoor = html.match(/<li class="tp-door"[^>]*>[\s\S]*?<\/li>/);
console.log('First door:\n', firstDoor ? firstDoor[0] : 'not found');

// Print the last door (all puppies door if any)
const lastDoor = html.match(/<li class="tp-door tp-door--all"[^>]*>[\s\S]*?<\/li>/);
console.log('All door:\n', lastDoor ? lastDoor[0] : 'not found');
