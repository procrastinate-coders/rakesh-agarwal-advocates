#!/usr/bin/env node

/**
 * Export the full /visiting-card page as a single continuous PDF (+ PNG).
 *
 * Requires the dev/prod server to be running.
 *
 * Usage:
 *   npx next dev -p 3111
 *   node scripts/export-card-page.mjs
 *   node scripts/export-card-page.mjs --url http://localhost:3000/visiting-card --width 480
 */

import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const url = getArg('--url', 'http://localhost:3111/visiting-card');
// Local hrefs are rewritten to this origin so the exported PDF's links work anywhere.
const publicOrigin = getArg('--base', 'https://www.rakeshagarwaladvocates.com');
const width = Number(getArg('--width', '440'));
const outDir = resolve(root, getArg('--outdir', 'exports'));
const pdfPath = resolve(outDir, 'visiting-card-page.pdf');
const pngPath = resolve(outDir, 'visiting-card-page.png');

mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });

  console.log(`Loading ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  // Walk the page so IntersectionObserver reveals fire, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });

  // Pin every reveal/animation to its final state so nothing renders mid-transition.
  await page.addStyleTag({
    content: `
      /* Hide the Next.js dev-tools indicator so it never lands in the export. */
      nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }
      .fade-up, .fade-up.visible { opacity: 1 !important; transform: none !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-fill-mode: forwards !important;
        transition: none !important;
      }
    `,
  });
  await new Promise((r) => setTimeout(r, 800));

  // Point same-origin links at the public site — the PDF outlives the dev server.
  await page.evaluate((origin) => {
    const localOrigin = window.location.origin;
    document.querySelectorAll('a[href]').forEach((a) => {
      if (a.href.startsWith(localOrigin)) {
        a.setAttribute('href', origin + a.href.slice(localOrigin.length));
      }
    });
  }, publicOrigin);

  const height = await page.evaluate(() =>
    Math.ceil(
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      )
    )
  );
  console.log(`Page size: ${width} x ${height}px`);

  await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });
  console.log(`  PNG → ${pngPath}`);

  // Chrome's PDF writer cannot blur. Every box-shadow would otherwise print as a
  // hard-edged translucent navy rectangle the size of the element plus its blur
  // radius — the boxes seen around the avatar and the two card images. Drop them
  // for the PDF only (the PNG above keeps the real blurs) and give the cards a
  // hairline edge so they still read as objects.
  const stripped = await page.evaluate(() => {
    let n = 0;
    document.querySelectorAll('*').forEach((el) => {
      if (getComputedStyle(el).boxShadow !== 'none') {
        el.style.setProperty('box-shadow', 'none', 'important');
        n++;
      }
    });
    document.querySelectorAll('.card-item img').forEach((img) => {
      img.style.setProperty('border', '1px solid rgba(27, 46, 91, 0.12)', 'important');
    });
    return n;
  });
  console.log(`  Flattened ${stripped} box-shadow(s) for print`);

  // Blur-backed effects have the same limitation; warn if any show up later.
  const blurry = await page.evaluate(() =>
    [...document.querySelectorAll('*')]
      .filter((el) => {
        const cs = getComputedStyle(el);
        return cs.backdropFilter !== 'none' || cs.filter.includes('blur');
      })
      .map((el) => el.className || el.tagName)
  );
  if (blurry.length) console.warn(`  ! blur effects present, may print flat: ${blurry.join(', ')}`);

  await page.emulateMediaType('screen');
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    width: `${width}px`,
    height: `${height}px`,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`  PDF → ${pdfPath}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
