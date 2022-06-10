import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { PipComponent } from './pip/pip.component';
import { PIPReportComponent } from './pipreport/pipreport.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { SalaryincrementletterDashComponent } from './salaryincrementletter-dash/salaryincrementletter-dash.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  {path:'SalaryincrementletterDash',component:SalaryincrementletterDashComponent},
  {path:'ReviewRating',component:ReviewRatingComponent},
  {path:'PIPReport',component:PIPReportComponent},
  { path: 'Pip', component:PipComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
