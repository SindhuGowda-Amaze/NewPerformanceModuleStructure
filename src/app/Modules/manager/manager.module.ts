import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmployeeKraMappingdashboardComponent } from './employee-kra-mappingdashboard/employee-kra-mappingdashboard.component';
import { ManagerratingdashComponent } from './managerratingdash/managerratingdash.component';
import { ManagerAppraisalComponent } from './manager-appraisal/manager-appraisal.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { PipComponent } from './pip/pip.component';
import { PIPReportComponent } from './pipreport/pipreport.component';
import { EmployeeKraMappingComponent } from './employee-kra-mapping/employee-kra-mapping.component';
import { CompetancySettingComponent } from './competancy-setting/competancy-setting.component';
import { CompetancySettingDashComponent } from './competancy-setting-dash/competancy-setting-dash.component';
import { ManagerCompetancyAppraisalComponent } from './manager-competancy-appraisal/manager-competancy-appraisal.component';
import { ManagerCompetancyRatingPageComponent } from './manager-competancy-rating-page/manager-competancy-rating-page.component';
import { ViewAppraisalComponent } from './view-appraisal/view-appraisal.component';


@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeKraMappingdashboardComponent,
    ManagerratingdashComponent,
    ManagerAppraisalComponent,
    ManagerDashboardComponent,
    PipComponent,
    PIPReportComponent,
    EmployeeKraMappingComponent,
    CompetancySettingComponent,
    CompetancySettingDashComponent,
    ManagerCompetancyAppraisalComponent,
    ManagerCompetancyRatingPageComponent,
    ViewAppraisalComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ManagerModule { }
