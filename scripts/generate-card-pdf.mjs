#!/usr/bin/env node

/**
 * Generate a visiting card PDF with FRONT (top) and BACK (bottom),
 * with drop shadows so each card looks elevated off the page.
 *
 * Usage:
 *   node scripts/generate-card-pdf.mjs
 *   node scripts/generate-card-pdf.mjs --front public/screenshots/front.png --back public/screenshots/back-C-pin-icons.png --out public/visiting-card.pdf
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb } from 'pdf-lib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
function getArg(flag, fallback) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const frontPath = resolve(root, getArg('--front', 'public/screenshots/front.png'));
const backPath = resolve(root, getArg('--back', 'public/screenshots/back-C-pin-icons.png'));
const outPath = resolve(root, getArg('--out', 'public/visiting-card.pdf'));

/**
 * Draw a multi-layered soft drop shadow behind a rectangle.
 * Stacks progressively larger, lighter, offset rects to simulate blur.
 */
function drawShadow(page, x, y, w, h) {
  const layers = [
    { spread: 2, offsetY: -1, opacity: 0.12 },
    { spread: 4, offsetY: -2, opacity: 0.08 },
    { spread: 8, offsetY: -4, opacity: 0.06 },
    { spread: 14, offsetY: -6, opacity: 0.04 },
    { spread: 20, offsetY: -8, opacity: 0.025 },
    { spread: 28, offsetY: -10, opacity: 0.015 },
  ];

  for (const { spread, offsetY, opacity } of layers) {
    page.drawRectangle({
      x: x - spread / 2,
      y: y + offsetY - spread / 2,
      width: w + spread,
      height: h + spread,
      color: rgb(0, 0, 0),
      opacity,
      borderWidth: 0,
    });
  }
}

async function main() {
  console.log('Reading images...');
  const frontBytes = readFileSync(frontPath);
  const backBytes = readFileSync(backPath);

  const pdf = await PDFDocument.create();
  pdf.setTitle('Rakesh Agarwal — Visiting Card');
  pdf.setAuthor('Rakesh Agarwal Advocates');
  pdf.setSubject('Visiting Card — Front & Back');

  const frontImg = await pdf.embedPng(frontBytes);
  const backImg = await pdf.embedPng(backBytes);

  // Card aspect ratio from the images
  const cardW = frontImg.width;
  const cardH = frontImg.height;
  const aspectRatio = cardW / cardH;

  // Page layout
  const pageW = 612;
  const margin = 50;
  const gap = 40;
  const imgW = pageW - margin * 2;
  const imgH = imgW / aspectRatio;
  const pageH = margin * 2 + imgH * 2 + gap;

  const page = pdf.addPage([pageW, pageH]);

  // Light warm background
  page.drawRectangle({
    x: 0, y: 0,
    width: pageW, height: pageH,
    color: rgb(0.96, 0.95, 0.93),
  });

  // --- FRONT card (top) ---
  const frontX = margin;
  const frontY = margin + imgH + gap;

  // Shadow behind front card
  drawShadow(page, frontX, frontY, imgW, imgH);

  // Front card image
  page.drawImage(frontImg, {
    x: frontX,
    y: frontY,
    width: imgW,
    height: imgH,
  });

  // --- BACK card (bottom) ---
  const backX = margin;
  const backY = margin;

  // Shadow behind back card
  drawShadow(page, backX, backY, imgW, imgH);

  // Back card image
  page.drawImage(backImg, {
    x: backX,
    y: backY,
    width: imgW,
    height: imgH,
  });

  const pdfBytes = await pdf.save();
  writeFileSync(outPath, pdfBytes);
  console.log(`PDF generated: ${outPath}`);
  console.log(`  Front: ${frontPath}`);
  console.log(`  Back:  ${backPath}`);
  console.log(`  Size:  ${(pdfBytes.length / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
