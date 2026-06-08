# Deployment Guide

This portfolio is deployed as a **GitHub User Site**, served at the root:
**https://jayaharisai.github.io/**

## How it works

- The repo is named `jayaharisai.github.io` (NOT `jayaharisai`).
- GitHub automatically serves user-site repos at `https://<username>.github.io/`.
- The site is a **static export** of the Next.js app (`output: "export"` in `next.config.ts`).
- The GitHub Actions workflow builds the site on every push to `main` and deploys it.

## Local development

```bash
pnpm install
pnpm dev          # → http://localhost:3000
```

No basePath is needed, so assets and routes resolve naturally.

## Local production preview

```bash
pnpm build        # outputs static site to ./out
npx serve out     # → http://localhost:3000
```

## Renaming the repo (one-time setup)

If the repo is still named `jayaharisai` (i.e. deployed at `jayaharisai.github.io/jayaharisai/`):

1. Go to **Settings → General → Repository name**
2. Rename to **`jayaharisai.github.io`**
3. Go to **Settings → Pages**
4. Set **Source** to **GitHub Actions**
5. Push to `main` to trigger a deployment

## Why the `asset()` helper exists

All `<img src=...>` calls go through `lib/basePath.ts`'s `asset()` function:

```ts
import { asset } from "@/lib/basePath";
<img src={asset("/myimage.jpg")} />
```

`BASE_PATH` is currently `""` because we deploy at the root. If you ever
need to move the site (e.g. to a project repo or a custom domain with a
subpath), change `BASE_PATH` in `lib/basePath.ts` and add `basePath` to
`next.config.ts` — no component changes required.
