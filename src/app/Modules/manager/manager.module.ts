import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ManagerModule { }
