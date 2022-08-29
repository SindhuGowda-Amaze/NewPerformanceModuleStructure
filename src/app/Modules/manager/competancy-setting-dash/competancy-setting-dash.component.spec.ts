import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancySettingDashComponent } from './competancy-setting-dash.component';

describe('CompetancySettingDashComponent', () => {
  let component: CompetancySettingDashComponent;
  let fixture: ComponentFixture<CompetancySettingDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancySettingDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancySettingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
