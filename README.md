# Seal Your Case — Scroll Landing

React + TypeScript + Vite single-page scroll narrative designed for GitHub Pages hosting with an external intake/upload backend.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

### Important base-path note (fixes blank GitHub Pages renders)
- Local/dev default is `VITE_BASE_PATH=/`.
- GitHub Pages needs `VITE_BASE_PATH=/<repo-name>/`.
- The included workflow sets this automatically from `github.event.repository.name` during build.

## Backend contract

- `POST /case` -> `{ caseId, folderId, folderUrl }`
- `POST /upload` multipart with `caseId`, `folderId`, `files[]`

All Google credentials must remain server-side.
