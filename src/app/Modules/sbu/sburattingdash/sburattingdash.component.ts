//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying the Data from GetMyDetails ,Displaying the Count & Satff Details from GetDepartment, Displaying the Data from GetConductappraisalStaffList,Insert the Data from StaffScoresBySBU,Attchemnt files  from ProjectAttachments.
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav,Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sburattingdash',
  templateUrl: './sburattingdash.component.html',
  styleUrls: ['./sburattingdash.component.css'],
})
export class SburattingdashComponent implements OnInit {
  // variables decleartions//
  stafflist: any;
  viewMode = 'tab1';
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
  roleid: any;
  EmployeeKradash: any;
  currentUrl: any;
  level: any;
  Staffkra: any;
  name: any;
  EmployeeKradash2: any;
  Successor: any;

  constructor(
    private PerformanceManagementService: PerformancemanagementService,private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.GetMyDetails();
    this.GetDepartment();
    this.GetConductappraisalStaffList();
    this.GetAppraisalCycle();
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetMyDetails();
        
      }
    })
    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.roleid = sessionStorage.getItem('roleid');
    this.appraisalCycleName = 0;
    this.name = 0;
    this.Department = '';
    this.RoleType = '';
  }

  //Method to Displaying the Data from GetMyDetails Table//

  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails().subscribe({
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

  //Method to Displaying the Data from GetDepartment Table/

  public GetDepartment() {
    this.PerformanceManagementService.GetDepartment().subscribe({
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

  //Method to Displaying the Data from GetConductappraisalStaffList Table//

  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {
          this.EmployeeKradash = data.filter(
            (x) =>
              x.approver1 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null  
          );
          this.EmployeeKradash2 = data.filter(
            (x) =>
              x.approver1 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null&&x.sbuSubmittedDate!=null
          );
          this.count = this.EmployeeKradash.length;
        }
         else if (this.roleid == 5) {
          this.EmployeeKradash = data.filter(
            (x) =>
              x.approver3 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null  && x.managerSubmittedDate!=null
          );
          this.EmployeeKradash2 = data.filter(
            (x) =>
              x.approver3 == sessionStorage.getItem('EmaployedID') &&
              x.selfScores != null &&
              x.employeeSubmittedDate != null&&x.sbuSubmittedDate!=null&&x.filnalize==1
          );
          this.count = this.EmployeeKradash.length;
        }
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

  //Method to Displaying the Data from GetAppraisalCycle Table//

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

  //Method to Displaying the Data from GetMyDetails Table//

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
  //Method to Displaying the Data & count from GetMyDetails Table//

  public filterByDepartment() {
    debugger;
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.department == this.Department);
        this.count = this.stafflist.length;
      },
      error: (err) => {
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

  //Method to Displaying the Data & count from GetEmployeeKraMap Table//

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
  //Method to Displaying the Data from GetMyDetails Table//
  staffid12:any;
  public getstaffid(event: any) {
    debugger;
    this.staffid12 = event.staffid;

    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == event.id);
        let levelid: any = temp[0].levelid;

        this.PerformanceManagementService.GetMyDetails().subscribe((data) => {
          debugger;
          this.stafflist = data.filter((x) => x.levelid <= levelid);
        });
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

  // approve() {
  //   Swal.fire('Successfully Approved');
  // }
  id:any;
  comment:any;
  approve() {
    debugger
    var json = {
      "ID": this.staffid12,
      "SuccessorName": this.name,
      "SuccessorComment": this.comment
    };
    this.PerformanceManagementService.UpdateSuccessor(json).subscribe({
      next: data => {
        debugger
        Swal.fire('Successfully Approved');
        location.href = "#/sbu/Sburattingdash"
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating Successor');
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
