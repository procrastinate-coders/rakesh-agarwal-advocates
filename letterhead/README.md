# Letterhead — Rakesh Agarwal, Advocates

Six A4 Word letterheads, all built around the same idea: the identity block
sits on the **right** of the sheet, and the writing area opens to its left.
No enrolment particulars appear on any of them.

**The full set** — all three chambers, footer in use.

| File | Direction | Body starts |
|---|---|---|
| `out/1-the-rail.docx` | Tinted panel down the full right edge — logo, credentials, contacts, all three chambers, practice list | 32 mm |
| `out/2-right-masthead.docx` | Conventional header, ranged right: logo over credentials over contacts, closed by a navy/gold rule. Chambers carry the footer | 78 mm |
| `out/3-corner-spine.docx` | Compact block in the top-right corner, gold hairline down the right margin, chambers reversed out of a navy band at the foot | 84 mm |

**The compact set** — the New Delhi chamber only, no footer at all, short header.

| File | Direction | Body starts |
|---|---|---|
| `out/4-compact-stack.docx` | The masthead at three-quarter scale: logo, credentials, gold hairline, one address, one contact line, closed by a navy rule | 64 mm |
| `out/5-bracket.docx` | No horizontal rules — the particulars hang off a short gold upright, reading as a margin note under the logo | 64 mm |
| `out/6-hairline.docx` | The smallest: logo, one gold hairline, two lines of particulars | 46 mm |

`out/proofs.pdf` — all six blank at true A4, for printing or sharing.
`out/page-{1..6}.png` — the same six carrying a specimen letter, to judge how
each frame behaves around real copy.

## Using them

Open, type. The body is empty and already styled Georgia 10.5/1.5, so the first
keystroke lands correctly. Every letterhead element lives in the page
header/footer, which means it repeats on continuation sheets and cannot be
nudged out of place while writing. To edit the furniture, use
**View → Header & Footer** (or double-click into the header area).

In every file except `1`, each phone number, address and credential is live
Word text — edit it in place. In `1` the rail is a single image; change the
details in `render-plates.mjs` and re-run the build (below).

## Why it is built this way

**A4 with a conventional envelope.** 210 × 297 mm. Header zone ~1.5–2 in,
footer ~0.75–1 in, ~20 mm side margins — the standard proportions. Nothing sits
closer than 11 mm to the trim, which clears the non-printable edge of an
ordinary office laser printer, so no element gets shaved off. Nothing bleeds,
for the same reason.

**Georgia and Arial, deliberately.** These are the two faces present on every
Windows and Mac install, so the file renders identically on any machine it is
opened on. The brand faces — Newsreader and Space Grotesk — survive inside the
logo, which travels as a PNG rendered at ~900 dpi.

**Flat colour areas are anchored pictures, not shaded tables.** A picture's
geometry is absolute; a table's grows with its content.

**The rail is baked on purpose.** A full-height sidebar is only expressible in
OOXML as a floating table, and floating tables degrade badly outside desktop
Word — Pages, Google Docs and most previewers drop the anchor and dump the text
at the left margin. An anchored picture is honoured everywhere. The other five
need no such compromise, so they stay fully editable.

**Two Word traps worth knowing.** A `w:spacing` with `w:line` but no
`w:lineRule` is read by Word as *Exactly*, which shears the top off any inline
picture taller than the line — this is what was cropping the logo. And Word has
no `text-transform`, so tracked-out capitals carry their own case in the string.

## Rebuilding

```bash
node letterhead/render-logo.mjs     # logo PNGs (trimmed to ink) + manifest.json
node letterhead/render-plates.mjs   # the rail panel and the gold spine
node letterhead/build-docx.mjs      # the three .docx files
node letterhead/shoot.mjs           # design references + proofs.pdf
node letterhead/verify.mjs          # renders the built .docx back to PNG
```

Content lives in one place per script: `D` in `build-docx.mjs`, and the
`OFFICES` / `PRACTICE` constants in `render-plates.mjs`. Change a phone number
in both, re-run, and all six letterheads follow.

`verify.mjs` renders the real OOXML through docx-preview — enough to catch
clipped images, lost anchors, wrong margins and broken tables. It also reports
the clearance between where the header content ends and where the body starts;
a negative figure means the letterhead would push the first line of the letter
down the page. Note it resolves
page-anchored pictures against the text margin where Word resolves them against
the sheet edge; the harness corrects for that so the screenshot shows where the
anchor actually lands on paper.
