const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/reference-m4-scenes.json', 'utf8'));

// Doors
const doorsHtml = data.doorsInfo.sectionHtml;
const doorMatches = Array.from(doorsHtml.matchAll(/class="font-plush tp-door__name">([^<]+)</g)).map(m => m[1]);
console.log('Door puppy names:', doorMatches);

// Check if there is an "all puppies" door at the end
console.log('Has all puppies card?', doorsHtml.includes('tp-door--all') || doorsHtml.includes('tp-door__all'));

// Check phone messages in Scene 2
const phoneHtml = data.phoneInfo.sectionHtml;
const msgs = Array.from(phoneHtml.matchAll(/<div class="[^"]*tp-msg[^"]*"[^>]*>([\s\S]*?)<\/div>/g)).map(m => m[1].replace(/<[^>]+>/g, ' ').trim());
console.log('\nPhone messages found:', msgs);

// Check phone full HTML structure
console.log('\nPhone HTML snippet:');
console.log(data.phoneInfo.phoneHtml ? data.phoneInfo.phoneHtml.slice(0, 1000) : 'None');

// Check Passport full HTML structure
console.log('\nPassport HTML snippet:');
console.log(data.passportInfo.bookHtml ? data.passportInfo.bookHtml.slice(0, 1000) : 'None');
