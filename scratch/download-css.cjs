const fs = require('fs');

async function main() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const cssUrls = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m => m[1]);
  console.log('CSS URLs found:', cssUrls);

  let fullCss = '';
  for (let url of cssUrls) {
    if (url.startsWith('/')) url = 'https://puppy.instabizweb.com' + url;
    console.log('Fetching', url);
    const cssRes = await fetch(url);
    fullCss += await cssRes.text() + '\n';
  }

  // Also check /faq and /contact for any additional CSS
  for (const page of ['/faq', '/contact', '/how-it-works']) {
    try {
      const pRes = await fetch('https://puppy.instabizweb.com' + page);
      const pHtml = await pRes.text();
      const pCssUrls = [...pHtml.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m => m[1]);
      for (let url of pCssUrls) {
        if (!cssUrls.includes(url)) {
          cssUrls.push(url);
          if (url.startsWith('/')) url = 'https://puppy.instabizweb.com' + url;
          console.log('Fetching extra', url);
          const cssRes = await fetch(url);
          fullCss += await cssRes.text() + '\n';
        }
      }
    } catch (e) {
      console.log('Error on', page, e.message);
    }
  }

  fs.writeFileSync('scratch/reference-full.css', fullCss);
  console.log('Saved scratch/reference-full.css, size:', fullCss.length);
}

main().catch(err => console.error(err));
