import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTileDashboardComponent } from './employee-tile-dashboard.component';

describe('EmployeeTileDashboardComponent', () => {
  let component: EmployeeTileDashboardComponent;
  let fixture: ComponentFixture<EmployeeTileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTileDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
