const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function findKeyframes(names) {
  for (const n of names) {
    const idx = css.indexOf('@keyframes ' + n);
    if (idx !== -1) {
      console.log('--- KEYFRAME ' + n + ' ---');
      console.log(css.slice(idx, idx + 400));
    }
  }
}

findKeyframes(['tp-tag-swing', 'tp-tag-nudge']);
