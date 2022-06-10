import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportticketsComponent } from './supporttickets.component';

describe('SupportticketsComponent', () => {
  let component: SupportticketsComponent;
  let fixture: ComponentFixture<SupportticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
