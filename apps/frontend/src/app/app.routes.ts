import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'leads',
    loadComponent: () =>
      import('./features/leads/leads-list').then((m) => m.LeadsList),
  },
  {
    path: 'properties',
    loadComponent: () =>
      import('./features/properties/properties-list').then(
        (m) => m.PropertiesList,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
