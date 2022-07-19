import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKraMappingdashboardComponent } from './employee-kra-mappingdashboard.component';

describe('EmployeeKraMappingdashboardComponent', () => {
  let component: EmployeeKraMappingdashboardComponent;
  let fixture: ComponentFixture<EmployeeKraMappingdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeKraMappingdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeKraMappingdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
