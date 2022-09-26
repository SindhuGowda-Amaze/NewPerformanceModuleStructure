//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Code to Filter by role,appraisal cycle,Department, update bellcurve score
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bell-curve-fitting',
  templateUrl: './bell-curve-fitting.component.html',
  styleUrls: ['./bell-curve-fitting.component.css']
})
export class BellCurveFittingComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService, public router: Router) { }
  //Variable Declerations//
  search: any;
  StaffTypelist: any;
  YearID: any;
  StaffID: any;
  UserID: any;
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  roleTypeid: any;
  roleTypeList: any;
  manager: any;
  managerList: any;
  count: any;
  uniquelist: any;
  dumpmanagerList: any;
  roleid: any;
  list: any;
  Score: any;
  SelfComments: any;
  StaffAppraisalList: any;
  FilteredStaffAppraisalList: any;
  Stafflist: any
  StaffType: any;
  StaffTypeID: any;
  departmentid: any;
  departmentList: any;
  Apprisalcyclelist: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  appraisalCycleName: any
  pending: any;
  sbuSubmittedCount: any
  employeSubmissionDate: any;
  managerSubmittedCount: any;
  hrSubmittedlist: any;
  hrSubmittedCount: any;
  appraisalcount: any;
  hrPendingCount: any;
  EmployeePendingCount: any;
  appraisalPendingCount: any;
  appraisalClose: any;
  AppraisalCycleID: any;
  currentUrl: any;
  ratingvalue: any;
  StaffAppraisalList1: any;

  ngOnInit() {
    //Variable Initialisation and Default Method Calls//
    this.currentUrl = window.location.href;
    this.pending = 0;
    this.roleid = sessionStorage.getItem('roleid');
    this.GetRoleType();
    this.GetDepartment();
    this.HighScore();
    this.Conductappraisalcounts();
    this.YearID = 2020;
    this.ratingvalue = 0;
    this.StaffTypeID = 0;
    this.StaffID = 0;
    this.Score = 0;
    this.appraisalCycleName = 0;
    this.departmentid = 0;
    this.GetMyDetails();
    this.manager = 0;
    this.UserID = sessionStorage.getItem('EmaployedID');
    // this.StaffID = 0;
    // this.PerformanceManagementService.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })
    this.GetAppraisalCycle();
    this.ConductappraisalStaffList();
  }

  //Method to get Appraisal Cycle Details//
  public GetAppraisalCycle() {
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.Apprisalcyclelist = data;
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

  public Getratingvalue(event: any) {
    debugger
    this.ratingvalue = event.target.value;

    if (this.ratingvalue == 0) {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: res => {
          debugger
          let temp: any = res
          this.StaffAppraisalList = temp;
          this.FilteredStaffAppraisalList = this.StaffAppraisalList
          this.count = this.FilteredStaffAppraisalList.length;
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
    } else {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: (res: any) => {
          debugger
          let temp: any = res
          this.StaffAppraisalList = temp;
          this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { avgGroupHeadScores: any; avgCIOScores: any; }) => (Math.round((x.avgGroupHeadScores + x.avgCIOScores) / 2)) == this.ratingvalue)
          this.count = this.FilteredStaffAppraisalList.length;
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
  Finalize:any;
  //Method to get Employee Appraisal Details//
  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (res: any) => {
        debugger
        let temp: any = res
        this.StaffAppraisalList = temp;

        this.AppraisalCycleID = this.StaffAppraisalList[0].appraiselID
        this.Finalize = this.StaffAppraisalList[0].finalize
        this.appraisalClose = this.StaffAppraisalList1[0].appraisalClose
        this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { cioScores: null; }) => x.cioScores != null)
        this.count = this.FilteredStaffAppraisalList.length;
        this.managerList = this.dumpmanagerList.filter((x: { manager: any; }) => x.manager == this.manager);

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


//Method to Get Staff Type ID//
  GetStaffTypeID(event: any) {
    this.StaffTypeID = event.target.value;
    if (this.StaffTypeID == 0) {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList
    }
    else {
      // this.PerformanceManagementService.GetAllStaff().subscribe(data => {
      //   debugger
      //   let temp: any = data;
      //   this.Stafflist = temp.filter(x => x.staffTypeID == this.StaffTypeID);
      //   this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter(x => x.scoreBit == 1 && x.type == this.StaffTypeID);
      // })
    }
  }


  //Method to get StaffID filter by same//
  public GetStaffID(event: any) {
    debugger;
    this.StaffID = event.target.value;
    if (this.StaffID == 0) {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList;
    }
    else {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { scoreBit: number; type: any; id: any; }) => x.scoreBit == 1 && x.type == this.StaffTypeID && x.id == this.StaffID);
    }
  }

  //Method to get Year ID//
  public FilterByYear(event: any) {
    this.YearID = event.target.value;
  }

//Method to update BellCurveFitting Rating//
  update() {
    debugger
    var entity = {
      'staffID': this.StaffID,
      'bellcurveScore': this.Score
    }
    this.PerformanceManagementService.UpdateBellCurveFitting(entity).subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
        this.ngOnInit()
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating BellCurveFitting');
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

//method to store staff IDs//
  public ViewScores(event: any) {
    debugger;
    this.StaffID = event.id;
    let StaffTypeID = event.type;
    // this.router.navigate(['/StaffScoreFullDetails', StaffID, StaffID]);
  }

//Method to get Manager//
  getManager(even: any) {
    this.manager = even.target.value;
  }

  //Method to get Staff Details//
  public GetMyDetails() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.managerList = data.filter(x => x.supervisor == null)
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

//Method to get Role//
  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
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

//Method to filter By Roletype//
  public GetFilteredRoleType() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.FilteredStaffAppraisalList = data.filter(x => x.type == this.roleTypeid)
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

//method to get Department ID//
  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
  }

  //Method to Get Department Details//
  public GetDepartment() {
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

  //Method to filter by depatment//
  public GetFilteredDepartment() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.FilteredStaffAppraisalList = data.filter(x => x.department == this.departmentid)

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



  // exporttoexcel() {
  //   debugger;
  //   const Export_to_excel_options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: 'Staff Score Report ',
  //     useTextFile: false,
  //     useBom: true,
  //     useKeysAsHeaders: true,
  //     filename: 'Staff Score Report'
  //   };
  //   const csvExporter = new ExportToCsv(Export_to_excel_options);
  //   csvExporter.generateCsv(this.StaffAppraisalList);
  // }


  //Method to get Score list for DropDown//
  public HighScore() {
    debugger
    this.PerformanceManagementService.GetHighScores().subscribe({
      next: data => {
        debugger
        this.list = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting HighScores ');
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

//Method to filter by manager//
  public GetFilteredManager() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.FilteredStaffAppraisalList = data.filter(x => x.managername == this.manager)

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting bConductappraisalStaffList');
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

  //Method to get Appraisal Cycle Details and call filter method//
  public GetApprisalcycle(event: any) {
    debugger
    this.appraisalCycleName = event.target.value;
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.appraisalCycleName == this.appraisalCycleName);
        this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;

        this.appraisalCycleName = temp[0].appraisalCycleName
        this.sDate = temp[0].cycleStartDate;
        this.eDate = temp[0].cycleEndDate;
        debugger
        this.GetFilteredAppraisalCycle()
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

//method to filter bu Appraisal Cycle //
  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: data => {
        debugger
        this.FilteredStaffAppraisalList = data.filter(x => x.appraisalCycleName == this.appraisalCycleName)

        this.appraisalcount = this.FilteredStaffAppraisalList.length;
        this.appraisalClose = this.FilteredStaffAppraisalList[0].appraisalClose
        var list = data.filter(x => x.employeeSubmittedDate != null && x.selfScores != null && x.appraisalCycleName == this.appraisalCycleName &&
          x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null)
        this.employeSubmissionDate = list.length;

        var list1 = data.filter(x => x.managerSubmittedDate != null && x.appraisalCycleName == this.appraisalCycleName);
        this.managerSubmittedCount = list1.length;

        var sbuSubmittedlist = data.filter(x => x.sbuSubmittedDate != null && x.appraisalCycleName == this.appraisalCycleName);
        this.sbuSubmittedCount = sbuSubmittedlist.length;

        this.hrSubmittedlist = data.filter(x => x.hrSubmittedDate != null && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null && x.appraisalCycleName == this.appraisalCycleName);
        console.log("data", data)
        console.log("hr", this.hrSubmittedlist)
        this.hrSubmittedCount = this.hrSubmittedlist.length;

        this.hrSubmittedlist = data.filter(x => x.hrSubmittedDate == null && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.appraisalCycleName == this.appraisalCycleName);
        console.log("data", data)
        console.log("hr", this.hrSubmittedlist)
        this.appraisalPendingCount = this.hrSubmittedlist.length;
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

//Method to get Counts//
  public Conductappraisalcounts() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (res: any[]) => {
        debugger
        let temp: any = res
        this.StaffAppraisalList = temp;
        this.appraisalcount = this.StaffAppraisalList.length;
        var list = res.filter(x => x.employeeSubmittedDate != null && x.selfScores != null &&
          x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null)
        this.employeSubmissionDate = list.length;

        var list1 = res.filter(x => x.managerSubmittedDate != null);
        this.managerSubmittedCount = list1.length;

        var sbuSubmittedlist = res.filter(x => x.sbuSubmittedDate != null && x.appraisalCycleName == this.appraisalCycleName);
        this.sbuSubmittedCount = sbuSubmittedlist.length;

        this.hrSubmittedlist = res.filter(x => x.hrSubmittedDate != null && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null && x.employeeSubmittedDate != null && x.managerSubmittedDate != null && x.sbuSubmittedDate != null);
        console.log("data", res)
        console.log("hr", this.hrSubmittedlist)
        this.hrSubmittedCount = this.hrSubmittedlist.length;

        this.hrSubmittedlist = res.filter(x => x.hrSubmittedDate == null && x.cycleStartDate != null && x.cycleEndDate != null && x.appraisalSubmitionDate != null);
        console.log("data", res)
        console.log("hr", this.hrSubmittedlist)
        this.appraisalPendingCount = this.hrSubmittedlist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Conduct appraisalStaffList');
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

  //Method to close Appraisal Cycle//
  public CloseAppraisal() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Close the Appraisal Cycle.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Close it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        if (this.appraisalClose == null) {
          var obj = {
            'appraiselID': this.AppraisalCycleID
          }
          this.PerformanceManagementService.CloseAppraisalCycle(obj).subscribe({
            next: data => {
              debugger
              Swal.fire('Appraisal Cycle Closed Successfully!!')
            }, error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in Closing AppraisalCycle');
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
          Swal.fire('Appraisal Cycle Closed Already!!')
        }
      }
    })
  }

  public FinalizeAppraisal(id:any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Finalize the Rating.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Close it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
       
       
          this.PerformanceManagementService.UpdateFinalizeRating(id).subscribe({
            next: data => {
              debugger
              Swal.fire('Finalised Rating Successfully!!')
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

