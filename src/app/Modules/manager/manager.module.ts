import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmployeeKraMappingdashboardComponent } from './employee-kra-mappingdashboard/employee-kra-mappingdashboard.component';
import { ManagerratingdashComponent } from './managerratingdash/managerratingdash.component';
import { ManagerAppraisalComponent } from './manager-appraisal/manager-appraisal.component';


@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeKraMappingdashboardComponent,
    ManagerratingdashComponent,
    ManagerAppraisalComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ManagerModule { }
