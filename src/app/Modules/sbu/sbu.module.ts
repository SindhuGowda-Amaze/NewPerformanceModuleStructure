import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbuRoutingModule } from './sbu-routing.module';
import { SbuComponent } from './sbu.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SburattingdashComponent } from './sburattingdash/sburattingdash.component';
import { SbuappraisalComponent } from './sbuappraisal/sbuappraisal.component';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { SuccessionPlanningReportComponent } from './succession-planning-report/succession-planning-report.component';


@NgModule({
  declarations: [
    SbuComponent,
    SburattingdashComponent,
    SbuappraisalComponent,
    ReviewratingComponent,
    SuccessionPlanningReportComponent
  ],
  imports: [
    CommonModule,
    SbuRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class SbuModule { }
