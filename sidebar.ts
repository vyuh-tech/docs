export default [
  {
    label: 'Intro',
    items: ['intro', 'intro/get-started', 'intro/cli', 'intro/integrating-cms'],
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
            slug: 'guides/cms/previews',
            badge: { text: 'New', variant: 'note' },
          },
          {
            slug: 'guides/cms/widgetbook',
            badge: { text: 'New', variant: 'note' },
          },
        ],
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
]
