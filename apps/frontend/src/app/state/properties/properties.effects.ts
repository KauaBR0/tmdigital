import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PropertiesService } from '../../core/services/properties.service';
import { PropertiesActions } from './properties.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PropertiesEffects {
  private actions$ = inject(Actions);
  private propertiesService = inject(PropertiesService);

  loadProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertiesActions.loadProperties),
      mergeMap(({ leadId }) =>
        this.propertiesService.getProperties(leadId).pipe(
          map((properties) => PropertiesActions.loadPropertiesSuccess({ properties })),
          catchError((error) => of(PropertiesActions.loadPropertiesFailure({ error })))
        )
      )
    )
  );

  addProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertiesActions.addProperty),
      mergeMap(({ property }) =>
        this.propertiesService.createProperty(property).pipe(
          map((newProperty) => PropertiesActions.addPropertySuccess({ property: newProperty })),
          catchError((error) => of(PropertiesActions.addPropertyFailure({ error })))
        )
      )
    )
  );

  updateProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertiesActions.updateProperty),
      mergeMap(({ property }) =>
        this.propertiesService.updateProperty(property).pipe(
          map((updatedProperty) => PropertiesActions.updatePropertySuccess({ property: updatedProperty })),
          catchError((error) => of(PropertiesActions.updatePropertyFailure({ error })))
        )
      )
    )
  );

  deleteProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertiesActions.deleteProperty),
      mergeMap(({ id }) =>
        this.propertiesService.deleteProperty(id).pipe(
          map(() => PropertiesActions.deletePropertySuccess({ id })),
          catchError((error) => of(PropertiesActions.deletePropertyFailure({ error })))
        )
      )
    )
  );
}
