//  Product :Digi PerformanceManagement System 1.0
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying the Data from GetKRAByStaffID & GetDepartment,GetMyDetails, GetEmployeeKraMap,Insert  the Data from InsertStaffScores ,delete the Data from DeleteStaffScores..
// --Last Modified Date : 28 July , 2022
// --Last Modified Changes : Addedd Commets and Exception Handling Code
// --Last Modified By : Manikanta, Sindhu, Madhav
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-selfratingnew-component',
  templateUrl: './selfratingnew-component.component.html',
  styleUrls: ['./selfratingnew-component.component.css'],
})
export class SelfratingnewComponentComponent implements OnInit {
  // variables decleartions//

  ckeditorContent: string = '<p>Some html</p>';
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 25;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  attachment: any;
  Attachmentlist: any;
  photoid: any;
  ParamID: any;
  EmployeeKradash: any;
  StaffType: any;
  StaffTypeID: any;
  StaffID: any;
  ResultAreaList: any;
  PerformanceLists1: any;
  showbtn: any;
  score: any;
  empcomments: any;
  selfrating: any;
  selfComments: any;
  EmployeeSubmittedDate: any;
  EmployeeId: any;
  ManagerID: any;
  StaffName: any;
  loader: any;
  appraislid: any;
  attachmentNew: any;
  currentUrl: any;
  list: any;
  SelfComments: any;
  Staffkra: any;
  kpiid: any;
  Score: any;
  ResultAreaID: any;
  id: any;
  files: File[] = [];
  attachmentsurl: any = [];

  constructor(
    private PerformanceManagementService: PerformancemanagementService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//


    this.Score = 0;
    this.showbtn = false;
    this.currentUrl = window.location.href;
    this.route.params.subscribe((params) => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        debugger;
        this.appraislid = params['StaffID'];
        this.StaffID = params['id'];
        this.StaffTypeID = this.StaffType;

        // this.GetStaffAppraisalByID(this.ParamID);
      }
    });

    this.HighScore();
    this.GetKRAByStaffID();
  }

  //Method to Displaying the Data from GetKRAByStaffID Table//

  public GetKRAByStaffID() {
    this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe({
      next: (data) => {
        debugger;
        this.ResultAreaList = data.filter(
          (x: { appraiselID: any }) => x.appraiselID == this.appraislid
        );
        this.EmployeeSubmittedDate =
          this.ResultAreaList[0].employeeSubmittedDate;
        this.ManagerID = this.ResultAreaList[0].approver1;
        this.StaffName = this.ResultAreaList[0].name;

        console.log('result', this.ResultAreaList);
        this.ResultAreaList.forEach((element: { empupdate: any }) => {
          if (element.empupdate != 1) {
            this.showbtn = false;
          } else {
            this.showbtn = true;
          }
        });

        console.log('Result area', this.ResultAreaList);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetKRAByStaffID');
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

  //Method to Displaying the Data & Count from GetMyDetails Table//

  public FilterRoleType() {
    debugger;
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.roleType == this.RoleType);
        this.count = this.stafflist.length;
      },
      error: (err: { error: { message: any } }) => {
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

  //Method to Displaying the Data from GetMyDetails Table//

  public filterByDepartment() {
    debugger;
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.department == this.Department);
        this.count = this.stafflist.length;
      },
      error: (err: { error: { message: any } }) => {
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

  //Method to Displaying the Data from GetEmployeeKraMap Table//

  public GetStaffKraDetails(details: any) {
    debugger;
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: (data) => {
        debugger;
        this.Staffkra = data.filter((x) => x.staffName == details.staffid);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting EmployeeKraMap');
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

  //Method to Displaying the Data from GetHighScores Table//

  public HighScore() {
    debugger;
    this.PerformanceManagementService.GetHighScores().subscribe({
      next: (data) => {
        debugger;
        this.list = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting HighScores');
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

  public GetKPIID(details: any) {
    this.id = details.id;
    this.kpiid = details.kpiid;
    this.ResultAreaID = details.resultAreaID;
    this.Score = 0;
    this.SelfComments = '';
  }

  //Method to Insert  the Data from InsertStaffScores Table//

  public SaveDetails() {
    debugger;
    var entity = {
      SatffID: this.StaffID,
      StaffType: this.StaffID,
      Supervisor: this.id,
      ResultAreaID: this.ResultAreaID,
      PerformaceIndicatorID: this.kpiid,
      SelfScores: this.Score,
      SelfComments: this.SelfComments,
      Attachment: this.attachmentNew,
      ApprisalID: this.appraislid,
    };
    this.PerformanceManagementService.InsertStaffScores(entity).subscribe({
      next: (data) => {
        debugger;
        Swal.fire('Saved Successfully');
        this.Score = 0;
        this.SelfComments = '';
        this.files.length = 0;
        this.attachmentNew = '';
        const element1 = document.getElementById('close');

        if (element1 !== null) {
          element1.click();
        }
        this.ngOnInit();
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

  //Method to Displaying the Data from GetEmployeeKraMap Table//
  public GetKPIIDetails(details: any) {
    debugger;
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.id == details.id);
        this.Score = temp[0].emprating;
        this.SelfComments = temp[0].empcomments;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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
    this.attachment = details.photo;
    // this.attachmentNew=details.selfattachment;
    this.photoid = details.id;
    // this.attachmentsurl[0] = details.selfattachment;
  }

  onSelect(event: any) {
    console.log(event);
    debugger;
    this.files.push(...event.addedFiles);
    // this.attachmentsurl.length = 0;
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe({
      next: (data) => {
        this.loader = true;
        debugger;
        if (data != undefined) {
          // this.attachmentsurl.push(res);
          this.attachmentNew = data;
          this.loader = false;
          // alert('Attachment uploaded')
          //  this.files.length = 0;
          Swal.fire('Attachment Uploaded Successfully');
        }
        debugger;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting ProjectAttachments');
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

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //Method to Displaying the Data from SubmitEmployeeAppraisal Table//

  public SubmitEmployeeAppraisal() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Submit it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        debugger;
        var entity = {
          StaffID: this.StaffID,
        };
        this.PerformanceManagementService.SubmitEmployeeAppraisal(
          entity
        ).subscribe({
          next: (data) => {
            debugger;
            this.InsertNotification();
            Swal.fire('Appraisal Submitted Successfully');
            this.ngOnInit();
          },
          error: (err: { error: { message: any } }) => {
            Swal.fire('Issue in Getting SubmitEmployeeAppraisal');
            // Insert error in Db Here//
            var obj = {
              PageName: this.currentUrl,
              ErrorMessage: err.error.message,
            };
            this.PerformanceManagementService.InsertExceptionLogs(
              obj
            ).subscribe((data) => {
              debugger;
            });
          },
        });
      }
    });
  }

  //Method to Insert  the Data from InsertNotification Table//

  public InsertNotification() {
    debugger;

    var entity = {
      Date: new Date(),
      Event: 'Apprisal Request',
      FromUser: 'Admin',
      ToUser: sessionStorage.getItem('username'),
      Message: this.StaffName + ' ' + 'Submitted the Appraisal',
      Photo: 'Null',
      Building: 'Dynamics 1',
      UserID: this.ManagerID,
      NotificationTypeID: 17,
      VendorID: 0,
    };
    this.PerformanceManagementService.InsertNotification(entity).subscribe({
      next: (data) => {
        if (data != 0) {
        }
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in InsertNotification');
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

  // showAttachments(photo: any) {
  //   debugger
  //   this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
  //     debugger
  //     this.Attachmentlist = photo;
  //   })
  // }

  //Method to update  the Data from UpdateStaffScores Table//

  update() {
    debugger;
    var entity = {
      ID: this.photoid,
      Attachment: this.attachmentNew,
    };
    this.PerformanceManagementService.UpdateStaffScores(entity).subscribe({
      next: (data) => {
        debugger;
        Swal.fire('Updated Successfully');
        this.attachmentsurl = 0;
        this.files.length = 0;
        this.attachmentNew = '';
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

    //Method to Displaying the Data from GetKRAByStaffID Table//

    this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe({
      next: (data) => {
        debugger;
        this.ResultAreaList = data;

        console.log('Result area', this.ResultAreaList);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Getting KRAByStaffID');
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

    Swal.fire('Updated Successfully');
    this.attachmentsurl = 0;
    this.files.length = 0;
    this.attachmentNew = '';
    this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe({
      next: (data) => {
        debugger;
        this.ResultAreaList = data;
        console.log('Result area', this.ResultAreaList);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetKRAByStaffID');
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

  //Method to Update the Data from UpdateEmployeeSelfRating Table//

  UpdateMain() {
    debugger;
    var entity = {
      StaffID: this.photoid,
      emprating: this.Score,
      empcomments: this.SelfComments,
    };
    this.PerformanceManagementService.UpdateEmployeeSelfRating(
      entity
    ).subscribe({
      next: (data) => {
        Swal.fire('Updated Successfully');
        this.ngOnInit();
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in UpdateEmployeeSelfRating');
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

  //Method to delete the Data from DeleteStaffScores Table//

  ondelete() {
    debugger;
    this.PerformanceManagementService.DeleteStaffScores(this.photoid).subscribe(
      {
        next: (data) => {
          Swal.fire('Deleted Successfully');
          this.ngOnInit();
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in DeleteStaffScores');
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
      }
    );
  }

  cancel() {
    location.href = '/shared/Selfratingnew';
  }
}
