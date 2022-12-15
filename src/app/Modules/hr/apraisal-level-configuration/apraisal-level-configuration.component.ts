import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
@Component({
  selector: 'app-apraisal-level-configuration',
  templateUrl: './apraisal-level-configuration.component.html',
  styleUrls: ['./apraisal-level-configuration.component.css']
})
export class ApraisalLevelConfigurationComponent implements OnInit {

  //Variable Declerations// 

  AutoApproval:any;
  AutoApproval1:any;
  AutoApproval2:any;
   CompanyName:any;
   currentUrl:any;
   appraisallist:any;
   count:any
   appraisalCycleID:any;
  constructor( private PerformanceManagementService: PerformancemanagementService) { }

  ngOnInit(): void {
 
    //Variable Initialisation and Default Method Calls//
    this.currentUrl = window.location.href;
  
    this.appraisalCycleID="0"
    // this.AutoApproval1=true
    // this.AutoApproval2=true
    // this.PerformanceManagementService.GetStaffScores().subscribe({
    //   next: (data) => {
    //     debugger;
    //    this.AutoApproval1=data[0].includeSBU
    //   },
    // });
    this.GetAppraisalCycle();
  }

  update(){
    debugger
    var entity={
      AppraisalID :this.appraisalCycleID,
      IncludeSBURating:this.AutoApproval1
    }
    if(this.appraisalCycleID==null || this.appraisalCycleID==undefined
      )
      {
        Swal.fire('Please Select The Cycle')
      }
      else{
        this.PerformanceManagementService.UpdateIncludeSBUStaffScore(entity).subscribe({
          next: (data) => {
            debugger;
            if(data<=0){
              Swal.fire('Sorry,SBU Rating is over/going on for this Apraisal Cycle');
            }
            else{
              Swal.fire('Updated Successfully');
              location.reload();
            }
           
          },
          error: (err: { error: { message: any } }) => {
            Swal.fire('Issue in Getting Expenses List Web');
            // Insert error in Db Here//
            var obj = {
              PageName: this.currentUrl,
              ErrorMessage: err.error.message,
            };
            this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
              (data) => {
                debugger;
              }
            );
          },
        });
      }
  }

  //Method to get Appraisal Cycle Details from AppraisalCycle Table//
  public GetAppraisalCycle() {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.appraisallist = data;
        // this.AutoApproval1= this.appraisallist[0].includeSBURating
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
}
