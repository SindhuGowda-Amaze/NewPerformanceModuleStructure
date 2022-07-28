import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfratingnewComponentComponent } from './selfratingnew-component.component';

describe('SelfratingnewComponentComponent', () => {
  let component: SelfratingnewComponentComponent;
  let fixture: ComponentFixture<SelfratingnewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfratingnewComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfratingnewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
