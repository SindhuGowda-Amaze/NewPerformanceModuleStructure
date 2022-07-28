import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketDashboardComponent } from './support-ticket-dashboard.component';

describe('SupportTicketDashboardComponent', () => {
  let component: SupportTicketDashboardComponent;
  let fixture: ComponentFixture<SupportTicketDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportTicketDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
