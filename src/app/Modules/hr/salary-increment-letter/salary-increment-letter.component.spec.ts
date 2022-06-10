import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryIncrementLetterComponent } from './salary-increment-letter.component';

describe('SalaryIncrementLetterComponent', () => {
  let component: SalaryIncrementLetterComponent;
  let fixture: ComponentFixture<SalaryIncrementLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryIncrementLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryIncrementLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
