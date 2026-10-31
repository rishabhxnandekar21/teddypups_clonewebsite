const fs = require('fs');

const mediaFiles = fs.readdirSync('public/media');
console.log('Total files in public/media:', mediaFiles.length);
const familyFiles = mediaFiles.filter(f => f.includes('family') || f.includes('happy') || f.includes('client'));
console.log('Files with family/happy/client:', familyFiles.length);

const allWebp = mediaFiles.filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
console.log('All image files in public/media:', allWebp.length);
console.log('Sample images:', allWebp.slice(0, 20));
