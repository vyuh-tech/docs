// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightLinksValidator from 'starlight-links-validator'
import starlightBlog from 'starlight-blog'

import react from '@astrojs/react'
import rehypeExternalLinks from 'rehype-external-links'

import icon from 'astro-icon'
import starlightCoolerCredit from 'starlight-cooler-credit'
import starlightSidebarTopicsPlugin from 'starlight-sidebar-topics'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  site: 'https://docs.vyuh.tech',
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' },
        },
      ],
    ],
  },
  i18n: {
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
    defaultLocale: 'en',
  },
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
        linkedin: 'https://www.linkedin.com/company/vyuh-tech',
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
        Footer: './src/components/starlight/Footer.astro',
        SkipLink: './src/components/starlight/SkipLink.astro',
      },
      customCss: ['./src/tailwind.css'],
      expressiveCode: {
        themes: ['dracula'],
        plugins: [pluginLineNumbers()],
        defaultProps: {
          showLineNumbers: false,
        },
      },
      plugins: [
        starlightSidebarTopicsPlugin(
          [
            {
              label: 'vyuh.tech',
              icon: 'external',
              link: 'https://vyuh.tech',
            },
            {
              label: 'Blog',
              icon: 'open-book',
              link: '/blog',
              id: 'blog',
              items: [],
            },
            {
              label: 'Flutter',
              icon: 'seti:dart',
              link: '/intro',
              items: [
                {
                  label: 'Intro',
                  items: [
                    'intro',
                    'intro/get-started',
                    'intro/cli',
                    'intro/integrating-cms',
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
                    'guides',
                    'guides/designing-features',
                    'guides/project-structure',
                    'guides/using-plugins',
                    'guides/adding-packages',
                    {
                      slug: 'guides/events',
                      badge: { text: 'New', variant: 'note' },
                    },
                    {
                      slug: 'guides/scoped-di',
                      badge: { text: 'New', variant: 'note' },
                    },
                    {
                      label: 'CMS',
                      items: [
                        'guides/cms',
                        'guides/cms/core-elements',
                        'guides/cms/designing-content-schemas',
                        'guides/cms/custom-content-type',
                        'guides/cms/custom-layout',
                        {
                          slug: 'guides/cms/default-layouts',
                          badge: { text: 'New', variant: 'note' },
                        },
                        {
                          slug: 'guides/cms/custom-modifier',
                          badge: { text: 'New', variant: 'note' },
                        },
                        'guides/cms/custom-action',
                        'guides/cms/custom-api-content',
                        'guides/cms/conditions',
                        'guides/cms/custom-condition',
                        'guides/cms/conditional-route',
                        'guides/cms/template-routes',
                        {
                          slug: 'guides/cms/content-widget',
                          badge: { text: 'New', variant: 'note' },
                        },
                        {
                          slug: 'guides/cms/previews',
                          badge: { text: 'New', variant: 'note' },
                        },
                        {
                          slug: 'guides/cms/widgetbook',
                          badge: { text: 'New', variant: 'note' },
                        },
                      ],
                    },
                    {
                      label: 'Sanity',
                      items: ['guides/sanity/structure-plugin'],
                    },
                  ],
                },
                {
                  label: 'Examples',
                  items: [
                    'examples',
                    'examples/counter',
                    'examples/food',
                    'examples/puzzles',
                    'examples/movies',
                    {
                      slug: 'examples/conference',
                      badge: { text: 'New', variant: 'note' },
                    },
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
                        'examples/unsplash/feature-descriptor',
                        'examples/unsplash/navigation-and-routes',
                        'examples/unsplash/separation-of-concerns',
                        'examples/unsplash/widgets',
                      ],
                    },
                  ],
                },
                {
                  label: 'Framework',
                  items: [
                    'framework',
                    'framework/changelog',
                    'framework/plugins',
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
            },
            {
              label: 'React',
              icon: 'seti:react',
              link: '/react',
              items: [
                {
                  label: 'Intro',
                  items: [
                    'react',
                    'react/intro/get-started',
                    'react/intro/setup-sanity',
                    'react/intro/first-route',
                  ],
                },
                {
                  label: 'Guides',
                  items: [
                    'react/guides',
                    {
                      label: 'Content Blocks',
                      items: [
                        'react/guides/content-blocks',
                        'react/guides/content-blocks/route',
                        'react/guides/content-blocks/card',
                        'react/guides/content-blocks/group',
                        'react/guides/content-blocks/portable-text',
                        'react/guides/content-blocks/conditional',
                        'react/guides/content-blocks/conditional-route',
                        'react/guides/content-blocks/api-content',
                      ],
                    },
                    'react/guides/layouts',
                    'react/guides/actions',
                    'react/guides/conditions',
                    'react/guides/feature-descriptors',
                    'react/guides/rendering-content',
                    'react/guides/custom-content-type',
                  ],
                },
                {
                  label: 'Examples',
                  items: ['react/examples', 'react/examples/marketing', 'react/examples/blog'],
                },
              ],
            },
          ],
          {
            topics: {
              blog: ['/blog/**/*'],
            },
          },
        ),
        starlightBlog({
          authors: {
            pavan: {
              name: 'Pavan Podila',
              title: 'Founder/CEO @ Vyuh',
              picture: 'https://github.com/pavanpodila.png',
              url: 'https://linkedin.com/in/pavanpodila',
            },
          },
        }),
        starlightLinksValidator({
          errorOnLocalLinks: false,
          exclude: ['/blog'],
        }),
        starlightCoolerCredit({
          customImage: './src/assets/logo.svg',
          customImageAlt: 'Vyuh Logo',
          credit: {
            title: 'Vyuh',
            href: 'https://vyuh.tech',
            description: 'Build Modular, Scalable Flutter Apps.',
          },
        }),
      ],
      editLink: {
        baseUrl: 'https://github.com/vyuh-tech/docs/edit/main/',
      },
      lastUpdated: true,
    }),
    react(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
