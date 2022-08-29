import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationDashComponent } from './communication-dash/communication-dash.component';
import { CommunicationComponent } from './communication/communication.component';
import { EmpCompetancyAppraisalComponent } from './emp-competancy-appraisal/emp-competancy-appraisal.component';
import { EmpCompetancyRatingPageComponent } from './emp-competancy-rating-page/emp-competancy-rating-page.component';
import { EmployeeTileDashboardComponent } from './employee-tile-dashboard/employee-tile-dashboard.component';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent },
  {path:'EmployeeTileDashboard',component:EmployeeTileDashboardComponent},
  {path:'CommunicationDash',component:CommunicationDashComponent},
  {path:'Communication',component:CommunicationComponent},
  {path:'EmpCompetancyAppraisal',component:EmpCompetancyAppraisalComponent},
  {path:'EmpCompetancyRatingPage/:id/:StaffID',component:EmpCompetancyRatingPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
