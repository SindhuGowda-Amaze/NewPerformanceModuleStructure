import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbuRoutingModule } from './sbu-routing.module';
import { SbuComponent } from './sbu.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SbuComponent
  ],
  imports: [
    CommonModule,
    SbuRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class SbuModule { }
