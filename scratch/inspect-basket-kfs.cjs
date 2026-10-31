const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const kfs = ['tp-breathe', 'tp-blink-open', 'tp-blink-shut', 'tp-ear-twitch', 'tp-peek', 'tp-pop-up', 'tp-sunrise'];
kfs.forEach(kf => {
  const re = new RegExp('@keyframes\\s+' + kf + '\\s*\\{[\\s\\S]*?\\n\\}', 'g');
  const m = css.match(re);
  if (m) console.log(m[0]);
  else console.log('Not found:', kf);
});
