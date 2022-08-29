import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancydashComponent } from './competancydash.component';

describe('CompetancydashComponent', () => {
  let component: CompetancydashComponent;
  let fixture: ComponentFixture<CompetancydashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancydashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
