import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffScoreFullDetailsComponent } from './staff-score-full-details.component';

describe('StaffScoreFullDetailsComponent', () => {
  let component: StaffScoreFullDetailsComponent;
  let fixture: ComponentFixture<StaffScoreFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffScoreFullDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffScoreFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
