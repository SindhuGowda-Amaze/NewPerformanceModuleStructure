import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCompetancyAppraisalComponent } from './manager-competancy-appraisal.component';

describe('ManagerCompetancyAppraisalComponent', () => {
  let component: ManagerCompetancyAppraisalComponent;
  let fixture: ComponentFixture<ManagerCompetancyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCompetancyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCompetancyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
