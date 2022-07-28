import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-sburattingdash',
  templateUrl: './sburattingdash.component.html',
  styleUrls: ['./sburattingdash.component.css']
})
export class SburattingdashComponent implements OnInit {
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
  appraisalCycleName: any
  staffID: any;
  roleid: any;
  EmployeeKradash: any;
  currentUrl: any;
  level: any;
  Staffkra: any;
  name:any


  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  ngOnInit(): void {

     
   this.GetMyDetails();
   this.GetDepartment();
   this.GetConductappraisalStaffList();
   this.GetAppraisalCycle();

   this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.roleid = sessionStorage.getItem('roleid');
    this.appraisalCycleName = 0;
    this.name = 0;
    this.Department = "";
    this.RoleType = "";
   
  }

  public GetMyDetails(){

    this.PerformanceManagementService.GetMyDetails()
    
    
.subscribe({
  next: data => {
    debugger
    this.stafflist = data;
    this.stafflistCopy = this.stafflist

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

  public GetConductappraisalStaffList(){
   
    this.PerformanceManagementService.GetConductappraisalStaffList()
    
.subscribe({
  next: data => {
    debugger
    if (this.roleid == 4) {
      this.EmployeeKradash = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null);
      this.count = this.EmployeeKradash.length;
    }
    else if (this.roleid == 5) {
      this.EmployeeKradash = data.filter(x => x.approver3 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null && x.managerSubmittedDate!=null);
      this.count = this.EmployeeKradash.length;
    }

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




  public GetAppraisalCycle(){

    this.PerformanceManagementService.GetAppraisalCycle()
    
    
.subscribe({
  next: data => {
    debugger
    this.Apprisalcyclelist = data;
  }, error: (err) => {
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





  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails()
    
    
.subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x => x.roleType == this.RoleType);
    this.count1 = this.stafflist.length;
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

  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails()
    
.subscribe({
  next: data => {
    debugger
    this.stafflist = data.filter(x => x.department == this.Department);
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

  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap()
    
    
.subscribe({
  next: data => {
    debugger
    this.Staffkra = data.filter(x => x.staffName == details.staffid);
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

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle()
    
    
.subscribe({
  next: data => {
    debugger
    let temp: any = data.filter(x => x.id == event.target.value);
    this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
    this.appraisalCycleName = temp[0].appraisalCycleName
    this.sDate = temp[0].cycleStartDate;
    this.eDate = temp[0].cycleEndDate;
  }, error: (err) => {
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

  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList()
    
.subscribe({
  next: data => {
    debugger
    this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1 == this.staffID && x.selfScores != null && x.employeeSubmittedDate != null)
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


  public getlevel(event: any) {
    debugger
    this.level = event;

    this.PerformanceManagementService.GetMyDetails()
    
.subscribe({
  next: data => {
    debugger
    let temp: any = data.filter(x => x.id == event.id);
    let levelid: any = temp[0].levelid;

    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.levelid <= levelid)


    });
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

  approve(){
    Swal.fire('Successfully Approved')
  }

}


