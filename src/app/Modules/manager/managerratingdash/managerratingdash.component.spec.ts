import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerratingdashComponent } from './managerratingdash.component';

describe('ManagerratingdashComponent', () => {
  let component: ManagerratingdashComponent;
  let fixture: ComponentFixture<ManagerratingdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerratingdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerratingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
