
//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to Display and Delete Appraisal Cycle 
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apprasial-cycle',
  templateUrl: './apprasial-cycle.component.html',
  styleUrls: ['./apprasial-cycle.component.css']
})
export class ApprasialCycleComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //Variable Declerations//
  appraisallist: any;
  count: any;
  search: any;
  currentUrl: any

  ngOnInit(): void {

    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.GetAppraisalCycle();
  }

  //Method to get Appraisal Cycle Details from AppraisalCycle Table//
  public GetAppraisalCycle() {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.appraisallist = data;
        this.count = this.appraisallist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Appraisal Cycle');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }

  //Method to Delete Appraisal Cycle Details from AppraisalCycle Table//
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
        this.PerformanceManagementService.DeleteAppraisalCycle(ID).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.GetAppraisalCycle();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Deleting Appraisal Cycle');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
    })
  }
}
