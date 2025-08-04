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
          text: 'WordPress Frankfurt',
          href: getPermalink('/service/wordpress-frankfurt'),
        },
        {
          text: 'Off-Page SEO',
          href: getPermalink('/service/off-page-seo-frankfurt'),
        },
                {
          text: 'SEO Schulungen',
          href: getPermalink('/service/seo-schulungen'),
        },
        {
          text: 'SEO für Therapeuten',
          href: getPermalink('/service/seo-fuer-therapeuten'),
        },
                {
          text: 'SEO für ChatGPT',
          href: getPermalink('/service/ki-chat-optimierung'),
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
        { text: 'kontakt@uxffm.com', href: 'mailto:kontakt@uxffm.com">' },
      ],
    },
    {
      title: 'Blog',
      links: [
        { text: 'SEO Manipulation', href: '/seo-manipulation' },
        { text: 'Low Hanging Fruits', href: '/low-hanging-fruits' },
        { text: 'Do Follow Backlinks finden', href: '/dofollow-backlinks-finden' },
        { text: 'SEO Glossar', href: '/seo-glossar' },
      ],
    },
    {
      title: 'Service',
      links: [
        { text: 'WordPress Service Frankfurt', href: '/service/wordpress-frankfurt' },
        { text: 'SEO für Therapeuten', href: '/service/seo-fuer-therapeuten' },
      ],
    },
 
  ],
  secondaryLinks: [
  ],
  socialLinks: [
    { ariaLabel: 'Tiktok', icon: 'tabler:brand-tiktok', href: 'https://www.tiktok.com/@uxffm.com' },
  ],
  footNote: `
    © ${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')} SEO Freelancer Frankfurt - All Rights Reserved. By SEO Lukasz
  `,
};
