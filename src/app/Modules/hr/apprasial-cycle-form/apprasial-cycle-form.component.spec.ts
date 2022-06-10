import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprasialCycleFormComponent } from './apprasial-cycle-form.component';

describe('ApprasialCycleFormComponent', () => {
  let component: ApprasialCycleFormComponent;
  let fixture: ComponentFixture<ApprasialCycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprasialCycleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprasialCycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
