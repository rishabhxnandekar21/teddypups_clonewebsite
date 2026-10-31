const routes = ['/', '/puppies', '/how-it-works', '/faq', '/contact', '/happy-families', '/gone-home'];

async function check() {
  for (const r of routes) {
    try {
      const res = await fetch('https://puppy.instabizweb.com' + r);
      const text = await res.text();
      if (text.includes('tp-trail')) {
        console.log(`Found tp-trail in route: ${r}`);
        const m = text.match(/<[^>]*class="[^"]*tp-trail[^"]*"[^>]*>/g);
        console.log(m);
      }
    } catch (e) {
      console.error(r, e.message);
    }
  }
}

check();
