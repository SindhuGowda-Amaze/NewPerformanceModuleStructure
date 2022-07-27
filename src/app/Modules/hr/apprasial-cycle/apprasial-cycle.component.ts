import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-apprasial-cycle',
  templateUrl: './apprasial-cycle.component.html',
  styleUrls: ['./apprasial-cycle.component.css']
})
export class ApprasialCycleComponent implements OnInit {

  constructor(private PerformanceManagementService:PerformancemanagementService ) { }

  appraisallist:any;
  count:any;
  search:any;
 
  ngOnInit(): void {
    this.GetAppraisalCycle();
  }


  public GetAppraisalCycle() {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe(
      data => {
        debugger
      this.appraisallist=data;
      this.count=this.appraisallist.length;
      })
  }

  public delete(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.DeleteAppraisalCycle(ID).subscribe(
          data=>{
          debugger
          Swal.fire('Deleted Successfully')
          this.GetAppraisalCycle();
          // location.reload();
        })
      }
    })
  }





}
