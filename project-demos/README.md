# Portfolio project demos (React)

Seven **full-page mini-sites** (each project fills the tab like a real product: dashboard, SaaS landing, agency site, etc.). Stack: **React**, **React Router** (hash mode), **Vite**, plus HTML/CSS in components. The main portfolio only shows a small **← Portfolio** floating control so the demo feels like its own website.

## One-time setup

Install [Node.js](https://nodejs.org/) (includes `npm`), then in this folder run:

```bash
npm install
npm run build
```

That creates the `dist/` folder the main site links to (`project-demos/dist/index.html#/...`).

## Local preview of demos only

```bash
npm run dev
```

Open the URL Vite prints (e.g. `http://localhost:5173/#/smart-analytics-dashboard`).  
Main portfolio links use `dist/`; during development you can paste those hash URLs in the browser or temporarily point links at `http://localhost:5173/...`.

## Deploy / share

Upload the whole `portfolio site` folder (or your host’s equivalent), including **`project-demos/dist`** after `npm run build`. Hash routing works with static file hosting.

## Routes

| Route | Project |
|-------|---------|
| `#/smart-analytics-dashboard` | Smart Analytics Dashboard |
| `#/sas-product-landing` | SAS Product Landing |
| `#/aurora-ui` | Aurora UI |
| `#/cod-snippet-manager` | COD Snippet Manager |
| `#/team-collaboration-app` | Team Collaboration App |
| `#/startup-agency-landing` | Startup Agency Landing |
| `#/image-compressor-tool` | Image Compressor Tool |

`#/` alone lists all demos.
