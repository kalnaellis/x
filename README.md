# Seal Your Case — Scroll Landing

React + TypeScript + Vite single-page scroll narrative designed for GitHub Pages hosting with external intake/upload backend.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Backend contract

- `POST /case` -> `{ caseId, folderId, folderUrl }`
- `POST /upload` multipart with `caseId`, `folderId`, `files[]`

All Google credentials must remain server-side.
