//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to Filter by role,appraisal cycle,Department, Conduct Apraisal by HR
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr-dash',
  templateUrl: './hr-dash.component.html',
  styleUrls: ['./hr-dash.component.css']
})
export class HrDashComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //Variable Declerations//
  viewMode = 'tab2';
  Staffkra: any;
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  departmentList: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search: any;
  Apprisalcyclelist: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  appraisalCycleName: any
  departmentid: any
  roleTypeid: any;
  roleTypeList: any;
  EmployeeKradash: any
  status: any;
  currentUrl: any

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.currentUrl = window.location.href;

    this.departmentid = 0;
    this.roleTypeid = "";
    this.status = 0;
    this.appraisalCycleName = 0;

    this.GetRoleType();
    this.getDepartment();
    this.GetMyDetails();
    this.GetAppraisalCycle();
    this.GetConductappraisalStaffList();
  }


  //Method to get Role Details//
  public GetRoleType() {

    this.PerformanceManagementService.GetRoleType().subscribe({
      next: data => {
        debugger
        this.roleTypeList = data;
        console.log("type", this.roleTypeList);
        this.roleTypeid = 0;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting RoleType');
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
  //Method to get Department Details//
  public getDepartment() {
    this.PerformanceManagementService.GetDepartmentMaster().subscribe({
      next: data => {
        debugger
        this.departmentList = data;
        console.log("departmentName", this.departmentList);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting DepartmentMaster');
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
  //Method to get Staff Details//
  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data;
        this.stafflistCopy = this.stafflist
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting MyDetails');
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
  //Method to get Appraisal Cycle Details//
  public GetAppraisalCycle() {

    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.Apprisalcyclelist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting AppraisalCycle');
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

  EmployeeKradash2: any;
  EmployeeKradashAccepted:any;
  EmployeeKradashSubmitted:any;
  EmployeeKradashCompleted:any;
  //Method to get Employee Appraisal Details//
  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores == null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate == null && x.managerSubmittedDate == null && x.sbuSubmittedDate == null && x.hrSubmittedDate == null  && x.employeeacceptgoal!=1);

        this.EmployeeKradashAccepted = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null &&( x.sbuSubmittedDate != null||x.includeSBURating==true) && x.hrSubmittedDate == null && x.employeeacceptgoal==1);
        this.count = this.EmployeeKradash.length;

        this.EmployeeKradashSubmitted = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && ( x.sbuSubmittedDate != null||x.includeSBURating==true) && x.hrSubmittedDate != null&& x.finalize==null);
        this.count = this.EmployeeKradash.length;

        this.EmployeeKradashCompleted = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null &&( x.sbuSubmittedDate != null||x.includeSBURating==true) && x.hrSubmittedDate != null &&x.finalize==1);
        this.count = this.EmployeeKradash.length;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
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


  //method to get Role ID//
  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
  }

  //Method to filter by Role//
  public GetFilteredRoleType() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.type == this.roleTypeid && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
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

  //method to get Departmnet ID//
  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
    this.GetFilteredDepartment();
  }

  //Method to filter by Department//
  public GetFilteredDepartment() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.department == this.departmentid && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
          && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ConductappraisalStaffList');
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


  //Method to get Employee goal Setting Details//
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: data => {
        debugger
        this.Staffkra = data.filter(x => x.staffName == details.staffid);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting EmployeeKraMap');
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

  //Method to get Apprasal Cycle Detals//
  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.id == event.target.value);
        this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
        this.appraisalCycleName = temp[0].appraisalCycleName
        this.sDate = temp[0].cycleStartDate;
        this.eDate = temp[0].cycleEndDate;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting AppraisalCycle');
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

  //Method to filter by Goal/Rating Status//
  public statuschange(event: any) {
    if (event.target.value == 'Open') {
      debugger
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: data => {
          debugger
          this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
            && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null && x.hrSubmittedDate == null);
          this.count = this.EmployeeKradash.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Geting tConductappraisalStaffList');
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
    else {
      debugger
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: data => {
          debugger
          this.EmployeeKradash = data.filter(x => x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
            && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null);
          this.count = this.EmployeeKradash.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting ConductappraisalStaffList');
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


  //Method to filter by Appraisal Cycle//
  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList()
      .subscribe({
        next: data => {
          debugger
          this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver2 == sessionStorage.getItem('EmaployedID') && x.selfScores != null
            && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null)
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting ConductappraisalStaffList');
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

  public FinalizeAppraisal(id:any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Finalize the Rating.You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Finalize it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
       
       
          this.PerformanceManagementService.UpdateFinalizeRating(id).subscribe({
            next: data => {
              debugger
              Swal.fire('Finalised Rating Successfully!!')
              location.reload();
            }, error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in Updating Finalize Rating');
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
