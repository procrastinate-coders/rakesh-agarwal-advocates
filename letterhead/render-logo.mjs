#!/usr/bin/env node
/**
 * Render the RAA lockup to transparent PNGs for embedding in the Word letterheads.
 *
 * Word cannot be relied on to have Newsreader / Space Grotesk installed, so the
 * logo travels as an image. Everything else in the letterhead stays live text.
 *
 * Outputs (letterhead/assets/):
 *   logo-horizontal-navy.png   full lockup, one line   — used by Masthead + Corner
 *   logo-stacked-navy.png      monogram over wordmark  — used by the Right Rail
 *   logo-horizontal-white.png  reversed, for navy bands
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, 'assets');
mkdirSync(outDir, { recursive: true });

const SCALE = 6; // ~900 DPI at final print size — no visible softening when scaled down

const FONT_LINK = `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />`;

const BASE_CSS = (ink) => `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: transparent; }
  body {
    font-family: "Newsreader", Georgia, serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    display: inline-block;
    color: ${ink};
  }
  .lockup { --u: 1px; display: flex; align-items: flex-end; color: ${ink}; }
  .lockup__R {
    font-weight: 500; font-size: calc(224 * var(--u)); line-height: 0.8;
    letter-spacing: calc(-3.4 * var(--u)); margin-right: calc(-12 * var(--u));
  }
  .lockup__right {
    display: flex; flex-direction: column; align-items: flex-start;
    padding-bottom: calc(34 * var(--u));
  }
  .lockup__AA {
    font-weight: 400; font-size: calc(88 * var(--u)); line-height: 1;
    letter-spacing: calc(1.6 * var(--u)); opacity: .9; margin-bottom: calc(-6 * var(--u));
  }
  .lockup__AA .it { font-style: italic; }
  .lockup__wordmark { position: relative; margin-left: calc(40 * var(--u)); }
  .lockup__wordmark-row { display: flex; align-items: baseline; gap: calc(6 * var(--u)); white-space: nowrap; }
  .lockup__name {
    font-family: "Space Grotesk", system-ui, sans-serif; font-weight: 700;
    font-size: calc(34 * var(--u)); letter-spacing: .05em; text-transform: uppercase;
  }
  .lockup__advocates { font-style: italic; font-weight: 310; font-size: calc(38 * var(--u)); }
  .lockup__rule { width: 100%; height: calc(2 * var(--u)); background: ${ink}; margin-top: calc(-8 * var(--u)); }
`;

const HORIZONTAL = `
<div class="lockup" id="shot">
  <div class="lockup__R">R</div>
  <div class="lockup__right">
    <div class="lockup__AA">A<span class="it">A</span></div>
    <div class="lockup__wordmark">
      <div class="lockup__wordmark-row">
        <span class="lockup__name">Rakesh Agarwal</span>
        <span class="lockup__advocates">Advocates</span>
      </div>
      <div class="lockup__rule"></div>
    </div>
  </div>
</div>`;

/* Stacked variant for the narrow right rail: the RAA monogram sits above a
   two-line wordmark, so the lockup reads at ~40mm wide instead of ~70mm. */
const STACKED_CSS = (ink) => `
  .stack { display: flex; flex-direction: column; align-items: center; color: ${ink}; }
  .stack__mono { display: flex; align-items: flex-end; line-height: .78; }
  .stack__R { font-weight: 500; font-size: 240px; letter-spacing: -4px; margin-right: -14px; }
  .stack__AA { font-weight: 400; font-size: 96px; letter-spacing: 2px; opacity: .9; padding-bottom: 26px; }
  .stack__AA .it { font-style: italic; }
  .stack__rule { width: 100%; height: 3px; background: ${ink}; margin: 22px 0 16px; }
  .stack__name {
    font-family: "Space Grotesk", system-ui, sans-serif; font-weight: 700;
    font-size: 40px; letter-spacing: .13em; text-transform: uppercase; white-space: nowrap;
  }
  .stack__advocates { font-style: italic; font-weight: 320; font-size: 46px; margin-top: 2px; }
`;

const STACKED = `
<div class="stack" id="shot">
  <div class="stack__mono">
    <span class="stack__R">R</span>
    <span class="stack__AA">A<span class="it">A</span></span>
  </div>
  <div class="stack__rule"></div>
  <div class="stack__name">Rakesh Agarwal</div>
  <div class="stack__advocates">Advocates</div>
</div>`;

function page(ink, extraCss, markup) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${FONT_LINK}
<style>${BASE_CSS(ink)}${extraCss}</style></head>
<body><div id="pad" style="display:inline-block;padding:140px">${markup}</div></body></html>`;
}

/**
 * Crop a transparent PNG back to its ink. The lockup sets line-height below 1,
 * so the R's cap overshoots its layout box; screenshotting the element clips it.
 * We shoot a generously padded wrapper and find the true bounds by alpha.
 */
async function trimToInk(browser, png) {
  const p = await browser.newPage();
  await p.setContent('<body></body>');
  const out = await p.evaluate(async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        if (data[(y * c.width + x) * 4 + 3] > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    const w = maxX - minX + 1, h = maxY - minY + 1;
    const o = document.createElement('canvas');
    o.width = w; o.height = h;
    o.getContext('2d').drawImage(c, minX, minY, w, h, 0, 0, w, h);
    return o.toDataURL('image/png');
  }, 'data:image/png;base64,' + png.toString('base64'));
  await p.close();
  return Buffer.from(out.split(',')[1], 'base64');
}

const NAVY = '#1B2E5B';
const WHITE = '#FFFDF9';

const jobs = [
  { file: 'logo-horizontal-navy.png', html: page(NAVY, '', HORIZONTAL) },
  { file: 'logo-horizontal-white.png', html: page(WHITE, '', HORIZONTAL) },
  { file: 'logo-stacked-navy.png', html: page(NAVY, STACKED_CSS(NAVY), STACKED) },
  { file: 'logo-stacked-white.png', html: page(WHITE, STACKED_CSS(WHITE), STACKED) },
];

const browser = await puppeteer.launch({ headless: 'new' });
const manifest = {};

for (const job of jobs) {
  const p = await browser.newPage();
  await p.setViewport({ width: 2200, height: 1400, deviceScaleFactor: SCALE });
  await p.setContent(job.html, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  const padded = await (await p.$('#pad')).screenshot({ omitBackground: true });
  await p.close();

  const buf = await trimToInk(browser, padded);
  writeFileSync(resolve(outDir, job.file), buf);

  // PNG header: width at byte 16, height at byte 20.
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  manifest[job.file] = { w, h, ratio: +(w / h).toFixed(4) };
  console.log(`${job.file.padEnd(28)} ${w}x${h}px  (ratio ${(w / h).toFixed(3)}:1)`);
}

writeFileSync(resolve(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
await browser.close();
console.log('\nLogo assets + manifest.json written to letterhead/assets/');
