const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function extractRulesFor(terms) {
  const results = [];
  // Scan through CSS looking for selector matching any term
  // A CSS rule is roughly: [selectors] { [declarations] }
  let i = 0;
  while (i < css.length) {
    const openBrace = css.indexOf('{', i);
    if (openBrace === -1) break;

    // Check what is between i and openBrace
    const selectorCandidate = css.slice(i, openBrace).trim();

    // Check if this is an @keyframes or @media or standard rule
    if (selectorCandidate.startsWith('@keyframes')) {
      // Find matching outer brace
      let depth = 1;
      let j = openBrace + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') depth--;
        j++;
      }
      const fullKeyframe = css.slice(i, j).trim();
      if (terms.some(t => fullKeyframe.includes(t))) {
        results.push(fullKeyframe);
      }
      i = j;
      continue;
    }

    if (selectorCandidate.startsWith('@media')) {
      // It's a media query; advance i to inside the media query
      i = openBrace + 1;
      continue;
    }

    // Standard rule: find matching close brace
    const closeBrace = css.indexOf('}', openBrace);
    if (closeBrace === -1) break;

    const fullRule = css.slice(i, closeBrace + 1).trim();
    if (terms.some(t => fullRule.includes(t))) {
      results.push(fullRule);
    }
    i = closeBrace + 1;
  }
  return results;
}

console.log('=== SCENE 2: PHONE & CHAT RULES ===');
const s2 = extractRulesFor(['tp-chat', 'tp-phone', 'tp-msg', 'tp-typing', 'tp-dot']);
s2.forEach(r => console.log(r));

console.log('\n=== SCENE 3: PASSPORT RULES ===');
const s3 = extractRulesFor(['tp-book', 'tp-passport', 'tp-stamp']);
s3.forEach(r => console.log(r));

console.log('\n=== SCENE 4: FAQ RULES ===');
const s4 = extractRulesFor(['tp-faqroom', 'tp-twinkle', 'tp-float']);
s4.forEach(r => console.log(r));

console.log('\n=== SCENE 5: CONTACT RULES ===');
const s5 = extractRulesFor(['tp-post', 'tp-letter', 'tp-env', 'tp-flap', 'tp-flag']);
s5.forEach(r => console.log(r));
