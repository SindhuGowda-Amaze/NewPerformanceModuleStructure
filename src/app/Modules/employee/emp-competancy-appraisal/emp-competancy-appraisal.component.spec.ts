import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCompetancyAppraisalComponent } from './emp-competancy-appraisal.component';

describe('EmpCompetancyAppraisalComponent', () => {
  let component: EmpCompetancyAppraisalComponent;
  let fixture: ComponentFixture<EmpCompetancyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCompetancyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCompetancyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
