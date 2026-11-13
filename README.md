# STHIRA — Architecture / Interiors / Spatial Experiments

A multi-page, motion-led architecture studio website concept built with **Astro 6, Three.js and GSAP**. The visual direction is intentionally different from a conventional neutral editorial portfolio: midnight-blue surfaces, electric chartreuse, geometric typography, a procedural 3D architectural maquette and scroll-linked camera movement.

> **Portfolio demo only:** Sthira is a fictional demonstration brand. All project titles, locations, narratives, dates and project details are illustrative concept studies, not real commissions or professional credentials. The enquiry email (`hello@example.com`) is a placeholder. The form prepares an email in the visitor's local mail application; it does not send or store submissions.

## Technology

- Astro 6 — static pages and reusable components
- Three.js — procedural 3D architectural maquette (generated from geometry; no large model download)
- GSAP + ScrollTrigger — scroll-linked camera, text reveals and dimensional hover details
- Custom CSS — responsive dark visual system and motion fallbacks
- Google Fonts — Syne, Space Grotesk and Space Mono
- GitHub Actions + GitHub Pages — static deployment

## Requirements

- Node.js **22.12.0 or newer**
- npm (included with Node.js)
- VS Code or another code editor
- A modern browser with WebGL enabled for the 3D hero; the surrounding site remains readable if WebGL is unavailable

Check versions first:

```powershell
node -v
npm -v
```

## Run locally

Extract this ZIP, open PowerShell in the `sthira-studio` project folder, and run:

```powershell
npm install
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321/`). Stop the server with `Ctrl + C`.

Create and inspect a production build:

```powershell
npm run build
npm run preview
```

The generated static site is written to `dist/`.

## What is interactive

- Procedural Three.js architecture model in the homepage hero
- Slow 3D model rotation and pointer-responsive perspective
- GSAP ScrollTrigger movement that changes the model/camera as the hero scrolls away
- Entrance and section-reveal motion
- Subtle 3D tilt on project cards
- Project-category filters
- Responsive navigation and email-draft enquiry form
- `prefers-reduced-motion` support; the 3D scene is rendered as a still frame when reduced motion is requested

The 3D scene is made from lightweight Three.js primitives (building volumes, cantilevers, fins, glass planes, a courtyard datum ring and a base). It is original procedural artwork for this demo, not copied from the reference repositories.

## Pages included

- `/` — 3D-first home
- `/projects/` — project index with client-side filters
- `/projects/courtyard-house/` — project detail
- `/projects/house-of-light/` — project detail
- `/projects/still-house/` — project detail
- `/projects/home-in-layers/` — project detail
- `/services/` — services
- `/studio/` — studio philosophy
- `/contact/` — enquiry interaction (local email draft only)
- `/demo-note/` — portfolio demonstration disclosure

## GitHub Pages deployment

1. Create a separate GitHub repository named **`sthira-studio`**. Keep it separate from VibeKart.
2. Commit the contents of this folder to the new repository's `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. The included `.github/workflows/deploy.yml` builds and deploys the static site with `BASE_PATH=/sthira-studio`.
5. After the workflow succeeds, the expected URL is `https://vibekart-in.github.io/sthira-studio/`.

If the repository name or GitHub owner is different, update `BASE_PATH` in `.github/workflows/deploy.yml` and the `site` value in `astro.config.mjs` before pushing.

## Accessibility and performance notes

- The 3D renderer is capped at a modest device pixel ratio; antialiasing is reduced on narrow screens.
- A CSS gradient/grid remains behind the canvas if WebGL cannot initialise.
- Reduced-motion preference disables continuous animation and scroll-driven scene motion.
- The 3D scene uses local geometry instead of a large downloaded GLB model.
- Review the site on a desktop and a mobile device before public deployment, especially GPU usage and loading on lower-powered phones.

## Before adapting for a real client

Replace the fictional studio identity, concept studies, all illustrative text and imagery with approved client material. Replace the placeholder email and connect a real form endpoint only when the client chooses where enquiries should be delivered. Do not present the concept projects as commissions completed by a real architecture practice.
