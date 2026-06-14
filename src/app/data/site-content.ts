export interface ServiceItem {
  num: string;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Branding',
    shortDesc: 'Strategic brand identity systems designed for recognition, trust, and long-term positioning.',
    description:
      'We develop strategic brand identities that define how businesses are perceived in competitive markets. From logo systems to complete visual language, we build brands designed for recognition and trust.',
    deliverables: ['Brand Strategy', 'Logo Design', 'Visual Identity Systems', 'Brand Guidelines', 'Packaging Design'],
    icon: 'branding',
  },
  {
    num: '02',
    title: 'Corporate Films',
    shortDesc: 'Cinematic storytelling that elevates brand perception and audience engagement.',
    description:
      'Cinematic corporate films designed to elevate brand perception, communicate value, and create emotional engagement.',
    deliverables: [
      'Brand Story Films',
      'Corporate Profile Videos',
      'Product Commercials',
      'Real Estate Showcase Films',
      'Founder Interviews',
      'Event Highlight Videos',
    ],
    icon: 'film',
  },
  {
    num: '03',
    title: 'Digital Marketing',
    shortDesc: 'Performance-focused campaigns built to generate visibility, leads, and measurable growth.',
    description:
      'Performance-focused campaigns that help businesses increase visibility, generate qualified leads, and accelerate growth.',
    deliverables: ['Meta Ads', 'Google Ads', 'Campaign Strategy', 'Funnel Optimization', 'Lead Generation Campaigns'],
    icon: 'digital-marketing',
  },
  {
    num: '04',
    title: 'Social Media Management',
    shortDesc: 'Creative content strategies that build digital presence and audience connection.',
    description:
      'Strategic social media content that builds brand recall, engagement, and consistent digital presence.',
    deliverables: [
      'Content Strategy',
      'Creative Design',
      'Reels & Video Content',
      'Content Calendars',
      'Community Management',
    ],
    icon: 'social-media',
  },
  {
    num: '05',
    title: 'Outdoor Advertising',
    shortDesc: 'High-visibility offline campaigns that strengthen market presence.',
    description:
      'High-impact outdoor campaigns designed to strengthen local visibility and offline brand awareness.',
    deliverables: ['Billboard Advertising', 'Transit Media', 'Retail Branding', 'Hoardings', 'Outdoor Campaign Planning'],
    icon: 'outdoor',
  },
  {
    num: '06',
    title: 'Event Branding',
    shortDesc: 'Premium event identity and launch experiences designed for impact.',
    description:
      'Premium event branding solutions designed to create immersive and memorable audience experiences.',
    deliverables: [
      'Event Identity',
      'Exhibition Branding',
      'Stage Design Graphics',
      'Launch Campaigns',
      'Promotional Collaterals',
    ],
    icon: 'event',
  },
];

export const TRUST_STATS = [
  { value: '10+', label: 'Years', sublabel: 'Creative Industry Experience' },
  { value: '50+', label: 'Brands', sublabel: 'Trusted Across India' },
  { value: '200+', label: 'Projects', sublabel: 'Delivered Successfully' },
  { value: '360°', label: 'Solutions', sublabel: 'Strategy to Execution' },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Strategic Thinking',
    desc: 'Every project begins with audience understanding, market positioning, and business clarity.',
  },
  {
    title: 'Premium Creative Execution',
    desc: 'We combine aesthetics with purpose to create visually powerful brand experiences.',
  },
  {
    title: 'Integrated Solutions',
    desc: 'From branding and filmmaking to advertising and digital marketing, we provide complete end-to-end solutions.',
  },
  {
    title: 'Business-Focused Approach',
    desc: 'Our work is designed not just to look impressive — but to generate measurable business impact.',
  },
  {
    title: 'Collaborative Partnerships',
    desc: 'We work closely with clients to build long-term brand value through creative alignment and transparency.',
  },
];

export const WORK_CATEGORIES = [
  'Branding',
  'Corporate Films',
  'Real Estate Campaigns',
  'Social Media Campaigns',
  'Outdoor Advertising',
  'Event Branding',
];

export const INSIGHTS = [
  {
    title: 'How Premium Brands Build Recall Through Storytelling',
    excerpt: 'Why emotional storytelling creates stronger audience memory and long-term loyalty.',
  },
  {
    title: 'Why Corporate Films Matter More Than Ever',
    excerpt: 'How cinematic storytelling improves trust, credibility, and engagement.',
  },
  {
    title: 'Branding vs Advertising: Understanding the Difference',
    excerpt: 'A practical breakdown of how branding shapes perception while advertising drives visibility.',
  },
  {
    title: 'Building a High-Impact Real Estate Marketing Campaign',
    excerpt: 'Key strategies behind successful real estate branding and lead generation campaigns.',
  },
  {
    title: 'The Rise of Cinematic Advertising in India',
    excerpt: 'Why visually immersive storytelling is reshaping modern advertising.',
  },
];

export const SEO_CONFIG = {
  home: {
    title: 'Think Nexora | Premium Advertising & Branding Agency in Chennai & Bangalore',
    description:
      'Think Nexora is a premium advertising and branding agency in Chennai and Bangalore specializing in corporate films, brand identity, digital campaigns, and 360° marketing solutions for businesses across India.',
    ogTitle: 'Think Nexora — Creative Advertising & Branding Agency',
    ogDescription:
      'Bold storytelling. Strategic branding. Cinematic campaigns. Think Nexora helps brands grow through powerful creative experiences across digital, film, and advertising.',
    path: '/',
  },
  services: {
    title: 'Creative Services | Branding, Films & Digital Marketing | Think Nexora',
    description:
      'Explore Think Nexora creative services — branding, corporate films, digital marketing, social media, outdoor advertising, and event branding for modern businesses in India.',
    path: '/services',
  },
  portfolio: {
    title: 'Creative Work & Portfolio | Think Nexora',
    description:
      'Explore Think Nexora portfolio of branding systems, cinematic films, advertising campaigns, and digital experiences created for ambitious brands across India.',
    path: '/portfolio',
  },
  about: {
    title: 'About Think Nexora | Creative Advertising & Branding Agency',
    description:
      'Learn about Think Nexora — a creative advertising and branding agency helping businesses grow through cinematic storytelling, strategic branding, and integrated marketing.',
    path: '/about',
  },
  insights: {
    title: 'Insights & Perspectives | Think Nexora Blog',
    description:
      'Ideas, strategies, and industry perspectives from Think Nexora on branding, advertising, filmmaking, and digital growth.',
    path: '/insights',
  },
  contact: {
    title: 'Contact Think Nexora | Start Your Branding Project',
    description:
      'Contact Think Nexora in Chennai and Bangalore. Schedule a consultation for branding, corporate films, digital marketing, and 360° creative campaigns.',
    path: '/contact',
  },
};
