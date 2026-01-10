import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Lead, LeadStatus } from '../../core/models/lead.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { Store } from '@ngrx/store';
import { LeadsActions } from '../../state/leads/leads.actions';

@Component({
  selector: 'app-lead-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
    ButtonModule,
    TextareaModule,
  ],
  templateUrl: './lead-form.html',
})
export class LeadForm {
  @Input() set lead(value: Lead | null) {
    if (value && value.id) {
      this.form.patchValue(value);
    } else {
      this.form.reset({ id: 0, status: LeadStatus.NEW });
    }
  }
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    cpf: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
      ],
    ],
    status: [LeadStatus.NEW, Validators.required],
    comments: [''],
  });

  statusOptions = Object.values(LeadStatus).map((status) => ({
    label: status,
    value: status,
  }));

  onSave() {
    if (this.form.valid) {
      const lead = this.form.value;
      if (lead.id) {
        this.store.dispatch(LeadsActions.updateLead({ lead }));
      } else {
        const { id, ...newLead } = lead;
        this.store.dispatch(LeadsActions.addLead({ lead: newLead }));
      }
      this.save.emit();
    }
  }
}
