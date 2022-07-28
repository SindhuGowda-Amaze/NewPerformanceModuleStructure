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


@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeKraMappingdashboardComponent,
    ManagerratingdashComponent,
    ManagerAppraisalComponent,
    ManagerDashboardComponent,
    PipComponent,
    PIPReportComponent,
    EmployeeKraMappingComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ManagerModule { }
