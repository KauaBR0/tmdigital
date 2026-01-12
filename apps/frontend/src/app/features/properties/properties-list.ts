import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { propertiesFeature } from '../../state/properties/properties.reducer';
import { PropertiesActions } from '../../state/properties/properties.actions';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Property, CropType } from '../../core/models/property.model';
import { PropertyForm } from './property-form';
import { FormsModule } from '@angular/forms';
import { IbgeService, UF } from '../../core/services/ibge.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-properties-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CardModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TagModule,
    PropertyForm,
  ],
  templateUrl: './properties-list.html',
})
export class PropertiesList implements OnInit, OnDestroy {
  @Input() leadId?: number;

  private store = inject(Store);
  private ibgeService = inject(IbgeService);
  private subscription = new Subscription();

  properties: Property[] = [];
  loading = toSignal(this.store.select(propertiesFeature.selectLoading), {
    initialValue: false,
  });

  displayForm = false;
  selectedProperty: Property | null = null;
  ufs: UF[] = [];

  cropOptions = [
    { label: 'Todas', value: null },
    ...Object.values(CropType).map((crop) => ({ label: crop, value: crop })),
  ];

  get isGlobal(): boolean {
    return !this.leadId;
  }

  ngOnInit() {
    this.store.dispatch(
      PropertiesActions.loadProperties({ leadId: this.leadId }),
    );
    if (this.isGlobal) {
      this.ibgeService.getUFs().subscribe((data) => (this.ufs = data));
    }

    this.subscription.add(
      this.store
        .select(propertiesFeature.selectProperties)
        .subscribe((data) => {
          // Create a mutable copy of the data for PrimeNG Table sorting
          this.properties = [...data];
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  customSort(event: any) {
    event.data.sort((data1: any, data2: any) => {
      const value1 = this.resolveFieldData(data1, event.field);
      const value2 = this.resolveFieldData(data2, event.field);
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        const fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  openNew() {
    this.selectedProperty = {
      id: 0,
      crop: null as any,
      area: 0,
      leadId: this.leadId || 0, // In global mode, leadId must be handled differently (maybe select a lead?) - For now assume filtered mode for creation or handle properly.
      createdAt: '',
      updatedAt: '',
    };
    if (this.isGlobal) {
      alert(
        'A criação de propriedade deve ser feita através da tela de Leads.',
      );
      return;
    }
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

  getCropSeverity(crop: CropType) {
    switch (crop) {
      case CropType.SOY:
        return 'success';
      case CropType.CORN:
        return 'warn';
      case CropType.COTTON:
        return 'info';
      case CropType.COFFEE:
        return 'danger';
      case CropType.SUGARCANE:
        return 'secondary';
      default:
        return 'contrast';
    }
  }
}
