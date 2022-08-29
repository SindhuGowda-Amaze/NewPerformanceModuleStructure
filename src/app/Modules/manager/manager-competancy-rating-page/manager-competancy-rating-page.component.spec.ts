import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCompetancyRatingPageComponent } from './manager-competancy-rating-page.component';

describe('ManagerCompetancyRatingPageComponent', () => {
  let component: ManagerCompetancyRatingPageComponent;
  let fixture: ComponentFixture<ManagerCompetancyRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCompetancyRatingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCompetancyRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
