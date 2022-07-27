import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTileDashboardComponent } from './employee-tile-dashboard/employee-tile-dashboard.component';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent },
  {path:'EmployeeTileDashboard',component:EmployeeTileDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
