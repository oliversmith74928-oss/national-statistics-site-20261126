# Build log (fix) — Meridian national statistics site

Fix for the round-1 rejection of submission
`01a21704-d5b8-74e4-b881-7db4e19c6ace` (commit
`3509798f98793bf7997d4ac749a42b5f4349588c`, title Meridian). The server's
fix for the key failure read: "Your agent wrote no line of the entrypoint
main.ts: its lines are the kit's starter main.ts as handed out... Have your
agent change main.ts itself, in a session you upload: the entrypoint must
hold lines it wrote."

## What this session changed

Only `main.ts` was rewritten, in this session, in a full write followed by
two edits. The starter's `main.ts` (36 lines, kept verbatim by the original
build) is replaced by 149 lines of new code written here:

- A pre-flight check (`checkInputs`) that refuses to build a hand-in the
  scorer would refuse: `app/index.html` must exist, the vendored
  `vendor/makefun-frontend.ts` must be present, `app/` must stay inside
  the 993-entry / 16 MiB caps, and `screenshots/` must hold 3–4 PNG/JPEG
  images each inside 256 KiB — each failure names its reason.
- A sorted depth-first directory walk (`walkTree`) and a byte formatter
  (`humanBytes`) backing those checks.
- A post-build check (`verifyDossier`) that re-reads `dossier.json`,
  confirms it parses as a JSON object and sits inside the 1.5 MiB cap.
- A build summary printed on every run: app file count and bytes, the
  three largest app files (the first-load budget the judge reads in the
  Totals line), screenshot count and bytes, and the dossier size.
- The hand-in itself is unchanged in behaviour: it still copies `app/` and
  `screenshots/` to the output directory and writes `dossier.json` with
  `buildDossier` from the vendored library, with the scorer's caps.

Nothing else changed: no app/ file, screenshot, README badge,
`.makefun/owner.json`, LICENSE or repo About setting was touched, so the
site's visuals are identical and the existing screenshots stay valid.

## Verification (2026-11-26, UTC)

- `MAKEFUN_OUTPUT_DIR=out node main.ts` ran cleanly and printed the
  summary: app/ 5 files, 36.5 KiB; largest app/views.js 17.8 KiB,
  app/style.css 7.5 KiB, app/data.js 6.1 KiB; screenshots/ 4 images,
  285.7 KiB; dossier.json 420.1 KiB.
- A second run into `out2` produced byte-identical output
  (`diff -r out out2` clean), so the two grader runs match.
- `dossier.json` parses (keys: cover, images, schema, text) and is
  430,215 bytes, inside the 1.5 MiB cap.
- Served `app/` with `serve.ts` on port 8123: index, main.js, views.js,
  data.js and style.css all returned HTTP 200, and the index title
  "Meridian — National Statistics in Numbers" renders.
- The temporary `out/` and `out2/` directories were removed after the
  determinism check, so no build artefacts are committed.
