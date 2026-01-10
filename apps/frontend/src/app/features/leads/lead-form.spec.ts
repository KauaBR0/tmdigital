import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadForm } from './lead-form';
import { provideMockStore } from '@ngrx/store/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('LeadForm', () => {
  let component: LeadForm;
  let fixture: ComponentFixture<LeadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadForm],
      providers: [provideMockStore(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});