import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbuappraisalComponent } from './sbuappraisal.component';

describe('SbuappraisalComponent', () => {
  let component: SbuappraisalComponent;
  let fixture: ComponentFixture<SbuappraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbuappraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbuappraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
