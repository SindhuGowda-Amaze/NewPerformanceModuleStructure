import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppraisalComponent } from './manager-appraisal.component';

describe('ManagerAppraisalComponent', () => {
  let component: ManagerAppraisalComponent;
  let fixture: ComponentFixture<ManagerAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
