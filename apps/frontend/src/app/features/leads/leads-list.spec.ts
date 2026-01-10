import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadsList } from './leads-list';
import { provideMockStore } from '@ngrx/store/testing';
import { leadsFeature } from '../../state/leads/leads.reducer';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('LeadsList', () => {
  let component: LeadsList;
  let fixture: ComponentFixture<LeadsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsList],
      providers: [
        provideMockStore({
          initialState: {
            [leadsFeature.name]: { leads: [], loading: false, error: null },
          },
        }),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});