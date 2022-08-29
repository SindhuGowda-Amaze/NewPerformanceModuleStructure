
//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying the Data from GetMyDetails & GetDepartment,Displaying the Data from GetConductappraisalStaffList, Displaying the Count.
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Manikanta, Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-apprasail',
  templateUrl: './my-apprasail.component.html',
  styleUrls: ['./my-apprasail.component.css']
})
export class MyApprasailComponent implements OnInit {

 // variables decleartions//

  stafflist: any;
  term: any;
  p: any = 1;
  Staffkra: any;
  count1: any = 10;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search:any;
  EmployeeKradash: any
  roleid:any; 
  currentUrl: any;

  constructor(private PerformanceManagementService: PerformancemanagementService) { }


  ngOnInit(): void {

      //Variable Initialisation and Default Method Calls//

 
    this.GetMyDetails();
    this.GetDepartment();
    this.GetConductappraisalStaffList();

    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roleid');
  
  

 
  }


 //Method to Displaying the Data & Count from GetMyDetails Table//

 public GetMyDetails(){

  this.PerformanceManagementService.GetMyDetails()
  
.subscribe({
  next: data => {
    debugger
    this.stafflist = data;
    this.stafflistCopy = this.stafflist
    this.count = this.stafflist.length;
  }, error: (err) => {
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

   //Method to Displaying the Data from GetDepartment Table//

  public GetDepartment(){

    this.PerformanceManagementService.GetDepartment()
    
    
.subscribe({
  next: data => {
    debugger
    this.Departmentlist = data;
  }, error: (err) => {
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

  //Method to Displaying the Data from GetConductappraisalStaffList Table//

  public GetConductappraisalStaffList(){
    this.PerformanceManagementService.GetConductappraisalStaffList()
.subscribe({
  next: data => {
    debugger
      this.EmployeeKradash = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID'));
  }, error: (err) => {
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



  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  //Method to Displaying the Data from GetMyDetails Table//

  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails()
    
    
.subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x => x.roleType == this.RoleType);
    this.count = this.stafflist.length;
  }, error: (err) => {
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

    //Method to Displaying the Data from GetMyDetails Table//

  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails()
    
    
.subscribe({
  next: data => {
    debugger
      this.stafflist = data.filter(x => x.department == this.Department);
      this.count = this.stafflist.length;
  }, error: (err) => {
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

  
    //Method to Displaying the Data from GetEmployeeKraMap Table//
    
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap()
    
    
.subscribe({
  next: data => {
    debugger
    this.Staffkra = data.filter(x => x.staffName == details.staffid);
    this.count = this.Staffkra.length;
  }, error: (err) => {
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


}


