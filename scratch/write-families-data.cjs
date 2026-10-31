const fs = require('fs');

const moments = JSON.parse(fs.readFileSync('scratch/all-64-moments.json', 'utf8'));

const out = `// ============================================================
// TeddyPups UAE — Happy Families Testimonials & Moments
// Verified from https://puppy.instabizweb.com/happy-families (64 verified moments)
// ============================================================

export const featuredReview = {
  quote:
    'TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.',
  author: 'Sarah M.',
  location: 'Dubai, UAE',
  date: 'Verified Client',
};

export const moments = ${JSON.stringify(moments, null, 2)};
`;

fs.writeFileSync('src/data/families.js', out);
console.log('Successfully wrote src/data/families.js with 64 moments!');
