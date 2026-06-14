import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { SeoService } from './services/seo.service';
import { SEO_CONFIG } from './data/site-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const seoKey = this.getSeoKey();
        const config = SEO_CONFIG[seoKey as keyof typeof SEO_CONFIG] ?? SEO_CONFIG.home;
        this.seo.update(config);
      });

    this.seo.update(SEO_CONFIG.home);
  }

  private getSeoKey(): string {
    const path = this.router.url.split('?')[0].replace(/^\//, '');
    if (!path) return 'home';
    if (path.startsWith('portfolio')) return 'portfolio';
    return path.split('/')[0];
  }
}
