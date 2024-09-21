// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightLinksValidator from 'starlight-links-validator'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'
import { sidebar } from './sidebar.ts'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'Docs',
      description:
        'A framework to build Modular, CMS-driven Flutter Apps. At Scale.',
      tagline:
        'A framework to build Modular, CMS-driven Flutter Apps. At Scale.',
      logo: {
        light: './src/assets/logo-light.png',
        dark: './src/assets/logo-dark.png',
      },
      social: {
        github: 'https://github.com/vyuh-tech/vyuh',
        'x.com': 'https://x.com/vyuh_tech',
        discord: 'https://discord.gg/b49sbjqszG',
        youtube: 'https://youtube.com/@vyuh_tech',
      },
      // Add Open Graph images.
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            // The absolute URL of the image to use.
            content: 'https://docs.vyuh.tech/social-card.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:site_name',
            // The absolute URL of the image to use.
            content: 'Docs for the Vyuh Framework',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            // The absolute URL of the image to use.
            content: 'https://docs.vyuh.tech/social-card.png',
          },
        },
      ],
      components: {
        Head: './src/components/starlight/Head.astro',
        Footer: './src/components/starlight/Footer.astro',
        SkipLink: './src/components/starlight/SkipLink.astro',
      },
      customCss: ['./src/tailwind.css'],
      sidebar,
      expressiveCode: {
        // @ts-ignore
        plugins: [pluginLineNumbers()],
      },
      plugins: [starlightLinksValidator()],
      editLink: {
        baseUrl: 'https://github.com/vyuh-tech/docs/edit/main/',
      },
      lastUpdated: true,
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
