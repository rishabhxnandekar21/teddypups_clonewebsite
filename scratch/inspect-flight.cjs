const fs = require('fs');
if (fs.existsSync('scratch/live-flight.html')) {
  const flight = fs.readFileSync('scratch/live-flight.html', 'utf8');
  console.log('--- FLIGHT HTML ---');
  console.log(flight.replace(/data:image\/[^"']+/g, 'data:...').slice(0, 3000));
} else {
  console.log('live-flight.html does not exist');
}
