import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprasialCycleComponent } from './apprasial-cycle.component';

describe('ApprasialCycleComponent', () => {
  let component: ApprasialCycleComponent;
  let fixture: ComponentFixture<ApprasialCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprasialCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprasialCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
