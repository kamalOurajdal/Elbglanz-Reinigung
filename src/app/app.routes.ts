import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/components/home/home').then((m) => m.Home),
  },
  {
    path: 'ueber-uns',
    loadComponent: () =>
      import('./features/components/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'leistungen',
    loadComponent: () =>
      import('./features/components/services/services').then((m) => m.Services),
  },
  {
    path: 'warum-wir',
    loadComponent: () =>
      import('./features/components/why-us/why-us').then((m) => m.WhyUs),
  },
  {
    path: 'unser-team',
    loadComponent: () =>
      import('./features/components/team/team').then((m) => m.Team),
  },
  {
    path: 'kundenstimmen',
    loadComponent: () =>
      import('./features/components/testimonials/testimonials').then(
        (m) => m.Testimonials
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/components/faq/faq').then((m) => m.Faq),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./features/components/contact/contact').then((m) => m.Contact),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/components/not-found/not-found').then(
        (m) => m.NotFound
      ),
  },
];
