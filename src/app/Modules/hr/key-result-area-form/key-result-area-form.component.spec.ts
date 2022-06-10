import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultAreaFormComponent } from './key-result-area-form.component';

describe('KeyResultAreaFormComponent', () => {
  let component: KeyResultAreaFormComponent;
  let fixture: ComponentFixture<KeyResultAreaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyResultAreaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyResultAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
