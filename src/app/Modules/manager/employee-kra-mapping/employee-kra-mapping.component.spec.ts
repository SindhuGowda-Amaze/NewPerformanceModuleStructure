import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKraMappingComponent } from './employee-kra-mapping.component';

describe('EmployeeKraMappingComponent', () => {
  let component: EmployeeKraMappingComponent;
  let fixture: ComponentFixture<EmployeeKraMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeKraMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeKraMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
