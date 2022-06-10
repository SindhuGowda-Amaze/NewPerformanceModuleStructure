import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformaceIndicatorformComponent } from './key-performace-indicatorform.component';

describe('KeyPerformaceIndicatorformComponent', () => {
  let component: KeyPerformaceIndicatorformComponent;
  let fixture: ComponentFixture<KeyPerformaceIndicatorformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPerformaceIndicatorformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPerformaceIndicatorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
