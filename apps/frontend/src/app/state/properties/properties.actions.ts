import { createActionGroup, props } from '@ngrx/store';
import { Property } from '../../core/models/property.model';

export const PropertiesActions = createActionGroup({
  source: 'Properties',
  events: {
    'Load Properties': props<{
      leadId?: number;
      page?: number;
      limit?: number;
      filter?: string;
    }>(),
    'Load Properties Success': props<{
      response: { data: Property[]; total: number };
    }>(),
    'Load Properties Failure': props<{ error: any }>(),
    'Add Property': props<{ property: Partial<Property> }>(),
    'Add Property Success': props<{ property: Property }>(),
    'Add Property Failure': props<{ error: any }>(),
    'Update Property': props<{ property: Property }>(),
    'Update Property Success': props<{ property: Property }>(),
    'Update Property Failure': props<{ error: any }>(),
    'Delete Property': props<{ id: number }>(),
    'Delete Property Success': props<{ id: number }>(),
    'Delete Property Failure': props<{ error: any }>(),
  },
});
