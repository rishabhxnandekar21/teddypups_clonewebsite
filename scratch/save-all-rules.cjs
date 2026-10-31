const fs = require('fs');

const css = JSON.parse(fs.readFileSync('scratch/m4-css-rules.json', 'utf8'));

fs.writeFileSync('scratch/all-extracted-rules.txt', 
  '=== SCENE 1: DOORS ===\n' + css.doorRules.join('\n\n') + '\n\n' +
  '=== SCENE 2: PHONE ===\n' + css.phoneRules.join('\n\n') + '\n' + (css.phoneKeyframes || []).join('\n\n') + '\n\n' +
  '=== SCENE 3: PASSPORT ===\n' + css.passportRules.join('\n\n') + '\n' + (css.passportKeyframes || []).join('\n\n') + '\n\n' +
  '=== SCENE 4: FAQ ===\n' + css.faqRules.join('\n\n') + '\n' + (css.faqKeyframes || []).join('\n\n') + '\n\n' +
  '=== SCENE 5: CONTACT / POST ===\n' + css.postRules.join('\n\n') + '\n' + (css.postKeyframes || []).join('\n\n')
);

console.log('Saved all-extracted-rules.txt, size:', fs.statSync('scratch/all-extracted-rules.txt').size);
