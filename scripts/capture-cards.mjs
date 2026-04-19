#!/usr/bin/env node

/**
 * Capture high-res screenshots of the Front and Back C visiting cards
 * from iterations.html using Puppeteer.
 *
 * Usage:
 *   node scripts/capture-cards.mjs
 */

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const htmlPath = `file://${resolve(root, 'iterations.html')}`;
const outDir = resolve(root, 'public/screenshots');

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // High DPI for crisp output
  await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 4 });

  console.log(`Loading ${htmlPath}`);
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1000));

  // All card elements (the 336x192 divs) in DOM order
  // From the HTML: Front, Back A, Back B, Back C, Back F, Back H
  const cards = await page.$$('.space-y-4 > div:first-child');

  if (cards.length < 4) {
    console.error(`Expected at least 4 cards, found ${cards.length}`);
    await browser.close();
    process.exit(1);
  }

  // Front = index 0, Back C = index 3
  const targets = [
    { el: cards[0], name: 'front.png', label: 'Front' },
    { el: cards[3], name: 'back-C-pin-icons.png', label: 'Back C' },
  ];

  for (const { el, name, label } of targets) {
    const outPath = resolve(outDir, name);
    await el.screenshot({ path: outPath, type: 'png' });
    console.log(`  ${label} → ${outPath}`);
  }

  await browser.close();
  console.log('Done! Screenshots captured.');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
