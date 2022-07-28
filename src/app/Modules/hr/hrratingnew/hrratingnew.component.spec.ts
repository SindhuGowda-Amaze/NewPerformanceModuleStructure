import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrratingnewComponent } from './hrratingnew.component';

describe('HrratingnewComponent', () => {
  let component: HrratingnewComponent;
  let fixture: ComponentFixture<HrratingnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrratingnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrratingnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
