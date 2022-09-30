
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
  viewMode = 'tab1';
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
  search: any;
  EmployeeKradash: any
  roleid: any;
  currentUrl: any;
  Approver1: any;
  loginName: any;
  EmployeeKradashCompleted: any;
  EmployeeKradashAccepted: any;
  EmployeeKradashSubmitted: any;
  kratypelist: any
  kratypeid: any
  Apprisalcycle: any
  AppraisalSubmitionDate: any;
  sDate: any;
  eDate: any;
  kraname: any;
  kpiName: any;
  dropdownList: any
  staffName: any
  Departmentid: any
  employeeGoalList: any;
  Employeegoal: any;
  StaffkraEmp: any;
  EmplGoalsList: any;
  goalID: any;
  kralist: any;
  Apprisalcyclelist: any
  goalSettingDate: any
  appraisalid: any
  AppraisalClose: any
  selectedstaff: any
  selectedstaffapprover1: any
  Approver2: any
  Approver3: any
  dropdownList1: any
  kraid: any;
  employeeSubmissionDate: any;

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  ngOnInit(): void {

    //Variable Initialisation and Default Method Calls//

    this.GetMyDetails();
    this.GetDepartment();
    this.GetConductappraisalStaffList();
    this.GetEmployeeKraMap();
    this.GetAppraisalCycle()
    this.GetKeyResultArea();
    this.GetEmployeeGoals();
    this.Apprisalcycle = ""
    this.kratypeid = ""
    this.kraid = "0"
    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roleid');
    this.loginName = sessionStorage.getItem('loginName');
  }

  //Method to Displaying the Data & Count from GetMyDetails Table//

  public GetMyDetails() {
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

  public GetDepartment() {
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

  public GetConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList()
      .subscribe({
        next: data => {
          debugger
          this.EmployeeKradash = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate == null && x.employeeacceptgoal ==null);
          this.EmployeeKradashAccepted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate == null && x.employeeacceptgoal == 1);
          this.EmployeeKradashSubmitted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate != null);
          this.EmployeeKradashCompleted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate != null && x.finalize == 1);
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

    this.PerformanceManagementService.GetEmployeeGoalMaster()
      .subscribe({
        next: data => {
          debugger
          this.Employeegoal = data.filter(x => x.staffID == sessionStorage.getItem('EmaployedID') && x.managerRequest == null);
          this.EmployeeKradashAccepted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate == null && x.employeeacceptgoal == 1);
          this.EmployeeKradashSubmitted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate != null);
          this.EmployeeKradashCompleted = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID') && x.employeeSubmittedDate != null && x.finalize == 1);
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

 

  public GetEmployeeGoalList(details: any) {
    this.goalID = details.id
    debugger
    this.PerformanceManagementService.GetEmployeeKPI().subscribe({
      next: data => {
        debugger
        this.EmplGoalsList = data.filter(x => x.goalID == this.goalID)
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

  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap()
      .subscribe({
        next: data => {
          debugger
          this.Staffkra = data.filter(x => x.staffName == details.staffID);
          this.count = this.Staffkra.length;
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeKraMap');
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

  public GetManagerKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap()
      .subscribe({
        next: data => {
          debugger
          // this.Staffkra = data.filter(x => x.staffName == details.staffID);
          // this.Staffkra = data.filter(x => x.supervisor ==  sessionStorage.getItem('EmaployedID')  && x.managerRequest == 1);
          this.Staffkra = data.filter(x => x.supervisor ==  sessionStorage.getItem('EmaployedID'));
          this.count = this.Staffkra.length;
          console.log(this.Staffkra)
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeKraMap');
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
              )
            }
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
      'Message': this.loginName + 'Accepted Goal!!',
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

  public GetEmployeeKraMap() {
    this.PerformanceManagementService.GetKraMaster()
      .subscribe({
        next: data => {
          debugger
          this.kratypelist = data;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting KraMasterb');
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


  public GetKeyResultArea() {
    this.PerformanceManagementService.GetKeyResultArea()

      .subscribe({
        next: data => {
          debugger
          this.kralist = data;

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting KraMasterb');
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

  public GetAppraisalCycle() {
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        this.Apprisalcyclelist = data.filter(x => x.appraisalClose == 0);
        // let temp: any = data.filter(x => x.appraisalClose == 0);
        // this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
        // this.sDate = temp[0].cycleStartDate;
        // this.eDate = temp[0].cycleEndDate;
        // this.goalSettingDate = temp[0].goalSettingDate;

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

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.id == event.target.value);
        this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
        this.sDate = temp[0].cycleStartDate;
        this.eDate = temp[0].cycleEndDate;
        this.goalSettingDate = temp[0].goalSettingDate;
        this.appraisalid = event.target.value;
        this.AppraisalClose = temp[0].appraisalClose;

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


  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value;
    for (let i = 0; i <= this.selectedstaff.length; i++) {
      this.PerformanceManagementService.GetMyDetails().subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.id == sessionStorage.getItem('EmaployedID'));
          this.selectedstaffapprover1.push(temp[0].supervisor);
          this.Approver1 = temp[0].supervisor;

          this.Approver2 = 10422;
          this.Approver3 = 49518;
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

    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.dropdownList1 = data.filter(x => x.kraTypeID == this.kratypeid);

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
  public getkpi(event: any) {

  }

  tablecount: any;
  keyresultArray: any = [];

  public SaveDetails() {
    debugger
    if (this.kraid == undefined || this.kpiName == undefined) {
      Swal.fire("Please Enter Mandatory Fields")
    }
    else {
      this.PerformanceManagementService.GetEmployeeGoalMaster()
        .subscribe({
          next: data => {
            debugger
            let temp: any = data.filter(x => x.id == this.kraid);
            var kraname = temp[0].goalName;
            this.tablecount = 1;
            var json = {
              "AppraisalCycleID": this.Apprisalcycle,
              "kraid": kraname,
              "kpiName": this.kpiName,
              'KraTypeID': this.kratypeid
            };
            debugger

            this.keyresultArray.push(json);
            // this.kraid == "";
            // this.kpiName == "";


          }
        })
    }


  }

  public InsertDetails() {
    debugger
    // if( this.goalSettingDate< this.todaydate ){
    //   Swal.fire('Sorry, You cannot set the goal since last date is over')
    // }
    // else{


    debugger
    for (let i = 0; i < this.keyresultArray.length; i++) {
      if (this.keyresultArray.length == 0) {
        Swal.fire('Please Select Goals For Staff')
      }

      var entity = {
        "GoalID": this.kraid,
        "KPIName": this.keyresultArray[i].kpiName,
        // "KraTypeID": this.keyresultArray[i].KraTypeID,
        // "Role": 6,
        // "Description": 'Employee',
        // "StaffId": sessionStorage.getItem('EmaployedID')
      };
      this.PerformanceManagementService.InsertEmployeeKPI(entity).subscribe(
        data => {
          debugger
          let kratypelist = data;
          Swal.fire("KPI Added Successfully");
          this.tablecount = 0;
          location.reload();
          // location.href = "#/hr/KeyResultArea";
          console.log("kralist", this.kratypelist);
        })
      // location.href = "#/manager/EmployeeKraMappingdashboard";

    }
    // }
  }

  // this.InsertNotification();
  // Swal.fire('Goal Setting Done Successfully.');

  // location.reload();



  public saveemloyeegoals() {
    debugger
    if (this.Apprisalcycle == "" || this.kratypeid == "" || this.kraname == undefined) {
      Swal.fire('Please Select Goals For Staff')
    }
    else {
      var Entity = {
        'EmployeeID': sessionStorage.getItem('EmaployedID'),
        'GoalName': this.kraname,
        'GoalTypeID': this.kratypeid,
        'AppraisalCycleID': this.Apprisalcycle
      }
      this.PerformanceManagementService.InsertEmployeeGoalMaster(Entity).subscribe({
        next: data => {
          debugger
          if (data == 0) {
            Swal.fire("Already exist!!")
          }
          Swal.fire("Saved Successfully!!")
          location.reload();
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting Employee Goals');
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


  public GetEmployeeGoals() {

    this.PerformanceManagementService.GetEmployeeGoalMaster()

      .subscribe({
        next: data => {
          debugger
          this.employeeGoalList = data;
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


  goalID12: any;
  approver1: any;
  employeeKpiList: any;
  empgoalID: any;
  empkpiID: any;
  empAppSdate: any;
  empAppEdate: any;
  empAppID: any;


  public RequestManagerKRAMapping(details: any) {
    this.goalID12 = details.id
    debugger
    this.PerformanceManagementService.GetEmployeeKPI()
      .subscribe({
        next: data => {
          debugger
          this.employeeKpiList = data.filter(x => x.staffID == sessionStorage.getItem('EmaployedID'));
          this.empgoalID = this.employeeKpiList[0].goalID
          this.empkpiID = this.employeeKpiList[0].id
          this.empAppSdate = this.employeeKpiList[0].cycleStartDate
          this.empAppEdate = this.employeeKpiList[0].cycleEndDate
          this.empAppID = this.employeeKpiList[0].appraisalCycleID
          this.employeeSubmissionDate = this.employeeKpiList[0].employeeSubmissionDate
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee KPI');
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

    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.id == sessionStorage.getItem('EmaployedID'));
        this.approver1 = temp[0].supervisor;
        //this.Approver1 = temp[0].supervisor;
        this.Approver2 = 10422;
        this.Approver3 = 49518;
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Send Goal Request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Send it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {

        for (let i = 0; i < this.employeeKpiList.length; i++) {
          if (this.employeeKpiList.length == 0) {
            Swal.fire('Please Add Goals')
          }
          else {
            var Entity = {
              'StaffTypeID': 1,
              'StaffName': sessionStorage.getItem('EmaployedID'),
              'Approver1': this.approver1,
              'Approver2': this.Approver2,
              'Approver3': this.Approver3,
              'AppraisalSubmitionDate': this.employeeSubmissionDate,
              'CycleStartDate': this.empAppSdate,
              'CycleEndDate': this.empAppEdate,
              'KraID': this.empgoalID,
              'kpiid': this.empkpiID,
              'AppraiselID': this.empAppID
            }
            this.PerformanceManagementService.InsertEmployeeGoalRequest(Entity).subscribe({
              next: data => {
                debugger
                if (data == 0) {
                  Swal.fire("Already exist!!")
                }
              }, error: (err: { error: { message: any; }; }) => {
                Swal.fire('Issue in Inserting EmployeeKraMap');
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
          // }
        }

        // this.InsertNotification();
        Swal.fire('Goal Request Sent Successfully.');
        // location.href = "#/manager/EmployeeKraMappingdashboard";
        // location.reload();
      }
    })
  }

  public cancel(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Cancel it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.DeleteEmployeeGoalMaster(ID).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            // this.GetKeyResultArea();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Deleting Employee Goal Master');
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

  cancelAppraisal() {
    location.href = "#/shared/MyAppraisal";
  }
}