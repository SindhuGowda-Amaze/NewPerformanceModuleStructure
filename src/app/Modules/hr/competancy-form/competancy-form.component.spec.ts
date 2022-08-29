import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancyFormComponent } from './competancy-form.component';

describe('CompetancyFormComponent', () => {
  let component: CompetancyFormComponent;
  let fixture: ComponentFixture<CompetancyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
