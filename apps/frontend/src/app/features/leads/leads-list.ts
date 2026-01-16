import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { leadsFeature } from '../../state/leads/leads.reducer';
import { LeadsActions } from '../../state/leads/leads.actions';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Lead, LeadStatus } from '../../core/models/lead.model';
import { LeadForm } from './lead-form';
import { PropertiesList } from '../properties/properties-list';
import { Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-leads-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    CardModule,
    InputTextModule,
    SelectModule,
    TagModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    LeadForm,
    PropertiesList,
  ],
  templateUrl: './leads-list.html',
})
export class LeadsList implements OnInit, OnDestroy {
  private store = inject(Store);
  private subscription = new Subscription();

  leads: Lead[] = [];
  loading = toSignal(this.store.select(leadsFeature.selectLoading), {
    initialValue: false,
  });
  total = toSignal(this.store.select(leadsFeature.selectTotal), {
    initialValue: 0,
  });
  showPriorityOnly = false;

  displayForm = false;
  displayProperties = false;
  selectedLead: Lead | null = null;
  currentLeadId: number | null = null;

  lastLazyLoadEvent: any;

  statuses = Object.values(LeadStatus).map((status) => ({
    label: status,
    value: status,
  }));

  ngOnInit() {
    // Initial load handled by Table LazyLoad
    this.subscription.add(
      this.store.select(leadsFeature.selectLeads).subscribe((data) => {
        this.leads = [...data];
      }),
    );
  }

  onLazyLoad(event: any) {
    this.lastLazyLoadEvent = event;
    const page = event.first / event.rows + 1;
    const limit = event.rows;
    const filter = this.showPriorityOnly ? 'PRIORITY' : undefined; // Simple logic for now

    this.store.dispatch(LeadsActions.loadLeads({ page, limit, filter }));
  }

  applyFilters() {
    // Trigger reload via LazyLoad event logic simulation or reset
    if (this.lastLazyLoadEvent) {
      this.onLazyLoad({ ...this.lastLazyLoadEvent, first: 0 }); // Reset to page 1
    } else {
      this.store.dispatch(
        LeadsActions.loadLeads({
          page: 1,
          limit: 10,
          filter: this.showPriorityOnly ? 'PRIORITY' : undefined,
        }),
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSeverity(status: string) {
    switch (status) {
      case LeadStatus.NEW:
        return 'info';
      case LeadStatus.INITIAL_CONTACT:
        return 'secondary';
      case LeadStatus.NEGOTIATION:
        return 'warn';
      case LeadStatus.CONVERTED:
        return 'success';
      case LeadStatus.LOST:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  openNew() {
    this.selectedLead = {
      id: 0,
      name: '',
      cpf: '',
      status: null as any,
      comments: '',
      createdAt: '',
      updatedAt: '',
    };
    this.displayForm = true;
  }

  editLead(lead: Lead) {
    this.selectedLead = { ...lead };
    this.displayForm = true;
  }

  viewProperties(lead: Lead) {
    this.currentLeadId = lead.id;
    this.displayProperties = true;
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
