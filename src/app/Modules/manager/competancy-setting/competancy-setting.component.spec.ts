import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetancySettingComponent } from './competancy-setting.component';

describe('CompetancySettingComponent', () => {
  let component: CompetancySettingComponent;
  let fixture: ComponentFixture<CompetancySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetancySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetancySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
