import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadsList } from './leads-list';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { leadsFeature } from '../../state/leads/leads.reducer';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LeadStatus } from '../../core/models/lead.model';

describe('LeadsList', () => {
  let component: LeadsList;
  let fixture: ComponentFixture<LeadsList>;
  let store: MockStore;

  const mockLeads = [
    {
      id: 1,
      name: 'Normal Lead',
      cpf: '111',
      status: LeadStatus.NEW,
      isPriority: false,
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      name: 'Priority Lead',
      cpf: '222',
      status: LeadStatus.NEGOTIATION,
      isPriority: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsList],
      providers: [
        provideMockStore({
          initialState: {
            [leadsFeature.name]: {
              leads: mockLeads,
              loading: false,
              error: null,
            },
          },
          selectors: [
            { selector: leadsFeature.selectLeads, value: mockLeads },
            { selector: leadsFeature.selectLoading, value: false },
          ],
        }),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LeadsList);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load leads on init', () => {
    expect(component.leads.length).toBe(2);
  });

  it('should dispatch filter action on priority toggle', () => {
    const storeSpy = vi.spyOn(store, 'dispatch');
    component.showPriorityOnly = true;
    component.applyFilters();

    expect(storeSpy).toHaveBeenCalled();
  });
  it('should dispatch loadLeads when applying filters', () => {
    const storeSpy = vi.spyOn(store, 'dispatch');

    // Test priority filter on
    component.showPriorityOnly = true;
    component.applyFilters();
    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: 'PRIORITY',
      }),
    );

    // Test priority filter off
    component.showPriorityOnly = false;
    component.applyFilters();
    expect(storeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        filter: undefined,
      }),
    );
  });
});
