import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerComponent } from './manager.component';
import { PipComponent } from './pip/pip.component';
import { PIPReportComponent } from './pipreport/pipreport.component';

const routes: Routes = [{ path: '', component: ManagerComponent },
{path:'ManagerDashboard',component:ManagerDashboardComponent},
{path:'Pip',component:PipComponent},
{path:'PIPReport',component:PIPReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
