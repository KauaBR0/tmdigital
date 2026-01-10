import { leadsFeature, initialState } from './leads.reducer';
import { LeadsActions } from './leads.actions';
import { Lead, LeadStatus } from '../../core/models/lead.model';

describe('Leads Reducer', () => {
  it('should return the initial state', () => {
    const { reducer } = leadsFeature;
    const action = { type: 'Unknown' };
    const state = reducer(initialState, action as any);

    expect(state).toBe(initialState);
  });

  it('should load leads and set loading to true', () => {
    const { reducer } = leadsFeature;
    const action = LeadsActions.loadLeads();
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should update leads on loadLeadsSuccess', () => {
    const { reducer } = leadsFeature;
    const leads: Lead[] = [{ id: 1, name: 'Test', cpf: '123', status: LeadStatus.NEW, createdAt: '', updatedAt: '' }];
    const action = LeadsActions.loadLeadsSuccess({ leads });
    const state = reducer(initialState, action);

    expect(state.leads).toBe(leads);
    expect(state.loading).toBe(false);
  });
});
