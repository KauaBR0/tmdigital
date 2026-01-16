import { createFeature, createReducer, on } from '@ngrx/store';
import { Property } from '../../core/models/property.model';
import { PropertiesActions } from './properties.actions';

export interface PropertiesState {
  properties: Property[];
  total: number;
  loading: boolean;
  error: any;
}

export const initialState: PropertiesState = {
  properties: [],
  total: 0,
  loading: false,
  error: null,
};

export const propertiesFeature = createFeature({
  name: 'properties',
  reducer: createReducer(
    initialState,
    on(PropertiesActions.loadProperties, (state) => ({
      ...state,
      loading: true,
    })),
    on(PropertiesActions.loadPropertiesSuccess, (state, { response }) => ({
      ...state,
      properties: response.data,
      total: response.total,
      loading: false,
    })),
    on(PropertiesActions.loadPropertiesFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(PropertiesActions.addPropertySuccess, (state, { property }) => ({
      ...state,
      properties: [...state.properties, property],
    })),
    on(PropertiesActions.updatePropertySuccess, (state, { property }) => ({
      ...state,
      properties: state.properties.map((p) =>
        p.id === property.id ? property : p,
      ),
    })),
    on(PropertiesActions.deletePropertySuccess, (state, { id }) => ({
      ...state,
      properties: state.properties.filter((p) => p.id !== id),
    })),
  ),
});
