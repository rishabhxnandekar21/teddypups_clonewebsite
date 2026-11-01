const fs = require('fs');
const html = fs.readFileSync('scratch/ref_hiw_full.html', 'utf8');

// Find sections in ref_hiw_full.html
const sectionRegex = /<section[\s\S]*?<\/section>/g;
const sections = html.match(sectionRegex) || [];

console.log('Total sections in main:', sections.length);
sections.forEach((sec, i) => {
  const openingTag = sec.match(/<section[^>]*>/)[0];
  const h2 = sec.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/);
  console.log(`\nSection ${i + 1}: ${openingTag}`);
  if (h2) console.log(`  Heading: ${h2[1].replace(/<[^>]+>/g, '').trim()}`);
  console.log(`  Length: ${sec.length}`);
});
