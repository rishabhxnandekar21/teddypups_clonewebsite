const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const classes = ['tp-fork', 'tp-way', 'tp-sign', 'tp-window'];
classes.forEach(cls => {
  const re = new RegExp('[^{}]*' + cls + '[^{}]*\\{[^{}]*\\}', 'g');
  const m = css.match(re) || [];
  console.log(`\n--- ${cls} RULES ---`);
  m.forEach(r => console.log(r.trim()));
});
