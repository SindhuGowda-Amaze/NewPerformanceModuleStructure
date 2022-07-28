
//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get data from Job_Requirements Table,get data from ClientStaff Table,get list of Selected Candidates from CandidateRegistration,search data by JobTitle,Get SlotsMaster Staff Details,Update CandidateInterviewSchedule,Open Pdf in new Window.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-tile-dashboard',
  templateUrl: './employee-tile-dashboard.component.html',
  styleUrls: ['./employee-tile-dashboard.component.css']
})
export class EmployeeTileDashboardComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //Variable Declerations//
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
  ResultAreaList: any;
  HrSubmittedDate: any;
  CycleEndDate: any;
  EmployeeKradash: any
  ManagerSubmittedDate: any
  EmployeeSubmittedDate: any
  AppraisalSubmitionDate: any;
  appraisallist: any;
  GoalSettingDate: any;
  SbuSubmittedDate: any;
  currentUrl: any
  Staffkra: any;
  CycleStartDate: any;

  ngOnInit(): void {

    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.GetMyDetails();
    this.GetDepartment();
    this.GetConductappraisalStaffList();
    this.GetKRAByStaffID();
    this.GetAppraisalCycle();
  }

  //Method to get Staff Details from Staff Table//
  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data;
        this.stafflistCopy = this.stafflist
        this.count = this.stafflist.length;
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

  //Method to get Department Details from DepartmentMaster Table//
  public GetDepartment() {
    this.PerformanceManagementService.GetDepartment().subscribe({
      next: data => {
        debugger
        this.Departmentlist = data;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Department');
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

public GetConductappraisalStaffList(){
  this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
    next: data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID'));

    }, error: (err: { error: { message: any; }; }) => {
      Swal.fire('Issue in Getting Conductappraisal StaffList');
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

 //Method to get KRA Details for prefilling from KRAByStaffID Table//
public GetKRAByStaffID(){
  this.PerformanceManagementService.GetKRAByStaffID(sessionStorage.getItem('EmaployedID')).subscribe({
    next: data => {
      debugger
      this.ResultAreaList = data;
      this.CycleStartDate = this.ResultAreaList[0].cycleStartDate
      this.CycleEndDate = this.ResultAreaList[0].cycleEndDate
      this.ManagerSubmittedDate = this.ResultAreaList[0].managerSubmittedDate
      this.HrSubmittedDate = this.ResultAreaList[0].hrSubmittedDate
      this.EmployeeSubmittedDate = this.ResultAreaList[0].employeeSubmittedDate
      this.SbuSubmittedDate = this.ResultAreaList[0].sbuSubmittedDate

      this.AppraisalSubmitionDate = this.ResultAreaList[0].appraisalSubmitionDate
    }, error: (err: { error: { message: any; }; }) => {
      Swal.fire('Issue in Getting KRABy StaffID');
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

  //Method to get Appraisal Cycle Details from AppraisalCycle Table//
public GetAppraisalCycle(){
  this.PerformanceManagementService.GetAppraisalCycle().subscribe({
    next: data => {
      debugger
      this.appraisallist = data;
      this.GoalSettingDate = this.appraisallist[0].goalSettingDate
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

  //Chenge Method to get Role ID Details from RoleType Table//
  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  //Method to filter by Role//
  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.roleType == this.RoleType);
        this.count = this.stafflist.length;
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

  //Method to filter by Department//
  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.department == this.Department);
        this.count = this.stafflist.length;
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

  //Method to get Goal Setting Details//
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: data => {
        debugger
        this.Staffkra = data.filter(x => x.staffName == details.staffid);
        this.count = this.Staffkra.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Employee KraMap');
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
