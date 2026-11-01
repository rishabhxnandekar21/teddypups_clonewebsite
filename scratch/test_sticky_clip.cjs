const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.setContent(`
    <style>
      body { margin: 0; }
      .wrapper { overflow-x: clip; }
      .section { height: 2000px; padding: 50px; background: #eee; }
      .grid { display: grid; grid-template-columns: 1fr 300px; gap: 50px; }
      .story { height: 1500px; background: #ddd; }
      .side { position: sticky; top: 120px; align-self: start; height: 400px; background: orange; }
    </style>
    <div class="wrapper">
      <div style="height: 1000px; background: #ccc;">Hero</div>
      <div class="section">
        <div class="grid">
          <div class="story">Story</div>
          <div class="side" id="target">Sticky side</div>
        </div>
      </div>
      <div style="height: 1000px; background: #ccc;">Footer</div>
    </div>
  `);

  await page.evaluate(() => window.scrollTo(0, 1500));
  const rect = await page.evaluate(() => document.getElementById('target').getBoundingClientRect());
  console.log('Sticky test with overflow-x:clip: target top =', rect.top);

  await browser.close();
}
main().catch(console.error);
