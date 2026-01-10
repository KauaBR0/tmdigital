import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesList } from './properties-list';
import { provideMockStore } from '@ngrx/store/testing';
import { propertiesFeature } from '../../state/properties/properties.reducer';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PropertiesList', () => {
  let component: PropertiesList;
  let fixture: ComponentFixture<PropertiesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesList],
      providers: [
        provideMockStore({
          initialState: {
            [propertiesFeature.name]: { properties: [], loading: false, error: null },
          },
        }),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertiesList);
    component = fixture.componentInstance;
    component.leadId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});