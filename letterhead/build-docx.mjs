#!/usr/bin/env node
/**
 * Build the three A4 Word letterheads.
 *
 *   1-the-rail.docx        identity in a tinted panel down the right edge
 *   2-right-masthead.docx  full-width header, everything ranged right
 *   3-corner-spine.docx    compact top-right block + reversed chambers band
 *
 * Design notes that matter for Word specifically:
 *  - Every letterhead element lives in the page HEADER / FOOTER, so it repeats
 *    on continuation sheets and cannot be nudged while typing the letter.
 *  - Body copy is Georgia and labels are Arial: the two faces present on every
 *    Windows and Mac install, so the file renders identically on the client's
 *    machine. The brand faces (Newsreader, Space Grotesk) survive inside the
 *    logo, which travels as a PNG.
 *  - Flat colour areas are anchored pictures rather than shaded tables, because
 *    a picture's geometry is absolute where a table's grows with its content.
 *  - Nothing sits closer than 11mm to the trim, which clears the non-printable
 *    edge of an ordinary office laser printer.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  Document, Packer, Paragraph, TextRun, ImageRun,
  Header, Footer, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType,
  TextWrappingType, LineRuleType,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  VerticalAlign, PageOrientation,
} from 'docx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const A = (f) => readFileSync(resolve(__dirname, 'assets', f));
const MANIFEST = JSON.parse(readFileSync(resolve(__dirname, 'assets', 'manifest.json'), 'utf8'));
/** Height in mm that keeps a logo at its true aspect ratio for a given width. */
const logoH = (file, wmm) => +(wmm / MANIFEST[file].ratio).toFixed(2);
const OUT = resolve(__dirname, 'out');
mkdirSync(OUT, { recursive: true });

/* ── units ─────────────────────────────────────────────────────────── */
const TW  = (mm) => Math.round(mm * 56.6929);   // twips
const PX  = (mm) => Math.round(mm * 3.779528);  // px @96dpi, for images
const EMU = (mm) => Math.round(mm * 36000);     // EMU, for floating anchors
const HP  = (pt) => Math.round(pt * 2);         // half-points, for font size
const CS  = (pt) => Math.round(pt * 20);        // twips, for letter-spacing
const BS  = (pt) => Math.round(pt * 8);         // eighths of a point, for rules
const LN  = (mult) => Math.round(240 * mult);   // line spacing

/* ── palette ───────────────────────────────────────────────────────── */
const NAVY = '1B2E5B';
const NAVY70 = '5F6D8C';
const NAVY55 = '828CA5';
const GOLD = 'B8973A';
const INK = '1A2744';
const PAPER = 'FFFDF9';

const SERIF = 'Georgia';
const SANS = 'Arial';

/* ── content ───────────────────────────────────────────────────────── */
const D = {
  name: 'Rakesh Agarwal, IRS',
  role: 'Advocate & Advisor',
  dept: 'Customs & Indirect Tax',
  cred: 'Joint Commissioner (Retd.)',
  mobile: '+91 98188 30557',
  chambers: '011 4057 1716',
  email: 'rakeshagarwal.irs@gmail.com',
  web: 'www.rakeshagarwaladvocates.com',
  webShort: 'rakeshagarwaladvocates.com',
  offices: [
    { city: 'New Delhi', principal: true,
      lines: ['65, Jai Apartment, 102,', 'I.P. Extension, Patparganj', 'New Delhi — 110092'],
      flat: '65, Jai Apartment, 102, I.P. Extension,|Patparganj, New Delhi — 110092' },
    { city: 'Agra',
      lines: ['5/7/2/B-3, Kaveri Center', 'Sanjay Palace', 'Agra — 282002'],
      flat: '5/7/2/B-3, Kaveri Center,|Sanjay Palace, Agra — 282002' },
    { city: 'Bangalore',
      lines: ['8, 21st Main, 9th Cross', 'Indiranagar 1st Stage', 'Bangalore — 560038'],
      flat: '8, 21st Main, 9th Cross, Indiranagar|1st Stage, Bangalore — 560038' },
  ],
  delhiOneLine: '65, Jai Apartment, 102, I.P. Extension, Patparganj, New Delhi — 110092',
  delhiTwoLine: ['65, Jai Apartment, 102, I.P. Extension,', 'Patparganj, New Delhi — 110092'],
  practice: ['GST', 'Customs', 'CHA', 'Central Excise', 'Service Tax',
             'Export Promotion Schemes', 'EOU', 'SEZ', 'PMLA', 'DRT'],
};

/* ── run + paragraph helpers ───────────────────────────────────────── */
const t = (text, o = {}) => new TextRun({
  text, font: o.font ?? SERIF, size: HP(o.pt ?? 10.5),
  color: o.color ?? INK, bold: o.bold, italics: o.italic,
  characterSpacing: o.track != null ? CS(o.track) : undefined,
});

/** Small tracked-out uppercase label — Arial, because tracking a serif looks cheap. */
const label = (text, o = {}) => t(text.toUpperCase(), {
  font: SANS, pt: o.pt ?? 5.5, color: o.color ?? GOLD,
  bold: o.bold ?? true, track: o.track ?? 0.9,
});

const p = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [children],
  alignment: o.align,
  spacing: {
    before: o.before ? TW(o.before) : 0,
    after: o.after ? TW(o.after) : 0,
    // A bare w:line is read by Word as "Exactly", which crops tall inline
    // pictures from the top. AUTO keeps it a multiplier that grows to fit;
    // `exact` is opt-in, for text-only paragraphs that must collapse.
    line: o.exact ? CS(o.exact) : LN(o.line ?? 1.15),
    lineRule: o.exact ? LineRuleType.EXACT : LineRuleType.AUTO,
  },
  border: o.rule ? { bottom: { style: BorderStyle.SINGLE, size: BS(o.rule.w), color: o.rule.color, space: o.rule.space ?? 1 } } : undefined,
  shading: o.fill ? { fill: o.fill } : undefined,
  indent: o.indent,
  keepNext: o.keepNext,
});

/** An empty paragraph carrying only a bottom border — used as a horizontal rule. */
const rule = (color, weightPt, o = {}) =>
  p([t('', { pt: 1 })], { ...o, exact: 1.5, rule: { w: weightPt, color, space: 0 } });

const img = (file, wmm, hmm, floating) => new ImageRun({
  type: 'png', data: A(file),
  transformation: { width: PX(wmm), height: PX(hmm) },
  floating,
});

/** Absolutely-placed, behind-text picture anchored to the page. */
const plate = (file, wmm, hmm, xmm, ymm) => img(file, wmm, hmm, {
  horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: EMU(xmm) },
  verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: EMU(ymm) },
  behindDocument: true, allowOverlap: true,
  wrap: { type: TextWrappingType.NONE },
});

const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

const cell = (children, o = {}) => new TableCell({
  children, width: { size: TW(o.w), type: WidthType.DXA },
  margins: { top: 0, bottom: 0, left: o.padL != null ? TW(o.padL) : 0, right: o.padR != null ? TW(o.padR) : TW(2) },
  shading: o.fill ? { fill: o.fill } : undefined,
  verticalAlign: o.valign ?? VerticalAlign.TOP,
  columnSpan: o.span,
});

const table = (rows, o = {}) => new Table({
  rows, borders: NO_BORDERS,
  width: { size: TW(o.w), type: WidthType.DXA },
  columnWidths: o.cols?.map(TW),
  float: o.float,
});

/* Dot-separated inline list with gold separators. */
const dotted = (items, o = {}) => {
  const out = [];
  items.forEach((item, i) => {
    out.push(t(item, o));
    if (i < items.length - 1) out.push(t('  ·  ', { ...o, color: GOLD }));
  });
  return out;
};

/* ── the three chambers, as a 3-column strip ───────────────────────── */
function chambersStrip({ reversed = false, colW = 56.6 } = {}) {
  const cityColor = reversed ? PAPER : NAVY;
  const addrColor = reversed ? 'C9CFDD' : NAVY70;
  return table([
    new TableRow({
      children: D.offices.map((o) => cell([
        p([
          ...(o.principal ? [t('★  ', { font: SANS, pt: 6.5, color: GOLD, bold: true })] : []),
          t(o.city.toUpperCase(), { font: SANS, pt: 6.5, color: cityColor, bold: true, track: 0.8 }),
        ], { after: 0.8 }),
        ...o.flat.split('|').map((line) => p(t(line, { pt: 7, color: addrColor }), { line: 1.35 })),
      ], { w: colW, padR: 5, fill: reversed ? NAVY : undefined, padL: reversed ? 0 : 0 })),
    }),
  ], { w: colW * 3, cols: [colW, colW, colW] });
}

/* ════════════════════════════════════════════════════════════════════
   ITERATION 1 — THE RAIL
   A cream panel runs down the right edge on every sheet. The panel is an
   anchored picture; the type sitting on it is a floating table, so the
   phone numbers stay editable.
   ═══════════════════════════════════════════════════════════════════ */
const RAIL_X = 143, RAIL_Y = 13, RAIL_W = 56, RAIL_H = 271;

const doc1 = () => new Document({
  creator: 'Rakesh Agarwal, Advocates',
  styles: DOC_STYLES,
  title: 'Letterhead — The Rail',
  sections: [{
    properties: {
      page: {
        size: { width: TW(210), height: TW(297), orientation: PageOrientation.PORTRAIT },
        margin: { top: TW(32), right: TW(76), bottom: TW(22), left: TW(20), header: TW(6), footer: TW(10) },
      },
    },
    headers: {
      default: new Header({
        children: [p([plate('rail-full.png', RAIL_W, RAIL_H, RAIL_X, RAIL_Y)], { exact: 1 })],
      }),
    },
    children: blankBody(),
  }],
});

/* ════════════════════════════════════════════════════════════════════
   ITERATION 2 — RIGHT MASTHEAD
   The conventional header-only letterhead, but ranged right: logo over
   credentials over a two-line contact block, closed by a navy/gold rule.
   The three chambers carry the footer above a reversed practice band.
   ═══════════════════════════════════════════════════════════════════ */
const doc2 = () => new Document({
  creator: 'Rakesh Agarwal, Advocates',
  styles: DOC_STYLES,
  title: 'Letterhead — Right Masthead',
  sections: [{
    properties: {
      page: {
        size: { width: TW(210), height: TW(297), orientation: PageOrientation.PORTRAIT },
        margin: { top: TW(78), right: TW(20), bottom: TW(52), left: TW(20), header: TW(16), footer: TW(13) },
      },
    },
    headers: {
      default: new Header({
        children: [
          p(img('logo-horizontal-navy.png', 74, logoH('logo-horizontal-navy.png', 74)), { align: AlignmentType.RIGHT, after: 3.6 }),
          p([
            t(`${D.name.toUpperCase()}  `, { font: SANS, pt: 6.5, color: NAVY, bold: true, track: 1.1 }),
            t('·', { font: SANS, pt: 6.5, color: GOLD, bold: true }),
            t(`  ${D.role.toUpperCase()}`, { font: SANS, pt: 6.5, color: NAVY, bold: true, track: 1.1 }),
          ], { align: AlignmentType.RIGHT, after: 1.4 }),
          p([t(`${D.dept}  ·  ${D.cred}`,
               { pt: 7.5, color: NAVY55, italic: true })],
            { align: AlignmentType.RIGHT, after: 3.6 }),
          p([
            label('M'), t(`  ${D.mobile}`, { pt: 7.5, color: NAVY }),
            t('      ', { pt: 7.5 }),
            label('T'), t(`  ${D.chambers}`, { pt: 7.5, color: NAVY }),
          ], { align: AlignmentType.RIGHT, after: 0.8 }),
          p([
            label('E'), t(`  ${D.email}`, { pt: 7.5, color: NAVY }),
            t('      ', { pt: 7.5 }),
            label('W'), t(`  ${D.web}`, { pt: 7.5, color: NAVY }),
          ], { align: AlignmentType.RIGHT, after: 4 }),
          rule(NAVY, 1.4, { after: 0.6 }),
          rule(GOLD, 0.5, { after: 0 }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          rule('C9CDD8', 0.5, { after: 3 }),
          chambersStrip({ colW: 56.6 }),
          p(dotted(D.practice, { font: SANS, pt: 5.5, color: PAPER, bold: true, track: 0.8 }), {
            align: AlignmentType.CENTER, before: 3.5, after: 0, fill: NAVY, line: 1.6,
          }),
        ],
      }),
    },
    children: blankBody(),
  }],
});

/* ════════════════════════════════════════════════════════════════════
   ITERATION 3 — CORNER BLOCK & SPINE
   Identity compressed into the top-right corner, the enrolment balancing
   it top-left, a gold hairline down the right margin, and the chambers
   reversed out of a navy band at the foot.
   ═══════════════════════════════════════════════════════════════════ */
const doc3 = () => new Document({
  creator: 'Rakesh Agarwal, Advocates',
  styles: DOC_STYLES,
  title: 'Letterhead — Corner Block & Spine',
  sections: [{
    properties: {
      page: {
        size: { width: TW(210), height: TW(297), orientation: PageOrientation.PORTRAIT },
        margin: { top: TW(84), right: TW(20), bottom: TW(56), left: TW(20), header: TW(16), footer: TW(13) },
      },
    },
    headers: {
      default: new Header({
        children: [
          p([plate('spine-gold.png', 0.5, 190, 196.5, 82)], { line: 1 }),
          table([new TableRow({
            children: [
              cell([p(t('', { pt: 1 }), { exact: 1 })], { w: 62, padR: 4 }),
              cell([
                p(img('logo-horizontal-navy.png', 66, logoH('logo-horizontal-navy.png', 66)), { align: AlignmentType.RIGHT, after: 2.4 }),
                p([
                  t(D.name, { pt: 8.5, color: NAVY, bold: true }),
                  t('  ·  ', { pt: 8.5, color: GOLD }),
                  t(D.role, { pt: 8.5, color: NAVY }),
                ], { align: AlignmentType.RIGHT, after: 0.6 }),
                p(t(`${D.dept}  ·  ${D.cred}`, { pt: 8, color: NAVY55, italic: true }),
                  { align: AlignmentType.RIGHT, after: 2.6 }),
                rule(GOLD, 0.5, { after: 2.6 }),
                p([label('Mobile', { color: NAVY55 }), t(`  ${D.mobile}`, { pt: 7.5, color: NAVY })],
                  { align: AlignmentType.RIGHT, after: 0.6 }),
                p([label('Chambers', { color: NAVY55 }), t(`  ${D.chambers}`, { pt: 7.5, color: NAVY })],
                  { align: AlignmentType.RIGHT, after: 0.6 }),
                p([label('Email', { color: NAVY55 }), t(`  ${D.email}`, { pt: 7.5, color: NAVY })],
                  { align: AlignmentType.RIGHT, after: 0.6 }),
                p([label('Web', { color: NAVY55 }), t(`  ${D.web}`, { pt: 7.5, color: NAVY })],
                  { align: AlignmentType.RIGHT, after: 0 }),
              ], { w: 108, padR: 0 }),
            ],
          })], { w: 170, cols: [62, 108] }),
          p(t('', { pt: 1 }), { line: 1 }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Table({
            borders: NO_BORDERS,
            width: { size: TW(170), type: WidthType.DXA },
            columnWidths: [TW(56.6), TW(56.6), TW(56.8)],
            rows: [new TableRow({
              children: D.offices.map((o, i) => new TableCell({
                width: { size: TW(56.6), type: WidthType.DXA },
                shading: { fill: NAVY },
                margins: { top: TW(4), bottom: TW(4), left: TW(i === 0 ? 6 : 0), right: TW(6) },
                children: [
                  p([
                    ...(o.principal ? [t('★  ', { font: SANS, pt: 6.5, color: GOLD, bold: true })] : []),
                    t(o.city.toUpperCase(), { font: SANS, pt: 6.5, color: PAPER, bold: true, track: 0.8 }),
                  ], { after: 1 }),
                  ...o.flat.split('|').map((line) => p(t(line, { pt: 7, color: 'C9CFDD' }), { line: 1.35 })),
                ],
              })),
            })],
          }),
          p(dotted(D.practice, { font: SANS, pt: 5.5, color: NAVY55, bold: true, track: 0.8 }), {
            align: AlignmentType.CENTER, before: 2.8, after: 0, line: 1.5,
          }),
        ],
      }),
    },
    children: blankBody(),
  }],
});

/* ════════════════════════════════════════════════════════════════════
   THE COMPACT SET — 4, 5, 6

   Same right-hand discipline, stripped down: the New Delhi chamber only,
   no footer at all, and a header short enough to leave the sheet mostly
   paper. Body copy starts between 44mm and 60mm from the top, against
   58–84mm in the full set.
   ═══════════════════════════════════════════════════════════════════ */
const compactPage = (topMm) => ({
  size: { width: TW(210), height: TW(297), orientation: PageOrientation.PORTRAIT },
  margin: { top: TW(topMm), right: TW(20), bottom: TW(25), left: TW(20), header: TW(16), footer: TW(12) },
});

const compact = (title, topMm, headerChildren) => new Document({
  creator: 'Rakesh Agarwal, Advocates',
  styles: DOC_STYLES,
  title,
  sections: [{
    properties: { page: compactPage(topMm) },
    headers: { default: new Header({ children: headerChildren }) },
    children: blankBody(),
  }],
});

/* 4 — COMPACT STACK. The masthead of iteration 2 at three-quarter scale,
   with one address in place of the chambers footer. */
const doc4 = () => compact('Letterhead — Compact Stack', 64, [
  p(img('logo-horizontal-navy.png', 48, logoH('logo-horizontal-navy.png', 48)),
    { align: AlignmentType.RIGHT, after: 3.6 }),
  p([
    t(`${D.name.toUpperCase()}  `, { font: SANS, pt: 6, color: NAVY, bold: true, track: 1 }),
    t('·', { font: SANS, pt: 6, color: GOLD, bold: true }),
    t(`  ${D.role.toUpperCase()}`, { font: SANS, pt: 6, color: NAVY, bold: true, track: 1 }),
  ], { align: AlignmentType.RIGHT, after: 1 }),
  p(t(`${D.dept}  ·  ${D.cred}`, { pt: 7, color: NAVY55, italic: true }),
    { align: AlignmentType.RIGHT, after: 2.4 }),
  rule(GOLD, 0.5, { after: 2.2 }),
  p(t(D.delhiOneLine, { pt: 7.5, color: NAVY }), { align: AlignmentType.RIGHT, after: 0.8 }),
  p(dotted([D.mobile, D.chambers, D.email, D.web], { pt: 7.5, color: NAVY }),
    { align: AlignmentType.RIGHT, after: 2.6 }),
  rule(NAVY, 1.2, { after: 0 }),
]);

/* 5 — BRACKET. No rule under the masthead; instead the particulars hang
   off a short gold upright, which reads as a margin note beside the logo. */
const doc5 = () => compact('Letterhead — Bracket', 64, [
  p(img('logo-horizontal-navy.png', 52, logoH('logo-horizontal-navy.png', 52)),
    { align: AlignmentType.RIGHT, after: 3.4 }),
  new Table({
    borders: NO_BORDERS,
    width: { size: TW(170), type: WidthType.DXA },
    columnWidths: [TW(70), TW(100)],
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: TW(70), type: WidthType.DXA },
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          children: [p(t('', { pt: 1 }), { exact: 1 })],
        }),
        new TableCell({
          width: { size: TW(100), type: WidthType.DXA },
          margins: { top: 0, bottom: 0, left: TW(4), right: 0 },
          borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
            right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
            left: { style: BorderStyle.SINGLE, size: BS(1), color: GOLD },
          },
          children: [
            p([
              t(`${D.name.toUpperCase()}  `, { font: SANS, pt: 6, color: NAVY, bold: true, track: 1 }),
              t('·', { font: SANS, pt: 6, color: GOLD, bold: true }),
              t(`  ${D.role.toUpperCase()}`, { font: SANS, pt: 6, color: NAVY, bold: true, track: 1 }),
            ], { after: 1.2 }),
            p(t(`${D.dept}  ·  ${D.cred}`, { pt: 7, color: NAVY55, italic: true }), { after: 2.6 }),
            p(t(D.delhiOneLine, { pt: 7.5, color: NAVY }), { line: 1.3 }),
            p(dotted([D.mobile, D.chambers, D.email], { pt: 7.5, color: NAVY }),
              { before: 1.8, line: 1.3 }),
            p(t(D.web, { pt: 7.5, color: NAVY }), { line: 1.3 }),
          ],
        }),
      ],
    })],
  }),
]);

/* 6 — HAIRLINE. The smallest of the set: logo, one gold hairline, two
   lines of particulars. Body copy starts 44mm down. */
const doc6 = () => compact('Letterhead — Hairline', 46, [
  p(img('logo-horizontal-navy.png', 44, logoH('logo-horizontal-navy.png', 44)),
    { align: AlignmentType.RIGHT, after: 3.4 }),
  rule(GOLD, 0.5, { after: 2.6 }),
  p(dotted([D.name, D.role, D.dept, D.cred], { pt: 7, color: NAVY }),
    { align: AlignmentType.RIGHT, after: 0.7 }),
  p(dotted([D.delhiOneLine, D.mobile, D.email], { pt: 7, color: NAVY70 }),
    { align: AlignmentType.RIGHT, after: 0 }),
]);

/* ── body ──────────────────────────────────────────────────────────
   The sheet ships empty: it is stationery, not a specimen. A single
   paragraph carries the body style so the first keystroke is already
   Georgia 10.5/1.5, and the caret lands under the masthead.
   ─────────────────────────────────────────────────────────────────── */
function blankBody() {
  return [p(t('', { pt: 10.5 }), { line: 1.5, after: 0 })];
}

/** Applied to everything the advocate types into the blank sheet. */
const DOC_STYLES = {
  default: {
    document: {
      run: { font: SERIF, size: HP(10.5), color: INK },
      paragraph: { spacing: { line: LN(1.5), lineRule: LineRuleType.AUTO, after: TW(3.4) } },
    },
  },
};

/* ── write ─────────────────────────────────────────────────────────── */
const builds = [
  ['1-the-rail.docx', doc1()],
  ['2-right-masthead.docx', doc2()],
  ['3-corner-spine.docx', doc3()],
  ['4-compact-stack.docx', doc4()],
  ['5-bracket.docx', doc5()],
  ['6-hairline.docx', doc6()],
];

for (const [file, doc] of builds) {
  const buf = await Packer.toBuffer(doc);
  writeFileSync(resolve(OUT, file), buf);
  console.log(`${file.padEnd(26)} ${(buf.length / 1024).toFixed(0)} KB`);
}
console.log('\nWritten to letterhead/out/');
