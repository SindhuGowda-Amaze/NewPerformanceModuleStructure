import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeetoPipComponent } from './add-employeeto-pip/add-employeeto-pip.component';
import { EmployeeKraMappingComponent } from './employee-kra-mapping/employee-kra-mapping.component';
import { EmployeeKraMappingdashboardComponent } from './employee-kra-mappingdashboard/employee-kra-mappingdashboard.component';
import { ManagerAppraisalComponent } from './manager-appraisal/manager-appraisal.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerComponent } from './manager.component';
import { ManagerratingdashComponent } from './managerratingdash/managerratingdash.component';
import { PipComponent } from './pip/pip.component';
import { PIPReportComponent } from './pipreport/pipreport.component';

const routes: Routes = [{ path: '', component: ManagerComponent },
{path:'ManagerDashboard',component:ManagerDashboardComponent},
{path:'Pip',component:PipComponent},
{path:'PIPReport',component:PIPReportComponent},
{path:'PIPReport/:id',component:PIPReportComponent},

{path:'EmployeeKraMappingdashboard',component:EmployeeKraMappingdashboardComponent},
{path:'ManagerAppraisal/:id/:StaffID',component:ManagerAppraisalComponent},
{path:'Managerratingdash',component:ManagerratingdashComponent},
{path:'EmployeeKraMapping',component:EmployeeKraMappingComponent},
{ path: 'AddEmployeetoPip', component:AddEmployeetoPipComponent },
{ path: 'AddEmployeetoPip/:staffid', component:AddEmployeetoPipComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
