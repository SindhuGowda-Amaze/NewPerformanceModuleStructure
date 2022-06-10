import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryincrementletterDashComponent } from './salaryincrementletter-dash.component';

describe('SalaryincrementletterDashComponent', () => {
  let component: SalaryincrementletterDashComponent;
  let fixture: ComponentFixture<SalaryincrementletterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryincrementletterDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryincrementletterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
