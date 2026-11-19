// Leonida Trophy Guide — hand-in program (Node 22, standard library only).
//
// The entry is the static app in ./app plus the screenshots in ./screenshots.
// This program copies both into the output directory (MAKEFUN_OUTPUT_DIR, or
// /output inside the grader) and writes /output/dossier.json, the summary the
// judge reads, using the vendored make.fun library. The library file
// vendor/makefun-frontend.ts is left exactly as the kit shipped it: the gate
// rebuilds the dossier with its own copy and compares the two byte for byte.
//
// Run locally: MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the guide locally: node serve.ts, then open http://localhost:8080

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const appSource = join(repoRoot, 'app');
const shotsSource = join(repoRoot, 'screenshots');

mkdirSync(outputDir, { recursive: true });
cpSync(appSource, join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(shotsSource)) {
  cpSync(shotsSource, join(outputDir, 'screenshots'), { recursive: true });
}

// Dossier caps mirror the gate: at most 4 screenshots of 256 KiB, app/ at most
// 993 files and 48 MiB, and the judge text capped at 160 KiB. The program is
// deterministic: two runs write identical bytes.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
