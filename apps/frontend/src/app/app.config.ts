import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { appRoutes } from './app.routes';
import { leadsFeature } from './state/leads/leads.reducer';
import { LeadsEffects } from './state/leads/leads.effects';
import { propertiesFeature } from './state/properties/properties.reducer';
import { PropertiesEffects } from './state/properties/properties.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({
      [leadsFeature.name]: leadsFeature.reducer,
      [propertiesFeature.name]: propertiesFeature.reducer,
    }),
    provideEffects(LeadsEffects, PropertiesEffects),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
