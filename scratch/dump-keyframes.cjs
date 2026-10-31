const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const targetKeys = [
  'tp-breathe',
  'tp-blink-open',
  'tp-blink-shut',
  'tp-ear-twitch',
  'tp-sunrise',
  'tp-peek',
  'tp-pop-up',
  'tp-plane-bob'
];

targetKeys.forEach(name => {
  const start = css.indexOf(`@keyframes ${name}{`);
  if (start !== -1) {
    let braceCount = 0;
    let end = start;
    for (let i = start; i < css.length; i++) {
      if (css[i] === '{') braceCount++;
      else if (css[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i + 1;
          break;
        }
      }
    }
    console.log(css.slice(start, end));
  } else {
    console.log(`Keyframe ${name} not found`);
  }
});
