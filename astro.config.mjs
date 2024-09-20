// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightLinksValidator from 'starlight-links-validator'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Vyuh Docs',
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
      sidebar: [
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
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Framework',
          autogenerate: { directory: 'framework' },
        },
      ],
      expressiveCode: {
        // @ts-ignore
        plugins: [pluginLineNumbers(), starlightLinksValidator()],
      },
    }),
  ],
})
