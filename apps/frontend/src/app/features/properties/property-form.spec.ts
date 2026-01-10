import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyForm } from './property-form';
import { provideMockStore } from '@ngrx/store/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PropertyForm', () => {
  let component: PropertyForm;
  let fixture: ComponentFixture<PropertyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyForm],
      providers: [provideMockStore(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});