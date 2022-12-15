import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { ApprasialCycleComponent } from './apprasial-cycle/apprasial-cycle.component';
import { ApprasialCycleFormComponent } from './apprasial-cycle-form/apprasial-cycle-form.component';
import { KeyResultAreaComponent } from './key-result-area/key-result-area.component';

import { KeyPerformaceIndicatorComponent } from './key-performace-indicator/key-performace-indicator.component';
import { KeyPerformaceIndicatorformComponent } from './key-performace-indicatorform/key-performace-indicatorform.component';
import { HrDashComponent } from './hr-dash/hr-dash.component';
import { BellCurveFittingComponent } from './bell-curve-fitting/bell-curve-fitting.component';
import { StaffScoreReportComponent } from './staff-score-report/staff-score-report.component';
import { ApprasialReportComponent } from './apprasial-report/apprasial-report.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SalaryincrementletterDashComponent } from './salaryincrementletter-dash/salaryincrementletter-dash.component';
import { StaffScoreFullDetailsComponent } from './staff-score-full-details/staff-score-full-details.component';
import { HrratingnewComponent } from './hrratingnew/hrratingnew.component';
import { KeyResultAreaFormComponent } from './key-result-area-form/key-result-area-form.component';
import { ApraisalLevelConfigurationComponent } from './apraisal-level-configuration/apraisal-level-configuration.component';


@NgModule({
  declarations: [
    HrComponent,
    ApprasialCycleComponent,
    ApprasialCycleFormComponent,
    KeyResultAreaComponent,
     KeyResultAreaFormComponent,
    KeyPerformaceIndicatorComponent,
    KeyPerformaceIndicatorformComponent,
    HrDashComponent,
    BellCurveFittingComponent,
    StaffScoreReportComponent,
    ApprasialReportComponent,
 
    HrDashboardComponent,
    SalaryincrementletterDashComponent,
    StaffScoreFullDetailsComponent,
    HrratingnewComponent,
    ApraisalLevelConfigurationComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
