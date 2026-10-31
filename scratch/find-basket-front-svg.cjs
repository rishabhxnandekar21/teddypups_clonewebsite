const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const idx = html.indexOf('tp-basket__front');
if (idx !== -1) {
  console.log('tp-basket__front found:\n', html.slice(idx - 100, idx + 1500));
} else {
  console.log('tp-basket__front not found');
}
