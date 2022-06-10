import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprasialReportComponent } from './apprasial-report.component';

describe('ApprasialReportComponent', () => {
  let component: ApprasialReportComponent;
  let fixture: ComponentFixture<ApprasialReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprasialReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprasialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
