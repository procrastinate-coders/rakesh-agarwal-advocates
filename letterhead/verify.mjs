/**
 * Render the built .docx files through docx-preview and screenshot each page.
 * Not a pixel-exact Word emulator, but it parses the real OOXML — enough to
 * catch clipped images, lost anchors, wrong margins and broken tables.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const lib = readFileSync(resolve(__dirname, '../node_modules/docx-preview/dist/docx-preview.min.js'), 'utf8');
const jszip = readFileSync(resolve(__dirname, '../node_modules/jszip/dist/jszip.min.js'), 'utf8');

const files = ['1-the-rail.docx', '2-right-masthead.docx', '3-corner-spine.docx',
               '4-compact-stack.docx', '5-bracket.docx', '6-hairline.docx'];
const browser = await puppeteer.launch({ headless: 'new' });

for (const f of files) {
  const b64 = readFileSync(resolve(__dirname, 'out', f)).toString('base64');
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1300, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.setContent(`<html><body style="margin:0;background:#6E6E72">
    <div id="c"></div><script>${jszip}</script><script>${lib}</script></body></html>`);

  const info = await page.evaluate(async (data) => {
    const bin = Uint8Array.from(atob(data), (ch) => ch.charCodeAt(0));
    await docx.renderAsync(bin.buffer, document.getElementById('c'), null, {
      className: 'dx', inWrapper: true, ignoreWidth: false, ignoreHeight: false,
      breakPages: true, renderHeaders: true, renderFooters: true, experimental: true,
    });
    // docx-preview resolves wp:positionH relativeFrom="page" against the text
    // margin rather than the sheet edge. Word does not; undo the shift so the
    // screenshot shows where the anchor actually lands on paper.
    const sec = document.querySelector('.dx-wrapper > section');
    const padL = parseFloat(getComputedStyle(sec).paddingLeft) || 0;
    for (const el of sec.querySelectorAll('img')) {
      const box = el.parentElement;               // docx-preview's anchor wrapper
      const cs = getComputedStyle(box);
      if (cs.position === 'relative' && parseFloat(cs.left)) {
        // Only the horizontal is mis-resolved; the vertical already lands right.
        box.style.left = (parseFloat(cs.left) - padL) + 'px';
      }
    }
    const sections = document.querySelectorAll('.dx-wrapper > section');
    const imgs = [...document.querySelectorAll('.dx-wrapper img')]
      .map((i) => ({ w: Math.round(i.width), h: Math.round(i.height), nat: i.naturalWidth + 'x' + i.naturalHeight }));
    // Does the letterhead actually clear the top margin the body starts at?
    const PX_MM = 96 / 25.4;
    const secTop = sec.getBoundingClientRect().top;
    const hdr = sec.querySelector('header');
    const ftr = sec.querySelector('footer');
    const mm = (v) => +(v / PX_MM).toFixed(1);
    return {
      pages: sections.length, imgs,
      // docx-preview clamps the header box to the top margin, so measure the
      // content inside it instead — that is what Word actually has to fit.
      // docx-preview clamps the header box to the top margin, so measure the
      // content inside it instead — that is what Word actually has to fit.
      // Page-anchored plates are out of flow and push nothing, so skip them.
      headerEndsMm: hdr ? mm(Math.max(...[...hdr.querySelectorAll('*')]
        .filter((el) => getComputedStyle(el).position === 'static')
        .map((el) => el.getBoundingClientRect().bottom)) - secTop) : null,
      bodyStartsMm: mm(parseFloat(getComputedStyle(sec).paddingTop)),
      footerStartsMm: ftr ? mm(ftr.getBoundingClientRect().top - secTop) : null,
    };
  }, b64);

  const el = await page.$('.dx-wrapper > section');
  writeFileSync(resolve(__dirname, 'out', f.replace('.docx', '.verify.png')), await el.screenshot());
  const clear = info.headerEndsMm == null ? '' :
    `clearance=${(info.bodyStartsMm - info.headerEndsMm).toFixed(1)}mm`;
  console.log(
    `${f.padEnd(24)} header ends ${String(info.headerEndsMm).padStart(5)}mm  body starts ${String(info.bodyStartsMm).padStart(5)}mm  ${clear.padEnd(18)}` +
    `${info.footerStartsMm ? 'footer at ' + info.footerStartsMm + 'mm' : 'no footer'}${errors.length ? '  ERR ' + errors[0] : ''}`
  );
  await page.close();
}
await browser.close();
