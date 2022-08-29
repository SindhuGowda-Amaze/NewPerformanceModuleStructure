import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-appraisal',
  templateUrl: './view-appraisal.component.html',
  styleUrls: ['./view-appraisal.component.css']
})
export class ViewAppraisalComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //variable declaration
  kpiid: any;
  ID: any;
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
  kratypelist: any;
  kraid: any;
  indicatorlist: any;
  dummindicatorlist: any;
  StaffID: any;
  search: any;
  EmployeeKradash: any
  Apprisalcyclelist: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  appraisalCycleName: any
  kratypeid: any;
  dropdownList1: any;
  GoalTypelist: any;
  kpilist: any;
  kpitypelist: any;
  currentUrl: any
  Staffkra: any; 
  DepartmentList:any;
  DeptID:any;
  roleid:any;
  staffid:any;
  ngOnInit(): void {
    this.appraisalCycleName=0;
    this.DeptID=0;
    this.staffid=0
    this.roleid = sessionStorage.getItem('roleid');
    this.StaffID = sessionStorage.getItem('EmaployedID');
    this.GetAppraisalCycle();
    this.GetConductappraisalStaffList();
    this.GetDepartment();
    this.GetMyDetails();

    this.PerformanceManagementService.GetEmployeeKraMap()

    .subscribe({
      next: data => {
        debugger
        this.Staffkra = data.filter(x => x.kpiName != null);

      }, error: (err: { error: { message: any; }; }) => {
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

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        // this.EmployeeKradash = data.filter(x => x.appraiselID == details.appraiselID);
        this.EmployeeKradash = data
        this.count = this.EmployeeKradash.length;
        console.log("list", this.EmployeeKradash);
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

    public GetFilteredStaffID(event:any){
      this.PerformanceManagementService.GetEmployeeKraMap()

      .subscribe({
        next: data => {
          debugger
          this.Staffkra = data.filter(x => x.staffName==event.target.value);
  
        }, error: (err: { error: { message: any; }; }) => {
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

//Method to get AppraisalCycle from AppraisalCycle table
public GetDepartment() {
  debugger
  this.PerformanceManagementService.GetDepartmentMaster().subscribe({
    next: data => {
      debugger
     
      this.DepartmentList = data

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

public GetFilteredDeptID(){
  this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
    next: data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1 == this.StaffID)

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

 //Method to get data FilteredAppraisalCycle from AppraisalCycle table
 public GetFilteredAppraisalCycle(event:any) {
  this.appraisalCycleName=event.target.value;
  this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
    next: data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1 == this.StaffID)

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
public GetAppraisalCycle(){
  this.PerformanceManagementService.GetAppraisalCycle().subscribe({
    next: data => {
      debugger
      this.Apprisalcyclelist = data.filter(x => x.appraisalClose != 1);

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

//Method to get ConductappraisalStaffList from ConductappraisalStaffList table
public GetConductappraisalStaffList(){
  this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
    next: data => {
      debugger
      this.EmployeeKradash = data
      this.count = this.EmployeeKradash.length;
      console.log("list", this.EmployeeKradash);
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
