import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellCurveFittingComponent } from './bell-curve-fitting.component';

describe('BellCurveFittingComponent', () => {
  let component: BellCurveFittingComponent;
  let fixture: ComponentFixture<BellCurveFittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BellCurveFittingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BellCurveFittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
