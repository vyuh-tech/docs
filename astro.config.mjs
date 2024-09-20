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
          items: [
            'intro',
            'intro/get-started',
            'intro/integrating-cms',
            'intro/mason-setup',
          ],
        },
        {
          label: 'Concepts',
          items: [
            'concepts',
            'concepts/content-driven-apps',
            'concepts/features-and-plugins',
            'concepts/descriptors-and-builders',
            'concepts/thinking-in-blocks',
            'concepts/glossary',
          ],
        },
        {
          label: 'Guides',
          items: [
            'guides/designing-features',
            'guides/typical-project-structure',
            'guides/using-plugins',
            {
              label: 'CMS',
              items: [
                'guides/cms',
                'guides/cms/core-elements',
                'guides/cms/designing-content-schemas',
                'guides/cms/custom-content-type',
                'guides/cms/custom-layout',
                'guides/cms/custom-action',
                'guides/cms/custom-api-content',
                'guides/cms/conditions',
                'guides/cms/custom-condition',
                'guides/cms/conditional-route',
                'guides/cms/template-routes',
              ],
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
              items: [
                'examples/wonderous',
                'examples/wonderous/distilling-wonderous',
                'examples/wonderous/schema-first-approach',
                'examples/wonderous/navigation-and-structure',
                'examples/wonderous/rendering-a-wonder-section',
                'examples/wonderous/managing-wonders',
              ],
            },
            {
              label: 'Unsplash',
              items: [
                'examples/unsplash',
                'examples/unsplash/the-featuredescriptor',
                'examples/unsplash/navigation-and-routes',
                'examples/unsplash/separation-of-concerns',
                'examples/unsplash/the-widgets',
              ],
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
              items: [
                'framework/packages',
                'framework/packages/vyuh-core',
                'framework/packages/vyuh-extension-content',
                'framework/packages/vyuh-feature-system',
                'framework/packages/vyuh-plugin-content-provider-sanity',
                'framework/packages/developer-tools',
              ],
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
