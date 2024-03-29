//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to get staff, Conducted Appraisal and counts
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  departmentList: any;
  departmentid: any;
  list4: any;
  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //Variable Declerations//
  countList: any;
  StaffID: any;
  EmployeeKradash: any;
  count: any;
  employeSubmissionDate: any;
  managerSubmittedCount: any;
  sbuSubmittedCount: any;
  hrSubmittedCount: any;
  totalAppraisalCount: any;
  hrSubmittedlist: any;
  totalAppraisalList: any;
  employeCount: any;
  managagerScore: any;
  currentUrl: any
  sbuid:any;
  ngOnInit(): void {
    debugger
    //Variable Initialisation and Default Method Calls//
    this.currentUrl = window.location.href;
    this.GetAllCounts();
    this.StaffID = sessionStorage.getItem('EmaployedID');

    this.GetMyDetails();
    this.GetConductappraisalStaffList();

    this.getDepartment();
    this.departmentid = "0"
this.sbuid="0"
  }

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

  //Method to Conducted Appraisal Details//
  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data;
        this.count = this.EmployeeKradash.length;
        debugger
        var list = data.filter(x => x.employeeSubmittedDate != null && x.selfScores != null &&
          x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null)
        this.employeSubmissionDate = list.length;

        var list1 = data.filter(x => x.managerSubmittedDate != null);
        this.managerSubmittedCount = list1.length;

        var sbuSubmittedlist = data.filter(x => x.sbuSubmittedDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null);
        this.sbuSubmittedCount = sbuSubmittedlist.length;

        this.hrSubmittedlist = data.filter(x => x.hrSubmittedDate == null && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null);
        console.log("data", data)
        console.log("hr", this.hrSubmittedlist)
        this.hrSubmittedCount = this.hrSubmittedlist.length


        this.totalAppraisalList = data.filter((x: { cioScores: any; managerSubmittedDate: any; employeeSubmittedDate: any }) => x.cioScores != null && x.managerSubmittedDate != null && x.employeeSubmittedDate != null)
        this.totalAppraisalCount = this.totalAppraisalList.length;

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

  //Method to get staff Details//
  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        var list3 = data;
        this.list4 = data.filter(x=>x.type==3742);
        this.employeCount = list3.length
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


  //Method to get All Counts//
  public GetAllCounts() {
    debugger
    if (this.StaffID == undefined) {
      this.PerformanceManagementService.GetAllCounts(1, 1).subscribe({
        next: data => {
          debugger
          this.countList = data[0];
        }, error: (err: { error: { message: any; }; }) => {
          //Swal.fire('Issue in Getting AllCounts');
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
      this.PerformanceManagementService.GetAllCounts(2, this.StaffID).subscribe({
        next: data => {
          debugger
          this.countList = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting AllCounts');
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
}
