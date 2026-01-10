import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { leadsFeature } from '../../state/leads/leads.reducer';
import { LeadsActions } from '../../state/leads/leads.actions';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { Lead } from '../../core/models/lead.model';
import { LeadForm } from './lead-form';

@Component({
  selector: 'app-leads-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    LeadForm,
  ],
  templateUrl: './leads-list.html',
})
export class LeadsList implements OnInit {
  private store = inject(Store);
  leads$ = this.store.select(leadsFeature.selectLeads);
  loading$ = this.store.select(leadsFeature.selectLoading);

  displayForm = false;
  selectedLead: Lead | null = null;

  ngOnInit() {
    this.store.dispatch(LeadsActions.loadLeads());
  }

  openNew() {
    this.selectedLead = {
        id: 0,
        name: '',
        cpf: '',
        status: null as any,
        comments: '',
        createdAt: '',
        updatedAt: ''
    };
    this.displayForm = true;
  }

  editLead(lead: Lead) {
    this.selectedLead = { ...lead };
    this.displayForm = true;
  }

  deleteLead(id: number) {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
      this.store.dispatch(LeadsActions.deleteLead({ id }));
    }
  }

  onFormSave() {
    this.displayForm = false;
    this.selectedLead = null;
  }
}