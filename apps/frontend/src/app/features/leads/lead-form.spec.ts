import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadForm } from './lead-form';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { IbgeService } from '../../core/services/ibge.service';
import { of } from 'rxjs';
import { LeadsActions } from '../../state/leads/leads.actions';
import { LeadStatus } from '../../core/models/lead.model';

describe('LeadForm', () => {
  let component: LeadForm;
  let fixture: ComponentFixture<LeadForm>;
  let store: MockStore;
  let ibgeService: any;

  beforeEach(async () => {
    ibgeService = {
      getUFs: vi.fn().mockReturnValue(of([{ sigla: 'SP', nome: 'São Paulo' }])),
      getMunicipios: vi.fn().mockReturnValue(of([{ id: 1, nome: 'Campinas' }])),
    };

    await TestBed.configureTestingModule({
      imports: [LeadForm],
      providers: [
        provideMockStore(),
        provideNoopAnimations(),
        { provide: IbgeService, useValue: ibgeService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    vi.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(LeadForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate CPF format', () => {
    const cpfControl = component.form.get('cpf');

    cpfControl?.setValue('123');
    expect(cpfControl?.valid).toBeFalsy();

    cpfControl?.setValue('12345678901'); // 11 digits
    expect(cpfControl?.valid).toBeTruthy();
  });

  it('should load UFs on init', () => {
    expect(component.ufs.length).toBe(1);
    expect(component.ufs[0].sigla).toBe('SP');
  });

  it('should load municipios when state changes', () => {
    component.form.get('state')?.setValue('SP');
    expect(ibgeService.getMunicipios).toHaveBeenCalledWith('SP');
    expect(component.municipios.length).toBe(1);
    expect(component.form.get('city')?.enabled).toBeTruthy();
  });

  it('should dispatch addLead action on valid submit', () => {
    component.form.patchValue({
      name: 'John Doe',
      cpf: '12345678901',
      status: LeadStatus.NEW,
      state: 'SP',
      city: 'Campinas',
    });

    component.onSave();

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: LeadsActions.addLead.type,
        lead: expect.objectContaining({ name: 'John Doe' }),
      }),
    );
  });
});
