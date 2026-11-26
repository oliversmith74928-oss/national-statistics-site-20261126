// Meridian — hand-in program for the "Make the best national statistics site" bounty.
//
// What this program does, in order:
//   1. Checks the entry is complete before anything is copied: app/index.html
//      exists, screenshots/ holds 3 or 4 images inside the size cap, and the
//      vendored dossier library is present.
//   2. Copies app/ and screenshots/ from this repository into the output
//      directory (MAKEFUN_OUTPUT_DIR, or /output in the grader).
//   3. Writes /output/dossier.json with buildDossier from the vendored
//      make.fun library, using the scorer's caps.
//   4. Re-reads the dossier, confirms it parses and sits inside its byte cap,
//      and prints a short build summary (files, bytes, screenshots) so a
//      broken hand-in fails loudly instead of silently.
//
// Node 22, standard library only. Nothing is written outside the output
// directory, so running it twice produces the same bytes.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Caps from the bounty rules (RULES.txt): app/ holds at most 993 files and
// directories and 16 MiB in all; screenshots/ holds 3 to 4 images, each at
// most 256 KiB; dossier.json is at most 1.5 MiB.
const APP_MAX_ENTRIES = 993;
const APP_MAX_BYTES = 16 * 1024 * 1024;
const SHOT_MIN_COUNT = 3;
const SHOT_MAX_COUNT = 4;
const SHOT_MAX_BYTES = 256 * 1024;
const DOSSIER_MAX_BYTES = 1536 * 1024;

type ListedEntry = { path: string; bytes: number; isDir: boolean };

// Walk a directory depth-first, in sorted name order so the listing is
// stable from one run to the next.
function walkTree(dir: string, rel = ''): ListedEntry[] {
  const found: ListedEntry[] = [];
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    const relPath = rel ? `${rel}/${name}` : name;
    const st = statSync(full);
    if (st.isDirectory()) {
      found.push({ path: relPath, bytes: 0, isDir: true });
      found.push(...walkTree(full, relPath));
    } else if (st.isFile()) {
      found.push({ path: relPath, bytes: st.size, isDir: false });
    }
  }
  return found;
}

function humanBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MiB`;
}

function fail(message: string): never {
  throw new Error(`meridian hand-in: ${message}`);
}

// Refuse to build a hand-in the scorer would refuse, with the reason named.
function checkInputs(): { appFiles: ListedEntry[]; shots: ListedEntry[] } {
  if (!existsSync(join(here, 'app', 'index.html'))) {
    fail('app/index.html is missing — there is no site to hand in');
  }
  if (!existsSync(join(here, 'vendor', 'makefun-frontend.ts'))) {
    fail('vendor/makefun-frontend.ts is missing — the dossier library is required');
  }
  const appFiles = walkTree(join(here, 'app'));
  if (appFiles.length > APP_MAX_ENTRIES) {
    fail(`app/ holds ${appFiles.length} entries, over the ${APP_MAX_ENTRIES} cap`);
  }
  const appBytes = appFiles.reduce((sum, e) => sum + e.bytes, 0);
  if (appBytes > APP_MAX_BYTES) {
    fail(`app/ is ${humanBytes(appBytes)}, over the ${humanBytes(APP_MAX_BYTES)} cap`);
  }
  const shotsDir = join(here, 'screenshots');
  if (!existsSync(shotsDir)) {
    fail('screenshots/ is missing — the entry needs 3 or 4 screenshots');
  }
  const shots = walkTree(shotsDir).filter((e) => !e.isDir);
  if (shots.length < SHOT_MIN_COUNT || shots.length > SHOT_MAX_COUNT) {
    fail(`screenshots/ holds ${shots.length} images, need ${SHOT_MIN_COUNT}–${SHOT_MAX_COUNT}`);
  }
  for (const shot of shots) {
    if (!/\.(png|jpe?g)$/i.test(shot.path)) fail(`screenshot ${shot.path} is not a PNG or JPEG`);
    if (shot.bytes > SHOT_MAX_BYTES) {
      fail(`screenshot ${shot.path} is ${humanBytes(shot.bytes)}, over the ${humanBytes(SHOT_MAX_BYTES)} cap`);
    }
  }
  return { appFiles, shots };
}

// The heaviest files of the site, largest first — the first-load budget in
// the judge's Totals line is dominated by these, so they are worth watching.
function largestFiles(files: ListedEntry[], count: number): ListedEntry[] {
  return files
    .filter((e) => !e.isDir)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, count);
}

// Confirm the dossier we just wrote is well-formed JSON and inside its cap.
function verifyDossier(): number {
  const dossierPath = join(out, 'dossier.json');
  const raw = readFileSync(dossierPath, 'utf8');
  if (raw.length > DOSSIER_MAX_BYTES) {
    fail(`dossier.json is ${humanBytes(raw.length)}, over the ${humanBytes(DOSSIER_MAX_BYTES)} cap`);
  }
  const parsed = JSON.parse(raw) as unknown;
  if (parsed === null || typeof parsed !== 'object') {
    fail('dossier.json did not parse as a JSON object');
  }
  return raw.length;
}

const { appFiles, shots } = checkInputs();

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files: app/ counts beside /output's own 1000-entry
// cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

const dossierBytes = verifyDossier();
const appBytes = appFiles.reduce((sum, e) => sum + e.bytes, 0);
const shotBytes = shots.reduce((sum, e) => sum + e.bytes, 0);
console.log(`meridian hand-in: app/ ${appFiles.filter((e) => !e.isDir).length} files, ${humanBytes(appBytes)}`);
for (const heavy of largestFiles(appFiles, 3)) {
  console.log(`meridian hand-in: largest app/${heavy.path} ${humanBytes(heavy.bytes)}`);
}
console.log(`meridian hand-in: screenshots/ ${shots.length} images, ${humanBytes(shotBytes)}`);
console.log(`meridian hand-in: dossier.json ${humanBytes(dossierBytes)} -> ${out}`);
