//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get Details from GetMyDetails,GetMyDetailsForReiewRating,GetDepartment,AppraisalCycle,GetEmployeeKraMap Tables & GetMyDetails Count.
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav,Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviewrating',
  templateUrl: './reviewrating.component.html',
  styleUrls: ['./reviewrating.component.css'],
})
export class ReviewratingComponent implements OnInit {
  // variables decleartions//
  Staffkra: any;
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search: any;
  Apprisalcyclelist: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  appraisalCycleName: any;
  staffID: any;
  EmployeeKradash: any;
  Promotion: any;
  level: any;
  role: any;
  roleid: any;
  stafflist1: any;
  currentlevel: any;
  BaseSal: any;
  newlevel: any;
  RecommendedBonusAmountOrPercent: any;
  RecommendedSalaryIncreaseOrPercent: any;
  Level: any;
  Type: any;
  staffid: any;
  currentUrl: any;

  constructor(
    private PerformanceManagementService: PerformancemanagementService
  ) {}

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//

    this.GetMyDetails();
    this.GetMyDetailsForReiewRating();
    this.GetDepartment();
    this.GetRoleType();
    this.GetConductappraisalStaffList();
    this.GetAppraisalCycle();
    this.FilterRoleType();
    this.filterByDepartment();
    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.roleid = sessionStorage.getItem('roleid');
    this.Promotion = 0;
    this.level = 0;
    this.appraisalCycleName = 0;
    this.Department = '';
    this.RoleType = '';
  }

   //Method to get Details from GetMyDetails Table//

  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails()
    .subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data;
        this.stafflistCopy = this.stafflist;
      },
      error: (err) => {
        Swal.fire('Issue in Getting MyDetails');
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
     
  
  //Method to get Details from GetMyDetailsForReiewRating Table//


  public GetMyDetailsForReiewRating() {
    this.PerformanceManagementService.GetMyDetailsForReiewRating().subscribe({
      next: (data) => {
        debugger;
        this.stafflist1 = data.filter((x) => x.salaryIncrement == null);
        this.stafflistCopy = this.stafflist1;
      },
      error: (err) => {
        Swal.fire('Issue in Getting MyDetailsForReiewRating');
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

    //Method to get Details from GetDepartment Table//

  public GetDepartment() {
    this.PerformanceManagementService.GetDepartment()
    .subscribe({
      next: (data) => {
        debugger;
        this.Departmentlist = data;
      },
      error: (err) => {
        Swal.fire('Issue in Getting Department');
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
    //Method to get Job tittle from GetDepartment Table//

  public GetRoleType() {
    this.PerformanceManagementService.GetRoleType()
    .subscribe({
      next: (data) => {
        debugger;
        this.RoleTypeList = data;
      },
      error: (err) => {
        Swal.fire('Issue in Getting RoleType');
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

   //Method to get Count from ConductappraisalStaffList Table//

  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList()
    .subscribe({
      next: (data) => {
        debugger;
        this.EmployeeKradash = data.filter(
          (x) =>
            x.approver1 == sessionStorage.getItem('EmaployedID') &&
            x.selfScores != null &&
            x.employeeSubmittedDate != null
        );
        this.count = this.EmployeeKradash.length;
      },
      error: (err) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
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

   //Method to get Details from AppraisalCycle Table//

  public GetAppraisalCycle() {
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: (data) => {
        debugger;
        this.Apprisalcyclelist = data;
      },
      error: (err) => {
        Swal.fire('Issue in Getting AppraisalCycle');
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

  public getRoleType(event: any) {
    debugger;
    this.RoleType = event.target.value;
  }

  //Method to Search the Job Tittle from GetMyDetails Table//

  public FilterRoleType() {
    debugger;
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.roleType == this.RoleType);
        this.count1 = this.stafflist.length;
      },
      error: (err) => {
        Swal.fire('Issue in Getting MyDetails');
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

    //Method to Count from GetMyDetails Table//

  public filterByDepartment() {
    debugger;
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.department == this.Department);
        this.count = this.stafflist.length;
      },
      error: (err) => {
        Swal.fire('Issue in Getting MyDetails');
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

    //Method to Displaying the Data from GetEmployeeKraMap Table//

  public GetStaffKraDetails(details: any) {
    debugger;
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: (data) => {
        debugger;
        this.Staffkra = data.filter((x) => x.staffName == details.staffid);
      },
      error: (err) => {
        Swal.fire('Issue in Getting EmployeeKraMap');
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

  
    //Method to Displaying the Data from GetAppraisalCycle Table//

  public GetApprisalcycle(event: any) {
    debugger;
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == event.target.value);
        this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
        this.appraisalCycleName = temp[0].appraisalCycleName;
        this.sDate = temp[0].cycleStartDate;
        this.eDate = temp[0].cycleEndDate;
      },
      error: (err) => {
        Swal.fire('Issue in Getting AppraisalCycle');
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

  
    //Method to Displaying the Data from GetConductappraisalStaffList Table//

  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (data) => {
        debugger;
        this.EmployeeKradash = data.filter(
          (x) =>
            x.appraisalCycleName == this.appraisalCycleName &&
            x.approver1 == this.staffID &&
            x.selfScores != null &&
            x.employeeSubmittedDate != null
        );
        // &&
      },
      error: (err) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
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

      //Method to Displaying the Data from GetMyDetailsForReiewRating Table/

  public getstaffid(event: any) {
    debugger;
    this.staffid = event.id;

    this.PerformanceManagementService.GetMyDetailsForReiewRating().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == this.staffid);
        this.currentlevel = temp[0].level;
        this.BaseSal = temp[0].baseSal;
      },
      error: (err) => {
        Swal.fire('Issue in Getting MyDetailsForReiewRating');
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


    //Method to Candidate Apprasial Data form  UpdateStaffReviewRating Table//

  public approve() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Approve it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          SatffID: this.staffid,
          RecommendedBonusAmountOrPercent: this.RecommendedBonusAmountOrPercent,
          RecommendedSalaryIncreaseOrPercent:
            this.RecommendedSalaryIncreaseOrPercent,
          Level: this.newlevel,
          Type: this.role,
        };
        debugger;
        this.PerformanceManagementService.UpdateStaffReviewRating(
          entity
        ).subscribe((data) => {
          debugger;
          Swal.fire('Approved Successfully');
          location.reload();
        });
      }
    });
  }

  //Method to Candidate Salary Increment Data form  UpdateSalaryIncrementByHR Table//

  public approveforIncrement() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Approve it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          SatffID: this.staffid,
        };

        this.PerformanceManagementService.UpdateSalaryIncrementByHR(
          entity
        ).subscribe((data) => {
          debugger;
          Swal.fire('Approved Successfully');
          location.reload();
        });
      }
    });
  }
}
