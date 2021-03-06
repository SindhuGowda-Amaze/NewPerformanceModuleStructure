import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HelpComponent } from './help/help.component';
import { SupportticketsComponent } from './supporttickets/supporttickets.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MyApprasailComponent } from './my-apprasail/my-apprasail.component';




@NgModule({
  declarations: [
    SharedComponent,
    HelpComponent,
    SupportticketsComponent,
    EmployeeDashboardComponent,
    MyApprasailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule
    
  
  ],
  exports: [
    FormsModule,
    SharedRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule


  ],
  providers: [
    // {
    //   // provide: ConnectionServiceOptionsToken,
    //   // useValue: <ConnectionServiceOptions>{
    //   //   enableHeartbeat: false,
    //   //   heartbeatUrl: '/assets/ping.json',
    //   //   requestMethod: 'get',
    //   //   heartbeatInterval: 3000
    //   // }
    // },
    DatePipe,
    
  ]
})
export class SharedModule { }
