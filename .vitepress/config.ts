import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  appearance: true, // Enable dark mode toggle
  cleanUrls: true,

  title: 'Vyuh',
  description: 'Build Modular, CMS-driven Flutter Apps. At Scale.',

  head: [
    // Google Analytics 4
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-3THXBRT184',
      },
    ],
    [
      'script',
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3THXBRT184');
    `,
    ],

    // Preconnect for faster resource loading
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],

    // Non-blocking font loading
    // Montserrat: 400 (regular body), 600 (semibold), 700 (bold), 900 (black for headers)
    // JetBrains Mono: 400 only (code doesn't need variants)
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Montserrat:wght@400;600;700;900&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    ],
    // Fallback for browsers with JS disabled
    [
      'noscript',
      {},
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Montserrat:wght@400;600;700;900&display=swap">',
    ],

    // Favicon
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],

    // Open Graph meta tags
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Vyuh - Build Modular, CMS-driven Flutter Apps',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Build Modular, CMS-driven Flutter Apps. At Scale.',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://docs.vyuh.tech/social-card.png',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://docs.vyuh.tech' }],

    // Twitter card meta tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'meta',
      {
        name: 'twitter:title',
        content: 'Vyuh - Build Modular, CMS-driven Flutter Apps',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Build Modular, CMS-driven Flutter Apps. At Scale.',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://docs.vyuh.tech/social-card.png',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Getting Started', link: '/docs/intro/' },
      { text: 'Guides', link: '/docs/guides/creating-a-feature' },
      { text: 'Framework', link: '/docs/framework/' },
      { text: 'Examples', link: '/docs/examples/' },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Vyuh?', link: '/docs/intro/' },
            { text: 'Quick Start', link: '/docs/intro/get-started' },
            { text: 'CLI', link: '/docs/intro/cli' },
            { text: 'Project Structure', link: '/docs/intro/project-structure' },
          ],
        },
        {
          text: 'Concepts',
          items: [
            { text: 'Overview', link: '/docs/concepts/' },
            { text: 'Content-Driven Apps', link: '/docs/concepts/content-driven-apps' },
            { text: 'Features & Plugins', link: '/docs/concepts/features-and-plugins' },
            { text: 'Descriptors & Builders', link: '/docs/concepts/descriptors-and-builders' },
            { text: 'Thinking in Blocks', link: '/docs/concepts/thinking-in-blocks' },
            { text: 'Glossary', link: '/docs/concepts/glossary' },
          ],
        },
        {
          text: 'Guides',
          collapsed: false,
          items: [
            {
              text: 'Features',
              collapsed: true,
              items: [
                { text: 'Creating a Feature', link: '/docs/guides/creating-a-feature' },
                { text: 'Feature Descriptors', link: '/docs/guides/feature-descriptors' },
                { text: 'Designing Features', link: '/docs/guides/designing-features' },
              ],
            },
            {
              text: 'Content System',
              collapsed: true,
              items: [
                { text: 'Content Types', link: '/docs/guides/content-types' },
                { text: 'Layouts', link: '/docs/guides/layouts' },
                { text: 'Actions', link: '/docs/guides/actions' },
                { text: 'Conditions', link: '/docs/guides/conditions' },
                { text: 'Modifiers', link: '/docs/guides/modifiers' },
                { text: 'API Content', link: '/docs/guides/api-content' },
              ],
            },
            {
              text: 'CMS Integration',
              collapsed: true,
              items: [
                { text: 'Setting Up Sanity', link: '/docs/guides/setting-up-sanity' },
                { text: 'Designing Schemas', link: '/docs/guides/designing-content-schemas' },
                { text: 'Content Previews', link: '/docs/guides/content-previews' },
                { text: 'Live Editing', link: '/docs/guides/live-content-editing' },
                { text: 'Sanity Structure Plugin', link: '/docs/guides/sanity-structure-plugin' },
              ],
            },
            {
              text: 'Routing',
              collapsed: true,
              items: [
                { text: 'Routes & Navigation', link: '/docs/guides/routes-and-navigation' },
                { text: 'Conditional Routes', link: '/docs/guides/conditional-routes' },
                { text: 'Template Routes', link: '/docs/guides/template-routes' },
              ],
            },
            {
              text: 'Advanced',
              collapsed: true,
              items: [
                { text: 'Scoped DI', link: '/docs/guides/scoped-di' },
                { text: 'Events', link: '/docs/guides/events' },
                { text: 'Using Plugins', link: '/docs/guides/using-plugins' },
                { text: 'Adding Packages', link: '/docs/guides/adding-packages' },
              ],
            },
          ],
        },
        {
          text: 'Framework',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/framework/' },
            { text: 'vyuh_core', link: '/docs/framework/vyuh-core' },
            { text: 'vyuh_extension_content', link: '/docs/framework/vyuh-extension-content' },
            { text: 'vyuh_feature_system', link: '/docs/framework/vyuh-feature-system' },
            { text: 'vyuh_feature_auth', link: '/docs/framework/vyuh-feature-auth' },
            { text: 'vyuh_feature_onboarding', link: '/docs/framework/vyuh-feature-onboarding' },
            { text: 'vyuh_feature_developer', link: '/docs/framework/vyuh-feature-developer' },
            { text: 'vyuh_content_widget', link: '/docs/framework/vyuh-content-widget' },
            { text: 'vyuh_cache', link: '/docs/framework/vyuh-cache' },
            { text: 'sanity_client', link: '/docs/framework/sanity-client' },
            { text: 'flutter_sanity_portable_text', link: '/docs/framework/flutter-sanity-portable-text' },
            { text: 'Content Provider (Sanity)', link: '/docs/framework/vyuh-plugin-content-provider-sanity' },
            { text: 'Hive Storage', link: '/docs/framework/hive-storage' },
            { text: 'Secure Storage', link: '/docs/framework/secure-storage' },
            { text: 'Console Telemetry', link: '/docs/framework/console-telemetry' },
            { text: 'Changelog', link: '/docs/framework/changelog' },
          ],
        },
        {
          text: 'Examples',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/examples/' },
            { text: 'Counter', link: '/docs/examples/counter' },
            { text: 'Food', link: '/docs/examples/food' },
            { text: 'Puzzles', link: '/docs/examples/puzzles' },
            { text: 'Movies', link: '/docs/examples/movies' },
            { text: 'Conference', link: '/docs/examples/conference' },
            { text: 'Wonderous', link: '/docs/examples/wonderous' },
            { text: 'Unsplash', link: '/docs/examples/unsplash' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vyuh-tech/vyuh' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern:
        'https://github.com/vyuh-tech/vyuh/edit/main/docs/:path',
    },
  },
});
