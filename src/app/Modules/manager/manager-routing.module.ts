import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetancySettingDashComponent } from './competancy-setting-dash/competancy-setting-dash.component';
import { CompetancySettingComponent } from './competancy-setting/competancy-setting.component';
import { EmployeeKraMappingComponent } from './employee-kra-mapping/employee-kra-mapping.component';
import { EmployeeKraMappingdashboardComponent } from './employee-kra-mappingdashboard/employee-kra-mappingdashboard.component';
import { ManagerAppraisalComponent } from './manager-appraisal/manager-appraisal.component';
import { ManagerCompetancyAppraisalComponent } from './manager-competancy-appraisal/manager-competancy-appraisal.component';
import { ManagerCompetancyRatingPageComponent } from './manager-competancy-rating-page/manager-competancy-rating-page.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerComponent } from './manager.component';
import { ManagerratingdashComponent } from './managerratingdash/managerratingdash.component';
import { PipComponent } from './pip/pip.component';
import { PIPReportComponent } from './pipreport/pipreport.component';
import { ViewAppraisalComponent } from './view-appraisal/view-appraisal.component';

const routes: Routes = [{ path: '', component: ManagerComponent },
{path:'ManagerDashboard',component:ManagerDashboardComponent},
{path:'Pip',component:PipComponent},
{path:'PIPReport',component:PIPReportComponent},
{path:'PIPReport/:id',component:PIPReportComponent},

{path:'EmployeeKraMappingdashboard',component:EmployeeKraMappingdashboardComponent},
{path:'ManagerAppraisal/:id/:StaffID',component:ManagerAppraisalComponent},
{path:'Managerratingdash',component:ManagerratingdashComponent},
{path:'EmployeeKraMapping',component:EmployeeKraMappingComponent},
{path:'CompetancySetting',component:CompetancySettingComponent},
{path:'CompetancySettingDash',component:CompetancySettingDashComponent},
{path:'ManagerCompetancyAppraisal',component:ManagerCompetancyAppraisalComponent},
{path:'ManagerCompetancyRatingPage/:id/:StaffID',component:ManagerCompetancyRatingPageComponent},
{path:'ViewAppraisal',component:ViewAppraisalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
