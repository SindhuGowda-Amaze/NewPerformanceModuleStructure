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
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelfratingnewComponentComponent } from './selfratingnew-component/selfratingnew-component.component';





@NgModule({
  declarations: [
    SharedComponent,
    HelpComponent,
    SupportticketsComponent,
    EmployeeDashboardComponent,
    MyApprasailComponent,
    SupportTicketDashboardComponent,
    SelfratingnewComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot(),

  
  ],
  exports: [
    FormsModule,
    SharedRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule


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
