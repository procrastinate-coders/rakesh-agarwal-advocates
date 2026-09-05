/**
 * Design references from preview.html:
 *   out/page-N.png        the letterhead carrying a specimen letter, for judging
 *                         how the frame behaves around real copy
 *   out/proofs.pdf        the three sheets blank at true A4, for printing
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(resolve(__dirname, 'out'), { recursive: true });

const browser = await puppeteer.launch({ headless: 'new' });
const url = 'file://' + resolve(__dirname, 'preview.html');

// 1. Specimen shots
const p = await browser.newPage();
await p.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: 'networkidle0' });
await p.evaluate(() => document.fonts.ready);
for (const id of ['page-1', 'page-2', 'page-3', 'page-4', 'page-5', 'page-6']) {
  writeFileSync(resolve(__dirname, `out/${id}.png`), await (await p.$('#' + id)).screenshot());
}
await p.close();

// 2. Blank proofs, printed at true A4
const q = await browser.newPage();
await q.goto(url, { waitUntil: 'networkidle0' });
await q.evaluate(() => {
  document.fonts.ready;
  document.querySelectorAll('.letter, .tag').forEach((el) => el.remove());
  Object.assign(document.body.style, { background: '#fff', padding: '0' });
  document.querySelectorAll('.page').forEach((el) => {
    el.style.boxShadow = 'none';
    el.style.margin = '0 auto';
    el.style.pageBreakAfter = 'always';
  });
});
writeFileSync(resolve(__dirname, 'out/proofs.pdf'),
  await q.pdf({ format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } }));
await q.close();

await browser.close();
console.log('out/page-{1,2,3}.png  +  out/proofs.pdf');
