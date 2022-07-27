import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { SbuComponent } from './sbu.component';

const routes: Routes = [{ path: '', component: SbuComponent },
{path:'ReviewRating',component:ReviewratingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbuRoutingModule { }
