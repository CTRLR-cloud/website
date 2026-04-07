# Deploying to Fast Mode (GitHub-first)

**Project:** CTRL+R — https://ctrlr.fastmode.ai  
**Project ID:** `b67e260c-49e2-499d-9294-2cefd08bbd64`

This site uses **Next.js** with **`output: "export"`**. Production HTML is emitted to the **`out/`** directory after `npm run build` (the folder is gitignored).

## GitHub → Fast Mode

1. Connect this repository (or the monorepo path that contains this `package.json`) in Fast Mode.
2. Set the **install command** to: `npm ci` or `npm install`
3. Set the **build command** to: `npm run build`
4. Set the **publish / output directory** to: **`out`**

CI must run the build with **network access** so RSS feeds can populate the home and news pages during static generation (optional but recommended).

## Contact form

The contact section posts to **Fast Mode’s form handler**:

- `action="/_forms/contact"`
- `data-form-name="contact"`
- Fields: `first_name`, `last_name`, `email`, `message`

Create a form named **`contact`** in the Fast Mode dashboard with matching fields, or adjust names to match your CMS.

## What changed for static export

- **No API routes** (`/api/join`, `/api/proxy-image` removed). RSS images use direct URLs (some feeds may block hotlinking).
- **`next.config` redirects** removed; **`/launch-app`** uses a small client redirect page to **`/launch-client`**.
- **`/news/[slug]`** in-house article pages were removed (empty `newsPosts` + static export constraints). RSS-driven news on **`/news`** remains. Add article pages again when you have static posts and a compatible route setup.
- **`images.unoptimized: true`** for static hosting.
- **`opengraph-image`**: `export const dynamic = "force-static"` for export compatibility.

## Local preview of the static bundle

```bash
npm run build
npx serve out
```

## MCP

From Cursor, `get_started(intent: "deploy", projectId: "b67e260c-49e2-499d-9294-2cefd08bbd64")` checks Fast Mode project state before zip-based deploys. With GitHub connected, prefer pushing to the connected branch instead of zip uploads unless you need a one-off full replace.
