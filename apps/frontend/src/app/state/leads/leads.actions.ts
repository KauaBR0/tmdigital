import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Lead } from '../../core/models/lead.model';

export const LeadsActions = createActionGroup({
  source: 'Leads',
  events: {
    'Load Leads': props<{ page?: number; limit?: number; filter?: string }>(),
    'Load Leads Success': props<{
      response: { data: Lead[]; total: number };
    }>(),
    'Load Leads Failure': props<{ error: any }>(),
    'Add Lead': props<{ lead: Partial<Lead> }>(),
    'Add Lead Success': props<{ lead: Lead }>(),
    'Add Lead Failure': props<{ error: any }>(),
    'Update Lead': props<{ lead: Lead }>(),
    'Update Lead Success': props<{ lead: Lead }>(),
    'Update Lead Failure': props<{ error: any }>(),
    'Delete Lead': props<{ id: number }>(),
    'Delete Lead Success': props<{ id: number }>(),
    'Delete Lead Failure': props<{ error: any }>(),
  },
});
