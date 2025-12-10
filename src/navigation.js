import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Service',
      href: getPermalink('/service'),
      links: [
        {
          text: 'Website Designer Frankfurt',
          href: getPermalink('/website-designer-frankfurt'),
        },
        {
          text: 'SEO Frankfurt',
          href: getPermalink('/suchmaschinenoptimierung-frankfurt'),
        },
        {
          text: 'WordPress Frankfurt',
          href: getPermalink('/service/wordpress-frankfurt'),
        },
        {
          text: 'App Entwicklung Frankfurt',
          href: getPermalink('/app-entwicklung-frankfurt'),
        },
        {
          text: 'Website monatlich bezahlen',
          href: getPermalink('/website-monatlich-bezahlen'),
        },
        {
          text: 'Suchmaschinenmarketing Frankfurt',
          href: getPermalink('/suchmaschinenmarketing-frankfurt'),
        },
        {
          text: 'HTML5 Banner Agentur',
          href: getPermalink('/html5-banner-agentur'),
        },
        {
          text: 'Programmierer Frankfurt',
          href: getPermalink('/programmierer-frankfurt'),
        },
      ],
    },
    {
      text: 'Blog',
      href: '/blog',
    },
  ],
  actions: [{ text: 'Kontakt', href: '/kontakt', target: '' }],
};

export const footerData = {
  links: [
    {
      title: 'Links',
      links: [
        { text: 'Impressum', href: '/imoportant' },
        { text: 'Datenschutz', href: '/datenschutz' },
        { text: 'Über Mich', href: '/about-us' },
        { text: 'hello@frankfurtmarketingstudio.de', href: 'mailto:hello@frankfurtmarketingstudio.de' },
      ],
    },
    {
      title: 'Service',
      links: [
        { text: 'Website Designer Frankfurt', href: '/website-designer-frankfurt' },
        { text: 'SEO Frankfurt', href: '/suchmaschinenoptimierung-frankfurt' },
        { text: 'WordPress Service Frankfurt', href: '/service/wordpress-frankfurt' },
        { text: 'App Entwicklung Frankfurt', href: '/app-entwicklung-frankfurt' },
        { text: 'Website monatlich bezahlen', href: '/website-monatlich-bezahlen' },
        { text: 'Suchmaschinenmarketing Frankfurt', href: '/suchmaschinenmarketing-frankfurt' },
        { text: 'HTML5 Banner Agentur', href: '/html5-banner-agentur' },
        { text: 'Programmierer Frankfurt', href: '/programmierer-frankfurt' },
      ],
    },

  ],
  secondaryLinks: [
  ],
  socialLinks: [
    { ariaLabel: 'Tiktok', icon: 'tabler:brand-tiktok', href: 'https://www.tiktok.com/@frankfurtmarketingstudio.de' },
  ],
  footNote: `
    © ${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')} Online Marketing Frankfurt - All Rights Reserved. By SEO Lukasz
  `,
};
