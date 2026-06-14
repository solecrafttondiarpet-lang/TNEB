import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly siteUrl = 'https://www.thinknexora.com';
  readonly siteName = 'Think Nexora';
  readonly defaultOgImage = `${this.siteUrl}/logo.png`;

  update(config: SeoConfig): void {
    const ogTitle = config.ogTitle ?? config.title;
    const ogDescription = config.ogDescription ?? config.description;
    const canonicalUrl = config.path ? `${this.siteUrl}${config.path}` : this.siteUrl;

    this.title.setTitle(config.title);

    this.setMetaTag('name', 'description', config.description);
    this.setMetaTag('name', 'keywords', config.keywords ?? this.defaultKeywords());
    this.setMetaTag('name', 'author', this.siteName);
    this.setMetaTag('name', 'robots', 'index, follow');

    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag('property', 'og:site_name', this.siteName);
    this.setMetaTag('property', 'og:title', ogTitle);
    this.setMetaTag('property', 'og:description', ogDescription);
    this.setMetaTag('property', 'og:url', canonicalUrl);
    this.setMetaTag('property', 'og:image', this.defaultOgImage);
    this.setMetaTag('property', 'og:locale', 'en_IN');

    this.setMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setMetaTag('name', 'twitter:title', ogTitle);
    this.setMetaTag('name', 'twitter:description', ogDescription);
    this.setMetaTag('name', 'twitter:image', this.defaultOgImage);

    this.setCanonicalUrl(canonicalUrl);
  }

  private defaultKeywords(): string {
    return [
      'Think Nexora',
      'thinknexora',
      'advertising agency Chennai',
      'branding agency Bangalore',
      'corporate films India',
      'brand identity design',
      'digital marketing agency',
      'creative agency India',
    ].join(', ');
  }

  private setMetaTag(attr: 'name' | 'property', key: string, content: string): void {
    if (attr === 'name') {
      this.meta.updateTag({ name: key, content });
    } else {
      this.meta.updateTag({ property: key, content });
    }
  }

  private setCanonicalUrl(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
