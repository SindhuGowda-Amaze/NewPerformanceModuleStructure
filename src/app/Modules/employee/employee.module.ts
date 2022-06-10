import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SalaryincrementletterDashComponent } from './salaryincrementletter-dash/salaryincrementletter-dash.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { PIPReportComponent } from './pipreport/pipreport.component';
import { PipComponent } from './pip/pip.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    EmployeeComponent,
    SalaryincrementletterDashComponent,
    ReviewRatingComponent,
    PIPReportComponent,
    PipComponent
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
