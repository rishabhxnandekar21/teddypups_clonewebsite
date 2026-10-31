const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

// Let's find any occurrences of phone, chat, passport, etc.
['tp-chat', 'tp-phone', 'tp-msg', 'tp-passport', 'tp-book', 'tp-faqroom', 'tp-post', 'tp-letter'].forEach(term => {
  let count = 0;
  let idx = 0;
  while ((idx = css.indexOf(term, idx)) !== -1) {
    count++;
    idx += term.length;
  }
  console.log(`${term}: ${count} occurrences`);
});
