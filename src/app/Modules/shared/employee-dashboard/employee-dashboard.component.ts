//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying the Data from GetMyDetails & GetDepartment,Displaying the Data from GetRoleType, Displaying the Count.
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Manikanta, Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  // variables decleartions//

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
  dumpstafflist: any;
  roleid: any;
  StaffID: any;
  currentUrl: any;

  constructor(
    private PerformanceManagementService: PerformancemanagementService
  ) {}

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//

    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.StaffID = sessionStorage.getItem('EmaployedID');
    this.Department = '';
    this.RoleType = '';

    this.GetMyDetails();
    this.GetDepartment();
    this.FilterRoleType();
    this.Filterstaff();
    // this.filterByDepartment();
  }

  //Method to Displaying the Data from GetMyDetails Table//
  public GetMyDetails() {
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
    
        if(this.roleid==4){
          this.stafflist = data.filter(x=>x.supervisor==this.StaffID)
        }
        else{
          this.stafflist = data;
        }
        // this.dumpstafflist = data;
        // this.stafflistCopy = this.stafflist;
        this.Department = this.stafflistCopy;

        // if (this.roleid != 3) {
        //   this.stafflist = this.dumpstafflist.filter(
        //     (x: { supervisor: any; department_name: any }) =>
        //       x.supervisor == this.StaffID
        //   );
        //   console.log('stafflist', this.stafflist);
        // } else {
        //   this.stafflist = this.dumpstafflist;
        //   console.log('stafflist', this.stafflist);
        // }

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

  //Method to Displaying the Data from GetDepartment Table//

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
  //Method to Displaying the Data from GetRoleType Table//

  public GetRoleType() {
    this.PerformanceManagementService.GetRoleType().subscribe({
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
        // this.stafflist = data.filter(x=>x.roleType==this.RoleType);

        this.stafflist = this.dumpstafflist;
        console.log('stafflist', this.stafflist);
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

  // public filterByDepartment(){
  //   debugger
  //   this.PerformanceManagementService.GetMyDetails().subscribe(data => {
  //     debugger
  //     this.stafflist = data.filter(x=>x.department==this.Department);
  //     this.count = this.stafflist.length;
  //   });

  // }

  //Method to Displaying the Count//

  public Filterstaff() {
    debugger;
    let searchCopy = this.term.toLowerCase();
    this.stafflist = this.stafflistCopy.filter(
      (x: { name: string; supervisor: number }) =>
        x.name.toLowerCase().includes(searchCopy) &&
        x.supervisor == this.StaffID
    );
    this.count = this.stafflist.length;
  }
}
