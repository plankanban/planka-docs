// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Planka Documentation',
  tagline: 'Project Management was never that easy.',
  url: 'https://docs.planka.cloud',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/planka.ico',

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
            'https://github.com/plankanban/documentation',
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
        title: 'Planka',
        logo: {
          alt: 'Planka',
          src: 'img/planka.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
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
            title: 'Docs',
            items: [
              {
                label: 'Docker Compose',
                to: '/docs/installl-planka/Docker%20Compose',
              },
              {
                label: 'Debian & Ubuntu',
                to: '/docs/installl-planka/Debian%20&%20Ubuntu',
              },
              {
                label: 'Automated Installation (coming soon)',
                to: '/docs/installl-planka/Automated%20installation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/people/Planka/100086009366161/',
              },
              // Will be live soon
              /*{
                label: 'Discord',
                href: 'https://discord.gg/WqqYNd7Jvt',
              },*/
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
                label: 'Allgäu Informatik GmbH',
                href: 'https://allgaeu-informatik.de',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Allgäu Informatik GmbH`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
