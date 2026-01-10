import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { propertiesFeature } from '../../state/properties/properties.reducer';
import { PropertiesActions } from '../../state/properties/properties.actions';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Property } from '../../core/models/property.model';
import { PropertyForm } from './property-form';

@Component({
  selector: 'app-properties-list',
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, PropertyForm],
  templateUrl: './properties-list.html',
})
export class PropertiesList implements OnInit {
  @Input() leadId!: number;

  private store = inject(Store);
  properties$ = this.store.select(propertiesFeature.selectProperties);
  loading$ = this.store.select(propertiesFeature.selectLoading);

  displayForm = false;
  selectedProperty: Property | null = null;

  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.loadProperties({ leadId: this.leadId })
    );
  }

  openNew() {
    this.selectedProperty = {
      id: 0,
      crop: null as any,
      area: 0,
      leadId: this.leadId,
      createdAt: '',
      updatedAt: '',
    };
    this.displayForm = true;
  }

  editProperty(property: Property) {
    this.selectedProperty = { ...property };
    this.displayForm = true;
  }

  deleteProperty(id: number) {
    if (confirm('Tem certeza?')) {
      this.store.dispatch(PropertiesActions.deleteProperty({ id }));
    }
  }
}