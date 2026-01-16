import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'leads',
    loadComponent: () =>
      import('./features/leads/leads-list').then((m) => m.LeadsList),
    canActivate: [authGuard],
  },
  {
    path: 'properties',
    loadComponent: () =>
      import('./features/properties/properties-list').then(
        (m) => m.PropertiesList,
      ),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
