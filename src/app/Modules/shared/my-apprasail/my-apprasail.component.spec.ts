import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApprasailComponent } from './my-apprasail.component';

describe('MyApprasailComponent', () => {
  let component: MyApprasailComponent;
  let fixture: ComponentFixture<MyApprasailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApprasailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApprasailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
