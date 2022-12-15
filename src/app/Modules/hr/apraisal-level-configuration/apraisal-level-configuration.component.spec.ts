import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApraisalLevelConfigurationComponent } from './apraisal-level-configuration.component';

describe('ApraisalLevelConfigurationComponent', () => {
  let component: ApraisalLevelConfigurationComponent;
  let fixture: ComponentFixture<ApraisalLevelConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApraisalLevelConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApraisalLevelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
