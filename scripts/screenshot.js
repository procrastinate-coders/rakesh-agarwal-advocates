const puppeteer = require('puppeteer');
const path = require('path');

async function screenshotCards(htmlFile, names) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 2000, deviceScaleFactor: 8 });

  const filePath = path.resolve(__dirname, htmlFile);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  const cards = await page.$$('.space-y-4');
  console.log(`Found ${cards.length} cards in ${htmlFile}`);

  for (let i = 0; i < cards.length; i++) {
    const cardEl = await cards[i].$('div:first-child');
    if (cardEl) {
      const filename = names[i] || `card-${i + 1}`;
      const screenshotPath = path.resolve(__dirname, 'screenshots', `${filename}.png`);
      await cardEl.screenshot({ path: screenshotPath, type: 'png' });
      console.log(`  Saved: ${filename}.png`);
    }
  }

  await browser.close();
}

(async () => {
  await screenshotCards('iterations.html', [
    'front',
    'back-A-2plus1-grid',
    'back-B-three-col-dividers',
    'back-C-pin-icons',
    'back-F-centered-3col',
    'back-H-accent-bars',
  ]);

  console.log('\nDone! All screenshots saved to ./screenshots/');
})();
