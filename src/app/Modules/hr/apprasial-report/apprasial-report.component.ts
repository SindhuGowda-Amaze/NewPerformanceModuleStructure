//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to Filter, get Appraisal Repot via ConductappraisalStaffList SP
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-apprasial-report',
  templateUrl: './apprasial-report.component.html',
  styleUrls: ['./apprasial-report.component.css']
})
export class ApprasialReportComponent implements OnInit {
  StaffAppraisalListInprogress: any;
  finalize: any;
  //Variable Declerations//
  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  count: any;
  roleTypeList: any;
  roleTypeid: any;
  manager: any;
  managerList: any;
  StaffAppraisalList: any;
  search: any;
  dumpmanagerList: any;
  uniquelist: any;
  StaffID: any;
  roleid: any;
  employee: any;
  rolelist: any;
  rolelistCopy: any;
  p: any = 1;
  departmentAppraisalList: any;
  departmentid: any;
  count1: any = 10;
  currentUrl: any;
  viewMode = 'tab1';

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.StaffID = sessionStorage.getItem('EmaployedID')
    this.roleid = sessionStorage.getItem('roleid');
    this.departmentid = 0;
    this.GetDepartment();
    this.GetRoleType();
    this.GetMyDetails();
    this.ConductappraisalStaffList();
    this.manager = 0;
    this.dumpmanagerList = 0;
  }

  //Method to get RoleID//
  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
  }

  //Method to Get Role Type Details//
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

  //Change Method to get Manager//
  getManager(even: any) {
    this.manager = even.target.value;
  }


  //Change Method to get Department//
  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
  }

  //Method to Filter by Department
  public GetFilteredDepartment() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.StaffAppraisalList = data.filter(x => x.department == this.departmentid)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Conduct appraisal StaffList');
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
  public GetDepartment() {
    this.PerformanceManagementService.GetDepartmentMaster().subscribe({
      next: data => {
        debugger
        this.departmentAppraisalList = data;
        console.log("departmentName", this.departmentAppraisalList);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Department Master');
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
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.managerList = data.filter(x => (x.supervisor == null || x.supervisor != null) && x.role == 'Manager')     // 10422 HR is taken as manager for all managers 
        const key = 'manager';
        const key1 = 'month'
        this.uniquelist = [...new Map(this.managerList.map((item: { [x: string]: any; }) =>

          [(item[key]), item])).values()]
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

  StaffAppraisalListFinalized:any;
  //Method to get Employee Appraisal Details for HR and Manager//
  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: res => {
        debugger
     
        if (this.roleid == 3) {
          this.StaffAppraisalList = res;
        
          this.StaffAppraisalListInprogress = this.StaffAppraisalList.filter((x: { finalize:any; }) =>  x.finalize ==null)
          this.StaffAppraisalListFinalized = this.StaffAppraisalList.filter((x: { finalize:any; }) =>  x.finalize ==1)
        
        }
        else if (this.roleid == 4) {
          this.StaffAppraisalList = res;
          this.dumpmanagerList = this.StaffAppraisalList
          //  this.StaffAppraisalList = this.dumpmanagerList.filter((x: { cioScores: null;approver1:any }) => x.cioScores != null && x.approver1==this.StaffID)
          this.StaffAppraisalList = this.dumpmanagerList.filter((x: { approver1: any; finalize:any; }) => x.approver1 == this.StaffID && x.finalize !=1)
          this.StaffAppraisalListFinalized = this.dumpmanagerList.filter((x: { approver1: any; finalize:any; }) => x.approver1 == this.StaffID && x.finalize ==1)
        }
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Conduct appraisal StaffList');
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

  //Method Exprt to Excel//

  fileName = 'Adjustment Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


  //Method to Filter by RoleType//
  public GetFilteredRoleType() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.StaffAppraisalList = data.filter(x => x.type == this.roleTypeid)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Conduct appraisal StaffList');
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


  //Method to Filter by Manager//
  public GetFilteredManager() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.StaffAppraisalList = data.filter(x => x.managername == this.manager)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Conduct appraisal StaffList');
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


  //Method to Search By Employee Name//
  public FilterBySearch() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.StaffAppraisalList = this.dumpmanagerList.filter((x: { name: string }) => x.name.toLowerCase().includes(searchCopy));
    this.count = this.StaffAppraisalList.length;
  }
}

function x(x: any, manager: any): any {
  throw new Error('Function not implemented.');
}

