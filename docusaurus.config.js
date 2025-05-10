// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PLANKA Docs',
  tagline: 'Project mastering driven by fun',
  url: 'https://docs.planka.cloud',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/planka.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'planka', // Usually your GitHub org/user name.
  projectName: 'planka', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/plankanban/planka-docs/tree/main/',
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PLANKA',
        logo: {
          alt: 'PLANKA',
          src: 'images/planka.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'welcome',
            position: 'left',
            label: 'Docs',
          },
          //{to: '/blog', label: 'News', position: 'left'},
          {
            href: 'https://github.com/plankanban/planka',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Installation',
            items: [
              {
                label: 'Automated',
                to: '/docs/category/automated/',
              },
              {
                label: 'Manual',
                to: '/docs/category/manual/',
              },
              {
                label: 'Docker',
                to: '/docs/category/docker/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/WqqYNd7Jvt',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/people/Planka/100086009366161/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/planka_',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/plankanban/planka',
              },
              {
                label: 'planka.app',
                href: 'https://planka.app',
              },
              {
                label: 'Imprint (German)',
                href: 'https://planka.app/imprint',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PLANKA Software GmbH`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
