// Copies user-provided source material into /public/assets/ so Vite can serve it.
// Runs as a `predev` and `prebuild` step in package.json.
//
// Source roots:
//   docs/pre-existing-work/      -> PDFs, MP4s, DOCX
//   docs/images/                 -> PNG/JPG artifacts
//   docs/design-tokens/sf-symbols/ -> SF Symbol SVG exports (when user adds them)
//
// Destination roots:
//   public/assets/pdfs/
//   public/assets/images/
//   public/assets/extras/        (mp4, docx, anything else)
//   public/assets/icons/

import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SOURCES = [
  { from: 'docs/pre-existing-work', to: 'public/assets', byExt: true },
  { from: 'docs/images', to: 'public/assets/images', byExt: false },
  { from: 'docs/design-tokens/sf-symbols', to: 'public/assets/icons', byExt: false },
];

const EXT_MAP = {
  '.pdf': 'pdfs',
  '.png': 'images',
  '.jpg': 'images',
  '.jpeg': 'images',
  '.webp': 'images',
  '.svg': 'icons',
  '.mp4': 'extras',
  '.mov': 'extras',
  '.webm': 'extras',
  '.docx': 'extras',
  '.xlsx': 'extras',
};

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function copyEntry(srcPath, destPath) {
  await ensureDir(path.dirname(destPath));
  await copyFile(srcPath, destPath);
}

async function processSource({ from, to, byExt }) {
  const srcRoot = path.join(ROOT, from);
  if (!existsSync(srcRoot)) return { copied: 0, skipped: 0 };

  let copied = 0;
  let skipped = 0;
  const entries = await readdir(srcRoot);
  for (const entry of entries) {
    if (entry.startsWith('.')) continue;
    const srcPath = path.join(srcRoot, entry);
    const s = await stat(srcPath);
    if (!s.isFile()) continue;

    let destDir;
    if (byExt) {
      const ext = path.extname(entry).toLowerCase();
      const subdir = EXT_MAP[ext];
      if (!subdir) {
        skipped += 1;
        continue;
      }
      destDir = path.join(ROOT, to, subdir);
    } else {
      destDir = path.join(ROOT, to);
    }

    const destPath = path.join(destDir, entry);
    await copyEntry(srcPath, destPath);
    copied += 1;
  }
  return { copied, skipped };
}

async function main() {
  await Promise.all([
    ensureDir(path.join(ROOT, 'public/assets/pdfs')),
    ensureDir(path.join(ROOT, 'public/assets/images')),
    ensureDir(path.join(ROOT, 'public/assets/icons')),
    ensureDir(path.join(ROOT, 'public/assets/extras')),
  ]);

  let total = 0;
  for (const s of SOURCES) {
    const { copied, skipped } = await processSource(s);
    total += copied;
    console.log(
      `[copy-assets] ${s.from} -> ${s.to}  copied=${copied} skipped=${skipped}`,
    );
  }
  console.log(`[copy-assets] done, ${total} files copied total`);
}

main().catch((err) => {
  console.error('[copy-assets] failed:', err);
  process.exit(1);
});
