import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewratingComponent } from './reviewrating.component';

describe('ReviewratingComponent', () => {
  let component: ReviewratingComponent;
  let fixture: ComponentFixture<ReviewratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
