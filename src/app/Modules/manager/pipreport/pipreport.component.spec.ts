import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIPReportComponent } from './pipreport.component';

describe('PIPReportComponent', () => {
  let component: PIPReportComponent;
  let fixture: ComponentFixture<PIPReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIPReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIPReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
