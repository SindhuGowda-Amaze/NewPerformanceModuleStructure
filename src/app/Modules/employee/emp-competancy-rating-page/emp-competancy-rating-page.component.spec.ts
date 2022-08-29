import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCompetancyRatingPageComponent } from './emp-competancy-rating-page.component';

describe('EmpCompetancyRatingPageComponent', () => {
  let component: EmpCompetancyRatingPageComponent;
  let fixture: ComponentFixture<EmpCompetancyRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCompetancyRatingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCompetancyRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
