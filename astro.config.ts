// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import starlightLinksValidator from 'starlight-links-validator'
import starlightBlog from 'starlight-blog'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'
import sidebar from './sidebar.ts'
import rehypeExternalLinks from 'rehype-external-links'

import icon from 'astro-icon'
import starlightCoolerCredit from 'starlight-cooler-credit'

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
        Head: './src/components/starlight/Head.astro',
        SocialIcons: './src/components/starlight/SocialIcons.astro',
        Footer: './src/components/starlight/Footer.astro',
        SkipLink: './src/components/starlight/SkipLink.astro',
      },
      customCss: ['./src/tailwind.css'],
      sidebar: sidebar,
      expressiveCode: {
        themes: ['dracula'],
        plugins: [pluginLineNumbers()],
        defaultProps: {
          showLineNumbers: false,
        },
      },
      plugins: [
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
          exclude: ['/blog'],
        }),
        starlightCoolerCredit({
          customImage: './src/assets/logo.svg',
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
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
})
