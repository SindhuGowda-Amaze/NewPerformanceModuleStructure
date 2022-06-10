import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDashComponent } from './hr-dash.component';

describe('HrDashComponent', () => {
  let component: HrDashComponent;
  let fixture: ComponentFixture<HrDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
