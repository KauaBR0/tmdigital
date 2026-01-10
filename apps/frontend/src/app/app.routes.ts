import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'leads',
    loadComponent: () =>
      import('./features/leads/leads-list').then((m) => m.LeadsList),
  },
  { path: '', redirectTo: 'leads', pathMatch: 'full' },
];
