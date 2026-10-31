import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manuael.github.io',
  trailingSlash: 'always',
  redirects: {
    '/notes': '/?type=note',
    '/games': '/?type=game',
    '/experiments': '/?type=experiment',
  },
});
