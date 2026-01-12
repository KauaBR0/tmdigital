import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
} from '@angular/core';
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
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Store } from '@ngrx/store';
import { LeadsActions } from '../../state/leads/leads.actions';
import { IbgeService, UF, Municipio } from '../../core/services/ibge.service';

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
    CardModule,
    FieldsetModule,
    TagModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './lead-form.html',
})
export class LeadForm implements OnInit {
  @Input() set lead(value: Lead | null) {
    if (value && value.id) {
      this.form.patchValue(value);
      if (value.state) {
        this.loadMunicipios(value.state);
      }
    } else {
      this.form.reset({ id: 0, status: LeadStatus.NEW });
      this.form.get('city')?.disable();
    }
  }
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private ibgeService = inject(IbgeService);

  ufs: UF[] = [];
  municipios: Municipio[] = [];

  form: FormGroup = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    state: [''],
    city: [{ value: '', disabled: true }],
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

  ngOnInit() {
    this.ibgeService.getUFs().subscribe((data) => (this.ufs = data));

    this.form.get('state')?.valueChanges.subscribe((ufSigla) => {
      if (ufSigla) {
        this.loadMunicipios(ufSigla);
        this.form.get('city')?.enable();
      } else {
        this.municipios = [];
        this.form.get('city')?.disable();
        this.form.get('city')?.setValue('');
      }
    });
  }

  loadMunicipios(ufSigla: string) {
    this.ibgeService.getMunicipios(ufSigla).subscribe((data) => {
      this.municipios = data;
    });
  }

  getSeverity(status: LeadStatus) {
    switch (status) {
      case LeadStatus.NEW:
        return 'info';
      case LeadStatus.INITIAL_CONTACT:
        return 'warn';
      case LeadStatus.NEGOTIATION:
        return 'info';
      case LeadStatus.CONVERTED:
        return 'success';
      case LeadStatus.LOST:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

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
