//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get data from GetMyDetails,GetDepartment,GetConductappraisalStaffList,GetAppraisalCycle,GetKraMaster,GetStaffKraDetails in open Window 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-managerratingdash',
  templateUrl: './managerratingdash.component.html',
  styleUrls: ['./managerratingdash.component.css']
})
export class ManagerratingdashComponent implements OnInit {
  Approver1: any;
  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //variable Declaration 
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  viewMode = 'tab1';

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
  EmployeeKradash: any
  currentUrl: any
  Staffkra: any;
  loginName:any;

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.GetMyDetails();
    this.GetDepartment();
    this.GetConductappraisalStaffList();
    this.GetAppraisalCycle();
    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('EmaployedID');
    this.appraisalCycleName = 0;
    this.Department = "";
    this.RoleType = "";
    this.loginName = sessionStorage.getItem('loginName');
  }
  //Method to get stafflist,stafflistCopy from Mydetails table
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

  //Method to get Departmentlist from Department table
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
  EmployeeKradash2:any
  EmployeeKradashAccepted:any;
  EmployeeKradashSubmitted:any;
  EmployeeKradashCompleted:any;
  //Method to get ConductappraisalStaffList from ConductappraisalStaffList table
  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null && x.managerSubmittedDate==null && x.employeeacceptgoal!=1);
        this.EmployeeKradashAccepted = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null && x.managerSubmittedDate==null && x.employeeacceptgoal==1);
        this.EmployeeKradashSubmitted = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null && x.managerSubmittedDate!=null);
        this.EmployeeKradashCompleted = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate != null && x.managerSubmittedDate!=null  && x.hrSubmittedDate != null);

     
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

  //Method to get AppraisalCycle from AppraisalCycle table
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

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }
  //Method to FilterRoleType in MyDetails table
  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.roleType == this.RoleType);
        this.count1 = this.stafflist.length;
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
  //Method to filterByDepartment in MyDetails table
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

  //Method to get StaffKraDetails from EmployeeKraMap Table
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: data => {
        debugger
        this.Staffkra = data.filter(x => x.staffName == details.staffid);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GettingEmployeeKraMap');
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
  //Method to get AppraisalCycle from AppraisalCycle table
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
  //Method to FilteredAppraisalCycle from ConductappraisalStaffList Table
  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1 == this.staffID && x.selfScores != null && x.employeeSubmittedDate != null)

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




  public accept(id: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Accept it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.UpdateEmployeeAcceptGoal(id)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Accepted Successfully')

            this.PerformanceManagementService.GetMyDetails().subscribe(data => {
              debugger
              let temp: any = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID'));
              this.Approver1 = temp[0].supervisor;
            });
            
            this.InsertNotification();
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Accept Goal');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )}
        })
      }
    })
  }

  

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message':"Your Manager" + this.loginName+'Accepted Goal!!',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.Approver1,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {
      }
    })
  }
}
