import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionPlanningReportComponent } from './succession-planning-report.component';

describe('SuccessionPlanningReportComponent', () => {
  let component: SuccessionPlanningReportComponent;
  let fixture: ComponentFixture<SuccessionPlanningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessionPlanningReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionPlanningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
