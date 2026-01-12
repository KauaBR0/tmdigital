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
    expect(component.allLeads.length).toBe(2);
    expect(component.leads.length).toBe(2);
  });

  it('should filter by priority', () => {
    component.showPriorityOnly = true;
    component.applyFilters();

    expect(component.leads.length).toBe(1);
    expect(component.leads[0].isPriority).toBe(true);
    expect(component.leads[0].name).toBe('Priority Lead');
  });

  it('should reset filter', () => {
    component.showPriorityOnly = true;
    component.applyFilters();
    expect(component.leads.length).toBe(1);

    component.showPriorityOnly = false;
    component.applyFilters();
    expect(component.leads.length).toBe(2);
  });
});
