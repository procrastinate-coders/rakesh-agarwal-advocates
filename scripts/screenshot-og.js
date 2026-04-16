const puppeteer = require('puppeteer');
const path = require('path');

async function generateOGImage() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // OG image: 1200x630
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  // Create a standalone OG card with just the logo
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1200px; height: 630px;
          background: #FCFCF8;
          font-family: 'Space Grotesk', sans-serif;
          color: #1B2E5B;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .monogram {
          display: flex;
          align-items: flex-end;
        }
        .big-r {
          font-family: 'Newsreader', serif;
          font-size: 260px;
          font-weight: 500;
          line-height: 0.8;
          margin-right: -12px;
        }
        .right-side {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-bottom: 36px;
        }
        .aa {
          font-family: 'Newsreader', serif;
          font-size: 100px;
          font-weight: 400;
          opacity: 0.9;
          line-height: 1;
        }
        .firm-line {
          margin-left: 44px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .firm-name {
          font-weight: 700;
          font-size: 32px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .firm-suffix {
          font-family: 'Newsreader', serif;
          font-style: italic;
          font-weight: 310;
          font-size: 35px;
        }
        .firm-underline {
          width: 100%;
          height: 1px;
          background: #1B2E5B;
          margin-top: -3px;
        }
      </style>
    </head>
    <body>
      <div class="monogram">
        <div class="big-r">R</div>
        <div class="right-side">
          <div class="aa">A<em>A</em></div>
          <div class="firm-line">
            <span class="firm-name">Rakesh Agarwal</span>
            <span class="firm-suffix">Advocates</span>
          </div>
          <div class="firm-underline"></div>
        </div>
      </div>
    </body>
    </html>
  `, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  const screenshotPath = path.resolve(__dirname, 'og-card.png');
  await page.screenshot({ path: screenshotPath, type: 'png' });
  console.log('Saved: og-card.png (1200x630 @2x)');

  await browser.close();
}

generateOGImage();
