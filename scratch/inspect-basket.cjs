const fs = require('fs');
if (fs.existsSync('scratch/live-basket.html')) {
  const basket = fs.readFileSync('scratch/live-basket.html', 'utf8');
  console.log('--- BASKET HTML ---');
  console.log(basket);
} else {
  console.log('live-basket.html does not exist');
}
