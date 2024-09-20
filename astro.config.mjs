// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightLinksValidator from 'starlight-links-validator'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'Docs',
      description:
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
      customCss: ['./src/tailwind.css'],
      sidebar: [
        {
          label: 'Vyuh.tech Website',
          link: 'https://vyuh.tech',
          attrs: { target: '_blank', rel: 'noopener', class: 'external-link' },
        },
        {
          label: 'Intro',
          autogenerate: { directory: 'intro' },
        },
        {
          label: 'Concepts',
          autogenerate: { directory: 'concepts' },
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'CMS',
              autogenerate: { directory: 'guides/cms' },
            },
          ],
        },
        {
          label: 'Examples',
          items: [
            'examples',
            'examples/movies',
            'examples/news',
            {
              label: 'Wonderous',
              autogenerate: { directory: 'examples/wonderous' },
            },
            {
              label: 'Unsplash',
              autogenerate: { directory: 'examples/unsplash' },
            },
          ],
        },
        {
          label: 'Framework',
          items: [
            'framework',
            'framework/changelog',
            {
              label: 'Packages',
              autogenerate: { directory: 'framework/packages' },
            },
          ],
        },
      ],
      expressiveCode: {
        // @ts-ignore
        plugins: [pluginLineNumbers()],
      },
      plugins: [starlightLinksValidator()],
      editLink: {
        baseUrl: 'https://github.com/vyuh-tech/docs/edit/main/',
      },
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
