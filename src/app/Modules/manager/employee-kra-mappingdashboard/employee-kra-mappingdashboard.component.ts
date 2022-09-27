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
  selector: 'app-employee-kra-mappingdashboard',
  templateUrl: './employee-kra-mappingdashboard.component.html',
  styleUrls: ['./employee-kra-mappingdashboard.component.css']
})
export class EmployeeKraMappingdashboardComponent implements OnInit {
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

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.GetMyDetails();
    this.GetDepartment()
    this.GetConductappraisalStaffList()
    this.GetAppraisalCycle()
    this.GetKraMaster()
    this.GetKPI()
    this.currentUrl = window.location.href;
    this.kraid = "";
    this.StaffID = sessionStorage.getItem('EmaployedID');
    this.GetKPI1()
    this.StaffID = sessionStorage.getItem('EmaployedID')
    this.kraid = "";
    this.GetKeyResultArea();
    this.kratypeid = "";
    this.Department = "";
    this.RoleType = "";
    this.appraisalCycleName = 0;

  }
//Method to get stafflist,stafflistCopy from Mydetails table
  public GetMyDetails(){
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
  public GetDepartment(){
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

//Method to get ConductappraisalStaffList from ConductappraisalStaffList table
  public GetConductappraisalStaffList(){
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.EmployeeKradash = data.filter(x => x.approver1 == this.StaffID);
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

  public GetKraMaster(){
    this.PerformanceManagementService.GetKraMaster().subscribe({
      next: data => {
        debugger
        this.GoalTypelist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KraMaster');
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

  public GetKPI(){

    this.PerformanceManagementService.GetKPI().subscribe({
      next: data => {
        debugger
        this.indicatorlist = data;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KPI');
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



  

  getkpiid(event: any) {
    this.kpiid = event.target.value;


  }


  public GetKPI1() {
    debugger
    this.PerformanceManagementService.GetKPI().subscribe({
      next: data => {
        debugger
        this.indicatorlist = data;
        this.dummindicatorlist = data;
        this.count = this.indicatorlist.length;
        console.log("kpilist", this.indicatorlist);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KPI');
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
//Method Filter RoleType in MyDetails Table
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
//Method filter ByDepartment in MyDetails Table
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
  EmployeeKradashAccepted:any;
 //Method to get StaffKraDetails from EmployeeKraMap Table
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap()

      .subscribe({
        next: data => {
          debugger
          this.Staffkra = data.filter(x => x.kpiName != null && x.staffName == details.staffid);
          // this.EmployeeKradashAccepted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID')&& x.employeeSubmittedDate != null && x.employeeacceptgoal==1);

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


//Method to get keyResultArea from KeyResultArea
  public GetKeyResultArea() {
    debugger
    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.kratypelist = data.filter(x => x.kraTypeID == this.kratypeid);
        console.log("kratype", this.kratypelist);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KeyResultArea');
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


  getkraid(even: any) {
    debugger
    this.kraid = even.target.value;
    debugger
    if (even.target.value != 0) {
      this.indicatorlist = this.dummindicatorlist.filter((x: { kraName: any; }) => x.kraName == this.kraid);
      this.count = this.indicatorlist.length;
    }
    else {
      this.GetKPI();
    }
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
  //Method to get data FilteredAppraisalCycle from AppraisalCycle table
  public GetFilteredAppraisalCycle() {
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
//Method to edit data in KeyResultArea Table
  edit(details: any) {
    debugger
    this.kraid = details.kraid;
    this.kpiid = details.kpiid;
    this.kratypeid = details.kraTypeID
    this.ID = details.id;
    this.GetKPI();
    this.GetKeyResultArea();
    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.kratypelist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KeyResultArea');
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
    this.PerformanceManagementService.GetKPI().subscribe({
      next: data => {
        debugger
        this.kpitypelist = data.filter(x => x.kraFilterid == this.kraid);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KPI');
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

  public delete(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.DeleteEmployeeKraMap(ID).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.GetKeyResultArea();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Deleting KeyResultArea');
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

//Method to update data in kranew
  update() {
    debugger
    var entity = {
      "ID": this.ID,
      "kraid": this.kraid,
      "kpiid": this.kpiid
    }
    this.PerformanceManagementService.Updatekranew(entity)
      .subscribe(
        data => {
        }
      )

    Swal.fire("Updated Successfully");
  }


  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value;
    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.kratypelist = data.filter(x => x.kraTypeID == this.kratypeid);
        console.log("kratype", this.kratypelist);
      }, error: (err) => {
        Swal.fire('Issue in Getting KeyResultArea');
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


  getgoaltype(event: any) {
    debugger
    this.kraid = event.target.value;
    debugger
    this.PerformanceManagementService.GetKPI().subscribe({
      next: data => {
        debugger
        this.kpitypelist = data.filter(x => x.kraFilterid == this.kraid);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KPI');
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