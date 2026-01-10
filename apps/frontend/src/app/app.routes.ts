import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'leads',
    loadComponent: () =>
      import('./features/leads/leads-list').then((m) => m.LeadsList),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
