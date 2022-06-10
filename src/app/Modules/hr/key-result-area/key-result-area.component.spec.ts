import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultAreaComponent } from './key-result-area.component';

describe('KeyResultAreaComponent', () => {
  let component: KeyResultAreaComponent;
  let fixture: ComponentFixture<KeyResultAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyResultAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyResultAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
