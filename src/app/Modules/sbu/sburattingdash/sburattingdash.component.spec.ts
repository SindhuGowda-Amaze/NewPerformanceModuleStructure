import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SburattingdashComponent } from './sburattingdash.component';

describe('SburattingdashComponent', () => {
  let component: SburattingdashComponent;
  let fixture: ComponentFixture<SburattingdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SburattingdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SburattingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
