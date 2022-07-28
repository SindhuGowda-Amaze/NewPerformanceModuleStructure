import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-score-report',
  templateUrl: './staff-score-report.component.html',
  styleUrls: ['./staff-score-report.component.css']
})
export class StaffScoreReportComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService, public router: Router) { }

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
  departmentid: any;
  departmentList: any;
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  pending: any;
  appraisalCycleName: any
  Apprisalcyclelist: any;
  employeSubmissionDate: any;
  managerSubmittedCount: any;
  sbuSubmittedCount: any;
  hrSubmittedlist: any;
  hrSubmittedCount: any;
  appraisalcount: any;
  hrPendingCount: any;
  EmployeePendingCount: any;
  appraisalPendingCount: any;

  Stafflist: any
  StaffType: any;
  StaffTypeID: any;
  AppraisalCycleID: any;

  StaffAppraisalList: any;
  FilteredStaffAppraisalList: any;
  managerList1: any;
  appraislid: any;
  appraisalClose: any;
  ratingvalue: any;
  AppraisalCycleID1: any;
  currentUrl: any
  ngOnInit() {
    this.currentUrl = window.location.href
    this.pending = 0;
    this.GetRoleType();
    this.GetDepartment();
    this.YearID = 2020;
    this.ratingvalue = 0;
    this.StaffTypeID = 0;
    this.departmentid = 0;
    this.StaffID = 0;
    this.GetMyDetails();
    this.Conductappraisalcounts();
    this.ConductappraisalStaffList();
    this.manager = 0;
    this.dumpmanagerList = 0;
    this.appraisalCycleName = 0;
    // this.StaffID = 0;
    this.UserID = localStorage.getItem('staffid');
    // this.PerformanceManagementService.GetStaffType(1).subscribe(data => {
    //   debugger
    //   this.StaffTypelist = data;
    // })



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

  public Getratingvalue(event: any) {
    debugger
    this.ratingvalue = event.target.value;

    if (this.ratingvalue == 0) {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: (res: any) => {
          debugger
          let temp: any = res
          this.StaffAppraisalList = temp;
          this.FilteredStaffAppraisalList = this.StaffAppraisalList
          this.count = this.FilteredStaffAppraisalList.length;
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
    } else {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: (res: any) => {
          debugger
          let teamexpnes: any = res.filter((x: { supervisor: string | null; }) => x.supervisor == sessionStorage.getItem('staffid'));
          let temp: any = res
          this.StaffAppraisalList = temp;

          this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { avgGroupHeadScores: any; avgCIOScores: any; }) => ((x.avgGroupHeadScores + x.avgCIOScores) / 2) == this.ratingvalue)
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

  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
      next: (res: any) => {
        debugger
        let temp: any = res
        this.StaffAppraisalList = temp;
        this.appraisalClose = this.StaffAppraisalList[0].appraisalClose
        this.AppraisalCycleID = this.StaffAppraisalList[0].appraiselID
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


  public GetStaffID(event: any) {
    debugger;
    this.StaffID = event.target.value;
    if (this.StaffID == 0) {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList;
    }
    else {
      this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { scoreBit: number; type: any; id: any; appraiselID: any; }) => x.scoreBit == 1 && x.type == this.StaffTypeID && x.id == this.StaffID && x.appraiselID == this.appraislid);
    }
  }

  public FilterByYear(event: any) {
    this.YearID = event.target.value;
  }


  public ViewScores(event: any) {
    debugger;
    let StaffID = event.id;
    let StaffTypeID = event.type;
    let appraisalid = event.appraiselID;

    this.router.navigate(['/hr/StaffScoreFullDetails', StaffID, appraisalid]);

  }

  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
  }

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
  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
  }

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


  getManager(even: any) {
    this.manager = even.target.value;
  }

  public GetMyDetails() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.managerList1 = data.filter(x => x.supervisor == null && x.role == 'Manager')     // 10422 HR is taken as manager for all managers 
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

  public GetFilteredManager() {
    if (this.ratingvalue == 0) {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: (res: any[]) => {
          debugger
          let temp: any = res
          this.StaffAppraisalList = temp;
          this.FilteredStaffAppraisalList = this.StaffAppraisalList
          this.FilteredStaffAppraisalList = res.filter((x: { managername: any; }) => x.managername == this.manager)
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

          this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { avgGroupHeadScores: any; avgCIOScores: any; managername: any; }) => ((x.avgGroupHeadScores + x.avgCIOScores) / 2) == this.ratingvalue && x.managername == this.manager)
          this.count = this.FilteredStaffAppraisalList.length;
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
  }

  public GetFilteredRoleType() {
    if (this.ratingvalue == 0) {
      this.PerformanceManagementService.GetConductappraisalStaffList().subscribe({
        next: res => {
          debugger
          let temp: any = res
          this.StaffAppraisalList = temp;
          this.FilteredStaffAppraisalList = this.StaffAppraisalList
          this.FilteredStaffAppraisalList = res.filter((x: { managername: any; type: any }) => x.type == this.roleTypeid)
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

          this.FilteredStaffAppraisalList = this.StaffAppraisalList.filter((x: { avgGroupHeadScores: any; avgCIOScores: any; managername: any; type: any }) => ((x.avgGroupHeadScores + x.avgCIOScores) / 2) == this.ratingvalue && x.type == this.roleTypeid)
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





  public GetApprisalcycle(event: any) {
    debugger
    this.appraisalCycleName = event.target.value;
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.appraisalCycleName == this.appraisalCycleName);
        this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
        this.AppraisalCycleID1 = temp[0].id
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
        if (this.appraisalClose == 0) {
          var obj = {
            'appraiselID': this.AppraisalCycleID1
          }
          this.PerformanceManagementService.CloseAppraisalCycle(obj).subscribe({
            next: data => {
              debugger
              Swal.fire('Appraisal Cycle Closed Successfully!!')
              location.reload();
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


}

