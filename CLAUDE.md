# website

Standalone CTRL+R marketing/docs site. Next.js 16 (App Router) + Tailwind v4 + React 19.
Link-only coupling to the product — **zero env vars, no auth, and no external/product backend dependency**; it still uses local Next.js server routes and server-side content fetching.

## Commands

```bash
npm ci
npm run dev     # :3000
npm run build   # needs network once (Google Fonts at build time)
npm run lint
```

## Structure / conventions

- App Router pages under `src/app/` (careers, contact, docs, news, research, roadmap, team, ...).
- **Tailwind v4: there is no `tailwind.config.*` file** — design tokens live in
  `src/app/globals.css`. Don't create a config file.
- Content is TypeScript modules in `src/content/` rendered by components in `src/components/`
  (docs pages via `DocsContent.tsx`). Edit content there, not in page components.
- `fastmode-out/` (~103 MB) is stray build output — never import from it, keep it out of Docker
  contexts and commits.

Local dev via docker: `../ctrlr-local-stack` (`make web`). Workspace docs:
`../ctrlr-local-stack/docs/`.

## Docs sync

After every major piece of work in this repo, sync the meta-repo `docs/` pages it affects — or ask
the user "sync docs now or not yet?" before wrapping up. The meta-repo tracks last-synced state in
`docs/.docs-sync-state.json`: from the meta-repo root, `make docs-sync-status` detects unsynced
commits and `make docs-sync-mark` records a new baseline after syncing.
