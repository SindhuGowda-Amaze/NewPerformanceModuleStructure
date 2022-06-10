import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformaceIndicatorComponent } from './key-performace-indicator.component';

describe('KeyPerformaceIndicatorComponent', () => {
  let component: KeyPerformaceIndicatorComponent;
  let fixture: ComponentFixture<KeyPerformaceIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPerformaceIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPerformaceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
