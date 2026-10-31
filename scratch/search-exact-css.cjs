const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function findRules(keywords) {
  // Split CSS into top-level rules or search with regex
  console.log(`\n================ SEARCH: ${keywords.join(', ')} ================`);
  const regex = new RegExp(`([^{}@]*(${keywords.join('|')})[^{}]*\\{[^{}]*\\})`, 'g');
  let match;
  let count = 0;
  while ((match = regex.exec(css)) !== null) {
    console.log(match[1]);
    count++;
  }
  console.log(`Total found: ${count}`);
}

function findKeyframes(names) {
  console.log(`\n================ KEYFRAMES: ${names.join(', ')} ================`);
  const regex = new RegExp(`(@keyframes\\s+(${names.join('|')})\\s*\\{[\\s\\S]*?\\}\\s*\\})`, 'g');
  let match;
  let count = 0;
  while ((match = regex.exec(css)) !== null) {
    console.log(match[1]);
    count++;
  }
  console.log(`Total found: ${count}`);
}

// Scene 1: Doors
findRules(['tp-meet', 'tp-door']);
findKeyframes(['tp-door-open']);

// Scene 2: Phone
findRules(['tp-chat', 'tp-phone', 'tp-msg', 'tp-chips', 'tp-chip', 'tp-typing']);
findKeyframes(['tp-msg', 'tp-dot', 'dot']);

// Scene 3: Passport
findRules(['tp-passport', 'tp-book', 'tp-stamp']);
findKeyframes(['tp-stamp-in', 'tp-stamp-thump']);

// Scene 4: FAQ
findRules(['tp-faqroom', 'tp-twinkle', 'tp-notes']);
findKeyframes(['tp-twinkle', 'tp-float', 'float']);

// Scene 5: Contact
findRules(['tp-post', 'tp-letter', 'tp-env']);
findKeyframes(['tp-letter-fold', 'tp-env-in', 'tp-env-post', 'tp-flag', 'tp-flap']);
