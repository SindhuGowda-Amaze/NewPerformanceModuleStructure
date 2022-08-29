import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancyTratesFormComponent } from './competancy-trates-form.component';

describe('CompetancyTratesFormComponent', () => {
  let component: CompetancyTratesFormComponent;
  let fixture: ComponentFixture<CompetancyTratesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancyTratesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancyTratesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
