import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HelpComponent } from './help/help.component';
import { MyApprasailComponent } from './my-apprasail/my-apprasail.component';
import { SelfratingnewComponentComponent } from './selfratingnew-component/selfratingnew-component.component';
import { SharedComponent } from './shared.component';
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';
import { SupportticketsComponent } from './supporttickets/supporttickets.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{ path: 'EmployeeDashboard', component: EmployeeDashboardComponent },
{path:'Help',component:HelpComponent},
{path:'SupportTicketDashboard',component:SupportTicketDashboardComponent},
{path:'Supporttickets',component:SupportticketsComponent},
{path:'Supporttickets/:id',component:SupportticketsComponent},
{path:'MyAppraisal',component:MyApprasailComponent},

{ path: 'SelfRatingPagenew/:id/:StaffID', component: SelfratingnewComponentComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
