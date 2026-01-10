import { createFeature, createReducer, on } from '@ngrx/store';
import { Lead } from '../../core/models/lead.model';
import { LeadsActions } from './leads.actions';

export interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: any;
}

export const initialState: LeadsState = {
  leads: [],
  loading: false,
  error: null,
};

export const leadsFeature = createFeature({
  name: 'leads',
  reducer: createReducer(
    initialState,
    on(LeadsActions.loadLeads, (state) => ({ ...state, loading: true })),
    on(LeadsActions.loadLeadsSuccess, (state, { leads }) => ({
      ...state,
      leads,
      loading: false,
    })),
    on(LeadsActions.loadLeadsFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(LeadsActions.addLeadSuccess, (state, { lead }) => ({
      ...state,
      leads: [...state.leads, lead],
    })),
    on(LeadsActions.updateLeadSuccess, (state, { lead }) => ({
      ...state,
      leads: state.leads.map((l) => (l.id === lead.id ? lead : l)),
    })),
    on(LeadsActions.deleteLeadSuccess, (state, { id }) => ({
      ...state,
      leads: state.leads.filter((l) => l.id !== id),
    }))
  ),
});
