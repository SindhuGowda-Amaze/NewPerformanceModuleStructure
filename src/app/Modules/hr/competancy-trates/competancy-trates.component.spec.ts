import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancyTratesComponent } from './competancy-trates.component';

describe('CompetancyTratesComponent', () => {
  let component: CompetancyTratesComponent;
  let fixture: ComponentFixture<CompetancyTratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancyTratesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancyTratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
