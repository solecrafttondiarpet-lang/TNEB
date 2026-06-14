import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';
import { Insights } from './pages/insights/insights';

export const routes: Routes = [
  { path: '', component: Home, data: { seo: 'home' } },
  { path: 'services', component: Services, data: { seo: 'services' } },
  { path: 'portfolio', component: Portfolio, data: { seo: 'portfolio' } },
  { path: 'about', component: About, data: { seo: 'about' } },
  { path: 'insights', component: Insights, data: { seo: 'insights' } },
  { path: 'contact', component: Contact, data: { seo: 'contact' } },
  { path: '**', redirectTo: '' },
];
