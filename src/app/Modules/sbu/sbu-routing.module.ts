import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { SbuComponent } from './sbu.component';
import { SbuappraisalComponent } from './sbuappraisal/sbuappraisal.component';
import { SburattingdashComponent } from './sburattingdash/sburattingdash.component';
import { SuccessionPlanningReportComponent } from './succession-planning-report/succession-planning-report.component';

const routes: Routes = [{ path: '', component: SbuComponent },
{path:'ReviewRating',component:ReviewratingComponent},
{path:'Sburattingdash',component:SburattingdashComponent},
{path:'SbuAppraisal/:id/:StaffID',component:SbuappraisalComponent},
{path:'SuccessionPlanningReport',component:SuccessionPlanningReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbuRoutingModule { }
