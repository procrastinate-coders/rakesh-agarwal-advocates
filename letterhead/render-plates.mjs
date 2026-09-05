/**
 * Plates that Word places as "behind text" anchored pictures.
 *
 *   rail-full.png   Iteration 1's whole right-hand panel — tint, cap bar and
 *                   type in one piece
 *   spine-gold.png  Iteration 3's hairline down the right margin
 *
 * The rail is baked rather than typeset in Word on purpose. A full-height
 * sidebar is only expressible in OOXML as a floating table, and floating
 * tables degrade badly outside desktop Word — Pages, Google Docs and most
 * previewers drop the anchor and dump the text at the left margin. An
 * anchored picture is honoured everywhere. Iterations 2 and 3 need no such
 * compromise, so every word in those stays live and editable.
 *
 * Type is set in Georgia + Arial here too, so the baked panel matches the
 * live text in the other two files exactly.
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), 'assets');
const SCALE = 4; // 384 dpi at final print size

const OFFICES = [
  { city: 'New Delhi', principal: true, lines: ['65, Jai Apartment, 102,', 'I.P. Extension, Patparganj', 'New Delhi — 110092'] },
  { city: 'Agra', lines: ['5/7/2/B-3, Kaveri Center', 'Sanjay Palace', 'Agra — 282002'] },
  { city: 'Bangalore', lines: ['8, 21st Main, 9th Cross', 'Indiranagar 1st Stage', 'Bangalore — 560038'] },
];
const PRACTICE = ['GST', 'Customs', 'CHA', 'Central Excise', 'Service Tax',
                  'Export Promotion Schemes', 'EOU', 'SEZ', 'PMLA', 'DRT'];

const dot = (items) => items.map((x) => `<span>${x}</span>`).join('<i> · </i>');

const RAIL_CSS = `
  :root {
    --navy:#1B2E5B; --navy70:#5F6D8C; --navy55:#828CA5;
    --gold:#B8973A; --cream:#F1EDE4;
    --serif:Georgia,"Times New Roman",serif; --sans:Arial,Helvetica,sans-serif;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  html,body { background:transparent; }
  #s {
    width:56mm; height:271mm; background:var(--cream);
    border-top:2.2mm solid var(--navy);
    padding:9mm 6.5mm; display:flex; flex-direction:column;
    font-family:var(--serif); color:var(--navy);
    -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
  }
  .logo { width:33mm; margin:1mm auto 0; display:block; }
  .hr { height:.3mm; background:var(--gold); margin:6mm 0 4mm; }
  .who { text-align:center; font-size:7.4pt; line-height:1.5; }
  .who strong { display:block; font-size:8.6pt; }
  .who span { color:var(--navy55); }
  .lbl {
    display:block; font-family:var(--sans); font-size:5.6pt; font-weight:700;
    letter-spacing:.18em; text-transform:uppercase; color:var(--gold); margin-bottom:2.2mm;
  }
  .blk { margin-top:7mm; }
  .row { margin-bottom:2.4mm; }
  .row .k {
    display:block; font-family:var(--sans); font-size:5.4pt; letter-spacing:.14em;
    text-transform:uppercase; color:var(--navy55);
  }
  .row .v { font-size:7pt; line-height:1.3; }
  .off { margin-bottom:3.6mm; }
  .off .city {
    display:block; font-family:var(--sans); font-size:6.6pt; font-weight:700;
    letter-spacing:.12em; text-transform:uppercase; margin-bottom:.8mm;
  }
  .off .city em { color:var(--gold); font-style:normal; }
  .off .addr { font-size:6.8pt; line-height:1.45; color:var(--navy70); }
  .pa { margin-top:auto; padding-top:6mm; border-top:.3mm solid rgba(27,46,91,.18); }
  .pa .v { font-size:7pt; line-height:1.7; color:var(--navy70); }
  .pa .v i { color:var(--gold); font-style:normal; }
`;

const RAIL_HTML = (logoDataUri) => `
<div id="s">
  <img class="logo" src="${logoDataUri}" alt="" />
  <div class="hr"></div>
  <div class="who">
    <strong>Rakesh Agarwal, IRS</strong>
    Advocate &amp; Advisor<br />
    <span>Customs &amp; Indirect Tax</span><br />
    <span>Joint Commissioner (Retd.)</span>
  </div>

  <div class="blk">
    <span class="lbl">Contact</span>
    <div class="row"><span class="k">Mobile</span><span class="v">+91 98188 30557</span></div>
    <div class="row"><span class="k">Chambers</span><span class="v">011 4057 1716</span></div>
    <div class="row"><span class="k">Email</span><span class="v">rakeshagarwal.irs@gmail.com</span></div>
    <div class="row"><span class="k">Web</span><span class="v">rakeshagarwaladvocates.com</span></div>
  </div>

  <div class="blk">
    <span class="lbl">Chambers</span>
    ${OFFICES.map((o) => `
    <div class="off">
      <span class="city">${o.principal ? '<em>★</em> ' : ''}${o.city}</span>
      <div class="addr">${o.lines.join('<br />')}</div>
    </div>`).join('')}
  </div>

  <div class="pa">
    <span class="lbl">Practice</span>
    <div class="v">${dot(PRACTICE)}</div>
  </div>
</div>`;

const browser = await puppeteer.launch({ headless: 'new' });

async function plate(file, html, css, scale) {
  const p = await browser.newPage();
  await p.setViewport({ width: 900, height: 1400, deviceScaleFactor: scale });
  await p.setContent(`<style>${css}</style>${html}`, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  const el = await p.$('#s');
  const buf = await el.screenshot({ omitBackground: true });
  writeFileSync(resolve(dir, file), buf);
  console.log(`${file.padEnd(20)} ${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}px`);
  await p.close();
}

const logoUri = 'data:image/png;base64,' +
  (await import('fs')).readFileSync(resolve(dir, 'logo-stacked-navy.png')).toString('base64');

await plate('rail-full.png', RAIL_HTML(logoUri), RAIL_CSS, SCALE);
await plate('spine-gold.png',
  '<div id="s"></div>',
  '*{margin:0;padding:0;box-sizing:border-box}html,body{background:transparent}#s{width:1mm;height:190mm;background:rgba(184,151,58,.5)}',
  8);

await browser.close();
