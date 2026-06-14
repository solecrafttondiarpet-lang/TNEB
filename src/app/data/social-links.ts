export interface SocialLink {
  name: string;
  href: string;
  icon: 'whatsapp' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'x' | 'email';
  external?: boolean;
  className?: string;
}

export const WHATSAPP_NUMBER = '919042928102';
export const CONTACT_EMAIL = 'contact@thinknexora.in';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Think Nexora, I would like to discuss a project.')}`,
    icon: 'whatsapp',
    external: true,
    className: 'whatsapp-link',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/thinknexora',
    icon: 'facebook',
    external: true,
    className: 'facebook-link',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thinknexora',
    icon: 'instagram',
    external: true,
    className: 'instagram-link',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/thinknexora',
    icon: 'linkedin',
    external: true,
    className: 'linkedin-link',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@thinknexora',
    icon: 'youtube',
    external: true,
    className: 'youtube-link',
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/thinknexora',
    icon: 'x',
    external: true,
    className: 'x-link',
  },
  {
    name: 'Email',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: 'email',
    className: 'email-link',
  },
];
