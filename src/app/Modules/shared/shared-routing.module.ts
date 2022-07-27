import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { SharedComponent } from './shared.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{ path: 'EmployeeDashboard', component: EmployeeDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
