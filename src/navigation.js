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
          text: 'SEO Frankfurt',
          href: getPermalink('/suchmaschinenoptimierung-frankfurt'),
        },
        {
          text: 'Suchmaschinenmarketing Frankfurt',
          href: getPermalink('/suchmaschinenmarketing-frankfurt'),
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
        { text: 'SEO Frankfurt', href: '/suchmaschinenoptimierung-frankfurt' },
        { text: 'Suchmaschinenmarketing Frankfurt', href: '/suchmaschinenmarketing-frankfurt' },
      ],
    },

  ],
  secondaryLinks: [
  ],
  socialLinks: [
    { ariaLabel: 'Tiktok', icon: 'tabler:brand-tiktok', href: 'https://www.tiktok.com/@frankfurtmarketingstudio.de' },
  ],
  footNote: `
    WordPress Agentur Frankfurt - All Rights Reserved.
  `,
};
