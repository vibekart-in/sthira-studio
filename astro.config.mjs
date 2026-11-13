import { defineConfig } from 'astro/config';

// Local development uses the site root. The GitHub Actions workflow sets
// BASE_PATH=/sthira-studio for a project-site deployment.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE || 'https://vibekart-in.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
