import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbuComponent } from './sbu.component';

const routes: Routes = [{ path: '', component: SbuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbuRoutingModule { }
