import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-apprasial-cycle-form',
  templateUrl: './apprasial-cycle-form.component.html',
  styleUrls: ['./apprasial-cycle-form.component.css']
})
export class ApprasialCycleFormComponent implements OnInit {
  constructor(private PerformanceManagementService: PerformancemanagementService, private ActivatedRoute: ActivatedRoute) { }
  appraisal: any;
  startdate: any;
  enddate: any;
  frequencyid: any;
  id: any;
  appraisallist: any;
  goalDate: any;
  empsubDate: any;
  managerReviewDate: any;
  hrReviewDate: any;
  appraisalLastdate: any;
  appraisalClosingLastDate: any;
  todaydate: any;
  sbuReviewDate: any;
  closingdate: any;
  currentUrl: any
  frequency: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.GetFrequency();
    this.frequencyid = "";
    this.ActivatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
        if (this.id != undefined && this.id != null) {
          this.GetAppraisalCycle();
        }
      })
  }
  startingdate: any;
  sbureviwdate: any;
  hrreviewdate: any
  employeereview: any;
  managerriew: any;
  goalsettinglastdate: any;
  endingdate: any;
  public startingdatealert(even: any) {
    this.startingdate = even.target.value;
  }
  public endingdatealert(even: any) {
    this.endingdate = even.target.value;
    if (this.endingdate < this.startingdate || this.enddate < this.startdate) {
      Swal.fire("Cycle End date should be greater than Cycle Start date")
    }
  }
  public closingdatealert(event: any) {
    this.closingdate = event.target.value;
    if (this.closingdate < this.startingdate) {
      Swal.fire("Closing date should be greater than Cycle Start date")
      this.appraisalClosingLastDate = 0;
    }
    else if (this.closingdate > this.endingdate) {
      Swal.fire("Closing date should be lesser than Cycle End date")
      this.appraisalClosingLastDate = 0;
    }
  }
  public goalsettinglastdatealert(event: any) {
    this.goalsettinglastdate = event.target.value;
    if (this.goalsettinglastdate < this.startingdate && this.goalsettinglastdate < this.startingdate) {
      Swal.fire("Goal Setting last date should be greater than Cycle Start date")
      this.goalDate = 0;
    }
    else if (this.goalsettinglastdate > this.endingdate) {
      Swal.fire("Goal Setting date should be lesser than Cycle End date")
      this.goalDate = 0;
    }
  }

  public employeereviewdatealert(event: any) {
    this.employeereview = event.target.value;
    if (this.employeereview < this.goalsettinglastdate || this.employeereview < this.startingdate) {
      Swal.fire("Employee review last date should be greater than  goal setting last date")
      this.empsubDate = 0;
    }
    else if (this.employeereview > this.endingdate) {
      Swal.fire("Employee review last date should be lesser than Cycle End date")
      this.empsubDate = 0;
    }
  }

  public managerreviewalert(event: any) {
    this.managerriew = event.target.value;
    if (this.managerriew < this.employeereview || this.managerriew < this.startingdate) {
      Swal.fire("Manager review last date should be greater than  Employee Review Last Date")
      this.managerReviewDate = 0
    }
    else if (this.managerriew > this.endingdate) {
      Swal.fire("Manager review last date should be lesser than Cycle End date")
      this.managerReviewDate = 0
    }
  }

  public sbudatealert(event: any) {
    this.sbureviwdate = event.target.value;
    if (this.sbureviwdate < this.managerriew && this.sbureviwdate < this.startingdate) {
      Swal.fire("SBU review last date should be greater than  Manager Review Last Date")
      this.sbuReviewDate = 0;
    }
    else if (this.sbureviwdate > this.endingdate) {
      Swal.fire("SBU review last date should be lesser than Cycle End date")
      this.sbuReviewDate = 0;
    }
  }
  public hrreviewdatealert(event: any) {
    this.hrreviewdate = event.target.value;
    if (this.hrreviewdate < this.sbudatealert && this.hrreviewdate < this.startingdate) {
      Swal.fire("HR review last date should be greater than  SBU Review Last Date")
      this.hrReviewDate = 0;
    }
    else if (this.hrreviewdate > this.endingdate) {
      Swal.fire("HR review last date should be lesser than Cycle End date")
      this.hrReviewDate = 0;
    }
  }
  GetAppraisalCycle() {
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.appraisallist = data;
        this.appraisallist = this.appraisallist.filter((x: { id: any; }) => x.id == Number(this.id));
        this.appraisal = this.appraisallist[0].appraisalCycleName;
        this.frequencyid = this.appraisallist[0].frequencyType;
        this.startdate = this.appraisallist[0].cycleStartDate;
        this.enddate = this.appraisallist[0].cycleEndDate;
        this.goalDate = this.appraisallist[0].goalSettingDate;
        this.empsubDate = this.appraisallist[0].employeeSubmissionDate;
        this.managerReviewDate = this.appraisallist[0].managerReviewLastDate;
        this.hrReviewDate = this.appraisallist[0].hrReviewLastDate;
        this.sbuReviewDate = this.appraisallist[0].sbuReviewLastDate;
        this.appraisalClosingLastDate = this.appraisallist[0].appraisalClosingLastDate;
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
  Save() {
    debugger
    if (this.appraisal == null || this.appraisal == undefined || this.frequencyid == null || this.frequencyid == undefined
      || this.startdate == null || this.startdate == undefined || this.enddate == null || this.enddate == undefined ||
      this.goalDate == null || this.goalDate == undefined || this.empsubDate == null || undefined || this.managerReviewDate == null || this.managerReviewDate == undefined
      || this.hrReviewDate == null || this.hrReviewDate == undefined || this.sbuReviewDate == null || this.sbuReviewDate == undefined || this.appraisalClosingLastDate == null || this.appraisalClosingLastDate == undefined) {
      Swal.fire("Please fill all fields!");
    }
    else {
      var json = {
        "AppraisalCycleName": this.appraisal,
        "FrequencyType": this.frequencyid,
        "CycleStartDate": this.startdate,
        "CycleEndDate": this.enddate,
        "GoalSettingDate": this.goalDate,
        "EmployeeSubmissionDate": this.empsubDate,
        "ManagerReviewLastDate": this.managerReviewDate,
        "HrReviewLastDate": this.hrReviewDate,
        "SbuReviewLastDate": this.sbuReviewDate,
        "AppraisalClosingLastDate": this.appraisalClosingLastDate
      };
      this.PerformanceManagementService.InsertAppraisalCycle(json).subscribe({
        next: data => {
          debugger
          Swal.fire("Successfully Submitted...!");
          location.href = "#/hr/ApprasialCycle"
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting Appraisal Cycle');
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
  Update() {
    debugger
    var json = {
      "ID": this.id,
      "AppraisalCycleName": this.appraisal,
      "FrequencyType": this.frequencyid,
      "CycleStartDate": this.startdate,
      "CycleEndDate": this.enddate,
      "GoalSettingDate": this.goalDate,
      "EmployeeSubmissionDate": this.empsubDate,
      "ManagerReviewLastDate": this.managerReviewDate,
      "HrReviewLastDate": this.hrReviewDate,
      "SbuReviewLastDate": this.sbuReviewDate,
      "AppraisalClosingLastDate": this.appraisalClosingLastDate
    };
    this.PerformanceManagementService.UpdateAppraisalCycle(json).subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
        location.href = "#/hr/ApprasialCycle"
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  Cancel() {
    location.href = "#/hr/ApprasialCycle"
  }

 


  public GetFrequency() {
    this.PerformanceManagementService.GetFrequency().subscribe({
      next: data => {
        debugger
        this.frequency = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Frequency');
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

  getfrequency(even: any) {
    this.frequencyid = even.target.value;

  }










}

