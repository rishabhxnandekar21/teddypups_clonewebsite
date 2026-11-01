const https = require('https');

https.get('https://puppy.instabizweb.com/_next/static/chunks/0te0tivnjcmcm.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('tp-flight');
    console.log(data.slice(Math.max(0, idx - 1500), idx + 1000));
  });
});
