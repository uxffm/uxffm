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
          text: 'Webseite Erstellen Lassen',
          href: getPermalink('/service/webdesign-frankfurt'),
        },
        {
          text: 'WordPress Webseite Frankfurt',
          href: getPermalink('/service/wordpress-frankfurt'),
        },
        {
          text: 'Off-Page SEO',
          href: getPermalink('/service/off-page-seo-frankfurt'),
        },
        {
          text: 'SEO Audit Frankfurt',
          href: getPermalink('/service/seo-audit-frankfurt'),
        },
        {
          text: 'Webentwicklung',
          href: getPermalink('/service/web-entwicklung-frankfurt'),
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

      ],
    },
    {
      title: 'Service',
      links: [
        { text: 'Webseite Erstellen Lassen Frankfurt', href: '/service/webdesign-frankfurt' },
        { text: 'WordPress Frankfurt', href: '/service/wordpress-frankfurt' },

      ],
    },
 
  ],
  secondaryLinks: [
  ],
  socialLinks: [
    { ariaLabel: 'Tiktok', icon: 'tabler:brand-tiktok', href: 'https://www.tiktok.com/@uxffm.com' },
  ],
  footNote: `
    © ${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')} Freelancer Frankfurt - All Rights Reserved. By SEO Lukasz
  `,
};
