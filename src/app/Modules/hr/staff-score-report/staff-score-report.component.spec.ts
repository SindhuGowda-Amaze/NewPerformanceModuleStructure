import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffScoreReportComponent } from './staff-score-report.component';

describe('StaffScoreReportComponent', () => {
  let component: StaffScoreReportComponent;
  let fixture: ComponentFixture<StaffScoreReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffScoreReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffScoreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
