//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get data from GetMyDetails,GetDepartment,GetConductappraisalStaffList,GetAppraisalCycle,GetKraMaster,GetStaffKraDetails in open Window 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-appraisal',
  templateUrl: './manager-appraisal.component.html',
  styleUrls: ['./manager-appraisal.component.css']
})
export class ManagerAppraisalComponent implements OnInit {


  constructor(private PerformanceManagementService: PerformancemanagementService, private router: Router, private route: ActivatedRoute, private datepipe: DatePipe) { }
//varaiable Declaration 
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
  ParamID: any;
  EmployeeKradash: any
  StaffType: any;
  StaffTypeID: any;
  StaffID: any;
  ResultAreaList: any;
  PerformanceLists1: any;
  showbtn: any;
  showbtn1: any;
  Name: any;
  role: any;
  departmentName: any;
  managerSubmittedDate: any
  selfAttachment: any;
  EmployeeId: any;
  appraislid: any;
  managerrating: any;
  currentUrl: any
  list: any;
  SelfComments: any;
  Staffkra: any;
  attachment: any;
  photoid: any;


  ngOnInit(): void 
  {
     //Variable Initialisation and Default Method Calls//

  
    this.route.params.subscribe(params => {
      debugger;
      this.ParamID = params['id'];
      if (params['id'] != undefined) {
        // this.StaffType = params['StaffID'];
        this.appraislid = params['StaffID'];
        this.StaffID = params['id']; 
      }
    }
    );
    this.GetKRAByStaffID();
    this.currentUrl = window.location.href;
    this.Score = 0;
    this.showbtn = false;
    this.showbtn1 = false;
    this.HighScore();
  }

//Method to get StaffID from KRA Table// 
  public GetKRAByStaffID(){
    debugger
    this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe({
      next: data => {
        debugger
        this.ResultAreaList = data.filter((x: { emplosubmitdate: any; appraiselID: any; }) => x.emplosubmitdate != null && x.appraiselID == this.appraislid);
        console.log(this.ResultAreaList);

        this.Name = this.ResultAreaList[0].name
        this.role = this.ResultAreaList[0].role
        this.departmentName = this.ResultAreaList[0].departmentName
        this.managerSubmittedDate = this.ResultAreaList[0].managerSubmittedDate
        this.selfAttachment = this.ResultAreaList[0].Photo
        this.ResultAreaList.forEach((element: { managerupdate: any; }) => {
          if (element.managerupdate != 1) {
            this.showbtn = false
          } else {
            this.showbtn = true
          }
        });

      }, error: (err) => {
        Swal.fire('Issue in Getting KRAByStaffID');
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
//Method to FilterRoleType in MyDetails Table
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
// filterByDepartment in MyDetails Table

  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.department == this.Department);
        this.count = this.stafflist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting MyDetailsb');
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
//Method to get StaffKraDetails in EmployeeKraMap
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: data => {
        debugger
        this.Staffkra = data.filter(x => x.staffName == details.staffid);
      }, error: (err: { error: { message: any; }; }) => {
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

// Method to get HighScore data from HighScores table
  public HighScore() {
    debugger
    this.PerformanceManagementService.GetHighScores().subscribe({
      next: data => {
        debugger
        this.list = data;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting HighScores');
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
  kpiid: any;
  Score: any;
  ResultAreaID: any;
  ManagerSubmittedDate: any;
  managerattachment: any
  id: any;
  public GetKPIID(details: any) {
    this.id = details.id;
    this.kpiid = details.kpiid;
    this.ResultAreaID = details.resultAreaID;
    this.Score = "";
    this.SelfComments = '';

  }
//Method to save details in StaffScoresByManager table 
  public SaveDetails() {
    debugger
    if (this.Score == undefined || this.Score == 0 || this.SelfComments == undefined || this.SelfComments == null) {
      Swal.fire("Please Enter the Mandatory Fields");
    }
    else {
      debugger
      var entity = {

        'SatffID': this.StaffID,
        'StaffType': this.StaffID,
        'Supervisor': this.id,
        'ResultAreaID': this.ResultAreaID,
        'PerformaceIndicatorID': this.kpiid,
        'SelfScores': this.Score,
        'SelfComments': this.SelfComments,
        'Attachment': this.attchmentss
      }
      this.PerformanceManagementService.InsertStaffScoresByManager(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Saved Successfully");

          this.Score = "";
          this.SelfComments = "";
          this.attchmentss = '';
          this.files.length = 0;
          const element1 = document.getElementById('close');

          if (element1 !== null) {

            element1.click();

          }
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Inserting StaffScoresByManager');
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


//Method to update data in StaffScoresByManager 
  public UpdateDetails() {
    debugger
    var entity = {
      'SatffID': this.StaffID,
      'StaffType': this.StaffID,
      'Supervisor': this.id,
      'ResultAreaID': this.ResultAreaID,
      'PerformaceIndicatorID': this.kpiid,
      'SelfScores': this.Score,
      'SelfComments': this.SelfComments,
      'Attachment': this.attchmentss
    }
    this.PerformanceManagementService.InsertStaffScoresByManager(entity).subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
        this.attchmentss = "";
        const element1 = document.getElementById('close');
        this.files.length = 0;
        if (element1 !== null) {

          element1.click();

        }
        this.ngOnInit();

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting StaffScoresByManager');
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
//Method to get KPIIDetails from EmployeeKraMap

  public GetKPIIDetails(details: any) {
    debugger
    this.managerattachment = '';
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.id == details.id)
        this.Score = temp[0].managerrating;
        this.SelfComments = temp[0].managercomments;
        // this.attachment=details.photo;
        this.managerattachment = details.mPhoto;
        this.id = temp[0].id;
        this.kpiid = temp[0].kpiid;
        this.ResultAreaID = temp[0].resultAreaID;
        this.attachment = details.managerattachment
      }, error: (err: { error: { message: any; }; }) => {
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

    this.photoid = details.id;
  }

  files: File[] = [];
  attachmentsurl: any = []
  attchmentss: any;
  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe({
      next: res => {
        debugger
        if (res != undefined) {
          this.attchmentss = res;
          // this.attachmentsurl.push(res);

          Swal.fire('Attachment uploaded')



        }
        debugger
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in ProjectAttachments');
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

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  empcomments: any;
  public GEtemployeecomments(detials: any) {
    this.empcomments = detials.empcomments
  }

//Method to submit staffId in ManagerAppraisal
  public SubmitManagerAppraisal() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Submit it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        debugger
        var entity = {
          'StaffID': this.StaffID,
        }
        this.PerformanceManagementService.SubmitManagerAppraisal(entity).subscribe({
          next: data => {
            debugger
            Swal.fire("Submitted Appraisal Successfully");
            this.ngOnInit();
            //  this.showbtn=false;
            //  this.showbtn1=true
            this.InsertNotificationHR();
            this.InsertNotificationEmployeeAppraisalSubmit();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Submitting ManagerAppraisal');
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
 
  getattachment(details: any) {
    debugger
    this.selfAttachment = details.photo;
    this.photoid = details.id;
    this.attachmentsurl[0] = details.selfattachment
  }
//Method to update data in ManagerSelfAttachment
  update() {
    debugger
    var entity = {
      'ID': this.photoid,
      'Attachment': this.attchmentss
    }
    this.PerformanceManagementService.UpdateManagerSelfAttachment(entity).subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully");
        this.attachmentsurl = 0;
        this.attchmentss = "";
        this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
          debugger
          this.ResultAreaList = data;

          console.log("Result area", this.ResultAreaList);

        })
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating ManagerSelfAttachment');
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
  cancel() {
    location.href = "/Selfratingnew";
  }


//method to insert notification in notitfication Table
  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Your Manager Assigned a New Goal Setting to you!!',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.EmployeeId,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe({
      next: data => {
        debugger
        if (data != 0) {


        }
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting Notification');
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
//Method to update notificationhr in notification table
  public InsertNotificationHR() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Your Manager has submitted the Appraisal',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': 10422,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe({
      next: data => {
        debugger
        if (data != 0) {

        }
      }, error: (err) => {
        Swal.fire('Issue in Inserting Notification');
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

//Method to InsertNotificationEmployeeAppraisalSubmit   from notification Table
  public InsertNotificationEmployeeAppraisalSubmit() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Apprisal Request',
      'FromUser': 'Admin',
      'ToUser': sessionStorage.getItem('EmaployedID'),
      'Message': 'Manager has Completed your Appraisal',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': this.EmployeeId,
      'NotificationTypeID': 17,
      'VendorID': 0


    }
    this.PerformanceManagementService.InsertNotification(entity).subscribe({
      next: data => {
        debugger
        if (data != 0) {


        }
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting Notification');
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

  close(){
    location.reload()
  }

}
