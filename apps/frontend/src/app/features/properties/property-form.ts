import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Property, CropType } from '../../core/models/property.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { PropertiesActions } from '../../state/properties/properties.actions';

@Component({
  selector: 'app-property-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './property-form.html',
})
export class PropertyForm {
  @Input() set property(value: Property | null) {
    if (value && value.id) {
      this.form.patchValue(value);
    } else if (value) {
      this.form.reset({ id: 0, leadId: value.leadId });
    }
  }
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
    id: [0],
    crop: [null, Validators.required],
    area: [null, [Validators.required, Validators.min(0.1)]],
    leadId: [null, Validators.required],
    geometry: [''],
  });

  cropOptions = Object.values(CropType).map((crop) => ({
    label: crop,
    value: crop,
  }));

  onSave() {
    if (this.form.valid) {
      const property = this.form.value;
      if (property.id) {
        this.store.dispatch(PropertiesActions.updateProperty({ property }));
      } else {
        const { id, ...newProperty } = property;
        this.store.dispatch(
          PropertiesActions.addProperty({ property: newProperty })
        );
      }
      this.save.emit();
    }
  }
}