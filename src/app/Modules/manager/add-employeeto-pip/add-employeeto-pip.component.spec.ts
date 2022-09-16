import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeetoPipComponent } from './add-employeeto-pip.component';

describe('AddEmployeetoPipComponent', () => {
  let component: AddEmployeetoPipComponent;
  let fixture: ComponentFixture<AddEmployeetoPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeetoPipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeetoPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
