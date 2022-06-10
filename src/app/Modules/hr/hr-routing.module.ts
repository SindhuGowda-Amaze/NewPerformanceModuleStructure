import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprasialCycleFormComponent } from './apprasial-cycle-form/apprasial-cycle-form.component';
import { ApprasialCycleComponent } from './apprasial-cycle/apprasial-cycle.component';
import { ApprasialReportComponent } from './apprasial-report/apprasial-report.component';
import { BellCurveFittingComponent } from './bell-curve-fitting/bell-curve-fitting.component';
import { HrDashComponent } from './hr-dash/hr-dash.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrComponent } from './hr.component';
import { KeyPerformaceIndicatorComponent } from './key-performace-indicator/key-performace-indicator.component';
import { KeyPerformaceIndicatorformComponent } from './key-performace-indicatorform/key-performace-indicatorform.component';
import { KeyResultAreaFormComponent } from './key-result-area-form/key-result-area-form.component';
import { KeyResultAreaComponent } from './key-result-area/key-result-area.component';
import { SalaryIncrementLetterComponent } from './salary-increment-letter/salary-increment-letter.component';
import { StaffScoreReportComponent } from './staff-score-report/staff-score-report.component';

const routes: Routes = [{ path: '', component: HrComponent },

{path:'ApprasialCycle',component:ApprasialCycleComponent},
{path:'ApprasialCycleForm',component:ApprasialCycleFormComponent},
{path:'ApprasialCycleForm/:id',component:ApprasialCycleFormComponent},

{path:'ApprasialReport',component:ApprasialReportComponent},

{path:'BellCurveFitting',component:BellCurveFittingComponent},

{path:'HrDash',component:HrDashComponent},

{path:'HrDashboard',component:HrDashboardComponent},

{path:'KeyPerformaceIndicator',component:KeyPerformaceIndicatorComponent},
{path:'KeyPerformaceIndicatorform',component:KeyPerformaceIndicatorformComponent},
{path:'KeyPerformaceIndicatorform?:id',component:KeyPerformaceIndicatorformComponent},

{path:'KeyResultArea',component:KeyResultAreaComponent},
{path:'KeyResultAreaForm',component:KeyResultAreaFormComponent},
{path:'KeyResultAreaForm/:id',component:KeyResultAreaFormComponent},

{path:'SalaryIncrementLetter',component:SalaryIncrementLetterComponent},

{path:'StaffScoreReport',component:StaffScoreReportComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
