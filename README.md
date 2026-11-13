# STHIRA STUDIO

A multi-page architecture and interiors portfolio concept built with Astro 6, GSAP, and ScrollTrigger.

> Demonstration disclosure: STHIRA Studio is a fictional demonstration brand. All four projects are illustrative concept studies, not completed client commissions.

## Features

- Quiet-luxury architectural portfolio design.
- Cinematic homepage hero with 144 local WebP frames.
- Local MP4 fallback and static poster fallback.
- Four architectural and interior concept studies.
- Individual project pages with galleries, materials and photographer credits.
- Responsive navigation and project category filters.
- Scroll reveals and reduced-motion support.

## Technology

- Astro 6
- GSAP and ScrollTrigger
- Custom CSS and JavaScript
- GitHub Actions and GitHub Pages

## Requirements

- Node.js 22 or newer
- npm

## Local development

Install dependencies:

    npm ci

Start the development server:

    npm run dev

## Production build

    npm run build
    npm run preview

The production site is generated in the dist directory.

## GitHub Pages

This repository deploys as a project site under /sthira-studio/.

Production build:

     = '/sthira-studio'
    npm run build

The GitHub Actions workflow builds and deploys the site when changes are pushed to main.

Configure the repository Pages source as GitHub Actions.

Expected website URL:

https://vibekart-in.github.io/sthira-studio/

## Assets and credits

Project photographs are stored locally in public/images/projects.
Photographer credits and source URLs are listed in PROJECT-IMAGE-CREDITS-20261113-184110.txt and on the relevant project pages.

The homepage hero footage is by Alef Morais via Pexels.
Pexels license: https://www.pexels.com/license/

The hero maintenance scripts are stored in the scripts directory.

## Contact form

The enquiry interaction prepares an email in the visitor's local email application. It does not store or send submissions through a server.
The current hello@example.com address is a placeholder and must be replaced before real enquiries are accepted.
