const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function find(terms) {
  const matches = [];
  let i = 0;
  while (i < css.length) {
    const ob = css.indexOf('{', i);
    if (ob === -1) break;
    const sel = css.slice(i, ob).trim();
    if (sel.startsWith('@keyframes')) {
      let depth = 1, j = ob + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') depth--;
        j++;
      }
      const kf = css.slice(i, j).trim();
      if (terms.some(t => kf.includes(t))) matches.push(kf);
      i = j;
      continue;
    }
    const cb = css.indexOf('}', ob);
    if (cb === -1) break;
    const rule = css.slice(i, cb + 1).trim();
    if (terms.some(t => rule.includes(t))) matches.push(rule);
    i = cb + 1;
  }
  return matches;
}

const res = find(['tp-tag', 'tp-ticket']);
console.log('Total rules found:', res.length);
res.forEach(r => console.log(r));
