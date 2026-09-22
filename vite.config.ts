import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Public address of the deployed site. Set SITE_URL yourself, or let Netlify
// provide URL. Without it (local builds) the absolute-URL meta tags are skipped.
const siteUrl = (process.env.SITE_URL ?? process.env.URL ?? '').replace(/\/$/, '');

// Link previews need absolute URLs, which are only known at deploy time.
const seoTags = (): Plugin => ({
  name: 'seo-tags',
  transformIndexHtml() {
    if (!siteUrl) return [];
    return [
      { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
      { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
      {
        tag: 'meta',
        attrs: { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
        injectTo: 'head',
      },
      {
        tag: 'meta',
        attrs: { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
        injectTo: 'head',
      },
    ];
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoTags()],
});
