import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationDashComponent } from './communication-dash.component';

describe('CommunicationDashComponent', () => {
  let component: CommunicationDashComponent;
  let fixture: ComponentFixture<CommunicationDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
