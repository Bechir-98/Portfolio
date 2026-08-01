# Bechir Portfolio

Personal portfolio for **Mohamed Bechir Chemam** — a "Mission Control" deep-space
engineering aesthetic built with React, Three.js (React Three Fiber), Tailwind CSS,
Framer Motion, and react-router.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Build locally — do **not** run `npm run build` on a 1 GB RAM VPS.

## Deploy to VPS (Nginx)

1. Build locally: `npm run build`
2. Copy `dist/` to your VPS:
   ```bash
   rsync -avz --delete dist/ user@your-vps:/var/www/bechir-portfolio/
   ```
3. Copy `deploy/nginx.conf` to `/etc/nginx/sites-available/bechir-portfolio`
4. Enable the site and reload Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/bechir-portfolio /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
5. Add SSL: `sudo certbot --nginx -d your-domain.com`

> Because the app uses client-side routing, `deploy/nginx.conf` includes a
> `try_files ... /index.html` fallback so deep links (e.g. `/projects/wheel-match`)
> resolve correctly.

Or use the helper script (requires rsync + SSH):

```bash
./deploy/deploy.sh user@your-vps-ip
```

## How to add a project

Edit `src/content/projects.ts` and append a new entry. Every field is typed in the
`Project` interface — `challenge`, `solutions[]`, and `impact[]` power the case-study
page at `/projects/:id`; `summary[]` powers the cards.

```typescript
{
  id: 'my-new-project',
  title: 'My New Project',
  subtitle: 'Short tagline',
  tagline: 'One-line hook shown on cards',
  category: 'full-stack', // 'full-stack' | 'ai' | 'hackathon'
  year: '2026',
  role: 'Full-Stack Developer',
  timeline: 'Winter 2026 · 2 months',
  challenge: 'The problem the project solves.',
  summary: ['Two or three bullet points for the card.'],
  solutions: ['What you built and how.'],
  impact: ['Outcomes and lessons learned.'],
  stack: ['React', 'Node.js'],
  links: [{ label: 'GitHub', url: 'https://github.com/Bechir-98/my-repo' }],
  liveUrl: 'https://demo.example.com', // optional
  image: '/projects/my-new-project/cover.png', // optional card cover
  gallery: ['/projects/my-new-project/dashboard.png', '/projects/my-new-project/login.png'], // optional demo screenshots
  featured: true, // set true to appear in Featured
}
```

Project screenshots live in a **folder named after the project id**, so each file is
linked directly to its project: `public/projects/<project-id>/<slug>.png`
(e.g. `public/projects/ma-federation/dashboard.png`). Add files for a folder, list them
in the project's `gallery`, and they show as labeled "Demo / Screenshots" cards on the
case-study page (click to zoom). Until you have real screenshots, a themed SVG
placeholder works for `image` (`/projects/<project-id>.svg`).

## How to update profile copy

Edit `src/content/profile.ts`:
- `headline` / `hook` — hero copy
- `about` — array of paragraphs for About
- `now` — the "What I'm building now" list
- `facts` — the sidebar fact list
- Drop your headshot at `public/profile.svg` (the hero avatar shows an "MBC" monogram fallback until the file exists)

## How to add a certificate

1. Drop the scan/export into `public/certificates/<cert-id>.png` (e.g. `azure-ai.png`)
2. Add the id to `certifications` in `src/content/achievements.ts` with `image: '/certificates/<cert-id>.png'`
3. The image renders as a card in the Achievements section and opens in the lightbox; certs without a file fall back to a text card.

## How to add a page / route

Routes live in `src/App.tsx`. Pages live in `src/pages/` and are lazy-loaded.
- Add a new route: `{ path: '/uses', element: <UsesPage /> }`
- Keep pages inside `SiteLayout` so they inherit the navbar, footer, and smooth scroll.

## Design system

- Tokens (colors, fonts, shadows) live in `src/index.css` under `@theme`.
- Never hardcode hex values in components — use the token utilities (`bg-ink`, `text-accent`, `border-paper/10`, …).
- Signature pieces in `src/index.css`: `.bg-scene` (radial space backdrop), `.hairline`, `.accent-line`.
- Section headers use labels from `src/content/sections.ts`, rendered by `SectionLabel`.
- UI primitives live in `src/components/ui/`: `Button`, `Badge`, `Heading`, `Container`, `Logo`, `SectionLabel`, `ProjectCard`.

## Project structure

```
src/
├── content/       # All portfolio data (edit these files)
├── components/
│   ├── sections/  # Home page sections
│   ├── three/     # 3D hero: Starfield, StarSphere, MoonGlobe
│   └── ui/        # Reusable UI primitives
├── hooks/         # useLenis, useActiveSection, useDocumentMeta, …
├── layouts/       # SiteLayout + ScrollManager
├── lib/           # lenis singleton helpers
└── pages/         # Route-level pages (lazy loaded)
```

## 3D hero scene

- `MoonGlobe.tsx` renders the NASA moon GLB (desktop only); `StarSphere.tsx` shows the
  Poly Haven HDR night sky behind the scene; `Starfield` adds the drifting particles.
- `FloatingAvatar.tsx` renders the personal `models/avatar.glb` in a fixed bottom-right
  layer that floats and parallaxes with scroll. Home page only; hidden on mobile and
  under reduced motion. Drop your exported GLB (e.g. Ready Player Me) at
  `public/models/avatar.glb`.
- All GPU resources are disposed on unmount; the scene auto-degrades (reduced motion /
  low memory → static `.bg-scene`; mobile → stars only, no post-processing).
- Model files live in `public/models/` (CC0 — see `public/models/CREDITS.md`).

## Stack

- Vite + React + TypeScript
- Three.js + React Three Fiber + Drei + postprocessing
- Tailwind CSS v4
- Framer Motion
- react-router-dom v7
- Lenis (smooth scroll)
- oxlint
