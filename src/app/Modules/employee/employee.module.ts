import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeTileDashboardComponent } from './employee-tile-dashboard/employee-tile-dashboard.component';
import { CommunicationComponent } from './communication/communication.component';
import { CommunicationDashComponent } from './communication-dash/communication-dash.component';
import { EmpCompetancyAppraisalComponent } from './emp-competancy-appraisal/emp-competancy-appraisal.component';
import { EmpCompetancyRatingPageComponent } from './emp-competancy-rating-page/emp-competancy-rating-page.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeTileDashboardComponent,
    CommunicationComponent,
    CommunicationDashComponent,
    EmpCompetancyAppraisalComponent,
    EmpCompetancyRatingPageComponent,
   
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class EmployeeModule { }
