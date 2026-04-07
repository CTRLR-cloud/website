/**
 * Fast Mode expects:
 *   manifest.json, pages/*.html, public/** (see Fast Mode docs)
 * Next.js `output: "export"` emits `out/` with a different layout and `/_next/` paths.
 * This script writes `fastmode-out/` for deployment (set Fast Mode publish dir to `fastmode-out`).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const destRoot = path.join(root, "fastmode-out");

function walkFiles(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkFiles(full, base, acc);
    else acc.push(full);
  }
  return acc;
}

/** Map pages/foo/bar.html → /foo/bar ; pages/index.html → / */
function fileToUrl(pagesRoot, absFile) {
  let rel = path.relative(pagesRoot, absFile).replace(/\\/g, "/");
  if (rel.endsWith(".html")) rel = rel.slice(0, -5);
  if (rel === "index") return "/";
  return "/" + rel;
}

function titleFromHtml(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim().replace(/\s+/g, " ") : "CTRL+R";
}

const ASSET_EXT = "png|jpe?g|gif|webp|ico|svg|mp4|webm|ttf|woff2?|txt";

function rewriteHtml(html) {
  let s = html;
  s = s.split("/_next/").join("/public/_next/");
  s = s.split('"/_next/').join('"/public/_next/');
  s = s.split("'/_next/").join("'/public/_next/");
  const assetRe = new RegExp(
    `(src|href)=(["'])\\/([^"']*\\.(${ASSET_EXT}))(?:\\?[^"']*)?\\2`,
    "gi",
  );
  s = s.replace(assetRe, (full, attr, q, filePath) => {
    if (filePath.startsWith("public/")) return full;
    return `${attr}=${q}/public/${filePath}${q}`;
  });

  s = s.replace(
    new RegExp(`url\\(\\/((?:[^/)]+/)*[^)]+\\.(${ASSET_EXT})(?:\\?[^)]*)?)\\)`, "gi"),
    (full, filePath) => {
      if (filePath.startsWith("public/")) return full;
      return `url(/public/${filePath})`;
    },
  );

  s = s.replace(
    new RegExp(`poster=(["'])\\/([^"']+\\.(${ASSET_EXT}))\\1`, "gi"),
    (full, q, filePath) => {
      if (filePath.startsWith("public/")) return full;
      return `poster=${q}/public/${filePath}${q}`;
    },
  );

  const escRe = new RegExp(
    `\\\\"([a-z]+)\\\\":\\\\"\\/([^"\\\\]+\\.(${ASSET_EXT}))\\\\"`,
    "gi",
  );
  s = s.replace(escRe, (full, key, filePath) => {
    if (filePath.startsWith("public/") || /^https?:/i.test(filePath)) return full;
    return `\\"${key}\\":\\"/public/${filePath}\\"`;
  });

  return s;
}

/** Slug for unique data-edit-key prefixes (MCP zip deploy requires these on text elements). */
function pageSlugFromRel(rel) {
  const base = rel.replace(/\.html$/i, "").replace(/\\/g, "/");
  return base
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "page";
}

/**
 * Fast Mode MCP `deploy_package` validates that static pages include data-edit-key for visual editing.
 * Next export HTML has none; inject keys on common text-bearing tags (unique per file).
 */
function injectFastModeEditKeys(html, slug) {
  let n = 0;
  const tagNames =
    "h[1-6]|p|button|li|label|th|td|strong|em|small|blockquote|figcaption|span|a";
  const re = new RegExp(`<(${tagNames})(\\s[^>]*)?>`, "gi");
  return html.replace(re, (full, tag, attrs = "") => {
    if (/data-edit-key\s*=/i.test(attrs)) return full;
    if (/\baria-hidden\s*=\s*["']true["']/i.test(attrs)) return full;
    n += 1;
    const key = `${slug}-fm${n}`;
    return `<${tag}${attrs} data-edit-key="${key}">`;
  });
}

function preparePageHtml(rawHtml, pageRel) {
  let html = rewriteHtml(rawHtml);
  html = html.replace(/\bdata-form-name\s*=/gi, "data-form=");
  html = injectFastModeEditKeys(html, pageSlugFromRel(pageRel));
  return html;
}

function main() {
  if (!fs.existsSync(outDir)) {
    console.error("Missing out/ — run `npm run build` (next build) first.");
    process.exit(1);
  }

  fs.rmSync(destRoot, { recursive: true, force: true });
  const pagesDir = path.join(destRoot, "pages");
  const publicDir = path.join(destRoot, "public");
  fs.mkdirSync(pagesDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  const outFiles = walkFiles(outDir);

  for (const f of outFiles) {
    const rel = path.relative(outDir, f).replace(/\\/g, "/");
    if (rel.startsWith("_next/")) {
      const dest = path.join(publicDir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(f, dest);
      continue;
    }
    if (rel.endsWith(".html")) {
      const dest = path.join(pagesDir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const raw = fs.readFileSync(f, "utf8");
      const html = preparePageHtml(raw, rel);
      fs.writeFileSync(dest, html, "utf8");
      continue;
    }
    const dest = path.join(publicDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(f, dest);
  }

  const pageHtmlFiles = walkFiles(pagesDir).filter((p) => p.endsWith(".html"));
  const pages = pageHtmlFiles.map((abs) => {
    const relFile = path.relative(pagesDir, abs).replace(/\\/g, "/");
    const html = fs.readFileSync(abs, "utf8");
    return {
      path: fileToUrl(pagesDir, abs),
      file: "pages/" + relFile,
      title: titleFromHtml(html),
      editable: true,
    };
  });

  pages.sort((a, b) => a.path.localeCompare(b.path));

  const manifest = {
    name: "CTRL+R",
    pages,
  };

  fs.writeFileSync(path.join(destRoot, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

  console.log(
    `Fast Mode package written to fastmode-out/ (${pages.length} pages). Set Fast Mode publish directory to "fastmode-out".`,
  );
}

main();
