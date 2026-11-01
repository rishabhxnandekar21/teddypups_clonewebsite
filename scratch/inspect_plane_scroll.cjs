const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/how-it-works', { waitUntil: 'networkidle' });

  const samples = await page.evaluate(async () => {
    const flight = document.querySelector('.tp-flight');
    const planeG = flight ? flight.querySelector('svg > g[transform]') : null;
    const rect = flight ? flight.getBoundingClientRect() : null;
    const section = document.querySelector('#delivery');
    const secRect = section ? section.getBoundingClientRect() : null;
    
    const results = [];
    // Scroll through window in increments
    for (let scrollY = 0; scrollY <= 3500; scrollY += 200) {
      window.scrollTo(0, scrollY);
      // Wait for any rAF
      await new Promise(r => setTimeout(r, 20));
      const g = flight ? flight.querySelector('svg > g[transform]') : null;
      const fRect = flight ? flight.getBoundingClientRect() : null;
      results.push({
        scrollY,
        flightTop: fRect ? fRect.top : null,
        transform: g ? g.getAttribute('transform') : null,
        opacity: g ? g.style.opacity : null
      });
    }
    return results;
  });

  console.log(JSON.stringify(samples.filter(s => s.flightTop > -500 && s.flightTop < 1200), null, 2));
  await browser.close();
})();
