import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LeadsService } from '../../core/services/leads.service';
import { LeadsActions } from './leads.actions';
import { PropertiesActions } from '../../state/properties/properties.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LeadsEffects {
  private actions$ = inject(Actions);
  private leadsService = inject(LeadsService);

  loadLeads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeadsActions.loadLeads,
        PropertiesActions.addPropertySuccess,
        PropertiesActions.updatePropertySuccess,
        PropertiesActions.deletePropertySuccess,
      ),
      mergeMap((action: any) => {
        const page = action.page || 1;
        const limit = action.limit || 10;
        const filter = action.filter;
        return this.leadsService.getLeads(page, limit, filter).pipe(
          map((response) => LeadsActions.loadLeadsSuccess({ response })),
          catchError((error) => of(LeadsActions.loadLeadsFailure({ error }))),
        );
      }),
    ),
  );

  addLead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadsActions.addLead),
      mergeMap(({ lead }) =>
        this.leadsService.createLead(lead).pipe(
          map((newLead) => LeadsActions.addLeadSuccess({ lead: newLead })),
          catchError((error) => of(LeadsActions.addLeadFailure({ error }))),
        ),
      ),
    ),
  );

  updateLead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadsActions.updateLead),
      mergeMap(({ lead }) =>
        this.leadsService.updateLead(lead).pipe(
          map((updatedLead) =>
            LeadsActions.updateLeadSuccess({ lead: updatedLead }),
          ),
          catchError((error) => of(LeadsActions.updateLeadFailure({ error }))),
        ),
      ),
    ),
  );

  deleteLead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadsActions.deleteLead),
      mergeMap(({ id }) =>
        this.leadsService.deleteLead(id).pipe(
          map(() => LeadsActions.deleteLeadSuccess({ id })),
          catchError((error) => of(LeadsActions.deleteLeadFailure({ error }))),
        ),
      ),
    ),
  );
}
