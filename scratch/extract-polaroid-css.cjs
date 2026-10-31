const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function extract(terms) {
  let i = 0;
  const results = [];
  while (i < css.length) {
    const ob = css.indexOf('{', i);
    if (ob === -1) break;
    const sel = css.slice(i, ob).trim();
    if (sel.startsWith('@keyframes') || sel.startsWith('@media')) {
      let depth = 1, j = ob + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') depth--;
        j++;
      }
      const block = css.slice(i, j).trim();
      if (terms.some(t => block.includes(t))) results.push(block);
      i = j;
      continue;
    }
    const cb = css.indexOf('}', ob);
    if (cb === -1) break;
    const rule = css.slice(i, cb + 1).trim();
    if (terms.some(t => rule.includes(t))) results.push(rule);
    i = cb + 1;
  }
  return results;
}

const tapeRules = extract(['tp-tape', 'tp-polaroid', 'tp-viewer', 'tp-lightbox']);
console.log('Total rules found:', tapeRules.length);
tapeRules.forEach(r => console.log(r));
