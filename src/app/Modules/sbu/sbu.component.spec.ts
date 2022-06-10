import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbuComponent } from './sbu.component';

describe('SbuComponent', () => {
  let component: SbuComponent;
  let fixture: ComponentFixture<SbuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
